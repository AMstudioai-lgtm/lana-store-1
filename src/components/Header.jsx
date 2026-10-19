import { useEffect, useState } from 'react'
import { ChevronDown } from './icons'

const MENU = [
  { label: 'Accueil', href: '#accueil' },
  {
    label: 'Catalogue',
    href: '#catalogue',
    // sous-catalogues affichés en dessous du lien, sans dépliement
    subs: ['Chaussure', 'Maillot', 'Parfum', 'Montre', 'Sac'],
  },
  { label: 'Promesses & Garanties', href: '#promesses' },
  { label: 'Contact', href: '#contact' },
]

const NAV_DESKTOP = [
  { label: 'Catalogue', href: '#catalogue' },
  { label: 'Promesses', href: '#promesses' },
  { label: 'Contact', href: '#contact' },
]

// Burger à la apple.com : le panneau se déplie SOUS le header,
// avec un fondu progressif de chaque entrée et un voile flouté derrière.
export default function Header() {
  const [open, setOpen] = useState(false)

  // On bloque le scroll de la page quand le menu est déplié
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Barre principale */}
      <div className="relative z-30 flex h-16 items-center justify-between border-b border-neutral-100 bg-white/70 px-5 backdrop-blur-xl md:h-20 md:px-10">
        <a
          href="#accueil"
          onClick={() => setOpen(false)}
          className="font-medium tracking-[0.35em] text-neutral-900"
        >
          LANA&nbsp;STORE
        </a>

        {/* Liens directs sur desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_DESKTOP.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[11px] tracking-[0.25em] uppercase text-lana-grey transition-colors hover:text-neutral-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Burger */}
        <button
          type="button"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="relative z-40 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
        >
          <span
            className={`block h-px w-5 bg-neutral-900 transition-transform duration-500 ${
              open ? 'translate-y-[3px] rotate-45' : 'translate-y-[-2px]'
            }`}
          />
          <span
            className={`absolute block h-px w-5 bg-neutral-900 transition-transform duration-500 ${
              open ? '-translate-y-[1px] -rotate-45' : 'translate-y-[3px]'
            }`}
          />
        </button>
      </div>

      {/* Voile derrière le panneau : le contenu de la page se floute */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-16 z-10 bg-white/40 backdrop-blur-sm transition-opacity duration-700 md:top-20 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panneau déroulant sous le header (style apple.com) */}
      <div
        className={`relative z-20 overflow-hidden transition-[max-height] duration-700 ease-[cubic-bezier(0.24,0.9,0.35,1)] ${
          open ? 'max-h-[560px]' : 'max-h-0'
        }`}
      >
        <div className="border-b border-neutral-100 bg-white/85 px-6 py-10 backdrop-blur-2xl md:px-16">
          <ul className="mx-auto max-w-3xl">
            {MENU.map((l, i) => (
              <li
                key={l.label}
                style={{ transitionDelay: open ? `${140 + i * 70}ms` : '0ms' }}
                className={`transition-all duration-700 ease-out ${
                  open ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-3 opacity-0 blur-[6px]'
                }`}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-neutral-100 py-3"
                >
                  <span className="font-display text-2xl text-neutral-900 transition-colors group-hover:text-lana-grey md:text-3xl">
                    {l.label}
                  </span>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-neutral-300 transition-transform group-hover:translate-x-1" />
                </a>
                {l.subs && (
                  <ul className="flex flex-wrap gap-x-6 gap-y-1.5 border-b border-neutral-100 pb-4 pl-1 md:pl-5">
                    {l.subs.map((s) => (
                      <li key={s}>
                        <a
                          href="#catalogue"
                          onClick={() => setOpen(false)}
                          className="text-[11px] tracking-[0.3em] uppercase text-lana-grey transition-colors hover:text-neutral-900"
                        >
                          {s}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
