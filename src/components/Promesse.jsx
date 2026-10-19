import { useEffect, useRef } from 'react'
import { GARANTIES } from '../data/catalogue'
import useReveal from '../hooks/useReveal'
import { Truck, Shield, Refresh, Lock } from './icons'

const ICONES = { truck: Truck, shield: Shield, refresh: Refresh, lock: Lock }

/* Section Promesses : le catalogue (pinned) se FLOUTE progressivement au scroll
   puis le texte et les cartes flottent par-dessus — comme détachés de l'écran.

   Technique : un calque plein écran FIXE (fixed inset-0) dont le flou et le
   voile gris (30%) montent de 0 à pleine intensité selon la progression du
   scroll. Comme il couvre tout le viewport, le flou n'a NI commencement NI
   bord visible (aucune trace de masque rectangulaire). */
export default function Promesse() {
  const reveal = useReveal()
  const sectionRef = useRef(null)
  const flouRef = useRef(null)
  const contenuRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const flou = flouRef.current
    const contenu = contenuRef.current
    if (!section || !flou || !contenu) return

    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    const calculer = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight

      // entrée : 0 quand la section pointe en bas du viewport → 1 à 60 % d'avancée
      const entree = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.6)))
      const reduitP = reduit ? 1 : entree

      // extinction une fois la section complètement sortie en haut
      const sortie = Math.min(1, Math.max(0, (rect.bottom + vh * 0.3) / (vh * 0.3)))
      const p = reduitP * sortie

      // Calque PLEIN ÉCRAN fixe, jamais redimensionné (aucun artefact de repaint).
      // Le footer passe au-dessus (z-20), il n'est donc jamais flouté.
      flou.style.backdropFilter = `blur(${(p * 24).toFixed(1)}px)`
      flou.style.webkitBackdropFilter = flou.style.backdropFilter
      flou.style.backgroundColor = `rgba(23, 23, 23, ${(p * 0.3).toFixed(3)})`
      // le contenu glisse doucement vers sa place : sensation de flotter par-dessus
      contenu.style.transform = `translateY(${((1 - reduitP) * 56).toFixed(1)}px)`
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calculer)
    }

    calculer()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="promesses"
      ref={(n) => {
        sectionRef.current = n
        reveal.current = n
      }}
      className="relative z-10"
    >
      {/* calque de flou plein écran fixe — le footer (z-20) passe au-dessus, jamais flouté */}
      <div
        ref={flouRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
      />

      {/* contenu flottant : texte + carrés blancs, plats, posés sur le flou */}
      <div
        ref={contenuRef}
        className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 py-24 md:px-8"
      >
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GARANTIES.map((g, i) => {
            const Icone = ICONES[g.icon]
            return (
              <div
                key={g.title}
                style={{ transitionDelay: `${i * 110}ms` }}
                className="reveal border border-white p-6 transition-colors duration-500 hover:bg-white/10"
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
    </section>
  )
}
