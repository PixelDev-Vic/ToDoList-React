import { UserIcon } from '@solar-icons/react/linear/user'

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-9">
      <section>
        <p className="mb-3 text-sm font-medium text-accent">The people behind the project</p>
        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl">Developers</h1>
      </section>

      <section aria-labelledby="member-placeholder-title" className="rounded-2xl border border-line bg-white p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
            <UserIcon size={21} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="member-placeholder-title" className="text-base font-semibold text-ink">Group member details</h2>
            <dl className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-muted">Complete name</dt>
                <dd className="mt-1 text-sm font-medium text-ink">Victor Emmanuel S. Pascua</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted">Role or contribution</dt>
                <dd className="mt-1 text-sm font-medium text-ink">Lead Developer</dd>
              </div>
            </dl>

            <dl className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-muted">Complete name</dt>
                <dd className="mt-1 text-sm font-medium text-ink">Christian Busante</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted">Role or contribution</dt>
                <dd className="mt-1 text-sm font-medium text-ink">Developer</dd>
              </div>
            </dl>

            <dl className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-muted">Complete name</dt>
                <dd className="mt-1 text-sm font-medium text-ink">Jashley Ibo</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted">Role or contribution</dt>
                <dd className="mt-1 text-sm font-medium text-ink">Developer</dd>
              </div>
            </dl>

            <dl className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-muted">Complete name</dt>
                <dd className="mt-1 text-sm font-medium text-ink">Jojie Francisco</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted">Role or contribution</dt>
                <dd className="mt-1 text-sm font-medium text-ink">Developer</dd>
              </div>
            </dl>

          </div>
        </div>
      </section>
    </div>
  )
}
