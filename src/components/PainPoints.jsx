import { useScrollReveal } from '../hooks/useScrollReveal'
import './PainPoints.css'

const pains = [
    { emoji: '🌾', text: 'My land has turned into an impenetrable tangle of briars and brush' },
    { emoji: '🚧', text: 'My property is unsafe and unusable for farming, recreation, or building' },
    { emoji: '🔥', text: 'I\'m worried about wildfire spreading to my home or outbuildings' },
    { emoji: '📉', text: 'The overgrowth is hurting my property value' },
    { emoji: '😤', text: 'I\'ve gotten quotes requiring burn piles, hauling fees, or weeks of work' },
    { emoji: '🏚️', text: 'My fence lines are buried and livestock containment is at risk' },
]

const gains = [
    { emoji: '✅', text: 'Fully cleared and usable in a single day — no burn piles, ever' },
    { emoji: '⚡', text: 'Bobcat S77 mulcher grinds everything into clean organic material' },
    { emoji: '🛡️', text: 'Licensed, insured, and operating safely on your property' },
    { emoji: '🌱', text: 'Mulch returns nutrients to the soil — better for your land long-term' },
    { emoji: '📞', text: 'Free quotes with fast, honest communication from day one' },
    { emoji: '📅', text: 'Same-week scheduling available across the South Raleigh area' },
]

export default function PainPoints() {
    const ref = useScrollReveal()

    return (
        <section id="why-us" className="section section--light pain-points" ref={ref}>
            <div className="container">
                <div className="pp__header fade-up">
                    <span className="section-label" style={{ color: 'var(--forest-green)' }}>Does This Sound Familiar?</span>
                    <h2 className="section-title" style={{ color: 'var(--forest-dark)' }}>
                        Your Land Deserves<br />Better Than This.
                    </h2>
                </div>

                <div className="pp__columns">
                    <div className="pp__col pp__col--pain fade-up">
                        <h3 className="pp__col-title">The Frustration</h3>
                        <ul className="pp__list">
                            {pains.map((p, i) => (
                                <li key={i} className="pp__item pp__item--pain">
                                    <span className="pp__emoji">{p.emoji}</span>
                                    <span>{p.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pp__divider fade-in" aria-hidden="true">
                        <div className="pp__divider-line" />
                        <div className="pp__divider-badge">VS</div>
                        <div className="pp__divider-line" />
                    </div>

                    <div className="pp__col pp__col--gain fade-up">
                        <h3 className="pp__col-title pp__col-title--gain">Clear Woods Crew Delivers</h3>
                        <ul className="pp__list">
                            {gains.map((g, i) => (
                                <li key={i} className="pp__item pp__item--gain">
                                    <span className="pp__emoji">{g.emoji}</span>
                                    <span>{g.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* No burn pile callout */}
                <div className="pp__callout fade-up">
                    <div className="pp__callout-icon">🚫🔥</div>
                    <div className="pp__callout-text">
                        <strong>We never leave burn piles.</strong> Our mulcher grinds brush and trees directly into organic mulch on-site. That means no fire risk, no smoke complaints, no ash, and no days of waiting for a pile to burn down. Just clean, cleared land — the same day we arrive.
                    </div>
                </div>
            </div>
        </section>
    )
}
