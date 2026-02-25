import { useEffect, useRef } from 'react'

/**
 * Attaches IntersectionObserver to a container ref.
 * Adds class "visible" to all .fade-up and .fade-in children when they enter the viewport.
 */
export function useScrollReveal(threshold = 0.12) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const targets = el.querySelectorAll('.fade-up, .fade-in')
        if (!targets.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold }
        )

        targets.forEach(t => observer.observe(t))
        return () => observer.disconnect()
    }, [threshold])

    return ref
}
