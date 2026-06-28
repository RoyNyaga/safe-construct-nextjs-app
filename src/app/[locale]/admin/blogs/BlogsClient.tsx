'use client'

import { useState, useTransition } from 'react'
import {
  Box,
  Tabs,
  Tab,
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
} from '@mui/material'
import { Plus, Edit2, Check, X, BookOpen, MessageSquare, AlertCircle, Eye } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { DeletePromptButton, ImageUpload, RichTextEditor } from '@/components/ui'
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  moderateComment,
  createBlogTag,
  updateBlogTag,
  deleteBlogTag,
} from '@/app/[locale]/actions/admin'

interface Blog {
  id: string
  title: string
  title_fr: string | null
  slug: string
  excerpt: string | null
  excerpt_fr: string | null
  body: string
  body_fr: string | null
  header_photo_url: string | null
  status: 'draft' | 'published' | 'archived'
  is_pinned: boolean
  read_time_minutes: number | null
  view_count: number
  like_count: number
  comment_count: number
  author?: {
    full_name: string | null
  }
}

interface Tag {
  id: string
  name: string
  name_fr: string | null
  slug: string
}

interface Comment {
  id: string
  blog_id: string
  author_name: string
  author_email: string | null
  body: string
  is_approved: boolean
  created_at: string
  blog?: {
    title: string
    title_fr: string | null
  }
}

interface Assignment {
  blog_id: string
  tag_id: string
}

interface BlogsClientProps {
  locale: string
  blogs: Blog[]
  tags: Tag[]
  comments: Comment[]
  assignments: Assignment[]
}

const DEFAULT_FORM = {
  title: '',
  titleFr: '',
  slug: '',
  excerpt: '',
  excerptFr: '',
  body: '',
  bodyFr: '',
  headerPhotoUrl: '',
  readTimeMinutes: 5,
  status: 'draft' as 'draft' | 'published',
  isPinned: false,
}

export default function BlogsClient({
  locale,
  blogs: initialBlogs,
  tags,
  comments: initialComments,
  assignments: initialAssignments,
}: BlogsClientProps) {
  const t = useTranslations('Blog')
  const tc = useTranslations('Common')
  const [tabValue, setTabValue] = useState(0)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Local state
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments)
  const [tagsState, setTagsState] = useState<Tag[]>(tags)

  // Tags Dialog State
  const [openTagDialog, setOpenTagDialog] = useState(false)
  const [editTagId, setEditTagId] = useState<string | null>(null)
  const [tagFormValues, setTagFormValues] = useState({ name: '', nameFr: '', slug: '' })

  const handleOpenCreateTag = () => {
    setEditTagId(null)
    setTagFormValues({ name: '', nameFr: '', slug: '' })
    setError(null)
    setOpenTagDialog(true)
  }

  const handleOpenEditTag = (tag: Tag) => {
    setEditTagId(tag.id)
    setTagFormValues({
      name: tag.name,
      nameFr: tag.name_fr || '',
      slug: tag.slug,
    })
    setError(null)
    setOpenTagDialog(true)
  }

  const handleCloseTagDialog = () => {
    setOpenTagDialog(false)
  }

  const handleTagFormChange = (key: string, value: any) => {
    setTagFormValues((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'name') {
        next.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      }
      return next
    })
  }

  const handleSaveTag = async () => {
    setError(null)
    if (!tagFormValues.name.trim() || !tagFormValues.slug.trim()) {
      setError(locale === 'fr' ? 'Le nom (EN) et le slug sont obligatoires.' : 'Name (EN) and Slug are required.')
      return
    }

    startTransition(async () => {
      let res
      if (editTagId) {
        res = await updateBlogTag(editTagId, tagFormValues)
      } else {
        res = await createBlogTag(tagFormValues)
      }

      if (res.error) {
        setError(res.error)
      } else {
        if (editTagId) {
          setTagsState((prev) =>
            prev.map((t) =>
              t.id === editTagId
                ? {
                    ...t,
                    name: tagFormValues.name,
                    name_fr: tagFormValues.nameFr || null,
                    slug: tagFormValues.slug,
                  }
                : t
            )
          )
        } else {
          const createRes = res as { success: boolean; tag: Tag }
          if (createRes.tag) {
            setTagsState((prev) => [...prev, createRes.tag])
          }
        }
        setOpenTagDialog(false)
      }
    })
  }

  const handleDeleteTag = async (id: string) => {
    const res = await deleteBlogTag(id)
    if (!res.error) {
      setTagsState((prev) => prev.filter((t) => t.id !== id))
    } else {
      setError(res.error)
    }
  }

  // Dialog State
  const [openDialog, setOpenDialog] = useState(false)
  const [editPostId, setEditPostId] = useState<string | null>(null)
  const [formValues, setFormValues] = useState(DEFAULT_FORM)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleOpenCreate = () => {
    setEditPostId(null)
    setFormValues(DEFAULT_FORM)
    setSelectedTags([])
    setError(null)
    setOpenDialog(true)
  }

  const handleOpenEdit = (post: Blog) => {
    setEditPostId(post.id)
    setFormValues({
      title: post.title,
      titleFr: post.title_fr || '',
      slug: post.slug,
      excerpt: post.excerpt || '',
      excerptFr: post.excerpt_fr || '',
      body: post.body,
      bodyFr: post.body_fr || '',
      headerPhotoUrl: post.header_photo_url || '',
      readTimeMinutes: post.read_time_minutes || 5,
      status: post.status === 'published' ? 'published' : 'draft',
      isPinned: post.is_pinned,
    })

    // Get assigned tags
    const assignedTagIds = assignments
      .filter((a) => a.blog_id === post.id)
      .map((a) => a.tag_id)
    setSelectedTags(assignedTagIds)

    setError(null)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleFormChange = (key: string, value: any) => {
    setFormValues((prev) => {
      const next = { ...prev, [key]: value }
      // Auto generate/update slug from English title
      if (key === 'title') {
        next.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      }
      return next
    })
  }

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  const handleSavePost = async () => {
    setError(null)
    if (!formValues.title.trim() || !formValues.slug.trim() || !formValues.body.trim()) {
      setError(locale === 'fr' ? 'Le titre (EN), le slug et le contenu (EN) sont obligatoires.' : 'Title (EN), Slug, and Body (EN) are required.')
      return
    }

    startTransition(async () => {
      let res
      if (editPostId) {
        res = await updateBlogPost(editPostId, formValues, selectedTags)
      } else {
        res = await createBlogPost(formValues, selectedTags)
      }

      if (res.error) {
        setError(res.error)
      } else {
        // Sync lists locally or reload page data (we can just update state for fast feedback)
        if (editPostId) {
          setBlogs((prev) =>
            prev.map((b) =>
              b.id === editPostId
                ? {
                    ...b,
                    title: formValues.title,
                    title_fr: formValues.titleFr || null,
                    slug: formValues.slug,
                    excerpt: formValues.excerpt || null,
                    excerpt_fr: formValues.excerptFr || null,
                    body: formValues.body,
                    body_fr: formValues.bodyFr || null,
                    header_photo_url: formValues.headerPhotoUrl || null,
                    status: formValues.status,
                    is_pinned: formValues.isPinned,
                    read_time_minutes: formValues.readTimeMinutes,
                  }
                : b
            )
          )
          // Update assignments
          setAssignments((prev) => [
            ...prev.filter((a) => a.blog_id !== editPostId),
            ...selectedTags.map((tid) => ({ blog_id: editPostId, tag_id: tid })),
          ])
        } else {
          const createRes = res as { success: boolean; post: Blog }
          if (createRes.post) {
            setBlogs((prev) => [createRes.post, ...prev])
            setAssignments((prev) => [
              ...prev,
              ...selectedTags.map((tid) => ({ blog_id: createRes.post.id, tag_id: tid })),
            ])
          }
        }
        setOpenDialog(false)
      }
    })
  }

  const handleDeletePost = async (id: string) => {
    const res = await deleteBlogPost(id)
    if (!res.error) {
      setBlogs((prev) => prev.filter((b) => b.id !== id))
    }
  }

  const handleCommentAction = async (id: string, action: 'approve' | 'unapprove' | 'delete') => {
    const res = await moderateComment(id, action)
    if (!res.error) {
      if (action === 'delete') {
        setComments((prev) => prev.filter((c) => c.id !== id))
      } else {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, is_approved: action === 'approve' } : c))
        )
      }
    }
  }

  const getStatusColor = (status: string) => {
    if (status === 'published') return 'success'
    if (status === 'draft') return 'warning'
    return 'default'
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Tab Control header */}
      <Paper elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: 'background.paper', borderRadius: 3, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', p: 1.5 }}>
        <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label={locale === 'fr' ? 'Articles de Blog' : 'Blog Articles'} id="blogs-tab-0" />
          <Tab label={locale === 'fr' ? 'Modération Commentaires' : 'Comment Moderation'} id="blogs-tab-1" />
          <Tab label={locale === 'fr' ? 'Étiquettes' : 'Tags'} id="blogs-tab-2" />
        </Tabs>

        {tabValue === 0 && (
          <Button
            id="admin-create-blog-btn"
            variant="contained"
            color="primary"
            startIcon={<Plus size={16} />}
            onClick={handleOpenCreate}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              mr: 2,
            }}
          >
            {locale === 'fr' ? 'Nouvel Article' : 'New Article'}
          </Button>
        )}
        {tabValue === 2 && (
          <Button
            id="admin-create-tag-btn"
            variant="contained"
            color="primary"
            startIcon={<Plus size={16} />}
            onClick={handleOpenCreateTag}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              mr: 2,
            }}
          >
            {locale === 'fr' ? 'Nouvelle Étiquette' : 'New Tag'}
          </Button>
        )}
      </Paper>

      {/* TAB 0: BLOG POSTS LIST */}
      {tabValue === 0 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper' }}>
          <Table id="blogs-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Titre' : 'Title'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Slug</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Vues / Likes' : 'Views / Likes'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Commentaires' : 'Comments'}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    {locale === 'fr' ? 'Aucun article rédigé.' : 'No articles found.'}
                  </TableCell>
                </TableRow>
              ) : (
                blogs.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>{post.title}</Typography>
                      {post.title_fr && <Typography variant="caption" color="text.secondary">FR: {post.title_fr}</Typography>}
                      {post.is_pinned && <Chip label="PINNED" size="small" color="secondary" sx={{ height: 16, fontSize: '0.6rem', ml: 1, fontWeight: 800 }} />}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>{post.slug}</TableCell>
                    <TableCell>
                      <Chip
                        label={post.status.toUpperCase()}
                        size="small"
                        color={getStatusColor(post.status)}
                        sx={{ fontSize: '0.7rem', fontWeight: 600, height: 20 }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>
                      {post.view_count} views / {post.like_count} likes
                    </TableCell>
                    <TableCell>{post.comment_count}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                        <IconButton
                          id={`preview-blog-btn-${post.id}`}
                          size="small"
                          component={Link}
                          href={`/${locale}/blog/${post.slug}?preview=true`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={locale === 'fr' ? 'Aperçu de l\'article' : 'Preview Post'}
                        >
                          <Eye size={16} />
                        </IconButton>
                        <IconButton
                          id={`edit-blog-btn-${post.id}`}
                          size="small"
                          onClick={() => handleOpenEdit(post)}
                          title="Edit Post"
                        >
                          <Edit2 size={16} />
                        </IconButton>
                        <DeletePromptButton
                          id={`delete-blog-btn-${post.id}`}
                          itemName={post.title}
                          onDelete={() => handleDeletePost(post.id)}
                          size="small"
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* TAB 1: COMMENTS MODERATION */}
      {tabValue === 1 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper' }}>
          <Table id="blog-comments-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Auteur' : 'Author'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Article' : 'Article'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Commentaire</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    {locale === 'fr' ? 'Aucun commentaire.' : 'No comments found.'}
                  </TableCell>
                </TableRow>
              ) : (
                comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>{comment.author_name}</Typography>
                      {comment.author_email && <Typography variant="caption" color="text.secondary">{comment.author_email}</Typography>}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {comment.blog ? (locale === 'fr' && comment.blog.title_fr ? comment.blog.title_fr : comment.blog.title) : 'N/A'}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300, fontSize: '0.85rem', color: 'text.secondary' }}>
                      {comment.body}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={comment.is_approved ? 'Approved' : 'Pending'}
                        size="small"
                        color={comment.is_approved ? 'success' : 'error'}
                        sx={{ fontSize: '0.7rem', fontWeight: 600, height: 20 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                        {comment.is_approved ? (
                          <IconButton
                            id={`unapprove-comment-btn-${comment.id}`}
                            size="small"
                            color="warning"
                            onClick={() => handleCommentAction(comment.id, 'unapprove')}
                            title="Unapprove Comment"
                          >
                            <X size={16} />
                          </IconButton>
                        ) : (
                          <IconButton
                            id={`approve-comment-btn-${comment.id}`}
                            size="small"
                            color="success"
                            onClick={() => handleCommentAction(comment.id, 'approve')}
                            title="Approve Comment"
                          >
                            <Check size={16} />
                          </IconButton>
                        )}
                        <DeletePromptButton
                          id={`delete-comment-btn-${comment.id}`}
                          itemName={`Comment by ${comment.author_name}`}
                          onDelete={() => handleCommentAction(comment.id, 'delete')}
                          size="small"
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* TAB 2: TAGS MANAGEMENT */}
      {tabValue === 2 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper' }}>
          <Table id="blog-tags-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Nom' : 'Name'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Slug</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Articles Associés' : 'Associated Articles'}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tagsState.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    {locale === 'fr' ? 'Aucune étiquette.' : 'No tags found.'}
                  </TableCell>
                </TableRow>
              ) : (
                tagsState.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>{tag.name}</Typography>
                      {tag.name_fr && <Typography variant="caption" color="text.secondary">FR: {tag.name_fr}</Typography>}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>{tag.slug}</TableCell>
                    <TableCell>{assignments.filter((a) => a.tag_id === tag.id).length}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                        <IconButton
                          id={`edit-tag-btn-${tag.id}`}
                          size="small"
                          onClick={() => handleOpenEditTag(tag)}
                          title="Edit Tag"
                        >
                          <Edit2 size={16} />
                        </IconButton>
                        <DeletePromptButton
                          id={`delete-tag-btn-${tag.id}`}
                          itemName={tag.name}
                          onDelete={() => handleDeleteTag(tag.id)}
                          size="small"
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* CREATE/EDIT BLOG DIALOG */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        id="blog-crud-modal"
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          {editPostId ? (locale === 'fr' ? 'Modifier l\'Article' : 'Edit Blog Post') : (locale === 'fr' ? 'Créer un Nouvel Article' : 'Create New Blog Post')}
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              {/* EN Title */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="blog-form-title"
                  label={locale === 'fr' ? 'Titre (Anglais)' : 'Title (English)'}
                  value={formValues.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* FR Title */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="blog-form-title-fr"
                  label={locale === 'fr' ? 'Titre (Français)' : 'Title (French)'}
                  value={formValues.titleFr}
                  onChange={(e) => handleFormChange('titleFr', e.target.value)}
                  fullWidth
                />
              </Grid>

              {/* Slug */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="blog-form-slug"
                  label="URL Slug"
                  value={formValues.slug}
                  onChange={(e) => handleFormChange('slug', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* Header Photo URL */}
              <Grid size={{ xs: 12, md: 6 }}>
                <ImageUpload
                  bucket="blog-media"
                  value={formValues.headerPhotoUrl}
                  onChange={(url) => handleFormChange('headerPhotoUrl', url)}
                  label={locale === 'fr' ? "Photo d'En-tête" : 'Header Photo'}
                />
              </Grid>

              {/* EN Excerpt */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="blog-form-excerpt"
                  label={locale === 'fr' ? 'Extrait (Anglais)' : 'Excerpt (English)'}
                  value={formValues.excerpt}
                  onChange={(e) => handleFormChange('excerpt', e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              {/* FR Excerpt */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="blog-form-excerpt-fr"
                  label={locale === 'fr' ? 'Extrait (Français)' : 'Excerpt (French)'}
                  value={formValues.excerptFr}
                  onChange={(e) => handleFormChange('excerptFr', e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>

              {/* EN Body */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                  {locale === 'fr' ? 'Contenu de l\'article (Anglais)' : 'Blog Article Content (English)'}
                </Typography>
                <RichTextEditor
                  value={formValues.body}
                  onChange={(val) => handleFormChange('body', val)}
                  locale={locale}
                />
              </Grid>
              {/* FR Body */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                  {locale === 'fr' ? 'Contenu de l\'article (Français)' : 'Blog Article Content (French)'}
                </Typography>
                <RichTextEditor
                  value={formValues.bodyFr}
                  onChange={(val) => handleFormChange('bodyFr', val)}
                  locale={locale}
                />
              </Grid>

              {/* Read time */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  id="blog-form-readtime"
                  label={locale === 'fr' ? 'Temps de Lecture (min)' : 'Read Time (minutes)'}
                  type="number"
                  value={formValues.readTimeMinutes}
                  onChange={(e) => handleFormChange('readTimeMinutes', Math.max(1, parseInt(e.target.value) || 1))}
                  fullWidth
                />
              </Grid>
              {/* Publication Status */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                  <InputLabel id="blog-status-label">Status</InputLabel>
                  <Select
                    labelId="blog-status-label"
                    id="blog-form-status"
                    value={formValues.status}
                    label="Status"
                    onChange={(e) => handleFormChange('status', e.target.value)}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Pinned/Featured flag */}
              <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="blog-form-pinned"
                      checked={formValues.isPinned}
                      onChange={(e) => handleFormChange('isPinned', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={locale === 'fr' ? 'Épingler cet article' : 'Pin/Feature Article'}
                />
              </Grid>

              {/* Tags Selector */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                  Tags
                </Typography>
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {tagsState.map((tag) => {
                    const selected = selectedTags.includes(tag.id)
                    const tagName = locale === 'fr' ? (tag.name_fr || tag.name) : tag.name
                    return (
                      <Chip
                        key={tag.id}
                        label={tagName}
                        color={selected ? 'primary' : 'default'}
                        variant={selected ? 'filled' : 'outlined'}
                        onClick={() => handleTagToggle(tag.id)}
                        sx={{ cursor: 'pointer' }}
                        id={`tag-chip-${tag.slug}`}
                      />
                    )
                  })}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 4, py: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Button id="blog-dialog-cancel" variant="outlined" onClick={handleCloseDialog} disabled={isPending}>
            {tc('cancel')}
          </Button>
          <Button
            id="blog-dialog-save"
            variant="contained"
            onClick={handleSavePost}
            disabled={isPending}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
            }}
          >
            {tc('save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* CREATE/EDIT TAG DIALOG */}
      <Dialog
        open={openTagDialog}
        onClose={handleCloseTagDialog}
        maxWidth="sm"
        fullWidth
        id="tag-crud-modal"
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          {editTagId ? (locale === 'fr' ? 'Modifier l\'Étiquette' : 'Edit Tag') : (locale === 'fr' ? 'Créer une Nouvelle Étiquette' : 'Create New Tag')}
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              {/* EN Name */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  id="tag-form-name"
                  label={locale === 'fr' ? 'Nom (Anglais)' : 'Name (English)'}
                  value={tagFormValues.name}
                  onChange={(e) => handleTagFormChange('name', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* FR Name */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  id="tag-form-name-fr"
                  label={locale === 'fr' ? 'Nom (Français)' : 'Name (French)'}
                  value={tagFormValues.nameFr}
                  onChange={(e) => handleTagFormChange('nameFr', e.target.value)}
                  fullWidth
                />
              </Grid>
              {/* Slug */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  id="tag-form-slug"
                  label="URL Slug"
                  value={tagFormValues.slug}
                  onChange={(e) => handleTagFormChange('slug', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 4, py: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Button id="tag-dialog-cancel" variant="outlined" onClick={handleCloseTagDialog} disabled={isPending}>
            {tc('cancel')}
          </Button>
          <Button
            id="tag-dialog-save"
            variant="contained"
            onClick={handleSaveTag}
            disabled={isPending}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
            }}
          >
            {tc('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
