import Header from './components/Header'
import Hero from './components/Hero'
import Catalogue from './components/Catalogue'
import Promesse from './components/Promesse'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-white font-sans text-neutral-900">
      <Header />
      <main>
        <Hero />
        {/* Catalogue pinned (sticky) + Promesses en verre glissant par-dessus :
            les deux doivent être dans le même parent pour que le sticky s'arrête
            à la fin de la section promesses et n'envahisse pas le footer. */}
        <div className="relative">
          <Catalogue />
          <Promesse />
        </div>
      </main>
      <Footer />
    </div>
  )
}
