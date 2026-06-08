import SectionTitle from '../molecules/SectionTitle'
import ShowTimeForm from '../molecules/ShowTimeForm'

function ShowTimeEditor({ form, options, saving, onChange, onReset, onSubmit }) {
  return (
    <aside className="self-start rounded-lg border border-[#1f1f1f] bg-[#111] p-3.5">
      <SectionTitle title={form.id ? 'ShowTime засах' : 'ShowTime нэмэх'} meta="Admin" />
      <ShowTimeForm
        form={form}
        options={options}
        saving={saving}
        onChange={onChange}
        onReset={onReset}
        onSubmit={onSubmit}
      />
    </aside>
  )
}

export default ShowTimeEditor
