import { useState } from 'react'
import { CATEGORIES } from '../data/catalogue'
import useReveal from '../hooks/useReveal'

/* Carte produit : image dans un carré, prix dans un rectangle à bordure sèche */
function CarteProduit({ p }) {
  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 text-[13px] leading-snug text-neutral-700 transition-colors group-hover:text-neutral-900">
        {p.name}
      </h3>
      {/* rectangle bordé sec : 1 px, angles vifs, aucun arrondi, aucune ombre */}
      <p className="mt-2 inline-block border border-neutral-300 px-3 py-1.5 text-xs tracking-widest text-neutral-900">
        $ {p.prix}
      </p>
    </article>
  )
}

// Catalogue : mots-clés horizontaux sélectionnables -> groupe de produits distinct par catégorie.
export default function Catalogue() {
  const ref = useReveal()
  const [actif, setActif] = useState('chaussure')
  const [tout, setTout] = useState(false)

  const liste = tout
    ? CATEGORIES.flatMap((c) => c.products.map((p) => ({ ...p, cat: c.label })))
    : CATEGORIES.find((c) => c.id === actif).products

  return (
    <section id="catalogue" ref={ref} className="relative z-0 bg-white pt-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal text-center">
          <p className="text-[11px] tracking-[0.5em] text-lana-grey uppercase">Le catalogue</p>
          <h2 className="mt-3 font-display text-3xl text-neutral-900 md:text-5xl">
            Un style pour chaque envie
          </h2>
        </div>

        {/* mots-clés horizontaux, sélectionnables */}
        <div className="reveal sticky top-16 z-30 mt-10 border-y border-neutral-100 bg-white/85 backdrop-blur-xl md:top-20">
          <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-2 py-3 md:justify-center md:gap-2">
            {CATEGORIES.map((c) => {
              const active = !tout && actif === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setTout(false)
                    setActif(c.id)
                  }}
                  className={`whitespace-nowrap px-4 py-2 text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                    active ? 'text-neutral-900' : 'text-lana-grey hover:text-neutral-900'
                  }`}
                >
                  {c.label}
                  <span
                    className={`mx-auto mt-1 block h-px bg-neutral-900 transition-all duration-500 ${
                      active ? 'w-8' : 'w-0'
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* groupes de produits distincts ; fondu fluide au changement */}
        <div
          key={tout ? 'tout' : actif}
          className="fade-swap mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8"
        >
          {liste.map((p) => (
            <CarteProduit key={p.name} p={p} />
          ))}
        </div>

        {/* CTA bas : voir tout le catalogue */}
        <div className="reveal mt-16 flex justify-center pb-24">
          <button
            type="button"
            onClick={() => setTout((t) => !t)}
            className="bg-neutral-700 px-10 py-4 text-[11px] tracking-[0.3em] uppercase text-white transition-colors duration-500 hover:bg-neutral-900"
          >
            {tout ? 'Réduire le catalogue' : 'Voir tout le catalogue'}
          </button>
        </div>
      </div>
    </section>
  )
}
