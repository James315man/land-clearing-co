import { useRef } from 'react'
import { triggerMulchExplosion } from '../hooks/usePineExplosion'
import './PineTreeButton.css'
import mulcherSrc from '../assets/mulcher.png'

// Pre-load the machine image once at module level
const machineImage = new Image()
machineImage.src = mulcherSrc

/**
 * PineTreeButton
 * The button IS a sideways pine tree (tip pointing right) that sways in the wind.
 * On click: machine slides in from the right, runs over the tree, chips everywhere.
 */
export default function PineTreeButton({ href, onClick, children, id, variant = 'primary' }) {
    const ref = useRef(null)

    const handleClick = (e) => {
        const r = ref.current?.getBoundingClientRect()
        if (r) {
            triggerMulchExplosion(
                r.left + r.width * 0.75,   // tree tip position (right side)
                r.top + r.height / 2,
                machineImage
            )
        }
        if (onClick) {
            e.preventDefault()
            setTimeout(() => onClick(e), 680)
        }
    }

    const cls = `pine-btn pine-btn--${variant}`

    // The SVG draws the entire pine tree shape + label
    // Pine tip points RIGHT, trunk root implied on LEFT
    // viewBox: 300 × 80
    const svgContent = (
        <svg
            viewBox="-14 0 314 80"
            xmlns="http://www.w3.org/2000/svg"
            className="pine-btn__svg"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={`pg-${id || 'a'}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0c3d18" />
                    <stop offset="45%" stopColor="#1a7032" />
                    <stop offset="100%" stopColor="#0f5220" />
                </linearGradient>
                <filter id={`pglow-${id || 'a'}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Trunk nub on the left */}
            <rect x="-14" y="34" width="16" height="12" rx="3" fill="#5a3212" />
            <rect x="-14" y="36" width="6" height="4" rx="1" fill="#7a4a28" />

            {/* Main pine tree body — tip points right */}
            <path
                fill={`url(#pg-${id || 'a'})`}
                d="
          M 0,36
          L 0,28
          L 20,14  L 14,4
          L 42,20  L 36,5
          L 68,16  L 62,1
          L 98,14  L 92,0
          L 130,16 L 124,3
          L 162,18 L 157,7
          L 196,20 L 191,10
          L 228,23 L 224,14
          L 258,26
          L 300,40
          L 258,54
          L 224,66 L 228,57
          L 191,70 L 196,60
          L 157,73 L 162,62
          L 124,77 L 130,64
          L 92,80  L 98,66
          L 62,79  L 68,64
          L 36,75  L 42,60
          L 14,76  L 20,66
          L 0,52
          Z
        "
            />

            {/* Needles / texture overlay — lighter green highlight on upper face */}
            <path
                fill="rgba(80,200,100,0.13)"
                d="
          M 0,32 L 18,18 L 12,8 L 40,22 L 34,8
          L 65,18 L 60,4 L 95,15 L 90,2
          L 127,17 L 122,5 L 158,20 L 154,9
          L 193,22 L 188,13 L 225,25 L 222,16
          L 255,28 L 300,40
          L 0,36 Z
        "
            />

            {/* Label text */}
            <text
                x="134"
                y="45"
                textAnchor="middle"
                fill="white"
                fontSize="13.5"
                fontWeight="800"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.08em"
                style={{ textTransform: 'uppercase', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
            >
                {children}
            </text>
        </svg>
    )

    if (href) {
        return (
            <a href={href} id={id} ref={ref} className={cls} onClick={handleClick}>
                {svgContent}
            </a>
        )
    }
    return (
        <button type="button" id={id} ref={ref} className={cls} onClick={handleClick}>
            {svgContent}
        </button>
    )
}
