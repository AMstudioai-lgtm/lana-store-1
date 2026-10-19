import { HERO_IMG } from '../data/catalogue'

/* Hero immersif : photo PLEIN ÉCRAN (full-bleed), image d'origine.
   RÈGLE RETENUE : un SEUL overlay gris à 60 % sur toute l'image,
   texte BLANC au-dessus (l'overlay est derrière le texte, pas de plaque). */
export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex h-svh items-center justify-center overflow-hidden bg-white"
    >
      {/* image plein écran, toute la largeur */}
      <img
        src={HERO_IMG}
        alt="Montre tenue en main sur fond gris"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        fetchpriority="high"
      />

      {/* OVERLAY GRIS à 60 % — plein cadre, au-dessus de l'image et derrière le texte */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] h-full w-full bg-neutral-800/60"
      />

      {/* texte blanc en overlay, au centre */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center md:gap-4">
        <span className="hero-in-delay text-[10px] tracking-[0.5em] text-white/75 uppercase md:text-[11px]">
          Nouvelle collection — 2026
        </span>
        <h1 className="hero-in-delay font-display text-4xl leading-tight text-white md:text-6xl">
          L'élégance, à chaque seconde
        </h1>
        <p className="hero-in-delay max-w-md text-sm font-light text-white/85 md:text-lg">
          Mode, parfums et cadrans rares — sélectionnés à Port-au-Prince.
        </p>
        <a
          href="#catalogue"
          className="hero-in-delay mt-3 border border-white px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-white transition-colors duration-500 hover:bg-white hover:text-neutral-900"
        >
          Découvrir
        </a>
      </div>
    </section>
  )
}
