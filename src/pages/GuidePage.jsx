import { CheckCircleIcon } from '@solar-icons/react/linear/check-circle'

const instructions = [
  {
    title: 'Create a quick note',
    description: 'On Overview, add a title and optional note. It starts as Ungrouped, so you can capture it before deciding where it belongs.',
  },
  {
    title: 'Assign a note to a group',
    description: 'Choose the pencil button beside a task, then use Group to move it into a group. Choose Ungrouped to remove its group.',
  },
  {
    title: 'Create a group',
    description: 'Open Groups, enter a name such as a class or project, then choose Add group.',
  },
  {
    title: 'Add tasks to it',
    description: 'Open the group you want. Enter a task in the field at the top and choose Add task.',
  },
  {
    title: 'Change its status',
    description: 'Select the circle beside a task to mark it Done. Select it again to return it to Not done.',
  },
  {
    title: 'Delete or undo',
    description: 'Choose the trash icon to delete a task. Use Undo in the message that appears if you change your mind.',
  },
  {
    title: 'Move around',
    description: 'Use the navigation to return to Overview, open Groups, read this Guide, or view Developers.',
  },
]

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-9">
      <section>
        <p className="mb-3 text-sm font-medium text-accent">A short walkthrough</p>
        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl">Using Daybook</h1>
      </section>

      <ol className="divide-y divide-line rounded-2xl border border-line bg-white px-5 sm:px-7">
        {instructions.map((instruction, index) => (
          <li key={instruction.title} className="flex gap-4 py-5 sm:gap-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-sm font-semibold text-accent">
              {index + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <h2 className="text-sm font-semibold text-ink">{instruction.title}</h2>
              <p className="mt-1 text-sm leading-6 text-muted">{instruction.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="flex items-start gap-2.5 rounded-2xl bg-accent-soft/70 px-4 py-4 text-sm leading-6 text-ink/80">
        <CheckCircleIcon size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        Your task counts update automatically whenever you add, complete, reopen, or delete a task.
      </p>
    </div>
  )
}
