import { HERO_IMG } from '../data/catalogue'

/* Hero immersif : la photo PLEIN ÉCRAN couvre tout le viewport,
   un masque gris transparent à 30 % fait ressortir le texte,
   titre + sous-titre et CTA centrés par-dessus. */
export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex h-svh items-center justify-center overflow-hidden bg-white"
    >
      {/* image plein écran */}
      <img
        src={HERO_IMG}
        alt="Watch classique sur fond blanc"
        className="absolute inset-0 h-full w-full object-cover"
        fetchpriority="high"
      />

      {/* voile gris 30 % sur toute l'image */}
      <div aria-hidden="true" className="absolute inset-0 bg-neutral-700/30" />

{/* texte en overlay, au centre : il repose sur une COUCHE DE GRIS
        (plaque grise semi-transparente + flou) pour le lever du fond brut */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <div className="hero-in-delay bg-neutral-950/30 px-10 py-12 backdrop-blur-md md:px-16 md:py-14">
          <p className="text-[10px] tracking-[0.5em] text-white/80 uppercase md:text-[11px]">
            Nouvelle collection — 2026
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-white md:mt-4 md:text-6xl">
            L'élégance, à chaque seconde
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm font-light text-white/85 md:mt-4 md:text-lg">
            Mode, parfums et cadrans rares — sélectionnés à Port-au-Prince.
          </p>
        </div>
        <a
          href="#catalogue"
          className="hero-in-delay border border-white px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-white transition-colors duration-500 hover:bg-white hover:text-neutral-900"
        >
          Découvrir
        </a>
      </div>
    </section>
  )
}
