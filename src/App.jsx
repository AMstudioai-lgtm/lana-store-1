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
        <Catalogue />
        <Promesse />
      </main>
      <Footer />
    </div>
  )
}
