import React, { useState, useCallback } from 'react'
import { Save, RotateCcw, Monitor } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import PageHeader from '../../components/molecules/PageHeader'
import Select from '../../components/atoms/Select'
import Button from '../../components/atoms/Button'

// Seat states
const AVAILABLE = 'available'
const SELECTED = 'selected'
const BLOCKED = 'blocked'

const SEAT_STYLES = {
  [AVAILABLE]: 'bg-white/90 hover:bg-white border-white/50 cursor-pointer',
  [SELECTED]: 'bg-cinema-red border-cinema-red cursor-pointer',
  [BLOCKED]: 'bg-cinema-card2 border border-cinema-border cursor-pointer opacity-40',
}

const ROW_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const buildInitialSeats = (rows, cols) =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({ row: r, col: c, state: AVAILABLE }))
  )

const HallSeats = () => {
  const { halls } = useApp()
  const [selectedHallId, setSelectedHallId] = useState(halls[0]?.id ?? '')
  const hall = halls.find(h => h.id === Number(selectedHallId) || h.id === selectedHallId) ?? halls[0]

  const [seats, setSeats] = useState(() => buildInitialSeats(hall?.rows ?? 8, hall?.cols ?? 10))
  const [tool, setTool] = useState(SELECTED) // which state to apply on click
  const [saved, setSaved] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const applyHall = (id) => {
    setSelectedHallId(id)
    const h = halls.find(h => String(h.id) === String(id))
    if (h) setSeats(buildInitialSeats(h.rows, h.cols))
    setSaved(false)
  }

  const cycleSeat = useCallback((r, c) => {
    setSeats(prev => {
      const next = prev.map(row => row.map(s => ({ ...s })))
      next[r][c].state = tool
      return next
    })
  }, [tool])

  const handleMouseDown = (r, c) => { setIsDragging(true); cycleSeat(r, c) }
  const handleMouseEnter = (r, c) => { if (isDragging) cycleSeat(r, c) }
  const handleMouseUp = () => setIsDragging(false)

  const reset = () => {
    setSeats(buildInitialSeats(hall?.rows ?? 8, hall?.cols ?? 10))
    setSaved(false)
  }

  const save = () => {
    // In a real app this would persist; here we just show feedback
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const counts = {
    available: seats.flat().filter(s => s.state === AVAILABLE).length,
    selected: seats.flat().filter(s => s.state === SELECTED).length,
    blocked: seats.flat().filter(s => s.state === BLOCKED).length,
  }

  const hallOptions = halls.map(h => ({ value: h.id, label: h.name }))

  return (
    <div onMouseUp={handleMouseUp}>
      <PageHeader title="HALL SEATS" subtitle="Configure seat layout" />

      {/* Controls */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <Select
          label="Select Hall"
          value={selectedHallId}
          onChange={e => applyHall(e.target.value)}
          options={hallOptions}
          className="w-44"
        />
        {/* Tool picker */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-cinema-muted uppercase tracking-wider font-semibold">Paint Tool</label>
          <div className="flex gap-2">
            {[
              { state: SELECTED, label: 'Select', color: 'border-cinema-red text-cinema-red' },
              { state: AVAILABLE, label: 'Available', color: 'border-white/50 text-white' },
              { state: BLOCKED, label: 'Block', color: 'border-cinema-border text-cinema-muted' },
            ].map(t => (
              <button
                key={t.state}
                onClick={() => setTool(t.state)}
                className={`px-3 py-1.5 rounded text-xs font-medium border transition-all ${t.color} ${
                  tool === t.state ? 'opacity-100 ring-1 ring-offset-1 ring-offset-cinema-bg ring-current' : 'opacity-50 hover:opacity-75'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 ml-auto">
          <Button variant="secondary" onClick={reset}><RotateCcw size={14} />Reset</Button>
          <Button onClick={save}>
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Layout'}
          </Button>
        </div>
      </div>

      <div className="bg-cinema-card border border-cinema-border rounded-lg p-6 overflow-x-auto">
        {/* Screen */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-3/4 max-w-sm h-2 bg-gradient-to-r from-transparent via-cinema-red/60 to-transparent rounded-full" />
          <div className="flex items-center gap-2 mt-2 text-cinema-muted text-xs">
            <Monitor size={13} />SCREEN
          </div>
        </div>

        {/* Seat Grid */}
        <div className="flex flex-col items-center gap-1.5 select-none">
          {seats.map((row, r) => (
            <div key={r} className="flex items-center gap-1.5">
              {/* Row label */}
              <span className="w-5 text-center text-xs text-cinema-muted font-mono mr-1">{ROW_LABELS[r]}</span>
              {row.map((seat, c) => (
                <button
                  key={c}
                  onMouseDown={() => handleMouseDown(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                  className={`w-6 h-6 rounded-sm border text-[9px] transition-all duration-100 ${SEAT_STYLES[seat.state]}`}
                  title={`${ROW_LABELS[r]}${c + 1} — ${seat.state}`}
                >
                  {c + 1 <= 9 || seats[0].length <= 9 ? '' : ''}
                </button>
              ))}
              {/* Col label last */}
            </div>
          ))}
          {/* Column numbers */}
          <div className="flex gap-1.5 mt-1 pl-7">
            {seats[0]?.map((_, c) => (
              <span key={c} className="w-6 text-center text-[9px] text-cinema-border font-mono">{c + 1}</span>
            ))}
          </div>
        </div>

        {/* Legend + Stats */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-cinema-border">
          {[
            { state: AVAILABLE, label: `Available (${counts.available})`, cls: 'bg-white/90' },
            { state: SELECTED, label: `Selected (${counts.selected})`, cls: 'bg-cinema-red' },
            { state: BLOCKED, label: `Blocked (${counts.blocked})`, cls: 'bg-cinema-card2 border border-cinema-border opacity-40' },
          ].map(l => (
            <div key={l.state} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-sm border border-cinema-border ${l.cls}`} />
              <span className="text-xs text-cinema-muted">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HallSeats
