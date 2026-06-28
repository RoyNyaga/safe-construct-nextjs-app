'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import {
  Box,
  IconButton,
  Tooltip,
  Paper,
  Divider,
  TextField,
  CircularProgress,
  Typography,
  alpha,
} from '@mui/material'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eraser,
  Link2Off,
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { compressImage } from '@/utils/image'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  locale?: string
}

export default function RichTextEditor({ value, onChange, locale = 'en' }: RichTextEditorProps) {
  const [isSourceMode, setIsSourceMode] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = useMemo(() => createClient(), [])

  // Sync external value with editor's innerHTML only if they differ
  useEffect(() => {
    if (editorRef.current && !isSourceMode) {
      const normalizedValue = value || '<p><br></p>'
      if (editorRef.current.innerHTML !== normalizedValue) {
        editorRef.current.innerHTML = normalizedValue
      }
    }
  }, [value, isSourceMode])

  const triggerChange = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      // Clean up empty elements
      const cleanHtml = html === '<p><br></p>' || html === '<p></p>' || html === '' ? '' : html
      onChange(cleanHtml)
    }
  }

  const handleInput = () => {
    triggerChange()
  }

  // Formatting helper
  const executeCommand = (command: string, arg: string = '') => {
    if (isSourceMode) return
    document.execCommand(command, false, arg)
    if (editorRef.current) {
      editorRef.current.focus()
    }
    triggerChange()
  }

  // Heading formatter helper
  const handleHeading = (tag: string) => {
    if (isSourceMode) return
    // Check selection formatting
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      executeCommand('formatBlock', tag)
    }
  }

  // Insert Link helper
  const handleCreateLink = () => {
    if (isSourceMode) return
    const url = prompt(locale === 'fr' ? 'Entrez l\'URL :' : 'Enter Link URL:')
    if (url) {
      executeCommand('createLink', url)
    }
  }

  // File Upload helper
  const uploadAndInsertImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError(locale === 'fr' ? 'Seules les images sont autorisées.' : 'Only image files are allowed.')
      return
    }

    setUploading(true)
    setUploadError(null)

    try {
      // Compress the image
      const compressedFile = await compressImage(file)

      // Random name
      const fileExt = compressedFile.type.split('/').pop() || 'jpg'
      const randomId = Math.random().toString(36).substring(2, 15)
      const fileName = `inline_${randomId}_${Date.now()}.${fileExt}`

      // Upload directly to Supabase storage 'blog-media' bucket
      const { error: uploadError } = await supabase.storage
        .from('blog-media')
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) throw uploadError

      // Retrieve public URL
      const { data } = supabase.storage.from('blog-media').getPublicUrl(fileName)
      if (!data?.publicUrl) throw new Error('Failed to retrieve public URL')

      // Focus the editor before inserting
      if (editorRef.current) {
        editorRef.current.focus()
      }

      // Insert image at selection
      executeCommand('insertImage', data.publicUrl)
    } catch (err: any) {
      console.error('Editor inline image upload failed:', err)
      setUploadError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  // Click handler to open file picker
  const handleImageClick = () => {
    if (isSourceMode) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await uploadAndInsertImage(file)
      // Reset input value to allow uploading same image again
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  // Handle Drag & Drop of Images
  const handleDrop = async (e: React.DragEvent) => {
    if (isSourceMode) return
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((f) => f.type.startsWith('image/'))
    if (imageFile) {
      await uploadAndInsertImage(imageFile)
    }
  }

  // Handle Pasting of Images
  const handlePaste = async (e: React.ClipboardEvent) => {
    if (isSourceMode) return
    const items = Array.from(e.clipboardData.items)
    const imageItem = items.find((item) => item.type.startsWith('image/'))
    if (imageItem) {
      e.preventDefault()
      const file = imageItem.getAsFile()
      if (file) {
        await uploadAndInsertImage(file)
      }
    }
  }

  const toggleSourceMode = () => {
    setIsSourceMode((prev) => !prev)
  }

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Editor Frame Container */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          overflow: 'hidden',
          '&:focus-within': {
            borderColor: 'primary.main',
          },
        }}
      >
        {/* Formatting Toolbar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 0.5,
            p: 1,
            backgroundColor: (theme) => alpha(theme.palette.divider, 0.25),
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Text decoration styles */}
          <Tooltip title={locale === 'fr' ? 'Gras' : 'Bold'}>
            <IconButton size="small" onClick={() => executeCommand('bold')} disabled={isSourceMode}>
              <Bold size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={locale === 'fr' ? 'Italique' : 'Italic'}>
            <IconButton size="small" onClick={() => executeCommand('italic')} disabled={isSourceMode}>
              <Italic size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={locale === 'fr' ? 'Souligné' : 'Underline'}>
            <IconButton size="small" onClick={() => executeCommand('underline')} disabled={isSourceMode}>
              <Underline size={16} />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.75 }} />

          {/* Heading levels */}
          <Tooltip title={locale === 'fr' ? 'Titre H2' : 'Heading 2'}>
            <IconButton size="small" onClick={() => handleHeading('<h2>')} disabled={isSourceMode}>
              <Heading2 size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={locale === 'fr' ? 'Titre H3' : 'Heading 3'}>
            <IconButton size="small" onClick={() => handleHeading('<h3>')} disabled={isSourceMode}>
              <Heading3 size={16} />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.75 }} />

          {/* Text alignment options */}
          <Tooltip title={locale === 'fr' ? 'Aligner à gauche' : 'Align Left'}>
            <IconButton size="small" onClick={() => executeCommand('justifyLeft')} disabled={isSourceMode}>
              <AlignLeft size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={locale === 'fr' ? 'Centrer' : 'Align Center'}>
            <IconButton size="small" onClick={() => executeCommand('justifyCenter')} disabled={isSourceMode}>
              <AlignCenter size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={locale === 'fr' ? 'Aligner à droite' : 'Align Right'}>
            <IconButton size="small" onClick={() => executeCommand('justifyRight')} disabled={isSourceMode}>
              <AlignRight size={16} />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.75 }} />

          {/* Formatting list elements */}
          <Tooltip title={locale === 'fr' ? 'Liste à puces' : 'Bullet List'}>
            <IconButton size="small" onClick={() => executeCommand('insertUnorderedList')} disabled={isSourceMode}>
              <List size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={locale === 'fr' ? 'Liste numérotée' : 'Numbered List'}>
            <IconButton size="small" onClick={() => executeCommand('insertOrderedList')} disabled={isSourceMode}>
              <ListOrdered size={16} />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.75 }} />

          {/* Links & media attachments */}
          <Tooltip title={locale === 'fr' ? 'Insérer un lien' : 'Insert Link'}>
            <IconButton size="small" onClick={handleCreateLink} disabled={isSourceMode}>
              <LinkIcon size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={locale === 'fr' ? 'Retirer le lien' : 'Unlink'}>
            <IconButton size="small" onClick={() => executeCommand('unlink')} disabled={isSourceMode}>
              <Link2Off size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={locale === 'fr' ? 'Insérer une image' : 'Insert Image'}>
            <IconButton size="small" onClick={handleImageClick} disabled={isSourceMode || uploading}>
              {uploading ? <CircularProgress size={16} color="inherit" /> : <ImageIcon size={16} />}
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.75 }} />

          {/* Clear formatting options */}
          <Tooltip title={locale === 'fr' ? 'Effacer le style' : 'Clear Formatting'}>
            <IconButton size="small" onClick={() => executeCommand('removeFormat')} disabled={isSourceMode}>
              <Eraser size={16} />
            </IconButton>
          </Tooltip>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <Tooltip title={locale === 'fr' ? 'Code Source HTML' : 'HTML Source Code'}>
              <IconButton
                size="small"
                onClick={toggleSourceMode}
                color={isSourceMode ? 'primary' : 'default'}
              >
                <Code size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Editor workspace */}
        {isSourceMode ? (
          <TextField
            fullWidth
            multiline
            rows={12}
            value={value}
            onChange={handleSourceChange}
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: true,
              },
            }}
            sx={{
              p: 2,
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              backgroundColor: '#0F172A',
              color: '#38BDF8',
              '& .MuiInputBase-root': {
                p: 0,
                color: 'inherit',
              },
            }}
          />
        ) : (
          <Box
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onPaste={handlePaste}
            sx={{
              p: 3,
              minHeight: 260,
              maxHeight: 500,
              overflowY: 'auto',
              outline: 'none',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: 'text.primary',
              '& p': {
                mb: 1.5,
              },
              '& h2': {
                fontSize: '1.4rem',
                fontWeight: 700,
                mt: 2.5,
                mb: 1.5,
                color: 'text.primary',
              },
              '& h3': {
                fontSize: '1.2rem',
                fontWeight: 700,
                mt: 2,
                mb: 1.25,
                color: 'text.primary',
              },
              '& ul, & ol': {
                pl: 3,
                mb: 2,
              },
              '& li': {
                mb: 0.5,
              },
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 2,
                my: 2,
                display: 'block',
              },
              '& a': {
                color: 'primary.light',
                textDecoration: 'underline',
              },
            }}
          />
        )}
      </Paper>

      {/* Hidden file input for uploading images */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {uploadError && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, px: 1 }}>
          {uploadError}
        </Typography>
      )}
    </Box>
  )
}
