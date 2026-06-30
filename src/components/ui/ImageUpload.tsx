'use client'

import { useState, useRef } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  Card,
  CardMedia,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
} from '@mui/material'
import { Upload, X, AlertCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { compressImage } from '@/utils/image'

interface ImageUploadProps {
  bucket: 'catalogue-media' | 'blog-media' | 'team-photos'
  value: string
  onChange: (url: string) => void
  label?: string
  aspectRatio?: string
  maxHeight?: number | string
}

export default function ImageUpload({
  bucket,
  value,
  onChange,
  label = 'Upload Image',
  aspectRatio = '16/9',
  maxHeight = 220,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  // Cropping states
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null)
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 })
  const [fitSize, setFitSize] = useState({ width: 0, height: 0 })
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const currentFileName = useRef<string>('')

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limit file type to images
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed')
      return
    }

    // Limit original file size to 25MB (to allow high-res uploads from phone cameras before compression)
    if (file.size > 25 * 1024 * 1024) {
      setError('Original file size must be less than 25MB')
      return
    }

    if (aspectRatio === '1/1') {
      currentFileName.current = file.name
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCropImageSrc(event.target.result as string)
          setCropDialogOpen(true)
        }
      }
      reader.readAsDataURL(file)
      // Reset input value so same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } else {
      performUpload(file)
    }
  }

  const performUpload = async (fileToUpload: File) => {
    setUploading(true)
    setError(null)

    try {
      // Compress image client-side if not pre-cropped
      const compressedFile = aspectRatio === '1/1' ? fileToUpload : await compressImage(fileToUpload)

      // Limit compressed file size to 5MB
      if (compressedFile.size > 5 * 1024 * 1024) {
        throw new Error('Compressed file size must be less than 5MB')
      }

      // Determine correct file extension
      let fileExt = compressedFile.type.split('/').pop() || 'jpg'
      if (fileExt === 'jpeg') fileExt = 'jpg'

      const randomId = Math.random().toString(36).substring(2, 15)
      const fileName = `${randomId}_${Date.now()}.${fileExt}`

      // Upload file directly to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
      if (!data?.publicUrl) {
        throw new Error('Failed to retrieve uploaded image public URL')
      }

      onChange(data.publicUrl)
    } catch (err: any) {
      console.error('File upload failure:', err)
      setError(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
    setError(null)
  }

  // --- CROP HANDLERS ---
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget
    setNaturalSize({ width: naturalWidth, height: naturalHeight })

    const viewportSize = 300
    let w = viewportSize
    let h = viewportSize

    if (naturalWidth >= naturalHeight) {
      w = viewportSize * (naturalWidth / naturalHeight)
    } else {
      h = viewportSize * (naturalHeight / naturalWidth)
    }

    setFitSize({ width: w, height: h })
    setPan({
      x: (viewportSize - w) / 2,
      y: (viewportSize - h) / 2,
    })
    setZoom(1)
  }

  const limitX = (x: number, scaleVal: number) => {
    const w = fitSize.width * scaleVal
    const minX = 300 - w
    return Math.min(0, Math.max(minX, x))
  }

  const limitY = (y: number, scaleVal: number) => {
    const h = fitSize.height * scaleVal
    const minY = 300 - h
    return Math.min(0, Math.max(minY, y))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!fitSize.width) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    setPan({
      x: limitX(newX, zoom),
      y: limitY(newY, zoom),
    })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!fitSize.width || e.touches.length !== 1) return
    setIsDragging(true)
    const touch = e.touches[0]
    setDragStart({
      x: touch.clientX - pan.x,
      y: touch.clientY - pan.y,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    const touch = e.touches[0]
    const newX = touch.clientX - dragStart.x
    const newY = touch.clientY - dragStart.y

    setPan({
      x: limitX(newX, zoom),
      y: limitY(newY, zoom),
    })
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  const handleZoomChange = (_: any, newValue: number | number[]) => {
    const val = newValue as number
    setZoom(val)
    setPan((prev) => ({
      x: limitX(prev.x, val),
      y: limitY(prev.y, val),
    }))
  }

  const handleConfirmCrop = () => {
    setCropDialogOpen(false)
    if (!cropImageSrc) return

    const cropCanvas = document.createElement('canvas')
    cropCanvas.width = 400
    cropCanvas.height = 400
    const ctx = cropCanvas.getContext('2d')

    if (ctx) {
      // Draw white background
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, 400, 400)

      const imgElement = new Image()
      imgElement.onload = () => {
        const scaleX = naturalSize.width / (fitSize.width * zoom)
        const scaleY = naturalSize.height / (fitSize.height * zoom)

        const sx = -pan.x * scaleX
        const sy = -pan.y * scaleY
        const sWidth = 300 * scaleX
        const sHeight = 300 * scaleY

        ctx.drawImage(imgElement, sx, sy, sWidth, sHeight, 0, 0, 400, 400)

        cropCanvas.toBlob(
          (blob) => {
            if (!blob) return
            const croppedFile = new File([blob], currentFileName.current || 'cropped.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            performUpload(croppedFile)
          },
          'image/jpeg',
          0.85
        )
      }
      imgElement.src = cropImageSrc
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, display: 'block', color: 'text.secondary' }}>
          {label}
        </Typography>
      )}

      {value ? (
        <Card
          sx={{
            position: 'relative',
            width: '100%',
            maxHeight: maxHeight,
            aspectRatio: aspectRatio,
            borderRadius: 3,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
            backgroundColor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            component="img"
            image={value}
            alt="Uploaded Preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <IconButton
            size="small"
            onClick={handleRemove}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: alpha('#1E2635', 0.8),
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: '#EF5350',
                color: '#FFFFFF',
              },
            }}
          >
            <X size={16} />
          </IconButton>
        </Card>
      ) : (
        <Box
          onClick={uploading ? undefined : handleUploadClick}
          sx={{
            width: '100%',
            maxHeight: maxHeight,
            aspectRatio: aspectRatio,
            borderRadius: 3,
            border: (theme) => `2px dashed ${uploading ? theme.palette.divider : alpha(theme.palette.primary.main, 0.4)}`,
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: uploading ? 'default' : 'pointer',
            p: 3,
            transition: 'all 0.2s ease',
            '&:hover': uploading ? {} : {
              borderColor: 'primary.main',
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
              transform: 'translateY(-1px)',
            },
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />

          {uploading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={36} color="primary" />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Uploading image...
              </Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <Upload size={20} />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Click to upload
              </Typography>
              <Typography variant="caption" color="text.secondary">
                PNG, JPG, WEBP up to 5MB
              </Typography>
            </>
          )}
        </Box>
      )}

      {error && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, color: 'error.main' }}>
          <AlertCircle size={14} />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {error}
          </Typography>
        </Box>
      )}

      {/* Cropping Dialog */}
      <Dialog
        open={cropDialogOpen}
        onClose={() => setCropDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: { borderRadius: 4, p: 1 }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, textAlign: 'center', pb: 1 }}>
          Crop Image (1:1)
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 2 }}>
          <Box
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
            sx={{
              width: 300,
              height: 300,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
              border: '2px solid',
              borderColor: 'divider',
              cursor: isDragging ? 'grabbing' : 'grab',
              backgroundColor: '#000',
              userSelect: 'none',
              touchAction: 'none',
              boxShadow: (theme) => theme.shadows[4],
            }}
          >
            {cropImageSrc && (
              <img
                src={cropImageSrc}
                alt="Crop preview"
                onLoad={handleImageLoad}
                style={{
                  position: 'absolute',
                  width: fitSize.width * zoom,
                  height: fitSize.height * zoom,
                  left: pan.x,
                  top: pan.y,
                  pointerEvents: 'none',
                  maxWidth: 'none',
                }}
              />
            )}
            {/* Circle Cutout Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
                border: '2px dashed rgba(255, 255, 255, 0.8)',
                boxShadow: '0 0 0 9999px rgba(30, 38, 53, 0.65)',
              }}
            />
          </Box>

          <Box sx={{ width: '80%', px: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5, display: 'block', textAlign: 'center' }}>
              Drag to Position • Slider to Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.01}
              onChange={handleZoomChange}
              aria-label="Zoom"
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
              sx={{
                color: 'primary.main',
                '& .MuiSlider-thumb': {
                  width: 20,
                  height: 20,
                  backgroundColor: '#fff',
                  border: '2px solid currentColor',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={() => setCropDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmCrop}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              px: 3,
            }}
          >
            Apply Crop
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
