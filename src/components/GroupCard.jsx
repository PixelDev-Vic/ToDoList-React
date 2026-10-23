import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@solar-icons/react/linear/arrow-right'
import { FolderIcon } from '@solar-icons/react/linear/folder'
import { TrashBinTrashIcon } from '@solar-icons/react/linear/trash-bin-trash'

export default function GroupCard({ group, taskCount, pendingCount, onRequestDeleteGroup }) {
  return (
    <article className="flex min-h-24 items-center gap-1 rounded-2xl border border-line bg-white p-2 transition-colors hover:border-accent/35">
      <Link
        to={`/groups/${group.id}`}
        className="flex min-w-0 flex-1 items-center gap-4 rounded-xl px-2 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
          <FolderIcon size={21} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="truncate text-sm font-semibold text-ink">{group.name}</span>
          </span>
          <span className="mt-1 block text-xs text-muted">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'} · {pendingCount} to do
          </span>
        </span>
        <ArrowRightIcon size={18} className="shrink-0 text-muted" aria-hidden="true" />
      </Link>
      <button
        type="button"
        onClick={() => onRequestDeleteGroup(group)}
        aria-label={`Delete ${group.name}`}
        title={`Delete ${group.name}`}
        className="grid size-10 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <TrashBinTrashIcon size={19} aria-hidden="true" />
      </button>
    </article>
  )
}
