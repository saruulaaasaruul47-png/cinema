import { useState } from 'react'
import { Film, Pencil, Plus, Star, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Badge from '../../components/atoms/Badge'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Input'
import ConfirmModal from '../../components/molecules/ConfirmModal'
import Modal from '../../components/molecules/Modal'
import PageHeader from '../../components/molecules/PageHeader'
import Pagination from '../../components/molecules/Pagination'

const EMPTY = { title: '', director: '', duration: '', genres: '', poster: '', year: '', rating: '' }
const PER_PAGE = 5

const Movies = () => {
  const { movies, addMovie, updateMovie, deleteMovie } = useApp()
  const [modalMode, setModalMode] = useState(null)
  const [selected, setSelected] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [page, setPage] = useState(1)

  const toForm = (movie) => ({
    ...movie,
    genres: movie.genres.join(', '),
  })

  const openAdd = () => { setForm(EMPTY); setModalMode('add') }
  const openEdit = (movie) => { setForm(toForm(movie)); setSelected(movie); setModalMode('edit') }
  const closeModal = () => { setModalMode(null); setSelected(null) }
  const handleChange = (e) => setForm(previous => ({ ...previous, [e.target.name]: e.target.value }))

  const handleSave = () => {
    if (!form.title || !form.director) return

    const payload = {
      ...form,
      duration: Number(form.duration) || 0,
      year: Number(form.year) || new Date().getFullYear(),
      rating: Number(form.rating) || 0,
      genres: form.genres.split(',').map(genre => genre.trim()).filter(Boolean),
    }

    if (modalMode === 'add') addMovie(payload)
    else updateMovie({ ...selected, ...payload })
    closeModal()
  }

  const paged = movies.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <PageHeader
        title="MOVIES"
        subtitle={`${movies.length} movies`}
        action={<Button onClick={openAdd}><Plus size={15} />Add Movie</Button>}
      />

      <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] shadow-2xl shadow-black/20 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['#', 'Movie', 'Director', 'Genres', 'Year', 'Rating', 'Actions'].map(header => (
                <th key={header} className="bg-[#1a1a1a] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#888888]">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((movie, index) => (
              <tr key={movie.id} className="hover:bg-[#1a1a1a]/40 transition-colors">
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-[#888888] font-['JetBrains_Mono'] text-xs">{(page - 1) * PER_PAGE + index + 1}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="h-14 w-10 rounded object-cover bg-[#1a1a1a]"
                      onError={event => { event.currentTarget.src = 'https://placehold.co/40x56/1a1a1a/888?text=?' }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 font-semibold">
                        <Film size={13} className="text-[#e50914]" />
                        <span className="truncate">{movie.title}</span>
                      </div>
                      <div className="text-xs text-[#888888] font-['JetBrains_Mono']">{movie.duration} min</div>
                    </div>
                  </div>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-[#888888]">{movie.director}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex flex-wrap gap-1">
                    {movie.genres.map(genre => <Badge key={genre} color="gray">{genre}</Badge>)}
                  </div>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-[#888888] font-['JetBrains_Mono'] text-xs">{movie.year}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-1 text-yellow-400 font-['JetBrains_Mono'] text-xs">
                    <Star size={12} fill="currentColor" />{Number(movie.rating).toFixed(1)}
                  </div>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" onClick={() => openEdit(movie)}><Pencil size={14} className="text-blue-400" /></Button>
                    <Button variant="ghost" onClick={() => setConfirmId(movie.id)}><Trash2 size={14} className="text-red-500" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={movies.length} perPage={PER_PAGE} onChange={setPage} />
      </div>

      <Modal isOpen={!!modalMode} onClose={closeModal} title={modalMode === 'add' ? 'Add Movie' : 'Edit Movie'}>
        <div className="space-y-4">
          <Input label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Movie title" required />
          <Input label="Director" name="director" value={form.director} onChange={handleChange} placeholder="Director name" required />
          <Input label="Genres" name="genres" value={form.genres} onChange={handleChange} placeholder="Action, Drama" />
          <Input label="Poster URL" name="poster" value={form.poster} onChange={handleChange} placeholder="https://..." />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Year" name="year" type="number" value={form.year} onChange={handleChange} placeholder="2026" />
            <Input label="Duration" name="duration" type="number" value={form.duration} onChange={handleChange} placeholder="120" />
            <Input label="Rating" name="rating" type="number" value={form.rating} onChange={handleChange} placeholder="8.5" />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <Button variant="secondary" onClick={closeModal} className="flex-1 justify-center">Cancel</Button>
          <Button onClick={handleSave} className="flex-1 justify-center">Save</Button>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => deleteMovie(confirmId)}
        message="This movie will be permanently deleted."
      />
    </div>
  )
}

export default Movies
