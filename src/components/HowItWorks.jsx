import { useScrollReveal } from '../hooks/useScrollReveal'
import './HowItWorks.css'

const steps = [
    {
        number: '01',
        title: 'Request Your Free Quote',
        description:
            'Call us at (641) 919-1107 or fill out our quick form below. Tell us where your property is, what you\'re dealing with, and how much land needs clearing. We\'ll get back to you fast — no runaround.',
        icon: '📞',
    },
    {
        number: '02',
        title: 'We Assess & Schedule',
        description:
            'We\'ll review your property, discuss your goals, and give you a straight, fair quote. Once you\'re ready to move forward, we lock in a date — often within the same week. We serve Willow Spring, Fuquay-Varina, Angier, Benson, Sanford, Lillington, and everywhere in between.',
        icon: '📋',
    },
    {
        number: '03',
        title: 'We Clear. You Enjoy.',
        description:
            'Our Bobcat S77 with mulching attachment goes to work. Trees, brush, briars, invasive growth — all ground into organic mulch right where it stands. No hauling. No burning. When we leave, your land is transformed.',
        icon: '🌲',
    },
]

export default function HowItWorks() {
    const ref = useScrollReveal()

    return (
        <section id="how-it-works" className="section section--dark how-it-works" ref={ref}>
            <div className="container">
                <div className="hiw__header fade-up">
                    <span className="section-label">Simple Process</span>
                    <h2 className="section-title">From Overgrown to Usable<br />in 3 Simple Steps</h2>
                    <p className="section-subtitle">
                        We make land clearing easy. No complicated contracts, no surprise fees. Just straightforward service from a local crew that takes pride in the work.
                    </p>
                </div>

                <div className="hiw__steps stagger-children">
                    {steps.map((step, i) => (
                        <div className="hiw__step fade-up" key={i} id={`step-${i + 1}`}>
                            <div className="hiw__step-left">
                                <div className="hiw__step-number">{step.number}</div>
                                {i < steps.length - 1 && <div className="hiw__connector" aria-hidden="true" />}
                            </div>
                            <div className="hiw__step-body">
                                <div className="hiw__step-icon" aria-hidden="true">{step.icon}</div>
                                <h3 className="hiw__step-title">{step.title}</h3>
                                <p className="hiw__step-desc">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hiw__cta fade-up">
                    <a href="tel:6419191107" className="btn btn-primary btn-lg" id="hiw-cta">
                        📞 Start With a Free Call
                    </a>
                </div>
            </div>
        </section>
    )
}
