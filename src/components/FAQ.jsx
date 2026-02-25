import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './FAQ.css'

const faqs = [
    {
        q: 'Do you leave burn piles or haul debris away?',
        a: 'Neither. Our Bobcat S77 with a mulching drum attachment grinds all brush, saplings, and small trees directly into organic mulch right where they stand. No burn piles, no trucking, no lingering debris. What\'s left on your land actually improves your soil.',
    },
    {
        q: 'What types of properties do you work on?',
        a: 'We work on hobby farms, residential lots, rural acreage, fence lines, homestead properties, and land being prepped for building or farming. If you have overgrown land in the Fuquay-Varina, Angier, Benson, Sanford, Lillington, or Willow Spring area, give us a call.',
    },
    {
        q: 'How big of trees can your equipment handle?',
        a: 'Our Bobcat S77 mulcher is built for dense brush, briars, saplings, and trees up to approximately 6-8 inches in diameter. For larger hardwoods, we\'ll discuss the best approach when we review your property.',
    },
    {
        q: 'How long does a typical job take?',
        a: 'Most residential and hobby farm clearing jobs are completed in a single day. Larger acreage projects may take 2-3 days. We\'ll give you an honest timeline estimate when we quote your job.',
    },
    {
        q: 'What is fire mitigation clearing?',
        a: 'Fire mitigation means creating a defensible space around your home, outbuildings, or property boundary by removing overgrown brush, dead wood, and ladder fuels that would allow a fire to spread rapidly. This is especially important for homes with wooded surroundings or in drought-prone seasons.',
    },
    {
        q: 'Are you licensed and insured?',
        a: 'Yes. Clear Woods Crew is fully licensed and carries liability insurance. We operate in compliance with all applicable North Carolina regulations. You can request proof of insurance before any job begins.',
    },
    {
        q: 'How do I get a quote?',
        a: 'Easy — call us at (641) 919-1107 or fill out the quick form below. Just tell us your location, a rough estimate of the acreage or area, and what you\'re dealing with. We respond fast and give honest, no-BS estimates.',
    },
]

export default function FAQ() {
    const [open, setOpen] = useState(null)
    const ref = useScrollReveal()

    return (
        <section id="faq" className="section section--light faq" ref={ref}>
            <div className="container">
                <div className="faq__header fade-up">
                    <span className="section-label" style={{ color: 'var(--forest-green)' }}>FAQ</span>
                    <h2 className="section-title" style={{ color: 'var(--forest-dark)' }}>
                        Common Questions, Plain Answers
                    </h2>
                </div>

                <div className="faq__list fade-up">
                    {faqs.map((item, i) => (
                        <div
                            key={i}
                            className={`faq__item ${open === i ? 'faq__item--open' : ''}`}
                            id={`faq-${i + 1}`}
                        >
                            <button
                                className="faq__question"
                                onClick={() => setOpen(open === i ? null : i)}
                                aria-expanded={open === i}
                                aria-controls={`faq-answer-${i}`}
                            >
                                <span>{item.q}</span>
                                <span className="faq__chevron" aria-hidden="true">
                                    {open === i ? '−' : '+'}
                                </span>
                            </button>
                            <div
                                className="faq__answer"
                                id={`faq-answer-${i}`}
                                role="region"
                                aria-hidden={open !== i}
                            >
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
