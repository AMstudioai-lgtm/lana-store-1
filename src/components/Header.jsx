import { useEffect, useState } from 'react'
import { ChevronDown, Bag } from './icons'
import { usePanier } from '../context/panier'

const MENU = [
  { label: 'Accueil', href: '#accueil' },
  {
    label: 'Catalogue',
    href: '#catalogue',
    // sous-catalogues affichés directement, sans dépliement
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

/* Burger à la apple.com : une SEULE colonne verticale, chaque entrée
   occupe sa propre ligne (filet fin entre elles), les sous-catalogues
   en dessous du lien Catalogue, aussi disposés verticalement.
   Le panneau se déplie SOUS le header, fondu progressif d'entrée. */
export default function Header() {
  const [open, setOpen] = useState(false)
  const { nombre, ouvrir } = usePanier()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const ouvrirPanier = () => {
    setOpen(false)
    ouvrir()
  }

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

        {/* Panier + burger */}
        <div className="relative z-40 flex items-center gap-2">
          <button
            type="button"
            aria-label="Ouvrir le panier"
            onClick={ouvrirPanier}
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
          >
            <Bag className="h-[18px] w-[18px] text-neutral-900" />
            {nombre > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-neutral-900 px-1 text-[9px] font-medium text-white">
                {nombre}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
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
      </div>

      {/* Voile derrière le panneau : le contenu de la page se floute */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-16 z-10 bg-white/40 backdrop-blur-sm transition-opacity duration-700 md:top-20 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Colonne verticale appendait ; sous le header (style apple.com) */}
      <div
        className={`relative z-20 overflow-y-auto transition-[max-height] duration-700 ease-[cubic-bezier(0.24,0.9,0.35,1)] ${
          open ? 'max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-5rem)]' : 'max-h-0'
        }`}
      >
        <div className="min-h-full border-b border-neutral-100 bg-white/85 px-6 py-7 backdrop-blur-2xl md:px-10">
          <ul className="mx-auto max-w-3xl">
            {MENU.map((l, i) => (
              <li
                key={l.label}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
                className={`transition-all duration-700 ease-out ${
                  open ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-3 opacity-0 blur-[6px]'
                }`}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-neutral-100 py-4"
                >
                  <span className="font-display text-2xl text-neutral-900 transition-colors group-hover:text-lana-grey md:text-3xl">
                    {l.label}
                  </span>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-neutral-300 transition-transform group-hover:translate-x-1" />
                </a>
                {l.subs && l.subs.map((s, j) => (
                  <div
                    key={s}
                    style={{ transitionDelay: open ? `${140 + i * 60 + j * 40}ms` : '0ms' }}
                    className={`transition-all duration-700 ease-out ${
                      open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}
                  >
                    <a
                      href="#catalogue"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-neutral-100/80 py-2.5 pl-5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                      {s}
                      <span aria-hidden="true" className="h-px w-4 bg-neutral-200" />
                    </a>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
