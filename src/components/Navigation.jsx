import { Link, NavLink } from 'react-router-dom'
import { FolderIcon } from '@solar-icons/react/linear/folder'
import { HomeIcon } from '@solar-icons/react/linear/home'
import { QuestionCircleIcon } from '@solar-icons/react/linear/question-circle'
import { UserIcon } from '@solar-icons/react/linear/user'

const navigationItems = [
  { to: '/home', label: 'Overview', Icon: HomeIcon, end: true },
  { to: '/groups', label: 'Groups', Icon: FolderIcon },
  { to: '/guide', label: 'Guide', Icon: QuestionCircleIcon },
  { to: '/developers', label: 'Developers', Icon: UserIcon },
]

function linkClassName({ isActive }) {
  return [
    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150',
    isActive
      ? 'bg-accent-soft text-accent'
      : 'text-muted hover:bg-white hover:text-ink',
  ].join(' ')
}

function NavigationLinks({ mobile = false }) {
  return navigationItems.map(({ to, label, Icon, end }) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      className={mobile ? 'mobile-nav-link' : linkClassName}
    >
      <Icon size={20} aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  ))
}

export function DesktopNavigation() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-line bg-white px-5 py-7 lg:flex">
      <Link to="/home" className="mb-11 flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
        <img src="/icons/daybook-icon.png" alt="" aria-hidden="true" className="size-10 rounded-[14px] object-cover" />
        <span>
          <span className="block text-base font-semibold tracking-tight text-ink">Daybook</span>
          <span className="mt-0.5 block text-xs text-muted">A place for your next step</span>
        </span>
      </Link>

      <p className="mb-3 px-3 text-xs font-semibold text-muted">Workspace</p>
      <nav aria-label="Main navigation" className="flex flex-col gap-1">
        <NavigationLinks />
      </nav>
    </aside>
  )
}

export function MobileNavigation() {
  return (
    <nav
      aria-label="Main navigation"
      className="mobile-nav fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-white px-2 pt-2 lg:hidden"
    >
      <NavigationLinks mobile />
    </nav>
  )
}
