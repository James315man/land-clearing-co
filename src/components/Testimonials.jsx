import { useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Testimonials.css'

const reviews = [
    {
        name: 'Marcus P.',
        location: 'Fuquay-Varina, NC',
        stars: 5,
        text: 'James and the crew showed up on time and had 3 acres of overgrown brush completely cleared by noon. No burn pile, no mess. We walked the property that afternoon. Unbelievable work.',
    },
    {
        name: 'Sandra K.',
        location: 'Angier, NC',
        stars: 5,
        text: 'We have a small hobby farm and the back fence line had disappeared under 8 years of growth. Clear Woods Crew got it done in one day. Professional, fair priced, and honest.',
    },
    {
        name: 'Derrick & Tami H.',
        location: 'Benson, NC',
        stars: 5,
        text: 'Called for fire mitigation around our home. They cleared a 50-foot buffer zone around the house and shop — no burn piles, just mulch. We sleep better knowing the risk is gone.',
    },
    {
        name: 'Tommy R.',
        location: 'Willow Spring, NC',
        stars: 5,
        text: 'Had 5 acres of briars nobody wanted to touch. James gave me a real quote, showed up, and transformed the property in a single day. Hired again 3 months later. Best in the area.',
    },
    {
        name: 'Lisa J.',
        location: 'Sanford, NC',
        stars: 5,
        text: 'I had quotes from three companies. Clear Woods Crew was honest, thorough, and beat the others on timeline. The mulching left the soil looking great. Would absolutely recommend.',
    },
]

export default function Testimonials() {
    const [active, setActive] = useState(0)
    const ref = useScrollReveal()

    const prev = () => setActive(a => (a - 1 + reviews.length) % reviews.length)
    const next = () => setActive(a => (a + 1) % reviews.length)

    return (
        <section id="reviews" className="section section--dark testimonials" ref={ref}>
            <div className="container">
                <div className="testi__header fade-up">
                    <span className="section-label">Real Reviews</span>
                    <h2 className="section-title">What Our Neighbors Say</h2>
                    <p className="section-subtitle">
                        Serving real properties, real people — south of Raleigh.
                    </p>
                </div>

                <div className="testi__carousel fade-up" role="region" aria-label="Customer testimonials">
                    <div className="testi__stars" aria-label="5 stars">
                        {'★'.repeat(reviews[active].stars)}
                    </div>
                    <blockquote className="testi__quote">
                        "{reviews[active].text}"
                    </blockquote>
                    <div className="testi__author">
                        <strong>{reviews[active].name}</strong>
                        <span>{reviews[active].location}</span>
                    </div>

                    <div className="testi__controls">
                        <button className="testi__btn" onClick={prev} aria-label="Previous review">←</button>
                        <div className="testi__dots">
                            {reviews.map((_, i) => (
                                <button
                                    key={i}
                                    className={`testi__dot ${i === active ? 'active' : ''}`}
                                    onClick={() => setActive(i)}
                                    aria-label={`Review ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button className="testi__btn" onClick={next} aria-label="Next review">→</button>
                    </div>
                </div>

                <div className="testi__badge fade-up">
                    <span>⭐ 5.0 Rating · Licensed & Insured · Serving South Raleigh, NC</span>
                </div>
            </div>
        </section>
    )
}
