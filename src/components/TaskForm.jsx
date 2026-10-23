import { useState } from 'react'
import { AddCircleIcon } from '@solar-icons/react/linear/add-circle'

export default function TaskForm({ groupId, onAddTask }) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()

    if (!cleanTitle) {
      setError('Enter a task before adding it.')
      return
    }

    onAddTask(groupId, cleanTitle)
    setTitle('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-3 sm:flex sm:items-start sm:gap-3 sm:p-4">
      <div className="min-w-0 flex-1">
        <label htmlFor="new-task" className="sr-only">New task</label>
        <input
          id="new-task"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError('')
          }}
          maxLength={120}
          placeholder="What needs to get done?"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'task-form-error' : undefined}
          className="min-h-11 w-full rounded-xl bg-transparent px-3 text-base text-ink outline-none placeholder:text-muted/75 focus-visible:ring-2 focus-visible:ring-accent"
        />
        {error && <p id="task-form-error" role="alert" className="px-3 pb-1 text-sm text-red-700">{error}</p>}
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:mt-0 sm:w-auto"
      >
        <AddCircleIcon size={18} aria-hidden="true" />
        Add task
      </button>
    </form>
  )
}
