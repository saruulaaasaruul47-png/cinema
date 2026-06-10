import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Tag } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../../components/molecules/PageHeader'
import Modal from '../../components/molecules/Modal'
import ConfirmModal from '../../components/molecules/ConfirmModal'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Input'
import Pagination from '../../components/molecules/Pagination'

const EMPTY = { name: '', description: '' }
const PER_PAGE = 6

const Genres = () => {
  const { genres, addGenre, updateGenre, deleteGenre } = useApp()
  const [modalMode, setModalMode] = useState(null)
  const [selected, setSelected] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [page, setPage] = useState(1)

  const openAdd = () => { setForm(EMPTY); setModalMode('add') }
  const openEdit = (g) => { setForm({ name: g.name, description: g.description }); setSelected(g); setModalMode('edit') }
  const closeModal = () => { setModalMode(null); setSelected(null) }
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = async () => {
    if (!form.name) return
    try {
      if (modalMode === 'add') await addGenre(form)
      else await updateGenre({ ...selected, ...form })
      closeModal()
    } catch { /* error */ }
  }

  const paged = genres.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <PageHeader
        title="GENRES"
        subtitle={`${genres.length} genres`}
        action={<Button onClick={openAdd}><Plus size={15} />Add Genre</Button>}
      />

      <div className="bg-cinema-card border border-cinema-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['#', 'Name', 'Description', 'Movies', 'Actions'].map(h => (
                <th key={h} className="bg-cinema-card2 text-cinema-muted text-xs uppercase tracking-wider px-4 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((g, i) => (
              <tr key={g.id} className="hover:bg-cinema-card2/40 transition-colors">
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted font-mono text-xs">{(page - 1) * PER_PAGE + i + 1}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <div className="flex items-center gap-2">
                    <Tag size={13} className="text-cinema-red" />
                    <span className="font-semibold">{g.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted">{g.description}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <span className="font-mono text-cinema-red text-sm">{g.movieCount}</span>
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" onClick={() => openEdit(g)}><Pencil size={14} className="text-blue-400" /></Button>
                    <Button variant="ghost" onClick={() => setConfirmId(g.id)}><Trash2 size={14} className="text-red-500" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={genres.length} perPage={PER_PAGE} onChange={setPage} />
      </div>

      <Modal isOpen={!!modalMode} onClose={closeModal} title={modalMode === 'add' ? 'Add Genre' : 'Edit Genre'}>
        <div className="space-y-4">
          <Input label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Genre name" required />
          <Input label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Brief description" />
        </div>
        <div className="flex gap-3 mt-5">
          <Button variant="secondary" onClick={closeModal} className="flex-1 justify-center">Cancel</Button>
          <Button onClick={handleSave} className="flex-1 justify-center">Save</Button>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => deleteGenre(confirmId)}
        message="This genre will be permanently deleted."
      />
    </div>
  )
}

export default Genres
