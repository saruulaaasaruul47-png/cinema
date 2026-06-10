import React, { useState } from 'react'
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

  const handleSave = async () => {
    if (!form.movieId || !form.hallId || !form.date || !form.time) return
    try {
      const payload = { ...form, price: Number(form.price) }
      if (modalMode === 'add') await addShowtime(payload)
      else await updateShowtime({ ...selected, ...payload })
      closeModal()
    } catch { /* error */ }
  }

  const paged = showtimes.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <PageHeader
        title="SHOWTIMES"
        subtitle={`${showtimes.length} scheduled shows`}
        action={<Button onClick={openAdd}><Plus size={15} />Add Showtime</Button>}
      />

      <div className="bg-cinema-card border border-cinema-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['#', 'Movie', 'Hall', 'Date', 'Time', 'Price', 'Actions'].map(h => (
                <th key={h} className="bg-cinema-card2 text-cinema-muted text-xs uppercase tracking-wider px-4 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((s, i) => (
              <tr key={s.id} className="hover:bg-cinema-card2/40 transition-colors">
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted font-mono text-xs">{(page - 1) * PER_PAGE + i + 1}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 font-semibold">{s.movieTitle}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted">{s.hallName}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted text-xs font-mono">{s.date}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <div className="flex items-center gap-1 text-cinema-red text-xs font-mono">
                    <Clock size={11} />{s.time}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <span className="font-mono text-green-400 text-sm">${Number(s.price).toFixed(2)}</span>
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
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
