import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-line bg-white px-6 py-10 text-center sm:px-10" aria-labelledby="not-found-title">
      <p className="text-sm font-medium text-accent">Page not found</p>
      <h1 id="not-found-title" className="mt-2 text-2xl font-semibold tracking-tight text-ink">Let’s get you back on track.</h1>
      <p className="mt-2 text-sm leading-6 text-muted">That address does not match a page in Daybook.</p>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        Go to overview
      </Link>
    </section>
  )
}
