import { BANDE_IMAGES, GARANTIES } from '../data/catalogue'
import useReveal from '../hooks/useReveal'
import { Truck, Shield, Refresh, Lock } from './icons'

const ICONES = { truck: Truck, shield: Shield, refresh: Refresh, lock: Lock }

/* Panneau de verre à 30 % : en glissant au scroll, il passe par-dessus la fin du catalogue.
   Bordures et texte blancs, plat (aucune ombre). */
export default function Promesse() {
  const ref = useReveal()

  return (
    <section
      id="promesses"
      ref={ref}
      className="relative z-10 -mt-20 overflow-hidden bg-neutral-950 text-white"
    >
      {/* visuels de fond : eux-mêmes sont extraits du catalogue, le verre les floute */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-35">
        <div className="flex h-full items-center gap-6 px-4 md:gap-10">
          {BANDE_IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              className="h-64 w-52 shrink-0 object-cover blur-[2px] md:h-96 md:w-72"
              style={{ transform: `translateY(${i % 2 === 0 ? '2rem' : '-2rem'})` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950/70" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <div className="reveal max-w-xl">
          <p className="text-[11px] tracking-[0.5em] text-white/60 uppercase">Confiance</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">
            Nos promesses &amp; garanties
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-white/60">
            Acheter chez Lana Store, c'est la sérénité : ce que nous promettons tient, du panier à
            votre porte.
          </p>
        </div>

        {/* panneau transparent à 30 % avec flou d'arrière-plan */}
        <div className="reveal mt-12 border border-white/40 bg-white/30 p-5 backdrop-blur-2xl md:p-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GARANTIES.map((g) => {
              const Icone = ICONES[g.icon]
              return (
                <div
                  key={g.title}
                  className="border border-white p-6 transition-colors duration-500 hover:bg-white/10"
                >
                  <Icone className="h-6 w-6 text-white" />
                  <h3 className="mt-5 text-[13px] font-medium tracking-[0.15em] uppercase">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">{g.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
