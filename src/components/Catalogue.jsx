import { useState } from 'react'
import { CATEGORIES } from '../data/catalogue'
import useReveal from '../hooks/useReveal'
import { usePanier } from '../context/panier'
import { Plus } from './icons'

/* Carte produit : image dans un carré, prix dans un rectangle à bordure sèche,
   bouton « + » pour l'ajouter au panier (ajout immédiat, UI démo) */
function CarteProduit({ p }) {
  const { ajouter } = usePanier()
  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => ajouter(p)}
          aria-label={`Ajouter ${p.name} au panier`}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/85 backdrop-blur-md transition-colors duration-300 hover:bg-neutral-900 hover:text-white"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <h3 className="mt-2.5 text-[13px] leading-snug text-neutral-700 transition-colors group-hover:text-neutral-900">
        {p.name}
      </h3>
      {/* rectangle bordé sec : 1 px, angles vifs, aucun arrondi, aucune ombre */}
      <p className="mt-1.5 inline-block border border-neutral-300 px-3 py-1 text-xs tracking-widest text-neutral-900">
        $ {p.prix}
      </p>
    </article>
  )
}

/* Catalogue PINNÉ : la section reste fixée à l'écran (sticky top-0)
   pendant que la section Promesses (masque de verre) glisse par-dessus.
   En mode « voir tout le catalogue », la section redevient normale
   pour laisser défiler l'ensemble des produits. */
export default function Catalogue() {
  const ref = useReveal()
  const [actif, setActif] = useState('chaussure')
  const [tout, setTout] = useState(false)

  const liste = tout
    ? CATEGORIES.flatMap((c) => c.products.map((p) => ({ ...p, cat: c.label })))
    : CATEGORIES.find((c) => c.id === actif).products

  return (
    <section
      id="catalogue"
      ref={ref}
      className={
        tout
          ? 'relative z-0 bg-white pt-20'
          : 'sticky top-0 z-0 h-svh overflow-hidden bg-white'
      }
    >
      <div
        className={
          tout
            ? 'mx-auto max-w-6xl px-5 pb-24 md:px-8'
            : 'mx-auto flex h-full max-w-6xl flex-col px-5 pb-5 pt-20 md:px-8 md:pt-24'
        }
      >
        <div className="reveal text-center">
          <p className="text-[11px] tracking-[0.5em] text-lana-grey uppercase">Le catalogue</p>
          <h2 className="mt-2 font-display text-2xl text-neutral-900 md:text-4xl">
            Un style pour chaque envie
          </h2>
        </div>

        {/* mots-clés horizontaux, sélectionnables */}
        <div className="no-scrollbar mt-5 flex justify-start gap-2 overflow-x-auto border-y border-neutral-100 md:justify-center">
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
                className={`whitespace-nowrap px-4 py-2.5 text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                  active ? 'text-neutral-900' : 'text-lana-grey hover:text-neutral-900'
                }`}
              >
                {c.label}
                <span
                  className={`mx-auto mt-0.5 block h-px bg-neutral-900 transition-all duration-500 ${
                    active ? 'w-8' : 'w-0'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* groupes de produits distincts ; fondu fluide au changement.
            En mode pinned, la grille peut défiler à l'intérieur si l'écran
            est court (mobile portrait) : le maintien visuel reste intact. */}
        <div
          key={tout ? 'tout' : actif}
          className={`fade-swap mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 ${
            tout ? 'md:mt-10 min-h-0 flex-1' : 'min-h-0 flex-1 overflow-y-auto'
          } no-scrollbar`}
        >
          {liste.map((p) => (
            <CarteProduit key={p.name} p={p} />
          ))}
        </div>

        {/* CTA bas : voir tout le catalogue */}
        <div
          className={`reveal flex justify-center ${
            tout ? 'mt-12' : 'mt-auto pt-4 pb-1 md:pb-2'
          }`}
        >
          <button
            type="button"
            onClick={() => setTout((t) => !t)}
            className="bg-neutral-700 px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-white transition-colors duration-500 hover:bg-neutral-900 md:px-10 md:py-4"
          >
            {tout ? 'Réduire le catalogue' : 'Voir tout le catalogue'}
          </button>
        </div>
      </div>
    </section>
  )
}
