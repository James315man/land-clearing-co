import { useScrollReveal } from '../hooks/useScrollReveal'
import './WhyUs.css'

const reasons = [
    {
        icon: '⚙️',
        title: 'Bobcat S77 + Pro Mulcher',
        body: 'We run professional-grade equipment built for serious work. The Bobcat S77 with a mulching drum attachment chews through dense brush, saplings, and small trees in a single pass — leaving organic mulch behind, not a mess.',
    },
    {
        icon: '🚫🔥',
        title: 'Zero Burn Piles — Ever',
        body: 'Burn piles are slow, risky, and a headache with burn bans. Our mulching process eliminates all of that. Everything gets processed on the spot. Your land is cleared same-day, without smoke, ash, or waiting.',
    },
    {
        icon: '🌱',
        title: 'Better for Your Soil',
        body: 'Ground-up mulch naturally returns organic matter to your soil, improving moisture retention and microbial health. It\'s land clearing that gives back — leaving your ground healthier than a burn would.',
    },
    {
        icon: '🛡️',
        title: 'Licensed & Fully Insured',
        body: 'We operate with full licensing and liability insurance. You get peace of mind knowing the crew on your property is covered, professional, and accountable from start to finish.',
    },
    {
        icon: '📍',
        title: 'Local & Community-Rooted',
        body: 'We live and work right here — Willow Spring, Fuquay-Varina, Angier, Benson, Sanford, Lillington. We\'re not a franchise or a call center. You\'re talking to the operator who will show up and do the job.',
    },
    {
        icon: '💬',
        title: 'Transparent Pricing',
        body: 'No hidden fees, no upsells. You get a clear, honest quote based on your actual property. We believe in fair pricing and real communication — before, during, and after the job.',
    },
]

export default function WhyUs() {
    const ref = useScrollReveal()

    return (
        <section className="section section--mid why-us" ref={ref}>
            <div className="container">
                <div className="why__header fade-up">
                    <span className="section-label">Why Clear Woods Crew</span>
                    <h2 className="section-title">Built Different.<br />Priced Right.</h2>
                    <p className="section-subtitle">
                        We\'re not the cheapest, and we\'re not a giant company. We\'re the crew that shows up, communicates honestly, and leaves your land transformed — with a machine that does it right the first time.
                    </p>
                </div>

                <div className="why__grid stagger-children">
                    {reasons.map((r, i) => (
                        <div key={i} className="why-card fade-up" id={`reason-${i + 1}`}>
                            <div className="why-card__icon" aria-hidden="true">{r.icon}</div>
                            <h3 className="why-card__title">{r.title}</h3>
                            <p className="why-card__body">{r.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
