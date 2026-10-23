import { useState } from 'react'
import { CheckCircleIcon } from '@solar-icons/react/linear/check-circle'
import { Pen2Icon } from '@solar-icons/react/linear/pen-2'
import { TrashBinTrashIcon } from '@solar-icons/react/linear/trash-bin-trash'
import TaskNotesDialog from './TaskNotesDialog.jsx'

function formatTime(time) {
  if (!time) return ''
  const [hourPart, minute] = time.split(':')
  const hour = Number(hourPart)
  const period = hour >= 12 ? 'PM' : 'AM'
  return `${hour % 12 || 12}:${minute} ${period}`
}

export default function TaskList({ tasks, groups, onToggleTask, onDeleteTask, onUpdateTaskDetails, emptyMessage }) {
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const groupNames = new Map(groups.map((group) => [group.id, group.name]))
  const selectedTask = tasks.find((task) => task.id === selectedTaskId)

  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line px-5 py-10 text-center">
        <p className="text-sm font-medium text-ink">Nothing here yet</p>
        <p className="mt-1 text-sm text-muted">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <>
      <ul className="space-y-2.5">
        {tasks.map((task) => {
        const description = task.description ?? ''
        const time = task.time ?? ''
        const groupName = groupNames.get(task.groupId) ?? 'Ungrouped'

        return (
          <li key={task.id} className="group grid grid-cols-[2.5rem_minmax(0,1fr)_5.25rem] items-start gap-2 rounded-2xl border border-line bg-white px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
            <button
              type="button"
              role="checkbox"
              aria-checked={task.completed}
              aria-label={task.completed ? `Mark ${task.title} as not done` : `Mark ${task.title} as done`}
              onClick={() => onToggleTask(task.id)}
              className={[
                'mt-1 grid size-10 shrink-0 place-items-center rounded-xl transition-colors active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent',
                task.completed ? 'text-accent' : 'text-muted hover:bg-accent-soft hover:text-accent',
              ].join(' ')}
            >
              <span className={[
                'grid size-[21px] place-items-center rounded-full border transition-colors',
                task.completed ? 'border-accent bg-accent text-white' : 'border-[#b6c9f0] bg-white',
              ].join(' ')}>
                {task.completed && <CheckCircleIcon size={19} aria-hidden="true" />}
              </span>
            </button>

            <div className="min-w-0">
              <div className="break-words text-sm font-medium leading-5 sm:text-[15px]">
                <span className={task.completed ? 'text-muted line-through decoration-muted/60' : 'text-ink'}>
                  {task.title}
                </span>
              </div>
              {description && <p className="mt-1 max-w-[42ch] truncate text-xs text-muted">{description}</p>}
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                <span>{groupName}</span>
                {time && <span>At {formatTime(time)}</span>}
                <span>{task.completed ? 'Done' : 'Not done'}</span>
              </div>
            </div>

            <div className="mt-0.5 flex items-center justify-end gap-1">
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Edit title and details for ${task.title}`}
                title="Edit task"
                onClick={() => setSelectedTaskId(task.id)}
                className="grid size-10 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
              >
                <Pen2Icon size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteTask(task.id)}
                aria-label={`Delete ${task.title}`}
                title="Delete task"
                className="grid size-10 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
              >
                <TrashBinTrashIcon size={19} aria-hidden="true" />
              </button>
            </div>
          </li>
        )
        })}
      </ul>
      {selectedTask && (
        <TaskNotesDialog
          task={selectedTask}
          groups={groups}
          onClose={() => setSelectedTaskId(null)}
          onUpdateTaskDetails={onUpdateTaskDetails}
        />
      )}
    </>
  )
}
