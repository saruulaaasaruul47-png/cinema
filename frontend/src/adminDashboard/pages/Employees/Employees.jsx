import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../../components/molecules/PageHeader'
import ConfirmModal from '../../components/molecules/ConfirmModal'
import Button from '../../components/atoms/Button'
import Badge from '../../components/atoms/Badge'
import Pagination from '../../components/molecules/Pagination'

const PER_PAGE = 5

const Employees = () => {
  const { employees, deleteEmployee } = useApp()
  const [confirmId, setConfirmId] = useState(null)
  const [page, setPage] = useState(1)

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const avatarColors = ['bg-red-700', 'bg-blue-700', 'bg-green-700', 'bg-purple-700', 'bg-yellow-700', 'bg-pink-700']

  const paged = employees.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <PageHeader
        title="EMPLOYEES"
        subtitle={`${employees.length} staff members`}
        action={null}
      />

      <div className="bg-cinema-card border border-cinema-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['#', 'Name', 'Role', 'Email', 'Phone', 'Status', 'Actions'].map(h => (
                <th key={h} className="bg-cinema-card2 text-cinema-muted text-xs uppercase tracking-wider px-4 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((emp, i) => (
              <tr key={emp.id} className="hover:bg-cinema-card2/40 transition-colors">
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted font-mono text-xs">{(page - 1) * PER_PAGE + i + 1}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${avatarColors[i % avatarColors.length]}`}>
                      {getInitials(emp.name)}
                    </div>
                    <span className="font-semibold">{emp.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted">{emp.role}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 text-cinema-muted text-xs">{emp.email}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50 font-mono text-xs text-cinema-muted">{emp.phone}</td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <Badge color={emp.status === 'Active' ? 'green' : 'gray'}>{emp.status}</Badge>
                </td>
                <td className="px-4 py-3 text-sm text-white border-t border-cinema-border/50">
                  <Button variant="ghost" onClick={() => setConfirmId(emp.id)}><Trash2 size={14} className="text-red-500" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={employees.length} perPage={PER_PAGE} onChange={setPage} />
      </div>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={async () => { await deleteEmployee(confirmId) }}
        message="This staff account will be permanently deleted."
      />
    </div>
  )
}

export default Employees
