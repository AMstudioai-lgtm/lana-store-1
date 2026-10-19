import { useEffect, useState } from 'react'
import { ChevronDown } from './icons'
import useReveal from '../hooks/useReveal'

const SOUS_CATALOGUE = ['Parfum', 'Chaussure', 'Maillot', 'Montre', 'Sac']

// Footer noir : nom, email, horaires, Haïti + sobre-catalogue dépliable
// (les sous-sections se décalent vers la droite au déploiement).
export default function Footer() {
  const ref = useReveal()
  const [ouvert, setOuvert] = useState(false)

  // Déployé par défaut sur grand écran
  useEffect(() => {
    setOuvert(window.innerWidth >= 1024)
  }, [])

  return (
    <footer id="contact" ref={ref} className="bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="reveal grid gap-14 md:grid-cols-2">
          {/* entreprise */}
          <div>
            <h3 className="font-display text-2xl text-white md:text-3xl">Lana Store</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
              La boutique élégante d'Haïti — mode, parfums et montres sélectionnés à la main.
            </p>
            <ul className="mt-8 space-y-4 text-sm leading-relaxed">
              <li>
                <a
                  href="mailto:contact@lanastore.ht"
                  className="border-b border-neutral-800 pb-0.5 text-neutral-200 transition-colors hover:text-white"
                >
                  contact@lanastore.ht
                </a>
              </li>
              <li>
                Ouverture —{' '}
                <span className="text-neutral-200">Lun – Sam, 9 h 00 à 18 h 00</span>
              </li>
              <li>
                <span className="text-neutral-200">Port-au-Prince, Haïti</span>
              </li>
            </ul>
          </div>

          {/* catalogue dépliable, colonne décalée vers la droite */}
          <div className="md:justify-self-end md:w-80">
            <button
              type="button"
              aria-expanded={ouvert}
              onClick={() => setOuvert((o) => !o)}
              className="flex w-full items-center justify-between border-b border-neutral-800 pb-4 text-[11px] tracking-[0.35em] text-white uppercase transition-colors hover:text-neutral-300"
            >
              Catalogue
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-500 ${ouvert ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-out ${
                ouvert ? 'max-h-80' : 'max-h-0'
              }`}
            >
              <ul className="mt-5">
                {SOUS_CATALOGUE.map((s, i) => (
                  <li
                    key={s}
                    style={{ transitionDelay: ouvert ? `${i * 60}ms` : '0ms' }}
                    className={`border-l border-neutral-800 pl-6 text-sm transition-all duration-500 ${
                      ouvert ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-0'
                    }`}
                  >
                    <a
                      href="#catalogue"
                      className="block py-1.5 text-neutral-400 transition-colors hover:text-white"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 py-6 text-center text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
        © {new Date().getFullYear()} Lana Store — Démo design
      </div>
    </footer>
  )
}
