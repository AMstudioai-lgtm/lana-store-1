import { HERO_IMG } from '../data/catalogue'

/* Hero immersif : photo PLEIN ÉCRAN (full-bleed).
   RÈGLE RETENUE : un SEUL overlay gris transparent à 30 % sur toute
   l'image, pour la lisibilité du texte. Rien d'autre (pas de plaque
   derrière le texte, pas d'autres couches). */
export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex h-svh items-center justify-center overflow-hidden bg-white"
    >
      {/* image plein écran, toute la largeur */}
      <img
        src={HERO_IMG}
        alt="Montre classique sur fond blanc"
        className="absolute inset-0 h-full w-full object-cover"
        fetchpriority="high"
      />

      {/* plaque grise transparente à 30 % : couvre TOUTE l'image */}
      <div aria-hidden="true" className="absolute inset-0 h-full w-full bg-neutral-500/30" />

      {/* texte élégant en overlay, au centre */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center md:gap-4">
        <span className="hero-in-delay text-[10px] tracking-[0.5em] text-neutral-700 uppercase md:text-[11px]">
          Nouvelle collection — 2026
        </span>
        <h1 className="hero-in-delay font-display text-4xl leading-tight text-neutral-950 md:text-6xl">
          L'élégance, à chaque seconde
        </h1>
        <p className="hero-in-delay max-w-md text-sm font-light text-neutral-800 md:text-lg">
          Mode, parfums et cadrans rares — sélectionnés à Port-au-Prince.
        </p>
        <a
          href="#catalogue"
          className="hero-in-delay mt-3 border border-neutral-900 px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-neutral-900 transition-colors duration-500 hover:bg-neutral-900 hover:text-white"
        >
          Découvrir
        </a>
      </div>
    </section>
  )
}
