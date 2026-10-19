import { createContext, useContext, useMemo, useState } from 'react'
import {
  ajouterLigne,
  changerQte as changerQteDe,
  retirerLigne,
  totalDe,
  nombreDe,
} from '../lib/panier'

// État du panier partagé header / catalogue / tiroir. UI uniquement.
const PanierContext = createContext(null)

export function PanierProvider({ children }) {
  const [lignes, setLignes] = useState([])
  const [ouvert, setOuvert] = useState(false)

  const valeur = useMemo(() => {
    const fermer = () => setOuvert(false)
    return {
      lignes,
      total: totalDe(lignes),
      nombre: nombreDe(lignes),
      ouvert,
      ajouter: (p) => setLignes((l) => ajouterLigne(l, p)),
      changerQte: (nom, delta) => setLignes((l) => changerQteDe(l, nom, delta)),
      retirer: (nom) => setLignes((l) => retirerLigne(l, nom)),
      vider: () => setLignes([]),
      ouvrir: () => setOuvert(true),
      fermer,
    }
  }, [lignes, ouvert])

  return <PanierContext.Provider value={valeur}>{children}</PanierContext.Provider>
}

export function usePanier() {
  const ctx = useContext(PanierContext)
  if (!ctx) throw new Error('usePanier doit être sous PanierProvider')
  return ctx
}
