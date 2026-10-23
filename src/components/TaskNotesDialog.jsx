import { useEffect, useRef, useState } from 'react'
import { AltArrowDownIcon } from '@solar-icons/react/linear/alt-arrow-down'
import { CheckCircleIcon } from '@solar-icons/react/linear/check-circle'

export default function TaskNotesDialog({ task, groups, onClose, onUpdateTaskDetails }) {
  const dialogRef = useRef(null)
  const titleRef = useRef(null)
  const groupPickerButtonRef = useRef(null)
  const [titleDraft, setTitleDraft] = useState(task.title)
  const [titleError, setTitleError] = useState('')
  const [groupPickerOpen, setGroupPickerOpen] = useState(false)
  const description = task.description ?? ''
  const time = task.time ?? ''
  const selectedGroupName = groups.find((group) => group.id === task.groupId)?.name ?? 'Ungrouped'
  const groupOptions = [{ id: '', name: 'Ungrouped' }, ...groups]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    if (!dialog.open) dialog.showModal()
    titleRef.current?.focus()

    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  function handleCancel(event) {
    event.preventDefault()
    if (titleDraft.trim()) commitTitle()
    onClose()
  }

  function commitTitle() {
    const cleanTitle = titleDraft.trim()

    if (!cleanTitle) {
      setTitleError('Enter a task title.')
      return false
    }

    if (cleanTitle !== task.title) {
      onUpdateTaskDetails(task.id, { title: cleanTitle })
    }
    if (cleanTitle !== titleDraft) setTitleDraft(cleanTitle)
    setTitleError('')
    return true
  }

  function handleDone() {
    if (commitTitle()) onClose()
  }

  function handleGroupPickerKeyDown(event) {
    if (event.key !== 'Escape' || !groupPickerOpen) return
    event.preventDefault()
    event.stopPropagation()
    setGroupPickerOpen(false)
    groupPickerButtonRef.current?.focus()
  }

  function handleGroupChange(groupId) {
    onUpdateTaskDetails(task.id, { groupId: groupId || null })
    setGroupPickerOpen(false)
    groupPickerButtonRef.current?.focus()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      aria-labelledby="task-notes-title"
      className="fixed inset-0 m-0 h-dvh max-h-dvh w-full max-w-none overflow-hidden border-0 bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/35 sm:inset-0 sm:m-auto sm:h-auto sm:max-h-[90dvh] sm:max-w-2xl sm:rounded-3xl sm:border sm:border-line"
    >
      <div className="flex h-full min-h-0 flex-col sm:max-h-[90dvh]">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line bg-white px-5 py-4 sm:px-8 sm:py-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">Task details</p>
            <h2 id="task-notes-title" className="mt-1 break-words text-xl font-semibold leading-7 text-ink sm:text-2xl">
              {task.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleDone}
            className="min-h-10 shrink-0 rounded-xl bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Done
          </button>
        </header>

        <div className="app-scrollbar min-h-0 flex-1 overflow-y-auto bg-canvas px-5 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-xl">
            <div className="mb-5">
              <label htmlFor={`task-title-${task.id}`} className="mb-2 block text-sm font-semibold text-ink">
                Task title
              </label>
              <input
                ref={titleRef}
                id={`task-title-${task.id}`}
                type="text"
                value={titleDraft}
                onChange={(event) => {
                  setTitleDraft(event.target.value)
                  if (titleError) setTitleError('')
                }}
                onBlur={commitTitle}
                maxLength={120}
                aria-invalid={Boolean(titleError)}
                aria-describedby={titleError ? `task-title-error-${task.id}` : undefined}
                className="h-11 min-h-11 w-full rounded-xl border border-line bg-white px-4 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
              {titleError && (
                <p id={`task-title-error-${task.id}`} role="alert" className="mt-1 text-sm text-red-700">
                  {titleError}
                </p>
              )}
            </div>
            <div className="mb-5" onKeyDown={handleGroupPickerKeyDown}>
              <label htmlFor={`task-group-${task.id}`} className="mb-2 block text-sm font-semibold text-ink">
                Group
              </label>
              <button
                ref={groupPickerButtonRef}
                id={`task-group-${task.id}`}
                type="button"
                aria-label={`Group: ${selectedGroupName}`}
                aria-expanded={groupPickerOpen}
                aria-controls={`task-group-options-${task.id}`}
                onClick={() => setGroupPickerOpen((open) => !open)}
                className="flex h-11 min-h-11 w-full items-center justify-between rounded-xl border border-line bg-white px-4 text-left text-base text-ink transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>{selectedGroupName}</span>
                <AltArrowDownIcon
                  size={18}
                  aria-hidden="true"
                  className={groupPickerOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                />
              </button>
              <fieldset
                id={`task-group-options-${task.id}`}
                hidden={!groupPickerOpen}
                className="app-scrollbar mt-2 max-h-48 overflow-y-auto rounded-xl border border-line bg-white p-1"
              >
                <legend className="sr-only">Choose a group</legend>
                {groupOptions.map((group) => {
                  const selected = (task.groupId ?? '') === group.id
                  return (
                    <label key={group.id || 'ungrouped'} className="block cursor-pointer">
                      <input
                        type="radio"
                        name={`task-group-choice-${task.id}`}
                        value={group.id}
                        checked={selected}
                        onChange={() => handleGroupChange(group.id)}
                        className="peer sr-only"
                      />
                      <span className={[
                        'flex min-h-10 items-center justify-between rounded-lg px-3 text-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[-2px] peer-focus-visible:outline-accent',
                        selected ? 'bg-accent-soft font-medium text-accent' : 'text-ink hover:bg-canvas',
                      ].join(' ')}>
                        {group.name}
                        {selected && <CheckCircleIcon size={18} aria-hidden="true" />}
                      </span>
                    </label>
                  )
                })}
              </fieldset>
            </div>
            <label htmlFor={`task-note-${task.id}`} className="mb-2 block text-sm font-semibold text-ink">
              Description
            </label>
            <textarea
              id={`task-note-${task.id}`}
              value={description}
              onChange={(event) => onUpdateTaskDetails(task.id, { description: event.target.value })}
              maxLength={2000}
              rows={6}
              placeholder="Write notes, steps, or anything you want to remember…"
              className="app-scrollbar min-h-[180px] w-full resize-none overflow-y-auto rounded-2xl border border-line bg-white px-5 py-4 text-base leading-7 text-ink shadow-sm outline-none placeholder:text-muted/75 focus-visible:ring-2 focus-visible:ring-accent sm:min-h-[320px]"
            />

            <section aria-labelledby={`task-time-heading-${task.id}`} className="mt-5 rounded-2xl border border-line bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 id={`task-time-heading-${task.id}`} className="text-sm font-semibold text-ink">Add a time</h3>
                  <p className="mt-1 text-xs text-muted">Optional reminder time for this task.</p>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={`task-time-${task.id}`} className="sr-only">Task time</label>
                  <input
                    id={`task-time-${task.id}`}
                    type="time"
                    step="60"
                    value={time}
                    onChange={(event) => onUpdateTaskDetails(task.id, { time: event.target.value })}
                    className="min-h-11 w-36 rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  />
                  {time && (
                    <button
                      type="button"
                      onClick={() => onUpdateTaskDetails(task.id, { time: '' })}
                      aria-label={`Clear time for ${task.title}`}
                      className="min-h-10 rounded-lg px-2 text-xs font-medium text-muted hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </section>

            <p className="mt-4 text-xs leading-5 text-muted">Changes save automatically on this device.</p>
          </div>
        </div>
      </div>
    </dialog>
  )
}
