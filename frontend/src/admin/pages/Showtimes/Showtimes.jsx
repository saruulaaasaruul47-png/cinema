import { useState } from 'react'
import { Plus, Pencil, Trash2, Clock } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../../components/molecules/PageHeader'
import Modal from '../../components/molecules/Modal'
import ConfirmModal from '../../components/molecules/ConfirmModal'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Input'
import Select from '../../components/atoms/Select'
import Pagination from '../../components/molecules/Pagination'

const EMPTY = { movieId: '', hallId: '', date: '', time: '', price: '' }
const PER_PAGE = 6

const Showtimes = () => {
  const { showtimes, addShowtime, updateShowtime, deleteShowtime, movies, halls } = useApp()
  const [modalMode, setModalMode] = useState(null)
  const [selected, setSelected] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [page, setPage] = useState(1)

  const movieOptions = movies.map(m => ({ value: m.id, label: m.title }))
  const hallOptions = halls.map(h => ({ value: h.id, label: h.name }))

  const openAdd = () => { setForm(EMPTY); setModalMode('add') }
  const openEdit = (s) => { setForm({ ...s }); setSelected(s); setModalMode('edit') }
  const closeModal = () => { setModalMode(null); setSelected(null) }
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = () => {
    if (!form.movieId || !form.hallId || !form.date || !form.time) return
    const movie = movies.find(m => String(m.id) === String(form.movieId))
    const hall = halls.find(h => String(h.id) === String(form.hallId))
    const payload = {
      ...form,
      movieTitle: movie?.title ?? '',
      hallName: hall?.name ?? '',
      price: Number(form.price),
    }
    if (modalMode === 'add') addShowtime(payload)
    else updateShowtime({ ...selected, ...payload })
    closeModal()
  }

  const paged = showtimes.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <PageHeader
        title="SHOWTIMES"
        subtitle={`${showtimes.length} scheduled shows`}
        action={<Button onClick={openAdd}><Plus size={15} />Add Showtime</Button>}
      />

      <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] shadow-2xl shadow-black/20 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['#', 'Movie', 'Hall', 'Date', 'Time', 'Price', 'Actions'].map(h => (
                <th key={h} className="bg-[#1a1a1a] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#888888]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((s, i) => (
              <tr key={s.id} className="hover:bg-[#1a1a1a]/40 transition-colors">
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white text-[#888888] font-['JetBrains_Mono'] text-xs">{(page - 1) * PER_PAGE + i + 1}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white font-semibold">{s.movieTitle}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white text-[#888888]">{s.hallName}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white text-[#888888] text-xs font-['JetBrains_Mono']">{s.date}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-1 text-[#e50914] text-xs font-['JetBrains_Mono']">
                    <Clock size={11} />{s.time}
                  </div>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <span className="font-['JetBrains_Mono'] text-green-400 text-sm">${Number(s.price).toFixed(2)}</span>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" onClick={() => openEdit(s)}><Pencil size={14} className="text-blue-400" /></Button>
                    <Button variant="ghost" onClick={() => setConfirmId(s.id)}><Trash2 size={14} className="text-red-500" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={showtimes.length} perPage={PER_PAGE} onChange={setPage} />
      </div>

      <Modal isOpen={!!modalMode} onClose={closeModal} title={modalMode === 'add' ? 'Add Showtime' : 'Edit Showtime'}>
        <div className="space-y-4">
          <Select label="Movie" name="movieId" value={form.movieId} onChange={handleChange} options={movieOptions} required />
          <Select label="Hall" name="hallId" value={form.hallId} onChange={handleChange} options={hallOptions} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />
            <Input label="Time" name="time" type="time" value={form.time} onChange={handleChange} required />
          </div>
          <Input label="Price ($)" name="price" type="number" value={form.price} onChange={handleChange} placeholder="12.00" />
        </div>
        <div className="flex gap-3 mt-5">
          <Button variant="secondary" onClick={closeModal} className="flex-1 justify-center">Cancel</Button>
          <Button onClick={handleSave} className="flex-1 justify-center">Save</Button>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => deleteShowtime(confirmId)}
        message="This showtime will be permanently removed."
      />
    </div>
  )
}

export default Showtimes
