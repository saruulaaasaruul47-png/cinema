import { useState } from 'react'
import { Plus, Pencil, Trash2, Users, Building2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../../components/molecules/PageHeader'
import Modal from '../../components/molecules/Modal'
import ConfirmModal from '../../components/molecules/ConfirmModal'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Input'
import Select from '../../components/atoms/Select'
import Badge from '../../components/atoms/Badge'

const EMPTY = { name: '', capacity: '', type: '2D', rows: 8, cols: 10 }
const TYPE_OPTIONS = [{ value: '2D', label: '2D' }, { value: '3D', label: '3D' }, { value: 'VIP', label: 'VIP' }, { value: 'IMAX', label: 'IMAX' }]
const typeColors = { '2D': 'blue', '3D': 'green', 'VIP': 'yellow', 'IMAX': 'purple' }

const Halls = () => {
  const { halls, addHall, updateHall, deleteHall } = useApp()
  const [modalMode, setModalMode] = useState(null)
  const [selected, setSelected] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [form, setForm] = useState(EMPTY)

  const openAdd = () => { setForm(EMPTY); setModalMode('add') }
  const openEdit = (h) => { setForm({ ...h }); setSelected(h); setModalMode('edit') }
  const closeModal = () => { setModalMode(null); setSelected(null) }
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = () => {
    if (!form.name) return
    if (modalMode === 'add') addHall({ ...form, capacity: Number(form.rows) * Number(form.cols) })
    else updateHall({ ...selected, ...form, capacity: Number(form.rows) * Number(form.cols) })
    closeModal()
  }

  return (
    <div>
      <PageHeader
        title="HALLS"
        subtitle={`${halls.length} cinema halls`}
        action={<Button onClick={openAdd}><Plus size={15} />Add Hall</Button>}
      />

      <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] shadow-2xl shadow-black/20 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['#', 'Hall Name', 'Capacity', 'Layout', 'Type', 'Actions'].map(h => (
                <th key={h} className="bg-[#1a1a1a] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#888888]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {halls.map((h, i) => (
              <tr key={h.id} className="hover:bg-[#1a1a1a]/40 transition-colors">
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white text-[#888888] font-['JetBrains_Mono'] text-xs">{i + 1}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-[#e50914]" />
                    <span className="font-semibold">{h.name}</span>
                  </div>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-1 text-sm">
                    <Users size={12} className="text-[#888888]" />
                    <span className="font-['JetBrains_Mono'] text-white">{h.capacity}</span>
                    <span className="text-[#888888] text-xs">seats</span>
                  </div>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white text-[#888888] text-xs font-['JetBrains_Mono']">
                  {h.rows} rows × {h.cols} cols
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <Badge color={typeColors[h.type] || 'gray'}>{h.type}</Badge>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" onClick={() => openEdit(h)}><Pencil size={14} className="text-blue-400" /></Button>
                    <Button variant="ghost" onClick={() => setConfirmId(h.id)}><Trash2 size={14} className="text-red-500" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!modalMode} onClose={closeModal} title={modalMode === 'add' ? 'Add Hall' : 'Edit Hall'}>
        <div className="space-y-4">
          <Input label="Hall Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Hall 1" required />
          <Select label="Type" name="type" value={form.type} onChange={handleChange} options={TYPE_OPTIONS} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Rows" name="rows" type="number" value={form.rows} onChange={handleChange} placeholder="8" />
            <Input label="Columns" name="cols" type="number" value={form.cols} onChange={handleChange} placeholder="10" />
          </div>
          <div className="bg-[#1a1a1a] rounded px-3 py-2 text-xs text-[#888888]">
            Capacity: <span className="text-white font-semibold">{Number(form.rows || 0) * Number(form.cols || 0)} seats</span>
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
        onConfirm={() => deleteHall(confirmId)}
        message="This hall will be permanently removed."
      />
    </div>
  )
}

export default Halls
