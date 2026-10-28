import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@solar-icons/react/linear/arrow-right'
import QuickNoteForm from '../components/QuickNoteForm.jsx'
import StatSummary from '../components/StatSummary.jsx'
import TaskList from '../components/TaskList.jsx'

export default function DashboardPage({ tasks, groups, onAddTask, onToggleTask, onDeleteTask, onUpdateTaskDetails }) {
  const orderedTasks = [...tasks].sort((first, second) => Number(first.completed) - Number(second.completed))

  return (
    <div className="space-y-10">
      <section aria-labelledby="dashboard-title">
        <p className="mb-3 text-sm font-medium text-accent">Overview</p>
        <h1 id="dashboard-title" className="max-w-2xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-ink">
          Welcome, user!
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
          Here is your task overview. Track your progress, review completed and pending tasks, and organize your work into groups.
        </p>
      </section>

      <section aria-label="Task summary">
        <StatSummary tasks={tasks} />
      </section>

      <section aria-labelledby="quick-note-title" className="space-y-3">
        <div>
          <h2 id="quick-note-title" className="text-lg font-semibold tracking-tight text-ink">Quick note</h2>
        </div>
        <QuickNoteForm onAddTask={onAddTask} />
      </section>

      <section aria-labelledby="recent-tasks-title" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="recent-tasks-title" className="text-lg font-semibold tracking-tight text-ink">Your tasks</h2>
            <p className="mt-1 text-sm text-muted">Add a quick note or open a group to organize tasks.</p>
          </div>
          <Link to="/groups" className="inline-flex shrink-0 items-center gap-1.5 rounded-lg py-2 text-sm font-semibold text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            View groups <ArrowRightIcon size={16} aria-hidden="true" />
          </Link>
        </div>
        <TaskList
          tasks={orderedTasks}
          groups={groups}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onUpdateTaskDetails={onUpdateTaskDetails}
          emptyMessage="Add a quick note above, then organize it whenever you like."
        />
      </section>
    </div>
  )
}
