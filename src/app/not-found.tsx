import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <span className="text-5xl font-bold text-zinc-300 dark:text-zinc-600">404</span>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">Page not found</h1>
        <p className="mt-2 text-zinc-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Go home
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
