import './Hero.css'
import { useEffect, useRef } from 'react'

export default function Hero() {
    const statsRef = useRef(null)

    const handleScroll = (href) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <section id="hero" className="hero" aria-label="Hero">
            {/* Background image via CSS + overlay */}
            <div className="hero__bg" aria-hidden="true">
                <div className="hero__overlay" />
                <div className="hero__particles">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`hero__particle hero__particle--${i + 1}`} />
                    ))}
                </div>
            </div>

            <div className="hero__content container">
                <div className="hero__badge fade-in visible" style={{ animationDelay: '0.2s' }}>
                    <span>✔</span> Licensed & Insured · Willow Spring, NC
                </div>

                <h1 className="hero__title">
                    Reclaim Your Land.<br />
                    <span className="hero__title-accent">No Burn Piles.</span>
                    <br />No Hassle.
                </h1>

                <p className="hero__subtitle">
                    Clear Woods Crew transforms overgrown properties across Fuquay-Varina, Angier, Benson, Sanford & beyond — using a Bobcat S77 with a professional mulcher attachment. One pass, done right.
                </p>

                <div className="hero__actions">
                    <a
                        href="tel:6419191107"
                        className="btn btn-primary btn-lg"
                        id="hero-cta-call"
                    >
                        📞 Call (641) 919-1107
                    </a>
                    <button
                        className="btn btn-outline btn-lg"
                        id="hero-cta-quote"
                        onClick={() => handleScroll('#quote-form')}
                    >
                        Get a Free Quote
                    </button>
                </div>

                <div className="hero__trust" ref={statsRef}>
                    <div className="hero__trust-item">
                        <strong>100%</strong>
                        <span>No Burn Piles</span>
                    </div>
                    <div className="hero__trust-divider" />
                    <div className="hero__trust-item">
                        <strong>Licensed</strong>
                        <span>& Insured</span>
                    </div>
                    <div className="hero__trust-divider" />
                    <div className="hero__trust-item">
                        <strong>Same-Week</strong>
                        <span>Scheduling</span>
                    </div>
                    <div className="hero__trust-divider" />
                    <div className="hero__trust-item">
                        <strong>Free</strong>
                        <span>Quotes</span>
                    </div>
                </div>
            </div>

            <div className="hero__scroll-hint" aria-hidden="true">
                <span>Scroll</span>
                <div className="hero__scroll-arrow" />
            </div>
        </section>
    )
}
