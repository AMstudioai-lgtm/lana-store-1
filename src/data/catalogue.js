/* Essai direct d'Unsplash : toutes les URLs ont été vérifiées (HTTP 200) */
const u = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const HERO_IMG = u('1524592094714-0f0654e20314', 1600) // montre tenue en main, fond gris

export const CATEGORIES = [
  {
    id: 'chaussure',
    label: 'Chaussure',
    products: [
      { name: 'Sneaker Lana Blanche', prix: 85, img: u('1549298916-b41d501d3772') },
      { name: 'Escarpin Nubie', prix: 120, img: u('1543163521-1bf539c55dd2') },
      { name: 'Basket Street 87', prix: 110, img: u('1560243563-062bfc001d68') },
      { name: 'Runner Essentiel', prix: 95, img: u('1595950653106-6c9ebd614d3a') },
    ],
  },
  {
    id: 'maillot',
    label: 'Maillot',
    products: [
      { name: 'Maillot Street Noir', prix: 45, img: u('1576566588028-4147f3842f27') },
      { name: 'Maillo Coton Écru', prix: 40, img: u('1581655353564-df123a1eb820') },
      { name: 'Maillot Rétro 87', prix: 50, img: u('1588405748880-12d1d2a59f75') },
      { name: 'Maillo Fanion', prix: 38, img: u('1573408301185-9146fe634ad0') },
    ],
  },
  {
    id: 'parfum',
    label: 'Parfum',
    products: [
      { name: 'Noir Absolu 50 ml', prix: 140, img: u('1592945403244-b3fbafd7f539') },
      { name: "Fleur d'Haïti", prix: 110, img: u('1547949003-9792a18a2601') },
      { name: 'Ambre Caraïbe', prix: 125, img: u('1594035910387-fea47794261f') },
      { name: 'Cologne Vintage', prix: 90, img: u('1559523182-a284c3fb7cff') },
    ],
  },
  {
    id: 'montre',
    label: 'Montre',
    products: [
      { name: 'Classique Acier Noir', prix: 180, img: u('1524592094714-0f0654e20314') },
      { name: 'Or Rose Minimal', prix: 210, img: u('1524805444758-089113d48a6d') },
      { name: "King's Gold", prix: 260, img: u('1547996160-81dfa63595aa') },
      { name: 'Griffe Blanche', prix: 195, img: u('1523170335258-f5ed11844a49') },
    ],
  },
  {
    id: 'sac',
    label: 'Sac',
    products: [
      { name: 'Sac Nuage Été', prix: 95, img: u('1548036328-c9fa89d128fa') },
      { name: 'Cabas Cuir Noir', prix: 130, img: u('1553062407-98eeb64c6a62') },
      { name: 'Mini Sacoche Paille', prix: 70, img: u('1566150905458-1bf1fc113f0d') },
      { name: 'Pochette Croco', prix: 85, img: u('1601924994987-69e26d50dc26') },
    ],
  },
]

/* Images défilant derrière le panneau de verre (déco de la section panneau verre) */
export const BANDE_IMAGES = [
  u('1595950653106-6c9ebd614d3a', 700),
  u('1524805444758-089113d48a6d', 700),
  u('1548036328-c9fa89d128fa', 700),
  u('1592945403244-b3fbafd7f539', 700),
  u('1543163521-1bf539c55dd2', 700),
]

export const GARANTIES = [
  {
    icon: 'truck',
    title: 'Livraison rapide',
    text: 'Partout en Haïti sous 48 h, et vers les Caraïbes sous 5 jours ouvrés.',
  },
  {
    icon: 'shield',
    title: '100 % authentique',
    text: 'Chaque pièce est vérifiée à la main par notre équipe avant expédition.',
  },
  {
    icon: 'refresh',
    title: 'Échange 30 jours',
    text: 'Un doute ? Échange ou remboursement simple, sans justification.',
  },
  {
    icon: 'lock',
    title: 'Paiement sécurisé',
    text: 'Transactions chiffrées : MonCash, cartes bancaires et espèces.',
  },
]
