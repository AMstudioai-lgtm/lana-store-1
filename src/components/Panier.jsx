import { useEffect, useState } from 'react'
import { usePanier } from '../context/panier'
import { Bag, X, Plus, Minus, Check } from './icons'

const MOYENS = [
  { id: 'natcash', label: 'NatCash', sous: 'Paiement mobile — NACC' },
  { id: 'moncash', label: 'MonCash', sous: 'Paiement mobile — Digicel' },
]

/* Tiroir panier (démo design, pas de backend) :
   étape 1 : panier (quantités +/−, retrait, sous-total)
   étape 2 : sélecteur de paiement NatCash / MonCash après « Passer la commande »
   étape 3 : confirmation simulée */
export default function Panier() {
  const { lignes, total, nombre, ouvert, fermer, changerQte, retirer, vider } = usePanier()
  const [etape, setEtape] = useState('panier') // panier | paiement | confirmation
  const [moyen, setMoyen] = useState(null)

  // Rebloque le scroll ; réinitialise l'étape quand le tiroir se referme
  useEffect(() => {
    document.body.style.overflow = ouvert ? 'hidden' : ''
    if (!ouvert) {
      const t = setTimeout(() => {
        setEtape('panier')
        setMoyen(null)
      }, 450)
      return () => clearTimeout(t)
    }
  }, [ouvert])

  const moyenChoisi = MOYENS.find((m) => m.id === moyen)

  return (
    <>
      {/* voile */}
      <div
        aria-hidden="true"
        onClick={fermer}
        className={`fixed inset-0 z-[55] bg-neutral-950/25 backdrop-blur-sm transition-opacity duration-500 ${
          ouvert ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* tiroir */}
      <aside
        aria-hidden={!ouvert}
        className={`fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-white/90 backdrop-blur-2xl transition-transform duration-700 ease-[cubic-bezier(0.24,0.9,0.35,1)] ${
          ouvert ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
          <h2 className="font-display text-xl text-neutral-900">
            {etape === 'panier' && (
              <>
                Panier
                {nombre > 0 && (
                  <span className="text-sm text-lana-grey">
                    {' '}— {nombre} article{nombre > 1 ? 's' : ''}
                  </span>
                )}
              </>
            )}
            {etape === 'paiement' && 'Paiement'}
            {etape === 'confirmation' && 'Commande'}
          </h2>
          <button
            type="button"
            onClick={fermer}
            aria-label="Fermer le panier"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {etape === 'panier' &&
          (lignes.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
              <Bag className="h-9 w-9 text-neutral-300" strokeWidth={1} />
              <p className="text-sm text-neutral-500">Ton panier est vide.</p>
              <a
                href="#catalogue"
                onClick={fermer}
                className="mt-2 bg-neutral-700 px-8 py-3 text-[11px] tracking-[0.3em] uppercase text-white transition-colors hover:bg-neutral-900"
              >
                Voir le catalogue
              </a>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-neutral-100 flex-1 overflow-y-auto px-6 py-2">
                {lignes.map((l) => (
                  <li key={l.name} className="flex items-center gap-4 py-4">
                    <img
                      src={l.img}
                      alt={l.name}
                      className="h-16 w-16 shrink-0 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-neutral-900">{l.name}</p>
                      <p className="mt-1 inline-block border border-neutral-300 px-2 py-0.5 text-[11px] tracking-widest text-neutral-900">
                        $ {l.prix}
                      </p>
                    </div>
                    <div className="flex items-center border border-neutral-200">
                      <button
                        type="button"
                        onClick={() => changerQte(l.name, -1)}
                        aria-label={`Retirer un ${l.name}`}
                        className="px-2.5 py-1.5 text-neutral-600 transition-colors hover:bg-neutral-100"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm">{l.qte}</span>
                      <button
                        type="button"
                        onClick={() => changerQte(l.name, 1)}
                        aria-label={`Ajouter un ${l.name}`}
                        className="px-2.5 py-1.5 text-neutral-600 transition-colors hover:bg-neutral-100"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => retirer(l.name)}
                      aria-label={`Retirer ${l.name}`}
                      className="text-neutral-300 transition-colors hover:text-neutral-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-neutral-100 px-6 py-5">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Sous-total</span>
                  <span className="font-medium text-neutral-900">$ {total}</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-400">
                  Livraison calculée à l'adresse — Haïti.
                </p>
                <button
                  type="button"
                  onClick={() => setEtape('paiement')}
                  className="mt-4 w-full bg-neutral-700 py-3.5 text-[11px] tracking-[0.3em] uppercase text-white transition-colors hover:bg-neutral-900"
                >
                  Passer la commande
                </button>
              </div>
            </>
          ))}

        {etape === 'paiement' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="text-sm text-neutral-500">
                {nombre} article{nombre > 1 ? 's' : ''} — sous-total{' '}
                <span className="font-medium text-neutral-900">$ {total}</span>
              </p>
              <p className="mt-6 text-[11px] tracking-[0.35em] uppercase text-neutral-500">
                Choisir le paiement
              </p>
              <div className="mt-3 grid gap-3">
                {MOYENS.map((m) => {
                  const actif = moyen === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      aria-pressed={actif}
                      onClick={() => setMoyen(m.id)}
                      className={`flex items-center justify-between border p-4 text-left transition-colors duration-300 ${
                        actif
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <span>
                        <span className="block font-semibold text-neutral-900">{m.label}</span>
                        <span className="block text-xs text-neutral-500">{m.sous}</span>
                      </span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                          actif ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300'
                        }`}
                      >
                        {actif && <Check className="h-3 w-3" />}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-4 text-[11px] text-neutral-400">
                Démo design : aucun paiement réel n'est effectué.
              </p>
            </div>
            <div className="flex gap-3 border-t border-neutral-100 px-6 py-5">
              <button
                type="button"
                onClick={() => setEtape('panier')}
                className="border border-neutral-200 px-5 py-3.5 text-[11px] tracking-[0.25em] uppercase text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => {
                  setEtape('confirmation')
                  vider()
                }}
                disabled={!moyen}
                className="flex-1 bg-neutral-700 py-3.5 text-[11px] tracking-[0.3em] uppercase text-white transition-colors enabled:hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirmer
              </button>
            </div>
          </>
        )}

        {etape === 'confirmation' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center border border-neutral-300">
              <Check className="h-6 w-6 text-neutral-900" />
            </span>
            <h3 className="font-display text-2xl text-neutral-900">Commande simulée</h3>
            <p className="text-sm leading-relaxed text-neutral-500">
              Paiement via{' '}
              <span className="font-medium text-neutral-900">
                {moyenChoisi ? moyenChoisi.label : '—'}
              </span>
              . Démo design : rien n'a été envoyé.
            </p>
            <button
              type="button"
              onClick={fermer}
              className="mt-2 w-full bg-neutral-700 py-3.5 text-[11px] tracking-[0.3em] uppercase text-white transition-colors hover:bg-neutral-900"
            >
              Retour au catalogue
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
