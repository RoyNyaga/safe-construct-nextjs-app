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
} from '@mui/material'
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react'
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

    setUploading(true)
    setError(null)

    try {
      // Compress image client-side to optimize download speed and storage
      const compressedFile = await compressImage(file)

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
      // Reset input value so same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
    setError(null)
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
    </Box>
  )
}
