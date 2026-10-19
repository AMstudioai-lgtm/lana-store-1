// Logique pure du panier (toutes erreurs impossibles côté UI).
// Volontairement SANS React ni backend : testable hors UI, UI est juste un reflet.

export const ajouterLigne = (lignes, produit) => {
  const i = lignes.findIndex((l) => l.name === produit.name)
  if (i === -1) return [...lignes, { ...produit, qte: 1 }]
  const copie = [...lignes]
  copie[i] = { ...copie[i], qte: copie[i].qte + 1 }
  return copie
}

export const changerQte = (lignes, nom, delta) =>
  lignes
    .map((l) => (l.name === nom ? { ...l, qte: Math.max(0, l.qte + delta) } : l))
    .filter((l) => l.qte > 0)

export const retirerLigne = (lignes, nom) => lignes.filter((l) => l.name !== nom)

export const totalDe = (lignes) => lignes.reduce((t, l) => t + l.prix * l.qte, 0)

export const nombreDe = (lignes) => lignes.reduce((t, l) => t + l.qte, 0)
