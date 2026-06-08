import Button from '../atoms/Button'
import FormField from '../atoms/FormField'

function ShowTimeForm({ form, options, saving, onChange, onReset, onSubmit }) {
  const fieldClass =
    'min-h-[34px] w-full rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-2.5 py-[5px] text-xs text-[#aaa] outline-none'

  return (
    <form className="mt-3.5 grid gap-3" onSubmit={onSubmit}>
      <FormField label="Кино">
        <select className={fieldClass} value={form.movie_id} onChange={(event) => onChange('movie_id', event.target.value)} required>
          <option value="">Сонгох</option>
          {options.movies.map((movie) => (
            <option value={movie.id} key={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Танхим">
        <select className={fieldClass} value={form.hall_id} onChange={(event) => onChange('hall_id', event.target.value)} required>
          <option value="">Сонгох</option>
          {options.halls.map((hall) => (
            <option value={hall.id} key={hall.id}>
              {hall.hall_name} ({hall.seat_count})
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Эхлэх цаг">
        <input
          type="datetime-local"
          className={fieldClass}
          value={form.start_time}
          onChange={(event) => onChange('start_time', event.target.value)}
          required
        />
      </FormField>

      <FormField label="Дуусах цаг">
        <input
          type="datetime-local"
          className={fieldClass}
          value={form.end_time}
          onChange={(event) => onChange('end_time', event.target.value)}
          required
        />
      </FormField>

      <div className="mt-1 grid grid-cols-2 gap-2">
        <Button type="submit" className="w-full border-[#e63946] bg-[#e63946] text-white hover:bg-[#c62e3a]" disabled={saving}>
          {saving ? 'Хадгалж байна...' : 'Хадгалах'}
        </Button>
        <Button onClick={onReset}>Цэвэрлэх</Button>
      </div>
    </form>
  )
}

export default ShowTimeForm
