import { useScrollReveal } from '../hooks/useScrollReveal'
import bobcatImg from '../assets/bobcat-s77.png'
import beforeImg from '../assets/before-clearing.png'
import afterImg from '../assets/after-clearing.png'
import './Gallery.css'

const beforeAfter = [
    {
        label: 'BEFORE',
        img: beforeImg,
        caption: 'Impenetrable honeysuckle and briars — fence buried under 8 years of growth',
        className: 'gallery__card--before',
    },
    {
        label: 'AFTER',
        img: afterImg,
        caption: 'Fully cleared, mulched, and usable — same day, no burn pile',
        className: 'gallery__card--after',
    },
]

export default function Gallery() {
    const ref = useScrollReveal()

    return (
        <section id="gallery" className="section section--dark gallery" ref={ref}>
            <div className="container">

                {/* Equipment spotlight */}
                <div className="gallery__equipment fade-up">
                    <div className="gallery__equipment-text">
                        <span className="section-label">The Machine</span>
                        <h2 className="section-title">Bobcat S77 + Forestry<br />Mulcher Package</h2>
                        <p className="gallery__equipment-desc">
                            Our Bobcat S77 compact track loader paired with a professional-grade forestry mulcher drum is the most effective land clearing tool for North Carolina properties. It handles dense brush, briars, honeysuckle, saplings, and small trees — grinding everything into fine organic mulch in a single pass.
                        </p>
                        <ul className="gallery__specs">
                            <li><span>⚡</span> 92 HP turbocharged engine</li>
                            <li><span>🔩</span> Hydraulic drive forestry mulcher drum</li>
                            <li><span>🌿</span> Clears trees up to 6–8" diameter</li>
                            <li><span>🚫🔥</span> Zero burn piles — mulch stays on-site</li>
                            <li><span>📐</span> Works on slopes, tight spaces & rough terrain</li>
                        </ul>
                        <a href="#quote-form" className="btn btn-primary" onClick={e => {
                            e.preventDefault()
                            document.querySelector('#quote-form')?.scrollIntoView({ behavior: 'smooth' })
                        }}>Get a Free Quote →</a>
                    </div>
                    <div className="gallery__equipment-img">
                        <img
                            src={bobcatImg}
                            alt="Bobcat S77 with forestry mulcher attachment clearing land in North Carolina"
                            loading="lazy"
                        />
                        <div className="gallery__equipment-badge">Bobcat S77 · Forestry Mulcher</div>
                    </div>
                </div>

                {/* Before / After */}
                <div className="gallery__ba-header fade-up">
                    <span className="section-label">Before & After</span>
                    <h2 className="section-title">See the Transformation</h2>
                    <p className="section-subtitle">From impassable jungle to clean, usable land — in a single day.</p>
                </div>

                <div className="gallery__ba-grid stagger-children">
                    {beforeAfter.map((item) => (
                        <div key={item.label} className={`gallery__card ${item.className} fade-up`}>
                            <div className="gallery__card-label">{item.label}</div>
                            <img
                                src={item.img}
                                alt={item.caption}
                                loading="lazy"
                                className="gallery__card-img"
                            />
                            <p className="gallery__card-caption">{item.caption}</p>
                        </div>
                    ))}
                </div>

                <div className="gallery__cta fade-up">
                    <p>Ready to see this kind of transformation on <em>your</em> property?</p>
                    <a href="tel:6419191107" className="btn btn-primary btn-lg" id="gallery-cta">
                        📞 Call (641) 919-1107
                    </a>
                </div>
            </div>
        </section>
    )
}
