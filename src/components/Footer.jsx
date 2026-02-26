import './Footer.css'

export default function Footer() {
    const handleNav = (href) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <footer className="footer" id="footer">
            <div className="footer__top">
                <div className="container footer__grid">
                    <div className="footer__brand">
                        <div className="footer__logo">
                            🌲 <strong>Clear Woods Crew</strong>
                        </div>
                        <p className="footer__tagline">
                            Professional land clearing, brush clearing & fire mitigation — serving the south Raleigh, NC corridor with a Bobcat S77 mulching machine. No burn piles. Ever.
                        </p>
                        <a href="tel:6419191107" className="footer__phone" id="footer-phone">
                            (641) 919-1107
                        </a>
                    </div>

                    <div className="footer__links-col">
                        <h4>Services</h4>
                        <ul>
                            <li><button onClick={() => handleNav('#services')}>Land Clearing</button></li>
                            <li><button onClick={() => handleNav('#services')}>Brush Clearing</button></li>
                            <li><button onClick={() => handleNav('#services')}>Fire Mitigation</button></li>
                        </ul>
                    </div>

                    <div className="footer__links-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><button onClick={() => handleNav('#how-it-works')}>How It Works</button></li>
                            <li><button onClick={() => handleNav('#reviews')}>Reviews</button></li>
                            <li><button onClick={() => handleNav('#faq')}>FAQ</button></li>
                            <li><button onClick={() => handleNav('#quote-form')}>Get a Quote</button></li>
                        </ul>
                    </div>

                    <div className="footer__links-col">
                        <h4>Service Area</h4>
                        <ul>
                            {[
                                'Willow Spring', 'Fuquay-Varina', 'Angier',
                                'Benson', 'Sanford', 'Lillington',
                                'Holly Springs', 'Apex', 'Garner',
                            ].map(town => (
                                <li key={town}><span>{town}, NC</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <p>© {new Date().getFullYear()} Clear Woods Crew — Willow Spring, NC. All rights reserved.</p>
                    <p className="footer__legal">Licensed & Fully Insured</p>
                </div>
            </div>
        </footer>
    )
}
