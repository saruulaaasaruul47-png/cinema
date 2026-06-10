import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Clock, Star } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../../components/molecules/PageHeader'
import Modal from '../../components/molecules/Modal'
import ConfirmModal from '../../components/molecules/ConfirmModal'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Input'
import Select from '../../components/atoms/Select'
import Badge from '../../components/atoms/Badge'
import Pagination from '../../components/molecules/Pagination'

const GENRE_OPTIONS = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Biography']
const EMPTY_FORM = { title: '', director: '', duration: '', genres: [], poster: '', year: new Date().getFullYear(), rating: '' }

const MovieForm = ({ form, onChange, onGenreToggle }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <Input label="Title" name="title" value={form.title} onChange={onChange} placeholder="Movie title" required className="col-span-2" />
      <Input label="Director" name="director" value={form.director} onChange={onChange} placeholder="Director name" required />
      <Input label="Duration (min)" name="duration" type="number" value={form.duration} onChange={onChange} placeholder="e.g. 120" required />
      <Input label="Year" name="year" type="number" value={form.year} onChange={onChange} placeholder="2024" />
      <Input label="Rating" name="rating" type="number" value={form.rating} onChange={onChange} placeholder="8.5" />
    </div>
    <Input label="Poster URL" name="poster" value={form.poster} onChange={onChange} placeholder="https://..." />
    <div>
      <label className="text-xs text-cinema-muted uppercase tracking-wider font-semibold block mb-2">Genres</label>
      <div className="flex flex-wrap gap-2">
        {GENRE_OPTIONS.map(g => (
          <button
            key={g} type="button"
            onClick={() => onGenreToggle(g)}
            className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
              form.genres.includes(g)
                ? 'bg-cinema-red border-cinema-red text-white'
                : 'bg-cinema-card2 border border-cinema-border text-cinema-muted hover:border-cinema-muted'
            }`}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  </div>
)

const PER_PAGE = 5

const Movies = () => {
  const { movies, addMovie, updateMovie, deleteMovie } = useApp()
  const [modalMode, setModalMode] = useState(null) // 'add' | 'edit' | null
  const [selected, setSelected] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [page, setPage] = useState(1)

  const openAdd = () => { setForm(EMPTY_FORM); setModalMode('add') }
  const openEdit = (m) => { setForm({ ...m }); setSelected(m); setModalMode('edit') }
  const closeModal = () => { setModalMode(null); setSelected(null) }

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleGenreToggle = (g) => setForm(p => ({
    ...p,
    genres: p.genres.includes(g) ? p.genres.filter(x => x !== g) : [...p.genres, g]
  }))

  const handleSave = async () => {
    if (!form.title || !form.director) return
    try {
      if (modalMode === 'add') await addMovie(form)
      else await updateMovie({ ...selected, ...form })
      closeModal()
    } catch { /* error shown via context */ }
  }

  const paged = movies.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <PageHeader
        title="MOVIES"
        subtitle={`${movies.length} total movies`}
        action={<Button onClick={openAdd}><Plus size={15} />Add Movie</Button>}
      />

      <div className="bg-cinema-card border border-cinema-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['#', 'Poster', 'Title', 'Director', 'Duration', 'Genres', 'Actions'].map(h => (
                <th key={h} className="bg-cinema-card2 text-cinema-muted text-xs uppercase tracking-wider px-4 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((m, i) => (
              <tr key={m.id} className="hover:bg-cinema-card2/40 transition-colors group">
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted font-mono text-xs">{(page - 1) * PER_PAGE + i + 1}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <img
                    src={m.poster} alt={m.title}
                    className="w-8 h-11 object-cover rounded"
                    onError={e => { e.target.src = 'https://placehold.co/32x44/1a1a1a/555?text=?' }}
                  />
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <div className="font-semibold text-white">{m.title}</div>
                  <div className="flex items-center gap-1 text-[11px] text-cinema-muted mt-0.5">
                    <Star size={10} className="text-yellow-500" />
                    {m.rating} · {m.year}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted">{m.director}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <div className="flex items-center gap-1 text-cinema-muted text-xs">
                    <Clock size={11} />{m.duration} min
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <div className="flex flex-wrap gap-1">
                    {m.genres?.map(g => <Badge key={g} color="gray">{g}</Badge>)}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" onClick={() => openEdit(m)}><Pencil size={14} className="text-blue-400" /></Button>
                    <Button variant="ghost" onClick={() => setConfirmId(m.id)}><Trash2 size={14} className="text-red-500" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={movies.length} perPage={PER_PAGE} onChange={setPage} />
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={!!modalMode} onClose={closeModal} title={modalMode === 'add' ? 'Add Movie' : 'Edit Movie'}>
        <MovieForm form={form} onChange={handleChange} onGenreToggle={handleGenreToggle} />
        <div className="flex gap-3 mt-5">
          <Button variant="secondary" onClick={closeModal} className="flex-1 justify-center">Cancel</Button>
          <Button onClick={handleSave} className="flex-1 justify-center">Save</Button>
        </div>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => deleteMovie(confirmId)}
        message="This movie will be permanently removed."
      />
    </div>
  )
}

export default Movies
