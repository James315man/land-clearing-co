import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PainPoints from './components/PainPoints'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <PainPoints />
                <Services />
                <HowItWorks />
                <WhyUs />
                <Testimonials />
                <FAQ />
                <ContactForm />
            </main>
            <Footer />
        </>
    )
}

export default App
