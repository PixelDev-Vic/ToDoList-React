import { useEffect, useRef } from 'react'
import { TrashBinTrashIcon } from '@solar-icons/react/linear/trash-bin-trash'

export default function DeleteGroupDialog({ group, taskCount, onCancel, onConfirm }) {
  const dialogRef = useRef(null)
  const cancelButtonRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    if (!dialog.open) dialog.showModal()
    cancelButtonRef.current?.focus()

    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  function handleCancel(event) {
    event.preventDefault()
    onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      aria-labelledby="delete-group-title"
      aria-describedby="delete-group-description"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-line bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/35"
    >
      <div className="p-6 sm:p-7">
        <span className="grid size-11 place-items-center rounded-2xl bg-red-50 text-red-700">
          <TrashBinTrashIcon size={21} aria-hidden="true" />
        </span>
        <h2 id="delete-group-title" className="mt-5 break-words text-xl font-semibold tracking-tight text-ink">
          Delete “{group.name}”?
        </h2>
        <p id="delete-group-description" className="mt-2 text-sm leading-6 text-muted">
          {taskCount > 0
            ? `This will also delete ${taskCount} ${taskCount === 1 ? 'task' : 'tasks'} in this group.`
            : 'This group has no tasks.'}{' '}
          You can undo this for a few seconds after deleting.
        </p>
        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-xl border border-line px-4 text-sm font-semibold text-ink transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            <TrashBinTrashIcon size={17} aria-hidden="true" />
            Delete group
          </button>
        </div>
      </div>
    </dialog>
  )
}
