import { useLayoutEffect, useRef, useState } from 'react'
import { AddCircleIcon } from '@solar-icons/react/linear/add-circle'

export default function QuickNoteForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const descriptionRef = useRef(null)

  useLayoutEffect(() => {
    const textarea = descriptionRef.current
    if (!textarea) return

    const maxHeight = 160
    textarea.style.height = '44px'
    if (!description) {
      textarea.style.overflowY = 'hidden'
      return
    }

    const nextHeight = Math.min(maxHeight, Math.max(44, textarea.scrollHeight))
    textarea.style.height = `${nextHeight}px`
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }, [description])

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()

    if (!cleanTitle) {
      setError('Enter a title for your note.')
      return
    }

    onAddTask(null, cleanTitle, description.trim())
    setTitle('')
    setDescription('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-line bg-white p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:items-start sm:p-4">
      <div className="min-w-0">
        <label htmlFor="quick-note-title" className="mb-1.5 block text-xs font-semibold text-ink">
          Title
        </label>
        <input
          id="quick-note-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError('')
          }}
          maxLength={120}
          placeholder="What do you want to remember?"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'quick-note-title-error' : undefined}
          className="h-11 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-muted/75 focus-visible:ring-2 focus-visible:ring-accent"
        />
        {error && <p id="quick-note-title-error" role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
      </div>

      <div className="min-w-0">
        <label htmlFor="quick-note-description" className="mb-1.5 block text-xs font-semibold text-ink">
          Note <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          ref={descriptionRef}
          id="quick-note-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={2000}
          rows={1}
          placeholder="Add a detail or reminder"
          className="min-h-11 w-full resize-none overflow-hidden rounded-xl border border-line bg-white px-3 py-2.5 text-sm leading-5 text-ink outline-none placeholder:text-muted/75 focus-visible:ring-2 focus-visible:ring-accent"
          style={{ height: '44px' }}
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-11 min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:mt-[22px] sm:w-auto"
      >
        <AddCircleIcon size={18} aria-hidden="true" />
        Add note
      </button>
    </form>
  )
}
