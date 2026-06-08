import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../../components/molecules/PageHeader'
import Modal from '../../components/molecules/Modal'
import ConfirmModal from '../../components/molecules/ConfirmModal'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Input'
import Select from '../../components/atoms/Select'
import Badge from '../../components/atoms/Badge'
import Pagination from '../../components/molecules/Pagination'

const EMPTY = { name: '', role: '', email: '', phone: '', status: 'Active' }
const ROLES = ['Manager', 'Operator', 'Technician', 'Cashier', 'Security', 'Cleaner']
const PER_PAGE = 5

const Employees = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useApp()
  const [modalMode, setModalMode] = useState(null)
  const [selected, setSelected] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [page, setPage] = useState(1)

  const openAdd = () => { setForm(EMPTY); setModalMode('add') }
  const openEdit = (e) => { setForm({ ...e }); setSelected(e); setModalMode('edit') }
  const closeModal = () => { setModalMode(null); setSelected(null) }
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = () => {
    if (!form.name || !form.email) return
    if (modalMode === 'add') addEmployee(form)
    else updateEmployee({ ...selected, ...form })
    closeModal()
  }

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const avatarColors = ['bg-red-700', 'bg-blue-700', 'bg-green-700', 'bg-purple-700', 'bg-yellow-700', 'bg-pink-700']

  const paged = employees.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <PageHeader
        title="EMPLOYEES"
        subtitle={`${employees.length} staff members`}
        action={<Button onClick={openAdd}><Plus size={15} />Add Employee</Button>}
      />

      <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] shadow-2xl shadow-black/20 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['#', 'Name', 'Role', 'Email', 'Phone', 'Status', 'Actions'].map(h => (
                <th key={h} className="bg-[#1a1a1a] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#888888]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((emp, i) => (
              <tr key={emp.id} className="hover:bg-[#1a1a1a]/40 transition-colors">
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white text-[#888888] font-['JetBrains_Mono'] text-xs">{(page - 1) * PER_PAGE + i + 1}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${avatarColors[i % avatarColors.length]}`}>
                      {getInitials(emp.name)}
                    </div>
                    <span className="font-semibold">{emp.name}</span>
                  </div>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white text-[#888888]">{emp.role}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white text-[#888888] text-xs">{emp.email}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white font-['JetBrains_Mono'] text-xs text-[#888888]">{emp.phone}</td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <Badge color={emp.status === 'Active' ? 'green' : 'gray'}>{emp.status}</Badge>
                </td>
                <td className="border-t border-[#2a2a2a]/50 px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" onClick={() => openEdit(emp)}><Pencil size={14} className="text-blue-400" /></Button>
                    <Button variant="ghost" onClick={() => setConfirmId(emp.id)}><Trash2 size={14} className="text-red-500" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={employees.length} perPage={PER_PAGE} onChange={setPage} />
      </div>

      <Modal isOpen={!!modalMode} onClose={closeModal} title={modalMode === 'add' ? 'Add Employee' : 'Edit Employee'}>
        <div className="space-y-4">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
          <Select label="Role" name="role" value={form.role} onChange={handleChange} options={ROLES} required />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="9911-1111" />
          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]}
          />
        </div>
        <div className="flex gap-3 mt-5">
          <Button variant="secondary" onClick={closeModal} className="flex-1 justify-center">Cancel</Button>
          <Button onClick={handleSave} className="flex-1 justify-center">Save</Button>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => deleteEmployee(confirmId)}
        message="This employee record will be permanently deleted."
      />
    </div>
  )
}

export default Employees
