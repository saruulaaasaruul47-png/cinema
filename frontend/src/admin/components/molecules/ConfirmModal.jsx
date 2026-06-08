import Modal from './Modal'
import Button from '../atoms/Button'
import { AlertTriangle } from 'lucide-react'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Confirm Delete', message = 'Are you sure? This action cannot be undone.' }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="">
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-14 h-14 rounded-full bg-red-900/30 border border-red-900/50 flex items-center justify-center">
        <AlertTriangle size={28} className="text-red-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-[#888888]">{message}</p>
      </div>
      <div className="flex gap-3 w-full">
        <Button variant="secondary" onClick={onClose} className="flex-1 justify-center">Cancel</Button>
        <Button variant="danger" onClick={() => { onConfirm(); onClose() }} className="flex-1 justify-center">Delete</Button>
      </div>
    </div>
  </Modal>
)

export default ConfirmModal
