import { useState } from 'react'
import { AddCircleIcon } from '@solar-icons/react/linear/add-circle'
import GroupCard from '../components/GroupCard.jsx'

export default function GroupsPage({ groups, tasks, onAddGroup, onRequestDeleteGroup }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanName = name.trim()

    if (!cleanName) {
      setError('Enter a name for your group.')
      return
    }

    const result = onAddGroup(cleanName)
    if (result.error) {
      setError(result.error)
      return
    }

    setName('')
    setError('')
  }

  return (
    <div className="space-y-9">
      <section>
        <p className="mb-3 text-sm font-medium text-accent">Organize your work</p>
        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl">Groups</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
          Create a group for each class, project, or part of your day.
        </p>
      </section>

      <section aria-labelledby="create-group-title" className="space-y-3">
        <div>
          <h2 id="create-group-title" className="text-base font-semibold text-ink">Create a group</h2>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-3 sm:flex sm:items-start sm:gap-3 sm:p-4">
          <div className="min-w-0 flex-1">
            <label htmlFor="new-group" className="sr-only">Group name</label>
            <input
              id="new-group"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                if (error) setError('')
              }}
              maxLength={48}
              placeholder="For example, Biology lab"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'group-form-error' : undefined}
              className="min-h-11 w-full rounded-xl bg-transparent px-3 text-base text-ink outline-none placeholder:text-muted/75 focus-visible:ring-2 focus-visible:ring-accent"
            />
            {error && <p id="group-form-error" role="alert" className="px-3 pb-1 text-sm text-red-700">{error}</p>}
          </div>
          <button type="submit" className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:mt-0 sm:w-auto">
            <AddCircleIcon size={18} aria-hidden="true" />
            Add group
          </button>
        </form>
      </section>

      <section aria-labelledby="all-groups-title" className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="all-groups-title" className="text-base font-semibold text-ink">All groups</h2>
          <span className="text-xs text-muted">{groups.length} total</span>
        </div>
        {groups.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {groups.map((group) => {
              const groupTasks = tasks.filter((task) => task.groupId === group.id)
              return (
                <GroupCard
                  key={group.id}
                  group={group}
                  taskCount={groupTasks.length}
                  pendingCount={groupTasks.filter((task) => !task.completed).length}
                  onRequestDeleteGroup={onRequestDeleteGroup}
                />
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line px-5 py-10 text-center">
            <p className="text-sm font-medium text-ink">No groups yet</p>
            <p className="mt-1 text-sm text-muted">Create one above, then add tasks inside it.</p>
          </div>
        )}
      </section>
    </div>
  )
}
