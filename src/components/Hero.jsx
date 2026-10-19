import { HERO_IMG } from '../data/catalogue'

// Hero immersif : montre sur fond blanc, texte elegant en overlay au centre.
// La photo de fond blanc fusionne avec la page : la montre semble flotter.
export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-white pt-20"
    >
      {/* halo tres discret pour donner de la profondeur au fond blanc */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_40%,rgba(0,0,0,0.05),transparent_72%)]" />

      <div className="relative mx-auto w-full max-w-5xl px-6 pb-24 md:pb-28">
        <div className="relative mx-auto max-w-3xl">
          {/* la montre */}
          <img
            src={HERO_IMG}
            alt="Watch classique sur fond blanc"
            className="hero-in mx-auto w-full max-w-[640px] object-cover"
            fetchpriority="high"
          />

          {/* texte en overlay, centre sur l'image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center md:gap-4">
            <span className="hero-in-delay text-[10px] tracking-[0.5em] text-neutral-500 uppercase md:text-[11px]">
              Nouvelle collection — 2026
            </span>
            <h1 className="hero-in-delay font-display text-4xl leading-tight text-neutral-900 md:text-6xl">
              L'élégance, à chaque seconde
            </h1>
            <p className="hero-in-delay max-w-md text-sm font-light text-neutral-500 md:text-lg">
              Mode, parfums et cadrans rares — sélectionnés à Port-au-Prince.
            </p>
            <a
              href="#catalogue"
              className="hero-in-delay mt-3 border border-neutral-300 px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-neutral-900 transition-colors duration-500 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
            >
              Découvrir
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
