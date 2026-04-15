import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import LiquidButton from './LiquidButton'

/* ── Hero images ── */
import heroForestryMulching from '../assets/hero-forestry-mulching.png'
import heroBrushClearing from '../assets/hero-brush-clearing.png'
import heroLandClearing from '../assets/hero-land-clearing.png'
import heroLotClearing from '../assets/hero-lot-clearing.png'
import heroFenceLine from '../assets/hero-fence-line.png'
import heroTrailCutting from '../assets/hero-trail-cutting.png'
import heroFireMitigation from '../assets/hero-fire-mitigation.png'

const HERO_IMAGES = {
    'forestry-mulching': heroForestryMulching,
    'brush-clearing': heroBrushClearing,
    'land-clearing': heroLandClearing,
    'lot-clearing': heroLotClearing,
    'fence-line-clearing': heroFenceLine,
    'trail-cutting': heroTrailCutting,
    'fire-mitigation': heroFireMitigation,
}

function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const targets = el.querySelectorAll('.reveal, .reveal-fade')
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
        }, { threshold: 0.1 })
        targets.forEach(t => obs.observe(t))
        return () => obs.disconnect()
    }, [])
    return ref
}

const SERVICES_LIST = [
    { slug: 'forestry-mulching', title: 'Forestry Mulching', icon: '🌲' },
    { slug: 'brush-clearing', title: 'Brush Clearing', icon: '🌿' },
    { slug: 'land-clearing', title: 'Land Clearing', icon: '🌳' },
    { slug: 'lot-clearing', title: 'Lot Clearing', icon: '🏗️' },
    { slug: 'fence-line-clearing', title: 'Fence Line Clearing', icon: '🔗' },
    { slug: 'trail-cutting', title: 'Trail Cutting', icon: '🥾' },
    { slug: 'fire-mitigation', title: 'Fire Mitigation', icon: '🔥' },
]

export default function ServicePage({ service }) {
    const ref = useReveal()
    const faqRef = useReveal()
    const [openFaq, setOpenFaq] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [service.slug])

    const otherServices = SERVICES_LIST.filter(s => s.slug !== service.slug)
    const heroImg = HERO_IMAGES[service.slug]

    return (
        <>
            <Helmet>
                <title>{service.metaTitle}</title>
                <meta name="description" content={service.metaDescription} />
                <link rel="canonical" href={`https://clearwoodsnc.com/services/${service.slug}`} />
                <meta property="og:title" content={service.metaTitle} />
                <meta property="og:description" content={service.metaDescription} />
                <meta property="og:url" content={`https://clearwoodsnc.com/services/${service.slug}`} />
            </Helmet>

            <div ref={ref}>
                {/* Hero Banner — split layout with image */}
                <section id="service-hero" style={{
                    background: 'var(--ink)',
                    display: 'flex',
                    minHeight: '85vh',
                }}>
                    {/* Text side */}
                    <div style={{ flex: '1 1 55%', display: 'flex', alignItems: 'center', paddingTop: '5rem', paddingBottom: '4rem', paddingLeft: '5vw', paddingRight: '3vw' }}>
                        <div style={{ maxWidth: '620px' }}>
                            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                                <Link to="/" style={{ fontSize: '0.78rem', color: 'rgba(240,250,242,0.5)', textDecoration: 'none' }}>Home</Link>
                                <span style={{ color: 'rgba(240,250,242,0.3)', fontSize: '0.75rem' }}>›</span>
                                <span style={{ fontSize: '0.78rem', color: 'rgba(240,250,242,0.5)' }}>Services</span>
                                <span style={{ color: 'rgba(240,250,242,0.3)', fontSize: '0.75rem' }}>›</span>
                                <span style={{ fontSize: '0.78rem', color: 'var(--amber)' }}>{service.title}</span>
                            </div>

                            <span className="eyebrow reveal">{service.eyebrow}</span>

                            <h1 className="headline reveal d2" style={{ color: 'var(--cream)', marginTop: '0.5rem' }}>
                                {service.headline}
                            </h1>

                            <p className="reveal d3" style={{ color: 'rgba(240,250,242,0.72)', fontSize: '1.1rem', lineHeight: 1.72, marginBottom: '2.2rem' }}>
                                {service.heroDescription}
                            </p>

                            <div className="reveal d4" style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                                <a href="tel:9842301426" className="btn btn-amber btn-lg">📞 Call (984) 230-1426</a>
                                <Link to="/#quote-form" className="btn btn-outline-w btn-lg">Get a Free Quote →</Link>
                            </div>
                        </div>
                    </div>

                    {/* Image side */}
                    <div style={{ flex: '1 1 45%', position: 'relative', overflow: 'hidden' }}>
                        <img src={heroImg} alt={`${service.title} in North Carolina`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                        {/* Gradient overlay blending into the dark bg */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--ink) 0%, transparent 30%, transparent 100%)' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--ink) 0%, transparent 20%)' }} />
                    </div>
                </section>

                {/* Proof Strip */}
                <div style={{ background: 'var(--amber)', padding: '0.8rem 5vw' }}>
                    <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {['🌳 96+ Acres Cleared & Trailed', '⭐ 5.0 Google Rating', '🚫 No Burn Piles', '🛡️ Licensed & Insured'].map(t => (
                            <span key={t} style={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.05em', color: 'var(--ink)', textTransform: 'uppercase' }}>{t}</span>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <section className="section section--cream">
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
                            <div>
                                <span className="eyebrow reveal">What You Get</span>
                                <h2 className="headline reveal d2" style={{ color: 'var(--ink)', fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
                                    {service.contentHeadline}
                                </h2>
                                <div className="reveal d3" style={{ fontSize: '1rem', lineHeight: 1.75, color: '#1a3a20', marginBottom: '2rem' }}>
                                    {service.contentBody.map((p, i) => (
                                        <p key={i} style={{ marginBottom: '1.2rem' }}>{p}</p>
                                    ))}
                                </div>
                                <div className="reveal d4">
                                    <LiquidButton href="tel:9842301426" variant="call" size="lg">📞 Talk to Us</LiquidButton>
                                </div>
                            </div>

                            <div className="reveal d2" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                {service.benefits.map(({ icon, text }) => (
                                    <div key={text} style={{
                                        display: 'flex', alignItems: 'flex-start', gap: '1rem',
                                        padding: '0.9rem 1.1rem', background: '#e8f5ec',
                                        border: '1px solid #b8dfc3', borderLeft: '4px solid var(--amber)',
                                        borderRadius: '5px'
                                    }}>
                                        <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{icon}</span>
                                        <span style={{ fontSize: '0.92rem', color: '#1a3a20', lineHeight: 1.5 }}>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="section section--dark">
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <span className="eyebrow reveal">Simple Process</span>
                            <h2 className="headline reveal d2" style={{ color: 'var(--cream)' }}>Three Steps. Done.</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {[
                                { n: '01', title: 'You Call or Text', body: 'Reach us at (984) 230-1426 or fill out our quote form. Tell us what you need cleared.' },
                                { n: '02', title: 'We Quote It', body: "We review your property, assess the density and terrain, and give you a straight number — usually same day." },
                                { n: '03', title: 'We Clear It', body: 'Our Bobcat T77 rolls on, the forestry mulcher gets to work, and by end of day you have usable land. No burn piles.' },
                            ].map((s, i) => (
                                <div key={s.n} className={`reveal d${i + 2}`}
                                    style={{
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                                        borderRadius: '10px', padding: '2.5rem 2rem', textAlign: 'center'
                                    }}>
                                    <div style={{
                                        width: '56px', height: '56px', borderRadius: '50%', background: 'var(--amber)',
                                        color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                                        fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1rem'
                                    }}>{s.n}</div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--cream)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{s.title}</div>
                                    <p style={{ fontSize: '0.9rem', color: 'rgba(240,250,242,0.65)', lineHeight: 1.7 }}>{s.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="section" style={{ background: 'white' }} ref={faqRef}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start' }}>
                            <div style={{ position: 'sticky', top: '6rem' }}>
                                <span className="eyebrow reveal">FAQ</span>
                                <h2 className="headline reveal d2" style={{ color: 'var(--ink)', fontSize: 'clamp(2rem,4vw,3rem)' }}>Common Questions</h2>
                                <p style={{ color: '#2a5032', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem' }} className="reveal d3">
                                    Quick answers about {service.title.toLowerCase()} in Wake, Johnston & Harnett counties.
                                </p>
                                <a href="tel:9842301426" className="btn btn-amber btn-lg reveal d4">📞 Just Call Us</a>
                            </div>
                            <div className="reveal d2" style={{ display: 'flex', flexDirection: 'column' }}>
                                {service.faqs.map((f, i) => (
                                    <div key={i} style={{ borderBottom: '1px solid #c5e0cb' }}>
                                        <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                                            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            gap: '1rem', padding: '1.2rem 0', background: 'none', border: 'none', cursor: 'pointer',
                                            fontFamily: 'var(--font-body)', fontSize: '0.97rem', fontWeight: 600, color: 'var(--ink)', textAlign: 'left'
                                        }}>
                                            <span>{f.q}</span>
                                            <span style={{ color: 'var(--amber)', fontSize: '1.4rem', lineHeight: 1, flexShrink: 0, fontWeight: 400, transition: 'transform 0.25s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                                        </button>
                                        <div style={{ maxHeight: openFaq === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                                            <p style={{ paddingBottom: '1.25rem', fontSize: '0.92rem', color: '#2a5032', lineHeight: 1.7 }}>{f.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                <section className="section section--dark">
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="eyebrow reveal">More Services</span>
                            <h2 className="headline reveal d2" style={{ color: 'var(--cream)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Other Ways We Can Help</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {otherServices.map((s, i) => (
                                <Link to={`/services/${s.slug}`} key={s.slug}
                                    className={`reveal d${Math.min(i + 2, 6)}`}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.8rem',
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                                        borderRadius: '8px', padding: '1.2rem 1.4rem',
                                        textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none' }}>
                                    <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                                    <span style={{ fontWeight: 700, color: 'var(--cream)', fontSize: '0.92rem' }}>{s.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section section--cream">
                    <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
                        <span className="eyebrow reveal">Ready?</span>
                        <h2 className="headline reveal d2" style={{ color: 'var(--ink)' }}>Get a Free Quote Today.</h2>
                        <p className="reveal d3" style={{ color: '#2a5032', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem' }}>
                            Takes 2 minutes. Tell us where you are and what you're dealing with — we'll get back to you fast with a real number.
                        </p>
                        <div className="reveal d4" style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="tel:9842301426" className="btn btn-amber btn-lg">📞 Call (984) 230-1426</a>
                            <Link to="/#quote-form" className="btn btn-outline-dark btn-lg">Get a Quote Online →</Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
