import { GARANTIES } from '../data/catalogue'
import useReveal from '../hooks/useReveal'
import { Truck, Shield, Refresh, Lock } from './icons'

const ICONES = { truck: Truck, shield: Shield, refresh: Refresh, lock: Lock }

/* Section Promesses = le MASQUE de verre : elle scrolle par-dessus la section
   Catalogue restée pinned. Transparent à 30 % (gris foncé) + flou d'arrière-plan
   : on voit le catalogue passer derrière le verre.
   Bordures et texte blancs, plat (aucune ombre de relief). */
export default function Promesse() {
  const ref = useReveal()

  return (
    <section id="promesses" ref={ref} className="relative z-10">
      {/* masque de verre 30 % qui recouvre le catalogue pinned */}
      <div className="relative min-h-svh bg-neutral-950/30 backdrop-blur-2xl">
        {/* masque de lisibilité : voile radial plat, pas une ombre */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_60%_at_50%_50%,rgba(0,0,0,0.4),transparent_85%)]"
        />

        <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
          <div className="reveal max-w-xl">
            <p className="text-[11px] tracking-[0.5em] text-white/70 uppercase">Confiance</p>
            <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">
              Nos promesses &amp; garanties
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-white/75">
              Acheter chez Lana Store, c'est la sérénité : ce que nous promettons tient, du panier
              à votre porte.
            </p>
          </div>

          {/* promesses et garanties dans des carrés : bordures blanches, texte blanc, plat */}
          <div className="reveal mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GARANTIES.map((g) => {
              const Icone = ICONES[g.icon]
              return (
                <div
                  key={g.title}
                  className="border border-white p-6 transition-colors duration-500 hover:bg-white/10"
                >
                  <Icone className="h-6 w-6 text-white" />
                  <h3 className="mt-5 text-[13px] font-medium tracking-[0.15em] uppercase text-white">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/80">{g.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
