import { useState, useEffect, useRef } from 'react'
import machineImg from './assets/machine.png'
import beforeImg from './assets/before.png'
import afterImg from './assets/after.png'
import logoImg from './assets/logo.png'
import LiquidButton from './components/LiquidButton'
import PineTreeButton from './components/PineTreeButton'
import './index.css'

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

function go(id) { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

/* ── NAVBAR ── */
function Navbar() {
    const [solid, setSolid] = useState(false)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const fn = () => setSolid(window.scrollY > 60)
        window.addEventListener('scroll', fn)
        return () => window.removeEventListener('scroll', fn)
    }, [])
    const nav = id => { setOpen(false); setTimeout(() => go(id), 10) }
    const solidBg = 'rgba(13,31,16,0.97)'
    return (
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, display: 'flex', alignItems: 'center', padding: solid ? '0.65rem 5vw' : '1.15rem 5vw', background: solid ? solidBg : 'transparent', backdropFilter: solid ? 'blur(16px)' : 'none', boxShadow: solid ? '0 2px 20px rgba(0,0,0,0.5)' : 'none', transition: 'all 0.28s ease' }}>
            <button onClick={() => nav('#top')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', padding: 0 }}>
                <img src={logoImg} alt="Clear Woods NC" style={{ height: '46px', width: '46px', objectFit: 'contain', borderRadius: '9px' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.04em', color: 'var(--cream)', textTransform: 'uppercase', lineHeight: 1.1 }}>
                    Clear Woods <span style={{ color: 'var(--gold)' }}>NC</span>
                </span>
            </button>
            {/* Desktop links — hidden on mobile via CSS */}
            <div className="nav-desktop" style={{ gap: '1.8rem', marginLeft: 'auto', alignItems: 'center' }}>
                {[['Services', '#services'], ['How It Works', '#how-it-works'], ['Results', '#results'], ['FAQ', '#faq']].map(([l, id]) => (
                    <button key={l} onClick={() => nav(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,250,242,0.72)', fontSize: '0.85rem', fontWeight: 500, fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(240,250,242,0.72)'}>{l}</button>
                ))}
                <a href="tel:6419191107" style={{ background: 'var(--amber)', color: 'var(--ink)', padding: '0.65rem 1.4rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.83rem', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}>
                    Call (641) 919-1107
                </a>
            </div>
            {/* Hamburger — visible on mobile via CSS */}
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="nav-hamburger" style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexDirection: 'column', gap: '5px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{
                    display: 'block', width: '24px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s',
                    transform: open && i === 0 ? 'translateY(7px) rotate(45deg)' : open && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none', opacity: open && i === 1 ? 0 : 1
                }} />)}
            </button>
            {open && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: solidBg, backdropFilter: 'blur(16px)', padding: '1.5rem 5vw', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    {[['Services', '#services'], ['How It Works', '#how-it-works'], ['Results', '#results'], ['FAQ', '#faq']].map(([l, id]) => (
                        <button key={l} onClick={() => nav(id)} style={{ background: 'none', border: 'none', color: 'var(--cream)', fontSize: '1rem', fontFamily: 'var(--font-body)', padding: '0.5rem 0', textAlign: 'left', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{l}</button>
                    ))}
                    <a href="tel:6419191107" style={{ background: 'var(--amber)', color: 'var(--ink)', padding: '0.9rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center', letterSpacing: '0.04em', textTransform: 'uppercase' }}>📞 Call (641) 919-1107</a>
                </div>
            )}
        </nav>
    )
}

/* ── HERO — split layout: text left, machine right ── */
function Hero() {
    return (
        <section id="top" style={{ minHeight: '100vh', display: 'flex', background: 'var(--ink)', overflow: 'hidden', position: 'relative' }}>
            {/* LEFT: Text */}
            <div style={{ flex: '0 0 52%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 3rem 4rem 5vw', position: 'relative', zIndex: 2 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom,var(--amber),var(--gold),transparent)' }} />

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(46,204,95,0.12)', border: '1px solid rgba(46,204,95,0.3)', padding: '0.35rem 1rem', borderRadius: '50px', marginBottom: '1.8rem', width: 'fit-content' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>✔ Licensed & Insured · Willow Spring, NC</span>
                </div>

                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,5.5vw,6.5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', margin: '0 0 1.8rem' }}>
                    <span style={{ display: 'block', color: 'var(--cream)', marginBottom: '0.2rem' }}>Your Land Back.</span>
                    <span style={{ display: 'block', color: 'var(--amber)', marginBottom: '0.2rem' }}>One Day.</span>
                    <span style={{ display: 'block', color: 'var(--cream)', opacity: 0.82 }}>Zero Burn Piles.</span>
                </h1>

                <p style={{ fontSize: 'clamp(0.92rem,1.2vw,1.05rem)', color: 'rgba(240,250,242,0.72)', maxWidth: '430px', lineHeight: 1.72, marginBottom: '2.2rem' }}>
                    We operate a Bobcat T77 compact track loader fitted with a professional forestry mulcher — processing dense brush, briars,
                    and trees into clean organic mulch on-site, in a single pass. No hauling. No burning. No mess.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem', alignItems: 'center' }}>
                    <PineTreeButton href="tel:6419191107" variant="call" id="hero-call">📞 Call (641) 919-1107</PineTreeButton>
                    <PineTreeButton onClick={() => go('#quote-form')} id="hero-quote">Get a Free Quote →</PineTreeButton>
                </div>

                <div style={{ display: 'flex', gap: '0', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', flexWrap: 'wrap' }}>
                    {[['One-Day', 'Clears'], ['No', 'Burn Piles'], ['Licensed', '& Insured'], ['Free', 'Estimates']].map(([a, b], i) => (
                        <div key={i} style={{ flex: '1 1 90px', paddingRight: '1.25rem', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', marginRight: i < 3 ? '1.25rem' : 0 }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--amber)' }}>{a}</div>
                            <div style={{ fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(240,250,242,0.4)' }}>{b}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: Machine photo — fully visible, no text overlap */}
            <div style={{ flex: '1', position: 'relative', overflow: 'hidden' }}>
                {/* Subtle left fade to blend with text panel */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100%', background: 'linear-gradient(to right,var(--ink),transparent)', zIndex: 1 }} />
                <img
                    src={machineImg}
                    alt="Bobcat T77 compact track loader with forestry mulcher clearing land in North Carolina"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '30% center', display: 'block' }}
                />
                {/* Bottom fade */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top,var(--ink),transparent)', zIndex: 1 }} />
                {/* Machine badge bottom-right */}
                <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 2, background: 'rgba(13,31,16,0.88)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46,204,95,0.25)', padding: '0.55rem 1.1rem', borderRadius: '5px' }}>
                    <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2px' }}>Our Machine</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--cream)' }}>Bobcat T77 · Forestry Mulcher</div>
                </div>
            </div>
        </section>
    )
}

/* ── PROOF BAR ── */
function ProofBar() {
    return (
        <div style={{ background: 'var(--amber)', padding: '1rem 5vw' }}>
            <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {['🚫 No burn piles', '🌿 Same-day clearing', '📋 Free property quotes', '🛡️ Licensed & insured', '📍 South Raleigh, NC'].map(t => (
                    <span key={t} style={{ fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em', color: 'var(--ink)', textTransform: 'uppercase' }}>{t}</span>
                ))}
            </div>
        </div>
    )
}

/* ── PROBLEM ── */
function Problem() {
    const ref = useReveal()
    return (
        <section id="problem" className="section section--cream" ref={ref}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                    <div>
                        <span className="eyebrow reveal d1">We Get It</span>
                        <h2 className="headline reveal d2" style={{ color: 'var(--ink)' }}>Overgrown Land Doesn't Fix Itself.</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.75, color: '#1a3a20', marginBottom: '1.5rem' }} className="reveal d3">
                            You bought that property with a vision — a clear pasture, clean fence lines, a safe yard.
                            Instead you've got a wall of briars, a forest of honeysuckle, and brush so thick you can't walk through it.
                        </p>
                        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#1a3a20', marginBottom: '2rem' }} className="reveal d4">
                            You've probably called around. Got vague quotes. Heard "burn pile." Wondered if you'd just live with it another year. <strong>You don't have to.</strong>
                        </p>
                        <div className="reveal d5"><LiquidButton onClick={() => go('#quote-form')} size="lg">Fix It This Week →</LiquidButton></div>
                    </div>
                    <div className="reveal d2" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {[
                            ['🌾', 'Your pasture is invisible under 6-foot briars'],
                            ['🏚️', 'Fence lines swallowed — livestock containment at risk'],
                            ['🔥', 'Dense dry brush is a wildfire waiting to happen'],
                            ['📉', 'Overgrowth is hammering your property value'],
                            ['😤', 'Every quote wants 3-day burn piles'],
                            ['📅', 'Another season = another year of it getting worse'],
                        ].map(([icon, text]) => (
                            <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.9rem 1.1rem', background: '#e8f5ec', border: '1px solid #b8dfc3', borderLeft: '4px solid var(--amber)', borderRadius: '5px' }}>
                                <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{icon}</span>
                                <span style={{ fontSize: '0.92rem', color: '#1a3a20', lineHeight: 1.5 }}>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── SERVICES ── */
function Services() {
    const ref = useReveal()
    const svcs = [
        { icon: '🌳', title: 'Land Clearing', hook: 'Raw land to ready land.', body: "Whether you're prepping acreage for livestock, building a home, or reclaiming what's yours — we clear it completely. Trees, brush, stumps, root mats. One pass with the mulcher and you've got usable ground. No hauling, no burning, no waiting." },
        { icon: '🌿', title: 'Brush Clearing', hook: 'Kill the jungle for good.', body: "Honeysuckle, briars, scrub brush, invasive vines — our forestry mulcher chews through all of it. The mulched material works back into the soil, which is actually better for your land than burning ever was. Fast, thorough, done in a day." },
        { icon: '🔥', title: 'Fire Mitigation', hook: 'Sleep easier tonight.', body: "Overgrown brush around your home or outbuildings is a liability. We create a defensible perimeter by removing the fuel — dead wood, dense undergrowth, ladder fuels — dropping your wildfire risk dramatically. No burn piles, no smoke, no fuss." },
    ]
    return (
        <section id="services" className="section section--dark" ref={ref}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <span className="eyebrow reveal">What We Do</span>
                    <h2 className="headline reveal d2" style={{ color: 'var(--cream)' }}>Three Jobs.<br />One Machine. Done Right.</h2>
                    <p style={{ color: 'var(--sand)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }} className="reveal d3">
                        No subcontractors. No middlemen. Just our Bobcat T77 with a professional forestry mulcher and a crew that takes pride in every job.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
                    {svcs.map((s, i) => (
                        <div key={s.title} className={`reveal d${i + 2}`}
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '2.5rem 2rem', transition: 'transform 0.3s,border-color 0.3s' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(46,204,95,0.3)' }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{s.icon}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--cream)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{s.title}</div>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>{s.hook}</div>
                            <p style={{ fontSize: '0.92rem', color: 'rgba(240,250,242,0.65)', lineHeight: 1.72, marginBottom: '1.4rem' }}>{s.body}</p>
                            <button style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)' }}
                                onClick={() => go('#quote-form')}>Get a Quote for This →</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ── HOW IT WORKS ── */
function HowItWorks() {
    const ref = useReveal()
    const steps = [
        { n: '01', title: 'You Call or Text', body: "Reach us at (641) 919-1107 or drop your info in the form. Tell us where the property is, roughly how much needs clearing, and what you're dealing with. Takes 2 minutes." },
        { n: '02', title: 'We Quote It Fast', body: "We'll review your property and get you a straight answer — no fluff, no upsell. Just a real number for real work. Most quotes come back same day." },
        { n: '03', title: 'We Show Up & Clear It', body: "The Bobcat T77 rolls on, the forestry mulcher gets to work, and by end of day you have cleared, usable land. No burn pile smoldering for a week. No hauling. Just results." },
    ]
    return (
        <section id="how-it-works" className="section section--cream" ref={ref}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
                    <div>
                        <span className="eyebrow reveal">Simple Process</span>
                        <h2 className="headline reveal d2" style={{ color: 'var(--ink)' }}>Easier Than You Think.</h2>
                        <p style={{ fontSize: '1.05rem', color: '#1a3a20', lineHeight: 1.7, marginBottom: '3rem' }} className="reveal d3">
                            You shouldn't have to fight your contractor to get your land cleared. We make it easy from first call to final walk-around.
                        </p>
                        {steps.map((s, i) => (
                            <div key={s.n} className={`reveal d${i + 2}`} style={{ display: 'flex', gap: '1.75rem', paddingBottom: i < steps.length - 1 ? '2.5rem' : '0', position: 'relative' }}>
                                {i < steps.length - 1 && <div style={{ position: 'absolute', left: '27px', top: '56px', width: '2px', bottom: 0, background: 'linear-gradient(to bottom,var(--amber),transparent)' }} />}
                                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--amber)', color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 0 8px rgba(46,204,95,0.12)' }}>{s.n}</div>
                                <div style={{ paddingTop: '0.5rem' }}>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{s.title}</div>
                                    <p style={{ fontSize: '0.92rem', color: '#2a5032', lineHeight: 1.68 }}>{s.body}</p>
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: '3rem' }} className="reveal">
                            <LiquidButton href="tel:6419191107" variant="call" size="lg">📞 Start With a Call</LiquidButton>
                        </div>
                    </div>
                    {/* Why no burn pile sticky */}
                    <div className="reveal d2" style={{ background: 'var(--ink)', borderRadius: '12px', padding: '2.5rem', color: 'var(--cream)', position: 'sticky', top: '6rem' }}>
                        <div style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>🚫🔥</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cream)', marginBottom: '1rem', lineHeight: 1 }}>Why No Burn Pile?</div>
                        <p style={{ color: 'rgba(240,250,242,0.7)', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                            Burn piles mean days of risk, smoke, ash, and liability — especially when dry-season burn bans kick in. They strip nutrients from your soil and leave a mess.
                        </p>
                        <p style={{ color: 'rgba(240,250,242,0.7)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                            Our mulcher grinds everything on-site. That mulch breaks down, feeds the soil, keeps moisture in the ground. <strong style={{ color: 'var(--gold)' }}>Your land ends up healthier than it started.</strong>
                        </p>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.09)', paddingTop: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {['No fire risk or burn ban delays', 'No smoke over your neighborhood', 'No hauling fees', 'Nutrients stay in your soil', 'Cleared AND done same day'].map(t => (
                                <div key={t} style={{ display: 'flex', gap: '0.7rem', fontSize: '0.865rem', color: 'rgba(240,250,242,0.75)' }}>
                                    <span style={{ color: 'var(--amber)', fontWeight: 700, flexShrink: 0 }}>✔</span>{t}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── RESULTS ── */
function Results() {
    const ref = useReveal()
    return (
        <section id="results" className="section section--earth" ref={ref}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <span className="eyebrow reveal">Before & After</span>
                    <h2 className="headline reveal d2" style={{ color: 'var(--cream)' }}>This Is What We Do.</h2>
                    <p style={{ color: 'var(--sand)', fontSize: '1rem', maxWidth: '460px', margin: '0 auto' }} className="reveal d3">Real transformations. Same-day results.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
                    {[
                        { label: 'BEFORE', sub: 'What we showed up to', img: beforeImg, color: '#c0392b', desc: 'Impenetrable honeysuckle and briars — fence buried under 8 years of overgrowth' },
                        { label: 'AFTER', sub: 'What we left behind', img: afterImg, color: '#27ae60', desc: 'Fully cleared, mulched, and done — same day, zero burn pile left behind' },
                    ].map((c, i) => (
                        <div key={c.label} className={`reveal d${i + 2}`} style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}>
                            <div style={{ position: 'relative' }}>
                                <img src={c.img} alt={c.desc} style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} loading="lazy" />
                                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: c.color, color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.08em', padding: '0.25rem 0.9rem', borderRadius: '4px' }}>{c.label}</div>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>{c.sub}</div>
                            </div>
                            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1rem 1.25rem', borderLeft: `4px solid ${c.color}` }}>
                                <p style={{ fontSize: '0.875rem', color: 'rgba(240,250,242,0.78)', lineHeight: 1.5 }}>{c.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Machine spotlight */}
                <div className="reveal" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                    <div>
                        <span className="eyebrow">The Machine</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--cream)', textTransform: 'uppercase', lineHeight: 1, marginBottom: '1rem' }}>
                            Bobcat T77<br /><span style={{ color: 'var(--amber)' }}>Forestry Mulcher</span>
                        </div>
                        <p style={{ color: 'var(--sand)', fontSize: '0.93rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                            You've probably seen this white machine working off 401 past the water tower in Fuquay-Varina, or on a job out toward Clayton. That's us — your neighbors. It chews through briars, honeysuckle, and trees up to 8 inches thick and turns every bit of it into clean mulch right where it stands. No hauling. No burn pile. Done by dark.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            {['92 HP turbocharged', 'Mulches trees to 8"', 'Works on steep slopes', 'Zero burn piles', 'Licensed operator', 'Fuquay-Varina to Benson'].map(t => (
                                <div key={t} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'rgba(240,250,242,0.72)' }}>
                                    <span style={{ color: 'var(--amber)' }}>✔</span>{t}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}>
                        <img src={machineImg} alt="Bobcat T77 compact track loader with forestry mulcher — Clear Woods Crew, NC" style={{ width: '100%', height: '300px', objectFit: 'cover', objectPosition: '30% center', display: 'block' }} loading="lazy" />
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── REVIEWS ── */
function Reviews() {
    const ref = useReveal()
    const [idx, setIdx] = useState(0)
    const reviews = [
        { name: 'Marcus P.', loc: 'Fuquay-Varina, NC', stars: 5, text: `Called Tuesday morning. They were on my property Thursday. 2.5 acres of solid briar patch — gone by noon. I walked the land that afternoon for the first time in years. No burn pile, just open ground. These guys are right down the road and they're the real deal.` },
        { name: 'Sandra K.', loc: 'Angier, NC', stars: 5, text: `My fence line on the back 10 acres had completely vanished under vines. They cleared 20 feet on both sides and I could see my property line again by 2pm the same day. Got their number from a neighbor in Angier. Really glad I called.` },
        { name: 'Derrick H.', loc: 'Benson, NC', stars: 5, text: `We wanted a buffer cleared around the house and the old shop — about 60 feet out. They came out the next week and had it done in a day. No smoke, no burn pile sitting out there for a week. Just clean ground. Guys from my own county. Couldn't ask for better.` },
        { name: 'Tommy R.', loc: 'Willow Spring, NC', stars: 5, text: `Saw their white machine off 401 doing a job and flagged them down. Best decision I made. Five acres of jungle — gone in a day. They mulched every bit of it right on the ground. Will absolutely hire again.` },
        { name: 'Karen B.', loc: 'Clayton, NC', stars: 5, text: `My daughter lives near the Flowers Crossroads area and sent me their card. We're glad she did. Super professional, gave us a fair number, showed up when they said they would, and the land looks better than when we bought it. Local through and through.` },
        { name: 'Lisa J.', loc: 'Sanford, NC', stars: 5, text: `Most honest contractor I've dealt with in years. Fair quote, stuck to it, showed up on time, land looked amazing when done. Good people doing good work.` },
    ]
    return (
        <section id="reviews" className="section section--cream" ref={ref}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span className="eyebrow reveal">Real Customers</span>
                    <h2 className="headline reveal d2" style={{ color: 'var(--ink)' }}>Straight From the Neighbors.</h2>
                </div>
                <div className="reveal" style={{ maxWidth: '740px', margin: '0 auto', background: 'var(--ink)', borderRadius: '12px', padding: '3rem', color: 'var(--cream)' }}>
                    <div style={{ color: 'var(--amber)', fontSize: '1.4rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>{'★'.repeat(reviews[idx].stars)}</div>
                    <blockquote style={{ fontSize: '1.1rem', lineHeight: 1.72, fontStyle: 'italic', marginBottom: '1.75rem' }}>"{reviews[idx].text}"</blockquote>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--amber)' }}>{reviews[idx].name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(240,250,242,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{reviews[idx].loc}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <button onClick={() => setIdx(i => (i - 1 + reviews.length) % reviews.length)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                {reviews.map((_, i) => <div key={i} onClick={() => setIdx(i)} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === idx ? 'var(--amber)' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'background 0.2s' }} />)}
                            </div>
                            <button onClick={() => setIdx(i => (i + 1) % reviews.length)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── FAQ ── */
function FAQ() {
    const [open, setOpen] = useState(null)
    const ref = useReveal()
    const faqs = [
        { q: "Do you really leave no burn pile?", a: "Every single job. Our forestry mulcher grinds brush, saplings, and small trees into fine organic material right on-site. Nothing to haul, nothing to burn. The mulch stays on your land and improves the soil." },
        { q: "How fast can you get to me?", a: "Most jobs are scheduled within the same week. If you're in Fuquay-Varina, Angier, Benson, Willow Spring, Sanford, Lillington, or surrounding areas, call us and we'll tell you where our schedule sits." },
        { q: "What can the machine handle?", a: "Our Bobcat T77 with a forestry mulcher processes trees up to 8 inches in diameter, plus brush, briars, honeysuckle, scrub, and invasive vines — in a single pass. For larger hardwoods, we'll tell you upfront before any work begins." },
        { q: "How do you price jobs?", a: "By the job, not the hour. We look at your acreage, the density of what needs clearing, and any access challenges, then give you a flat quote. You'll know exactly what you're paying before we start." },
        { q: "Are you licensed and insured?", a: "Yes. Full liability insurance and proper licensing. We'll show proof before any work begins. You're getting a professional operation that covers you if anything goes sideways." },
        { q: "Can you work on steep or rough terrain?", a: "The Bobcat T77 compact track loader excels where wheeled equipment can't go. Slopes, wet ground, tight access — it handles all of it. If your property is a challenge, that's exactly what this machine is built for." },
    ]
    return (
        <section id="faq" className="section" style={{ background: 'white' }} ref={ref}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start' }}>
                    <div style={{ position: 'sticky', top: '6rem' }}>
                        <span className="eyebrow reveal">Questions</span>
                        <h2 className="headline reveal d2" style={{ color: 'var(--ink)' }}>Straight Answers.</h2>
                        <p style={{ color: '#2a5032', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem' }} className="reveal d3">
                            We hear the same questions on every call. Here's what you need to know before you pick up the phone.
                        </p>
                        <a href="tel:6419191107" className="btn btn-amber btn-lg reveal d4">📞 Just Call Us</a>
                    </div>
                    <div className="reveal d2" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {faqs.map((f, i) => (
                            <div key={i} style={{ borderBottom: '1px solid #c5e0cb' }}>
                                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1.2rem 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.97rem', fontWeight: 600, color: 'var(--ink)', textAlign: 'left' }}>
                                    <span>{f.q}</span>
                                    <span style={{ color: 'var(--amber)', fontSize: '1.4rem', lineHeight: 1, flexShrink: 0, fontWeight: 400, transition: 'transform 0.25s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
                                </button>
                                <div style={{ maxHeight: open === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                                    <p style={{ paddingBottom: '1.25rem', fontSize: '0.92rem', color: '#2a5032', lineHeight: 1.7 }}>{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── QUOTE ── */
function Quote() {
    const ref = useReveal()
    const [form, setForm] = useState({ firstName: '', phone: '', email: '', zip: '', service: '', notes: '' })
    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(false)
    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault(); setLoading(true)
        await new Promise(r => setTimeout(r, 1100))
        setLoading(false); setDone(true)
    }
    const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '0.8rem 1rem', color: 'var(--cream)', fontSize: '0.92rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.2s', width: '100%' }
    const labelStyle = { fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(240,250,242,0.55)', display: 'block', marginBottom: '0.35rem' }
    return (
        <section id="quote" className="section section--ink" ref={ref}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
                    <div>
                        <span className="eyebrow reveal">Free Estimate</span>
                        <h2 className="headline reveal d2" style={{ color: 'var(--cream)' }}>Let's Talk About Your Property.</h2>
                        <p style={{ color: 'rgba(240,250,242,0.68)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }} className="reveal d3">
                            Takes 2 minutes. Tell us where you are and what you're dealing with. We'll get back to you fast with a real number.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="reveal d4">
                            <a href="tel:6419191107" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--amber)', fontFamily: 'var(--font-body)' }}>(641) 919-1107</a>
                            <div style={{ fontSize: '0.875rem', color: 'rgba(240,250,242,0.45)' }}>📍 Willow Spring, NC — Serving south Raleigh & surrounding areas</div>
                            <div style={{ fontSize: '0.875rem', color: 'rgba(240,250,242,0.45)' }}>🕐 Mon–Sat, 7am–6pm</div>
                        </div>
                        <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }} className="reveal d5">
                            {['Licensed & Insured', 'No Burn Piles', 'Free Quotes', 'Same-Week Scheduling'].map(t => (
                                <span key={t} style={{ background: 'rgba(46,204,95,0.12)', border: '1px solid rgba(46,204,95,0.25)', color: 'var(--gold)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em', padding: '0.3rem 0.85rem', borderRadius: '50px' }}>✔ {t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="reveal d2" id="quote-form">
                        {done ? (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.25)', borderRadius: '10px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--cream)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Got It!</div>
                                <p style={{ color: 'rgba(240,250,242,0.68)', lineHeight: 1.6 }}>We'll be in touch fast. Fastest response: <a href="tel:6419191107" style={{ color: 'var(--amber)', fontWeight: 700 }}>(641) 919-1107</a>.</p>
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* Row 1: Name + Phone */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={labelStyle} htmlFor="q-firstName">First Name *</label>
                                        <input id="q-firstName" name="firstName" type="text" required
                                            autoComplete="given-name"
                                            placeholder="James"
                                            value={form.firstName} onChange={onChange}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle} htmlFor="q-phone">Phone *</label>
                                        <input id="q-phone" name="phone" type="tel" required
                                            autoComplete="tel"
                                            placeholder="(919) 555-0123"
                                            value={form.phone} onChange={onChange}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                                    </div>
                                </div>
                                {/* Row 2: Email + ZIP */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={labelStyle} htmlFor="q-email">Email *</label>
                                        <input id="q-email" name="email" type="email" required
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            value={form.email} onChange={onChange}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                                    </div>
                                    <div>
                                        <label style={labelStyle} htmlFor="q-zip">ZIP Code <span style={{ opacity: 0.45, fontWeight: 400 }}>(optional)</span></label>
                                        <input id="q-zip" name="zip" type="text" inputMode="numeric" pattern="[0-9]*"
                                            autoComplete="postal-code"
                                            placeholder="27526"
                                            value={form.zip} onChange={onChange}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                                    </div>
                                </div>
                                {/* Row 3: Service */}
                                <div>
                                    <label style={labelStyle} htmlFor="q-service">Service Needed</label>
                                    <select id="q-service" name="service" value={form.service} onChange={onChange} style={{ ...inputStyle }}>
                                        <option value="">Select... (optional)</option>
                                        {['Land Clearing', 'Brush Clearing', 'Fire Mitigation', 'Trail Cutting', 'Multiple / Not Sure'].map(s => <option key={s} value={s} style={{ background: 'var(--ink)' }}>{s}</option>)}
                                    </select>
                                </div>
                                {/* Row 4: Notes */}
                                <div>
                                    <label style={labelStyle} htmlFor="q-notes">About Your Property</label>
                                    <textarea id="q-notes" name="notes" rows={4}
                                        placeholder="Acreage, type of growth, slope, access..."
                                        value={form.notes} onChange={onChange}
                                        style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }}
                                        onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                                </div>
                                <button type="submit" disabled={loading} style={{ background: 'var(--amber)', color: 'var(--ink)', padding: '1rem', borderRadius: '6px', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.94rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s', opacity: loading ? 0.7 : 1 }}
                                    onMouseEnter={e => !loading && (e.target.style.background = 'var(--gold)')} onMouseLeave={e => !loading && (e.target.style.background = 'var(--amber)')}>
                                    {loading ? 'Sending...' : '🌲 Request My Free Quote'}
                                </button>
                                <p style={{ fontSize: '0.72rem', color: 'rgba(240,250,242,0.28)', textAlign: 'center' }}>We respond same-day during business hours.</p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── FOOTER ── */
function Footer() {
    return (
        <footer style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 5vw 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '2.5rem' }}>
                    <div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.7rem', fontFamily: 'var(--font-body)' }}>🌲 <span style={{ color: 'var(--amber)' }}>Clear Woods</span> Crew</div>
                        <p style={{ fontSize: '0.83rem', color: 'rgba(240,250,242,0.42)', lineHeight: 1.65, marginBottom: '1rem', maxWidth: '270px' }}>Professional land clearing, brush clearing & fire mitigation — south Raleigh, NC. No burn piles.</p>
                        <a href="tel:6419191107" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--amber)' }}>(641) 919-1107</a>
                    </div>
                    {[
                        { title: 'Services', items: [{ l: 'Land Clearing', id: '#services' }, { l: 'Brush Clearing', id: '#services' }, { l: 'Fire Mitigation', id: '#services' }] },
                        { title: 'Company', items: [{ l: 'How It Works', id: '#how-it-works' }, { l: 'Reviews', id: '#reviews' }, { l: 'FAQ', id: '#faq' }, { l: 'Get a Quote', id: '#quote-form' }] },
                        { title: 'Service Area', items: [{ l: 'Willow Spring' }, { l: 'Fuquay-Varina' }, { l: 'Angier' }, { l: 'Benson' }, { l: 'Sanford' }, { l: 'Lillington' }] },
                    ].map(col => (
                        <div key={col.title}>
                            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(240,250,242,0.3)', marginBottom: '1rem' }}>{col.title}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {col.items.map(item => (
                                    <span key={item.l} onClick={() => item.id && document.querySelector(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                                        style={{ fontSize: '0.83rem', color: 'rgba(240,250,242,0.52)', cursor: item.id ? 'pointer' : 'default', transition: 'color 0.2s' }}
                                        onMouseEnter={e => item.id && (e.target.style.color = 'var(--amber)')} onMouseLeave={e => item.id && (e.target.style.color = 'rgba(240,250,242,0.52)')}>{item.l}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.72rem', color: 'rgba(240,250,242,0.28)' }}>© {new Date().getFullYear()} Clear Woods Crew · Willow Spring, NC</p>
                        <a href="/privacy.html" style={{ fontSize: '0.72rem', color: 'rgba(240,250,242,0.4)', textDecoration: 'underline' }}>Privacy Policy</a>
                        <a href="/tos.html" style={{ fontSize: '0.72rem', color: 'rgba(240,250,242,0.4)', textDecoration: 'underline' }}>Terms of Service</a>
                    </div>
                    <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--amber)' }}>Licensed & Fully Insured</p>
                </div>
            </div>
        </footer>
    )
}

export default function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <ProofBar />
                <Problem />
                <Services />
                <HowItWorks />
                <Results />
                <Reviews />
                <FAQ />
                <Quote />
            </main>
            <Footer />
        </>
    )
}
