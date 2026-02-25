import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNav = (e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
            <div className="navbar__inner">
                <a href="#hero" className="navbar__logo" onClick={e => handleNav(e, '#hero')}>
                    <span className="navbar__logo-icon">🌲</span>
                    <span className="navbar__logo-text">
                        <strong>Clear Woods</strong> Crew
                    </span>
                </a>

                <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
                    {navLinks.map(l => (
                        <li key={l.href}>
                            <a href={l.href} onClick={e => handleNav(e, l.href)}>{l.label}</a>
                        </li>
                    ))}
                    <li className="navbar__cta-mobile">
                        <a href="tel:6419191107" className="btn btn-primary">
                            Call (641) 919-1107
                        </a>
                    </li>
                </ul>

                <a href="tel:6419191107" className="btn btn-primary navbar__cta" aria-label="Call us">
                    Call (641) 919-1107
                </a>

                <button
                    className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span /><span /><span />
                </button>
            </div>
        </nav>
    )
}
