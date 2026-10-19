import assert from 'node:assert/strict'
import {
  ajouterLigne,
  changerQte,
  retirerLigne,
  totalDe,
  nombreDe,
} from '../src/lib/panier.js'

const A = { name: 'Test A', prix: 100 }
const B = { name: 'Test B', prix: 45 }

assert.deepStrictEqual(ajouterLigne([], A), [{ ...A, qte: 1 }], 'ajout crée la ligne')
const l1 = ajouterLigne(ajouterLigne([], A), A)
assert.strictEqual(l1[0].qte, 2, 'doublon : la quantité incrémente')
assert.strictEqual(nombreDe(l1), 2, 'compteur d\'articles')
assert.strictEqual(totalDe([{ ...A, qte: 2 }, { ...B, qte: 1 }]), 245, 'calcul du total')
assert.deepStrictEqual(changerQte(l1, 'Test A', -3), [], 'quantité à 0 : la ligne disparaît')
assert.deepStrictEqual(
  retirerLigne([{ ...A, qte: 1 }, { ...B, qte: 1 }], 'Test A'),
  [{ ...B, qte: 1 }],
  'retirer une ligne précise',
)

console.log('✓ PANIER : 7 assertions passées')
