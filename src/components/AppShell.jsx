import { Link, Outlet } from 'react-router-dom'
import { DesktopNavigation, MobileNavigation } from './Navigation.jsx'

export default function AppShell({ undoEntry, onUndo, onDismissUndo }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-white px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:ring-2 focus-visible:ring-accent"
      >
        Skip to content
      </a>

      <DesktopNavigation />

      <header className="flex h-16 items-center justify-between border-b border-line bg-canvas/95 px-5 lg:hidden">
        <Link to="/home" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <img src="/icons/daybook-icon.png" alt="" aria-hidden="true" className="size-8 rounded-xl object-cover" />
          <span className="font-semibold tracking-tight">Daybook</span>
        </Link>
        <span className="text-xs text-muted">To-do list</span>
      </header>

      <div className="min-h-screen lg:pl-64">
        <main id="main-content" className="mx-auto w-full max-w-5xl px-5 pb-32 pt-9 sm:px-8 sm:pt-12 lg:px-12 lg:pb-16 lg:pt-14">
          <Outlet />
        </main>
      </div>

      <MobileNavigation />

      {undoEntry && (
        <div
          className="fixed bottom-20 left-4 right-4 z-40 mx-auto flex max-w-md items-center justify-between gap-4 rounded-2xl border border-line bg-white px-4 py-3 shadow-lg shadow-ink/10 lg:bottom-6"
          role="status"
          aria-live="polite"
        >
          <span className="min-w-0 truncate text-sm text-ink">
            {undoEntry.kind === 'group'
              ? `Group “${undoEntry.group.name}”${undoEntry.groupTaskCount > 0 ? ` and ${undoEntry.groupTaskCount} ${undoEntry.groupTaskCount === 1 ? 'task' : 'tasks'}` : ''} deleted`
              : 'Task deleted'}
          </span>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={onUndo}
              className="rounded-lg px-2 py-1 text-sm font-semibold text-accent hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Undo
            </button>
            <button
              type="button"
              onClick={onDismissUndo}
              aria-label="Dismiss deletion message"
              className="rounded-lg px-1.5 py-1 text-sm text-muted hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
