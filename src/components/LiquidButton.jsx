import { useRef, useEffect } from 'react'
import { triggerMulchExplosion as triggerPineExplosion } from '../hooks/usePineExplosion'
import mulcherSrc from '../assets/mulcher.png'
import './LiquidButton.css'

const _machImg = new Image()
_machImg.src = mulcherSrc


export default function LiquidButton({ href, onClick, variant = 'primary', size = 'md', children, id }) {
    const btnRef = useRef(null)

    // Parallax shimmer follows mouse
    useEffect(() => {
        const el = btnRef.current
        if (!el) return
        const onMove = (e) => {
            const r = el.getBoundingClientRect()
            el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
            el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
        }
        el.addEventListener('mousemove', onMove)
        return () => el.removeEventListener('mousemove', onMove)
    }, [])

    // Pine explosion on click — delay action so animation plays first
    const handleClick = (e) => {
        const r = btnRef.current?.getBoundingClientRect()
        if (r) {
            triggerPineExplosion(
                r.left + r.width / 2,
                r.top + r.height / 2,
                _machImg
            )
        }
        if (onClick) {
            e.preventDefault()
            setTimeout(() => onClick(e), 650)
        }
    }

    const cls = `lbtn lbtn--${variant} lbtn--${size}`
    const sharedProps = { ref: btnRef, id, className: cls }

    const inner = (
        <>
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <filter id="forest-goo" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                        <feTurbulence type="fractalNoise" baseFrequency="0.018 0.012" numOctaves="3" seed="7" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                        <feColorMatrix type="saturate" values="1.4" in="displaced" />
                    </filter>
                </defs>
            </svg>
            <span className="lbtn__blob lbtn__blob--1" aria-hidden="true" />
            <span className="lbtn__blob lbtn__blob--2" aria-hidden="true" />
            <span className="lbtn__shimmer" aria-hidden="true" />
            <span className="lbtn__sap" aria-hidden="true" />
            <span className="lbtn__label">{children}</span>
        </>
    )

    if (href) {
        return (
            <a href={href} {...sharedProps} onClick={handleClick}>
                {inner}
            </a>
        )
    }
    return (
        <button type="button" {...sharedProps} onClick={handleClick}>
            {inner}
        </button>
    )
}
