'use client'

import { useState, useTransition } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  alpha,
  Grid,
  Alert,
  Card,
  CardMedia,
  Divider,
} from '@mui/material'
import { Plus, Edit2, Trash2, Layers, DollarSign, Image as ImageIcon, Eye, Heart, X } from 'lucide-react'
import { useLocale } from 'next-intl'
import { DeletePromptButton, ImageUpload } from '@/components/ui'
import {
  createCatalogueItem,
  updateCatalogueItem,
  deleteCatalogueItem,
} from '@/app/[locale]/actions/admin'

interface CostItem {
  id?: string
  label: string
  label_fr?: string | null
  labelFr?: string
  cost: number | string
}

interface GalleryImage {
  id?: string
  image_url?: string
  imageUrl?: string
  caption?: string | null
}

interface Catalogue {
  id: string
  title: string
  title_fr: string | null
  slug: string
  description: string | null
  description_fr: string | null
  style: string
  design_style_origin: string
  size_sqm: number | string
  bedrooms: number
  bathrooms: number
  floors: number
  total_cost: number | string
  currency: string
  main_image_url: string
  is_featured: boolean
  is_published: boolean
  view_count?: number
  like_count?: number
  cost_items?: CostItem[]
  images?: GalleryImage[]
}

interface CataloguesClientProps {
  locale: string
  catalogues: Catalogue[]
}

const DEFAULT_FORM = {
  title: '',
  titleFr: '',
  slug: '',
  description: '',
  descriptionFr: '',
  style: 'bungalow',
  designStyleOrigin: 'africa',
  sizeSqm: 120,
  bedrooms: 3,
  bathrooms: 2,
  floors: 1,
  mainImageUrl: '',
  isFeatured: false,
  isPublished: false,
}

export default function CataloguesClient({
  locale,
  catalogues: initialCatalogues,
}: CataloguesClientProps) {
  const [catalogues, setCatalogues] = useState<Catalogue[]>(initialCatalogues)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false)
  const [editItemId, setEditItemId] = useState<string | null>(null)
  const [formValues, setFormValues] = useState(DEFAULT_FORM)

  // Preview Dialog State
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false)
  const [previewItem, setPreviewItem] = useState<Catalogue | null>(null)

  // Sub-items states
  const [costItems, setCostItems] = useState<CostItem[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  const handleOpenPreview = (item: Catalogue) => {
    setPreviewItem(item)
    setOpenPreviewDialog(true)
  }

  const handleClosePreview = () => {
    setPreviewItem(null)
    setOpenPreviewDialog(false)
  }

  const handleOpenCreate = () => {
    setEditItemId(null)
    setFormValues(DEFAULT_FORM)
    setCostItems([])
    setGalleryImages([])
    setError(null)
    setOpenDialog(true)
  }

  const handleOpenEdit = (item: Catalogue) => {
    setEditItemId(item.id)
    setFormValues({
      title: item.title,
      titleFr: item.title_fr || '',
      slug: item.slug,
      description: item.description || '',
      descriptionFr: item.description_fr || '',
      style: item.style,
      designStyleOrigin: item.design_style_origin,
      sizeSqm: Number(item.size_sqm) || 120,
      bedrooms: item.bedrooms || 3,
      bathrooms: item.bathrooms || 2,
      floors: item.floors || 1,
      mainImageUrl: item.main_image_url,
      isFeatured: item.is_featured,
      isPublished: item.is_published,
    })

    // Map nested relations cleanly
    const mappedCosts = (item.cost_items || []).map((c) => ({
      id: c.id,
      label: c.label,
      labelFr: c.label_fr || '',
      cost: Number(c.cost),
    }))
    setCostItems(mappedCosts)

    const mappedImages = (item.images || []).map((img) => ({
      id: img.id,
      imageUrl: img.image_url || img.imageUrl || '',
      caption: img.caption || '',
    }))
    setGalleryImages(mappedImages)

    setError(null)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleFormChange = (key: string, value: any) => {
    setFormValues((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'title' && !editItemId) {
        next.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      }
      return next
    })
  }

  // Cost items manipulation
  const handleAddCostItem = () => {
    setCostItems((prev) => [...prev, { label: '', labelFr: '', cost: 0 }])
  }

  const handleCostItemChange = (idx: number, field: string, value: any) => {
    setCostItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    )
  }

  const handleRemoveCostItem = (idx: number) => {
    setCostItems((prev) => prev.filter((_, i) => i !== idx))
  }

  // Gallery manipulation
  const handleAddGalleryImage = () => {
    setGalleryImages((prev) => [...prev, { imageUrl: '', caption: '' }])
  }

  const handleGalleryChange = (idx: number, field: string, value: any) => {
    setGalleryImages((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    )
  }

  const handleRemoveGalleryImage = (idx: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== idx))
  }

  // Submit operations
  const handleSaveItem = async () => {
    setError(null)
    if (!formValues.title.trim() || !formValues.slug.trim() || !formValues.mainImageUrl.trim()) {
      setError(locale === 'fr' ? 'Le titre, le slug et la photo principale sont obligatoires.' : 'Title, Slug, and Main Image URL are required.')
      return
    }

    // Verify all cost items have labels & costs
    const invalidCost = costItems.some((c) => !c.label.trim() || isNaN(Number(c.cost)))
    if (invalidCost) {
      setError(locale === 'fr' ? 'Tous les coûts doivent avoir un libellé et un montant valide.' : 'All cost items must have a label and a valid cost amount.')
      return
    }

    // Verify gallery images have URLs
    const invalidImage = galleryImages.some((img) => !img.imageUrl?.trim())
    if (invalidImage) {
      setError(locale === 'fr' ? "Toutes les photos de la galerie doivent avoir une URL valide." : 'All gallery images must have a valid URL.')
      return
    }

    startTransition(async () => {
      let res
      if (editItemId) {
        res = await updateCatalogueItem(editItemId, formValues, costItems, galleryImages)
      } else {
        res = await createCatalogueItem(formValues, costItems, galleryImages)
      }

      if (res.error) {
        setError(res.error)
      } else {
        // Sync lists locally for fast visual updates
        const newTotalCost = costItems.reduce((acc, c) => acc + Number(c.cost), 0)
        const updatedItemsList = catalogues.map((item) => {
          if (item.id === editItemId) {
            return {
              ...item,
              title: formValues.title,
              title_fr: formValues.titleFr || null,
              slug: formValues.slug,
              description: formValues.description || null,
              description_fr: formValues.descriptionFr || null,
              style: formValues.style,
              design_style_origin: formValues.designStyleOrigin,
              size_sqm: formValues.sizeSqm,
              bedrooms: formValues.bedrooms,
              bathrooms: formValues.bathrooms,
              floors: formValues.floors,
              main_image_url: formValues.mainImageUrl,
              is_featured: formValues.isFeatured,
              is_published: formValues.isPublished,
              total_cost: newTotalCost,
              cost_items: costItems.map((c) => ({ label: c.label, label_fr: c.labelFr || null, cost: c.cost })),
              images: galleryImages.map((img) => ({ image_url: img.imageUrl, caption: img.caption })),
            }
          }
          return item
        })

        if (editItemId) {
          setCatalogues(updatedItemsList)
        } else {
          const createRes = res as { success: boolean; item: Catalogue }
          if (createRes.item) {
            setCatalogues((prev) => [
              {
                ...createRes.item,
                total_cost: newTotalCost,
                cost_items: costItems,
                images: galleryImages,
              } as Catalogue,
              ...prev,
            ])
          }
        }
        setOpenDialog(false)
      }
    })
  }

  const handleDeleteItem = async (id: string) => {
    const res = await deleteCatalogueItem(id)
    if (!res.error) {
      setCatalogues((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const formatCurrency = (val: number | string) => {
    return Number(val).toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US') + ' XAF'
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Header controls strip */}
      <Paper elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: 'background.paper', borderRadius: 3, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', p: 1.5 }}>
        <Typography variant="h6" sx={{ pl: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Layers size={20} color="#F26419" />
          {locale === 'fr' ? 'Gestion des Modèles d\'Architecture' : 'Architectural Plan Catalogues'}
        </Typography>

        <Button
          id="admin-create-catalogue-btn"
          variant="contained"
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={handleOpenCreate}
          sx={{
            background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
            mr: 2,
          }}
        >
          {locale === 'fr' ? 'Ajouter un Modèle' : 'Add Design Plan'}
        </Button>
      </Paper>

      {/* Catalogue Table Grid */}
      <TableContainer component={Paper} elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper' }}>
        <Table id="catalogues-table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Modèle' : 'Model'}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Style / Origin</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Superficie' : 'Size (sqm)'}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Layout</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Coût Estimé' : 'Estimated Cost'}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Stats</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {catalogues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  {locale === 'fr' ? 'Aucun plan dans le catalogue.' : 'No design plans in catalogue.'}
                </TableCell>
              </TableRow>
            ) : (
              catalogues.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Card sx={{ width: 64, height: 44, flexShrink: 0, borderRadius: 1.5, border: 'none', '&:hover': { transform: 'none' } }}>
                      <CardMedia component="img" image={item.main_image_url} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Card>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                      {item.title_fr && <Typography variant="caption" color="text.secondary">FR: {item.title_fr}</Typography>}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{item.style}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>Origin: {item.design_style_origin}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{item.size_sqm} m²</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>
                    {item.bedrooms} Bed / {item.bathrooms} Bath / {item.floors} Fl
                  </TableCell>
                  <TableCell sx={{ color: 'secondary.main', fontWeight: 700 }}>
                    {formatCurrency(item.total_cost)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary' }} title={locale === 'fr' ? 'Vues' : 'Views'}>
                        <Eye size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {item.view_count ?? 0}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'error.main' }} title={locale === 'fr' ? 'Mentions J\'aime' : 'Likes'}>
                        <Heart size={14} fill="currentColor" />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {item.like_count ?? 0}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <Chip
                        label={item.is_published ? 'Published' : 'Draft'}
                        size="small"
                        color={item.is_published ? 'success' : 'warning'}
                        sx={{ fontSize: '0.65rem', height: 18, fontWeight: 600 }}
                      />
                      {item.is_featured && (
                        <Chip
                          label="Featured"
                          size="small"
                          color="secondary"
                          sx={{ fontSize: '0.65rem', height: 18, fontWeight: 600 }}
                        />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                      <IconButton
                        id={`preview-catalogue-btn-${item.id}`}
                        size="small"
                        onClick={() => handleOpenPreview(item)}
                        title={locale === 'fr' ? 'Aperçu' : 'Preview Plan'}
                      >
                        <Eye size={16} />
                      </IconButton>
                      <IconButton
                        id={`edit-catalogue-btn-${item.id}`}
                        size="small"
                        onClick={() => handleOpenEdit(item)}
                        title="Edit Plan"
                      >
                        <Edit2 size={16} />
                      </IconButton>
                      <DeleteItemPrompt
                        id={`delete-catalogue-btn-${item.id}`}
                        itemName={item.title}
                        onDelete={() => handleDeleteItem(item.id)}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* CREATE/EDIT CATALOGUE DIALOG */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        id="catalogue-crud-modal"
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          {editItemId ? (locale === 'fr' ? 'Modifier le Plan' : 'Edit Design Plan') : (locale === 'fr' ? 'Créer un Nouveau Plan' : 'Create New Design Plan')}
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              {/* Titles */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="catalogue-form-title"
                  label={locale === 'fr' ? 'Titre (Anglais)' : 'Title (English)'}
                  value={formValues.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="catalogue-form-title-fr"
                  label={locale === 'fr' ? 'Titre (Français)' : 'Title (French)'}
                  value={formValues.titleFr}
                  onChange={(e) => handleFormChange('titleFr', e.target.value)}
                  fullWidth
                />
              </Grid>

              {/* Slugs and Main image URL */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="catalogue-form-slug"
                  label="Slug"
                  value={formValues.slug}
                  onChange={(e) => handleFormChange('slug', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ImageUpload
                  bucket="catalogue-media"
                  value={formValues.mainImageUrl}
                  onChange={(url) => handleFormChange('mainImageUrl', url)}
                  label={locale === 'fr' ? 'Photo Principale' : 'Cover Photo'}
                />
              </Grid>

              {/* Enums */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="catalogue-style-label">Style</InputLabel>
                  <Select
                    labelId="catalogue-style-label"
                    id="catalogue-form-style"
                    value={formValues.style}
                    label="Style"
                    onChange={(e) => handleFormChange('style', e.target.value)}
                  >
                    <MenuItem value="bungalow">Bungalow</MenuItem>
                    <MenuItem value="duplex">Duplex</MenuItem>
                    <MenuItem value="villa">Villa</MenuItem>
                    <MenuItem value="apartment">Apartment</MenuItem>
                    <MenuItem value="commercial">Commercial</MenuItem>
                    <MenuItem value="townhouse">Townhouse</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="catalogue-origin-label">Design Origin</InputLabel>
                  <Select
                    labelId="catalogue-origin-label"
                    id="catalogue-form-origin"
                    value={formValues.designStyleOrigin}
                    label="Design Origin"
                    onChange={(e) => handleFormChange('designStyleOrigin', e.target.value)}
                  >
                    <MenuItem value="africa">Africa</MenuItem>
                    <MenuItem value="europe">Europe</MenuItem>
                    <MenuItem value="america">America</MenuItem>
                    <MenuItem value="canada">Canada</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Layout numbers */}
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <TextField
                  id="catalogue-form-size"
                  label="Size (sqm)"
                  type="number"
                  value={formValues.sizeSqm}
                  onChange={(e) => handleFormChange('sizeSqm', Math.max(10, parseFloat(e.target.value) || 0))}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 1.3 }}>
                <TextField
                  id="catalogue-form-bedrooms"
                  label="Beds"
                  type="number"
                  value={formValues.bedrooms}
                  onChange={(e) => handleFormChange('bedrooms', Math.max(0, parseInt(e.target.value) || 0))}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 1.3 }}>
                <TextField
                  id="catalogue-form-bathrooms"
                  label="Baths"
                  type="number"
                  value={formValues.bathrooms}
                  onChange={(e) => handleFormChange('bathrooms', Math.max(0, parseInt(e.target.value) || 0))}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 1.4 }}>
                <TextField
                  id="catalogue-form-floors"
                  label="Floors"
                  type="number"
                  value={formValues.floors}
                  onChange={(e) => handleFormChange('floors', Math.max(1, parseInt(e.target.value) || 1))}
                  fullWidth
                />
              </Grid>

              {/* Descriptions */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="catalogue-form-desc"
                  label={locale === 'fr' ? 'Description (Anglais)' : 'Description (English)'}
                  value={formValues.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="catalogue-form-desc-fr"
                  label={locale === 'fr' ? 'Description (Français)' : 'Description (French)'}
                  value={formValues.descriptionFr}
                  onChange={(e) => handleFormChange('descriptionFr', e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>

              {/* Flags */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="catalogue-form-featured"
                      checked={formValues.isFeatured}
                      onChange={(e) => handleFormChange('isFeatured', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={locale === 'fr' ? 'Mettre en vedette' : 'Pin to Homepage Featured'}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="catalogue-form-published"
                      checked={formValues.isPublished}
                      onChange={(e) => handleFormChange('isPublished', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={locale === 'fr' ? 'Publier le plan' : 'Publish Plan'}
                />
              </Grid>

              {/* SUB-MODULE: ESTIMATED COST BREAKDOWN */}
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
                    <DollarSign size={18} color="#F26419" />
                    {locale === 'fr' ? 'Détail Estimatif des Coûts' : 'Itemized Cost Breakdowns'}
                  </Typography>
                  <Button
                    id="catalogue-add-cost-item-btn"
                    variant="outlined"
                    size="small"
                    startIcon={<Plus size={14} />}
                    onClick={handleAddCostItem}
                  >
                    {locale === 'fr' ? 'Ajouter un Poste' : 'Add Cost Line'}
                  </Button>
                </Stack>

                {costItems.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', pl: 1 }}>
                    {locale === 'fr' ? 'Aucun coût spécifié. Le total sera de 0 XAF.' : 'No cost lines specified. Total estimated cost will be 0 XAF.'}
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {costItems.map((item, idx) => (
                      <Grid container spacing={2} sx={{ alignItems: 'center' }} key={idx}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <TextField
                            id={`cost-item-label-${idx}`}
                            label={locale === 'fr' ? 'Libellé (EN)' : 'Label (EN)'}
                            value={item.label}
                            onChange={(e) => handleCostItemChange(idx, 'label', e.target.value)}
                            size="small"
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <TextField
                            id={`cost-item-labelfr-${idx}`}
                            label={locale === 'fr' ? 'Libellé (FR)' : 'Label (FR)'}
                            value={item.labelFr}
                            onChange={(e) => handleCostItemChange(idx, 'labelFr', e.target.value)}
                            size="small"
                            fullWidth
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                          <TextField
                            id={`cost-item-amount-${idx}`}
                            label={locale === 'fr' ? 'Montant (XAF)' : 'Amount (XAF)'}
                            type="number"
                            value={item.cost}
                            onChange={(e) => handleCostItemChange(idx, 'cost', parseFloat(e.target.value) || 0)}
                            size="small"
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 1 }} sx={{ alignSelf: 'center' }}>
                          <IconButton
                            id={`remove-cost-item-${idx}`}
                            color="error"
                            size="small"
                            onClick={() => handleRemoveCostItem(idx)}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </Stack>
                )}
              </Grid>

              {/* SUB-MODULE: GALLERY IMAGES */}
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
                    <ImageIcon size={18} color="#F6AE2D" />
                    {locale === 'fr' ? 'Galerie d\'Images' : 'Gallery Images'}
                  </Typography>
                  <Button
                    id="catalogue-add-gallery-btn"
                    variant="outlined"
                    size="small"
                    startIcon={<Plus size={14} />}
                    onClick={handleAddGalleryImage}
                  >
                    {locale === 'fr' ? 'Ajouter une Image' : 'Add Gallery Image'}
                  </Button>
                </Stack>

                {galleryImages.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', pl: 1 }}>
                    {locale === 'fr' ? 'Aucune image secondaire dans la galerie.' : 'No secondary gallery images specified.'}
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {galleryImages.map((img, idx) => (
                      <Grid container spacing={2} sx={{ alignItems: 'center' }} key={idx}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <ImageUpload
                            bucket="catalogue-media"
                            value={img.imageUrl || ''}
                            onChange={(url) => handleGalleryChange(idx, 'imageUrl', url)}
                            label={locale === 'fr' ? `Photo de Galerie #${idx + 1}` : `Gallery Image #${idx + 1}`}
                            maxHeight={140}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 5 }}>
                          <TextField
                            id={`gallery-caption-${idx}`}
                            label="Caption"
                            value={img.caption}
                            onChange={(e) => handleGalleryChange(idx, 'caption', e.target.value)}
                            size="small"
                            fullWidth
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 1 }} sx={{ alignSelf: 'center' }}>
                          <IconButton
                            id={`remove-gallery-img-${idx}`}
                            color="error"
                            size="small"
                            onClick={() => handleRemoveGalleryImage(idx)}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 4, py: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Button id="catalogue-dialog-cancel" variant="outlined" onClick={handleCloseDialog} disabled={isPending}>
            Cancel
          </Button>
          <Button
            id="catalogue-dialog-save"
            variant="contained"
            onClick={handleSaveItem}
            disabled={isPending}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* PREVIEW CATALOGUE DIALOG */}
      <Dialog
        open={openPreviewDialog}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
        id="catalogue-preview-modal"
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: (theme) => `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {previewItem ? (locale === 'fr' ? (previewItem.title_fr || previewItem.title) : previewItem.title) : ''}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Slug: {previewItem?.slug}
            </Typography>
          </Box>
          <IconButton onClick={handleClosePreview} size="small">
            <X size={18} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {previewItem && (
            <Stack spacing={3} sx={{ mt: 1 }}>
              {/* Cover Photo */}
              <Card sx={{ position: 'relative', width: '100%', height: 320, borderRadius: 3, overflow: 'hidden', boxShadow: 'none', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                <CardMedia
                  component="img"
                  image={previewItem.main_image_url}
                  alt={previewItem.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Views / Likes overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    backgroundColor: 'rgba(18, 24, 36, 0.85)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    display: 'flex',
                    gap: 2,
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }} title={locale === 'fr' ? 'Vues' : 'Views'}>
                    <Eye size={16} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{previewItem.view_count ?? 0}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: '#ff4d4f' }} title={locale === 'fr' ? 'Mentions J\'aime' : 'Likes'}>
                    <Heart size={16} fill="currentColor" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{previewItem.like_count ?? 0}</Typography>
                  </Stack>
                </Box>
              </Card>

              {/* Specifications Grid */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'background.default' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Style</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'capitalize', color: 'text.primary' }}>{previewItem.style}</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'background.default' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Origin</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'capitalize', color: 'text.primary' }}>{previewItem.design_style_origin}</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'background.default' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{locale === 'fr' ? 'Superficie' : 'Size'}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>{previewItem.size_sqm} m²</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'background.default' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Bed / Bath / Floors</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>{previewItem.bedrooms} / {previewItem.bathrooms} / {previewItem.floors}</Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Status & Pricing */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: 2, display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Status:</Typography>
                    <Chip
                      label={previewItem.is_published ? 'Published' : 'Draft'}
                      color={previewItem.is_published ? 'success' : 'warning'}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    {previewItem.is_featured && (
                      <Chip
                        label="Featured"
                        color="secondary"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: 'primary.main', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04) }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {locale === 'fr' ? 'Coût Estimé:' : 'Estimated Cost:'}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
                      {formatCurrency(previewItem.total_cost)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Descriptions */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>
                  {locale === 'fr' ? 'Description' : 'Description'}
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>English</Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: 'text.primary' }}>
                        {previewItem.description || 'No English description provided.'}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>French</Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: 'text.primary' }}>
                        {previewItem.description_fr || 'Aucune description en français.'}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              {/* Cost Breakdown */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>
                  {locale === 'fr' ? 'Détail Estimatif des Coûts' : 'Cost Breakdowns'}
                </Typography>
                {!previewItem.cost_items || previewItem.cost_items.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', pl: 1 }}>
                    No cost breakdown specified.
                  </Typography>
                ) : (
                  <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Libellé (EN)' : 'Label (EN)'}</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Libellé (FR)' : 'Label (FR)'}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {previewItem.cost_items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.label}</TableCell>
                            <TableCell>{item.label_fr || item.labelFr || '-'}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.main' }}>{formatCurrency(item.cost)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>

              {/* Image Gallery */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>
                  {locale === 'fr' ? 'Galerie d\'Images' : 'Gallery Images'}
                </Typography>
                {!previewItem.images || previewItem.images.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', pl: 1 }}>
                    No secondary gallery images.
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {previewItem.images.map((img, index) => (
                      <Grid size={{ xs: 12, sm: 4 }} key={index}>
                        <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                          <CardMedia
                            component="img"
                            image={img.image_url || img.imageUrl}
                            alt={`Gallery ${index}`}
                            sx={{ height: 140, objectFit: 'cover' }}
                          />
                          {img.caption && (
                            <Box sx={{ p: 1, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{img.caption}</Typography>
                            </Box>
                          )}
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 4, py: 2, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Button id="preview-dialog-close" variant="outlined" onClick={handleClosePreview}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

function DeleteItemPrompt({ id, itemName, onDelete }: { id: string; itemName: string; onDelete: () => void }) {
  const [loading, setLoading] = useState(false)
  const handlePerformDelete = async () => {
    setLoading(true)
    await onDelete()
    setLoading(false)
  }
  return (
    <DeletePromptButton
      id={id}
      itemName={itemName}
      loading={loading}
      onDelete={handlePerformDelete}
      size="small"
    />
  )
}
