import { useScrollReveal } from '../hooks/useScrollReveal'
import './ContactForm.css'

export default function ContactForm() {
    const ref = useScrollReveal()

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
                        <div className="contact__ghl-form" id="quote-form">
                            <iframe
                                src="https://link.marketing-titan.com/widget/form/yldRd4SpSbriS5oUgO1L"
                                style={{ width: '100%', height: '600px', border: 'none', borderRadius: '3px' }}
                                id="inline-yldRd4SpSbriS5oUgO1L"
                                data-layout="{'id':'INLINE'}"
                                data-trigger-type="alwaysShow"
                                data-trigger-value=""
                                data-activation-type="alwaysActivated"
                                data-activation-value=""
                                data-deactivation-type="neverDeactivate"
                                data-deactivation-value=""
                                data-form-name="Clear Woods Crew - Quote RequestForm 9"
                                data-height="600"
                                data-layout-iframe-id="inline-yldRd4SpSbriS5oUgO1L"
                                data-form-id="yldRd4SpSbriS5oUgO1L"
                                title="Clear Woods Crew - Quote Request"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
