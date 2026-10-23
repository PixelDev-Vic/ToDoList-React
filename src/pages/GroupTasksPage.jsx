import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '@solar-icons/react/linear/arrow-left'
import { TrashBinTrashIcon } from '@solar-icons/react/linear/trash-bin-trash'
import TaskForm from '../components/TaskForm.jsx'
import TaskList from '../components/TaskList.jsx'

export default function GroupTasksPage({ groups, tasks, onAddTask, onToggleTask, onDeleteTask, onUpdateTaskDetails, onRequestDeleteGroup }) {
  const { groupId } = useParams()
  const group = groups.find((item) => item.id === groupId)

  if (!group) {
    return (
      <section className="mx-auto max-w-xl rounded-3xl border border-line bg-white px-6 py-10 text-center sm:px-10" aria-labelledby="missing-group-title">
        <p className="text-sm font-medium text-accent">Group not found</p>
        <h1 id="missing-group-title" className="mt-2 text-2xl font-semibold tracking-tight text-ink">This group is no longer here.</h1>
        <p className="mt-2 text-sm leading-6 text-muted">It may have been removed, or the link may be incorrect.</p>
        <Link to="/groups" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <ArrowLeftIcon size={17} aria-hidden="true" />
          Back to groups
        </Link>
      </section>
    )
  }

  const groupTasks = tasks.filter((task) => task.groupId === group.id)
  const pendingCount = groupTasks.filter((task) => !task.completed).length

  return (
    <div className="space-y-9">
      <section>
        <Link to="/groups" className="inline-flex min-h-9 items-center gap-2 rounded-lg pr-2 text-sm font-medium text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <ArrowLeftIcon size={17} aria-hidden="true" />
          All groups
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="break-words text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl">{group.name}</h1>
          </div>
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <p className="text-sm text-muted">
              {pendingCount} {pendingCount === 1 ? 'task' : 'tasks'} to do
            </p>
            <button
              type="button"
              onClick={() => onRequestDeleteGroup(group)}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-line px-3 text-sm font-medium text-muted transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <TrashBinTrashIcon size={17} aria-hidden="true" />
              Delete group
            </button>
          </div>
        </div>
      </section>

      <section aria-labelledby="add-task-title" className="space-y-3">
        <div>
          <h2 id="add-task-title" className="text-base font-semibold text-ink">Add a task</h2>
          <p className="mt-1 text-sm text-muted">New tasks will be added to {group.name}.</p>
        </div>
        <TaskForm groupId={group.id} onAddTask={onAddTask} />
      </section>

      <section aria-labelledby="group-task-list-title" className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="group-task-list-title" className="text-base font-semibold text-ink">Tasks in {group.name}</h2>
          <span className="text-xs text-muted">{groupTasks.length} total</span>
        </div>
        <TaskList
          tasks={groupTasks}
          groups={groups}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onUpdateTaskDetails={onUpdateTaskDetails}
          emptyMessage="Add a task above and it will show up here."
        />
      </section>
    </div>
  )
}
