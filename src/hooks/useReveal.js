import { useEffect, useRef } from 'react'

// Observe tous les .reveal sous l'élément porteur et y ajoute .is-visible
// quand ils entrent dans le viewport (une seule fois).
export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -48px 0px' },
    )

    if (el.classList.contains('reveal')) io.observe(el)
    el.querySelectorAll('.reveal').forEach((n) => io.observe(n))

    return () => io.disconnect()
  }, [])

  return ref
}
