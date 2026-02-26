import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ContactForm.css'

const serviceAreas = [
    'Willow Spring', 'Fuquay-Varina', 'Angier', 'Benson',
    'Sanford', 'Lillington', 'Holly Springs', 'Apex',
    'Garner', 'Clayton', 'Other'
]

export default function ContactForm() {
    const ref = useScrollReveal()
    const [form, setForm] = useState({
        name: '', phone: '', email: '', area: '', service: '', details: ''
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Simulate submission (integrate with Formspree/Netlify/etc. later)
        await new Promise(r => setTimeout(r, 1200))
        setLoading(false)
        setSubmitted(true)
    }

    return (
        <section id="quote" className="section section--dark contact" ref={ref}>
            <div className="container">
                <div className="contact__layout">
                    <div className="contact__left fade-up">
                        <span className="section-label">Free Estimate</span>
                        <h2 className="section-title">Let's Talk About<br />Your Property</h2>
                        <p className="section-subtitle">
                            Tell us where you are and what you're dealing with. We'll get back to you quickly with an honest quote — no pressure, no runaround.
                        </p>
                    </div>

                    <div className="contact__right fade-up">
                        {submitted ? (
                            <div className="contact__success" id="form-success" role="alert">
                                <div className="contact__success-icon">✅</div>
                                <h3>We Got It!</h3>
                                <p>Thanks for reaching out. We'll be in touch shortly with your quote. For fastest response, call us directly at <a href="tel:6419191107">(641) 919-1107</a>.</p>
                            </div>
                        ) : (
                            <form className="contact__form" onSubmit={handleSubmit} id="quote-form" aria-label="Quote request form">
                                <div className="form__row">
                                    <div className="form__field">
                                        <label htmlFor="name">Your Name *</label>
                                        <input
                                            id="name" name="name" type="text" required
                                            placeholder="John Smith"
                                            value={form.name} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form__field">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input
                                            id="phone" name="phone" type="tel" required
                                            placeholder="(919) 555-1234"
                                            value={form.phone} onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form__field">
                                    <label htmlFor="email">Email (optional)</label>
                                    <input
                                        id="email" name="email" type="email"
                                        placeholder="you@example.com"
                                        value={form.email} onChange={handleChange}
                                    />
                                </div>

                                <div className="form__row">
                                    <div className="form__field">
                                        <label htmlFor="area">Service Area</label>
                                        <select id="area" name="area" value={form.area} onChange={handleChange}>
                                            <option value="">Select your town...</option>
                                            {serviceAreas.map(a => (
                                                <option key={a} value={a}>{a}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form__field">
                                        <label htmlFor="service">Service Needed</label>
                                        <select id="service" name="service" value={form.service} onChange={handleChange}>
                                            <option value="">Select a service...</option>
                                            <option value="land-clearing">Land Clearing</option>
                                            <option value="brush-clearing">Brush Clearing</option>
                                            <option value="fire-mitigation">Fire Mitigation</option>
                                            <option value="not-sure">Not Sure / Multiple</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form__field">
                                    <label htmlFor="details">Tell Us About Your Property</label>
                                    <textarea
                                        id="details" name="details" rows={4}
                                        placeholder="Estimated acreage, type of growth, any notes about access or terrain..."
                                        value={form.details} onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg form__submit"
                                    id="form-submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : '🌲 Request My Free Quote'}
                                </button>
                                <p className="form__disclaimer">
                                    We typically respond within a few hours during business hours.
                                </p>
                                <div className="contact__tags contact__tags--subtle">
                                    {['Licensed & Insured', 'No Burn Piles', 'Free Quotes', 'Same-Week Scheduling'].map(t => (
                                        <span key={t} className="contact__tag contact__tag--subtle">✔ {t}</span>
                                    ))}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
