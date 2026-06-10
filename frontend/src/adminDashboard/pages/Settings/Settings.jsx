import React, { useState } from 'react'
import { Save, Building2, DollarSign, Globe, Shield } from 'lucide-react'
import PageHeader from '../../components/molecules/PageHeader'
import Input from '../../components/atoms/Input'
import Button from '../../components/atoms/Button'

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-cinema-card border border-cinema-border rounded-lg p-5 space-y-4">
    <div className="flex items-center gap-2 pb-3 border-b border-cinema-border">
      <Icon size={16} className="text-cinema-red" />
      <h3 className="text-sm font-semibold text-white">{title}</h3>
    </div>
    {children}
  </div>
)

const Settings = () => {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader title="SETTINGS" subtitle="System configuration" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section icon={Building2} title="Cinema Information">
          <Input label="Cinema Name" defaultValue="IMAGIX Cinema" />
          <Input label="Address" defaultValue="123 Main Street, City" />
          <Input label="Contact Email" type="email" defaultValue="info@imagix.com" />
          <Input label="Phone" defaultValue="+976 9911-0000" />
        </Section>

        <Section icon={DollarSign} title="Pricing & Tickets">
          <Input label="Base Ticket Price ($)" type="number" defaultValue="12.00" />
          <Input label="VIP Surcharge ($)" type="number" defaultValue="13.00" />
          <Input label="3D Surcharge ($)" type="number" defaultValue="3.00" />
          <Input label="IMAX Surcharge ($)" type="number" defaultValue="8.00" />
        </Section>

        <Section icon={Globe} title="Operating Hours">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Open Time" type="time" defaultValue="09:00" />
            <Input label="Close Time" type="time" defaultValue="23:00" />
          </div>
          <Input label="Time Zone" defaultValue="Asia/Ulaanbaatar (UTC+8)" />
        </Section>

        <Section icon={Shield} title="Admin Account">
          <Input label="Admin Name" defaultValue="Super Admin" />
          <Input label="Admin Email" type="email" defaultValue="admin@imagix.com" />
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <Input label="New Password" type="password" placeholder="••••••••" />
        </Section>
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={handleSave}>
          <Save size={14} />
          {saved ? 'Saved!' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}

export default Settings
