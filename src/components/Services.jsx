import { useScrollReveal } from '../hooks/useScrollReveal'
import './Services.css'

const services = [
    {
        id: 'land-clearing',
        icon: '🌳',
        title: 'Land Clearing',
        tagline: 'Start fresh. Own your acres.',
        description:
            'Got raw land, a new build lot, or acres choked with years of growth? We clear it top-to-bottom — trees, stumps, underbrush — leaving clean, usable ground ready for whatever comes next. No burn piles. No hauling. No mess left behind.',
    },
    {
        id: 'brush-clearing',
        icon: '🌿',
        title: 'Brush Clearing',
        tagline: 'Kill the jungle, keep the land.',
        description:
            `Overgrown briars, honeysuckle, scrub brush, and invasive vines don\u2019t stand a chance against our Bobcat S77 mulcher. We grind it all down in a single pass, returning your property to usable, manageable ground \u2014 fast.`,
    },
    {
        id: 'fire-mitigation',
        icon: '🔥',
        title: 'Fire Mitigation',
        tagline: 'Protect your home. Clear the risk.',
        description:
            'Dense overgrowth is fuel. We create defensible space around homes, outbuildings, and fences by strategically removing brush, dead wood, and ladder fuels — dramatically reducing your wildfire risk without burning a single pile.',
    },
]

export default function Services() {
    const ref = useScrollReveal()

    return (
        <section id="services" className="section section--mid services" ref={ref}>
            <div className="container">
                <div className="services__header fade-up">
                    <span className="section-label">What We Do</span>
                    <h2 className="section-title">Three Services. <br />One Powerful Machine.</h2>
                    <p className="section-subtitle">
                        Our Bobcat S77 with a professional mulching attachment handles everything — no subcontractors, no middleman. Just Clear Woods Crew and a machine built for the job.
                    </p>
                </div>

                <div className="services__grid stagger-children">
                    {services.map((s) => (
                        <article key={s.id} className="service-card fade-up" id={`service-${s.id}`}>
                            <div className="service-card__icon" aria-hidden="true">{s.icon}</div>
                            <h3 className="service-card__title">{s.title}</h3>
                            <p className="service-card__tagline">{s.tagline}</p>
                            <p className="service-card__desc">{s.description}</p>
                            <a href="#quote" className="service-card__link" onClick={e => {
                                e.preventDefault()
                                document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })
                            }}>
                                Get a Free Quote →
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
