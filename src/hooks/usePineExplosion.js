/**
 * triggerMulchExplosion
 *
 * Full animation sequence when a PineTreeButton is clicked:
 *   0–350ms   → Large pine tree grows at (treeX, treeY)
 *   250ms+    → Real mulcher machine slides in from the RIGHT
 *   ~700ms    → Machine reaches tree → IMPACT: screen shake + flash
 *               Tree immediately STOPS being drawn
 *               Machine keeps rolling LEFT through + off-screen
 *   700ms+    → 70 wood chip + sawdust particles rain down with gravity
 *
 * @param {number} treeX   – X center of the button (tip of the pine)
 * @param {number} treeY   – Y center of the button
 * @param {HTMLImageElement} machImg – pre-loaded machine PNG
 */

const CHIPS = ['#8B5233', '#A0714F', '#C49A6C', '#6B3F1E', '#D4A96A', '#7A4A28', '#B8865A', '#5C3518', '#E2C48A', '#8B6914']
const NEEDLES = ['#1a5c22', '#226b2c', '#2d8040', '#0f3d18', '#195c20']

const easeOut = t => 1 - Math.pow(1 - t, 3)
const easeBack = t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) }
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t

/**
 * Remove the white/gray checkerboard background from the machine sprite.
 * Runs once and caches the result as an offscreen canvas.
 */
let _cleanMach = null
function getCleanMachine(img) {
    if (_cleanMach) return _cleanMach

    const off = document.createElement('canvas')
    off.width = img.naturalWidth || img.width
    off.height = img.naturalHeight || img.height
    const octx = off.getContext('2d')
    octx.drawImage(img, 0, 0)

    const idata = octx.getImageData(0, 0, off.width, off.height)
    const px = idata.data
    for (let i = 0; i < px.length; i += 4) {
        const r = px[i], g = px[i + 1], b = px[i + 2]
        // White pixels — pure background
        if (r > 230 && g > 230 && b > 230) { px[i + 3] = 0; continue }
        // Light-gray checkerboard squares (~192,192,192)
        if (r > 165 && g > 165 && b > 165 &&
            Math.abs(r - g) < 18 && Math.abs(g - b) < 18) {
            px[i + 3] = 0; continue
        }
        // Anti-alias fringe: near-white, semi-transparent
        if (r > 210 && g > 210 && b > 210) {
            const brightness = (r + g + b) / 3
            px[i + 3] = Math.round(px[i + 3] * (1 - (brightness - 210) / 45))
        }
    }
    octx.putImageData(idata, 0, 0)
    _cleanMach = off
    return _cleanMach
}


/* ── Pine tree drawing ── */
function drawPine(ctx, cx, cy, size, shakeMag = 0) {
    const sx = (Math.random() - 0.5) * shakeMag
    const sy = (Math.random() - 0.5) * shakeMag * 0.4
    ctx.save()
    ctx.translate(cx + sx, cy + sy)

    // Shadow
    ctx.save()
    ctx.globalAlpha = 0.18
    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.ellipse(0, size * 0.52, size * 0.4, size * 0.07, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // Trunk
    ctx.fillStyle = '#5a3212'
    ctx.beginPath()
    ctx.roundRect(-size * 0.07, size * 0.25, size * 0.14, size * 0.28, 3)
    ctx.fill()

    // Four pine tiers (darkest at base, lightest at top)
    const tiers = [
        { w: 0.60, top: -0.52, bot: 0.28, col: '#0d4a1e' },
        { w: 0.48, top: -0.62, bot: 0.06, col: '#186632' },
        { w: 0.36, top: -0.70, bot: -0.14, col: '#228840' },
        { w: 0.24, top: -0.77, bot: -0.32, col: '#30a850' },
    ]
    tiers.forEach(({ w, top, bot, col }) => {
        ctx.fillStyle = col
        ctx.beginPath()
        ctx.moveTo(0, size * top)
        ctx.lineTo(-size * w, size * bot)
        ctx.lineTo(size * w, size * bot)
        ctx.closePath()
        ctx.fill()
    })

    // Highlight streak
    ctx.save()
    ctx.globalAlpha = 0.12
    ctx.fillStyle = 'rgba(160,255,160,1)'
    tiers.forEach(({ w, top, bot }) => {
        ctx.beginPath()
        ctx.moveTo(0, size * top + size * 0.02)
        ctx.lineTo(-size * w * 0.2, size * (top + (bot - top) * 0.55))
        ctx.lineTo(size * w * 0.05, size * (top + (bot - top) * 0.55))
        ctx.closePath()
        ctx.fill()
    })
    ctx.restore()

    // Tiny side branch details
    ctx.strokeStyle = '#0d4a1e'
    ctx.lineWidth = size * 0.012
    for (let i = 0; i < 5; i++) {
        const yi = size * (-0.1 + i * 0.08)
        const xi = size * 0.38 * (1 - i * 0.06)
        ctx.beginPath(); ctx.moveTo(xi * 0.8, yi); ctx.lineTo(xi * 1.15, yi - size * 0.04); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(-xi * 0.8, yi); ctx.lineTo(-xi * 1.15, yi - size * 0.04); ctx.stroke()
    }

    ctx.restore()
}

/* ── Generate chip particles ── */
function spawnChips(treeX, treeY, size) {
    const out = []
    // Big wood chunks — sprayed left+up by drum
    for (let i = 0; i < 60; i++) {
        const angle = Math.PI * (0.5 + Math.random() * 1.2) - 0.1
        const speed = 3 + Math.random() * 13
        const isNeedle = Math.random() < 0.28
        out.push({
            x: treeX + (Math.random() - 0.5) * size * 0.5,
            y: treeY + (Math.random() - 0.5) * size * 0.45,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - (3 + Math.random() * 5),
            w: isNeedle ? 1.5 + Math.random() * 3 : 4 + Math.random() * 14,
            h: isNeedle ? 9 + Math.random() * 18 : 2 + Math.random() * 6,
            angle: Math.random() * Math.PI * 2,
            rot: (Math.random() - 0.5) * 0.34,
            color: isNeedle ? NEEDLES[Math.floor(Math.random() * NEEDLES.length)] : CHIPS[Math.floor(Math.random() * CHIPS.length)],
            alpha: 1,
            life: 1700 + Math.random() * 1000,
            born: performance.now(),
            bounce: 0.18 + Math.random() * 0.24,
            puff: false,
        })
    }
    // Sawdust puffs
    for (let i = 0; i < 20; i++) {
        const angle = Math.PI * (0.4 + Math.random() * 1.4)
        const speed = 1 + Math.random() * 5
        out.push({
            x: treeX + (Math.random() - 0.5) * 28,
            y: treeY + (Math.random() - 0.5) * 24,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1.5,
            w: 0, h: 0, angle: 0, rot: 0,
            color: '', alpha: 0.75,
            life: 700 + Math.random() * 600,
            born: performance.now(),
            bounce: 0, puff: true,
            puffR: 10 + Math.random() * 24,
        })
    }
    return out
}

export function triggerMulchExplosion(treeX, treeY, machImg) {
    // Canvas overlay
    const W = window.innerWidth, H = window.innerHeight
    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999'
    canvas.width = W; canvas.height = H
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')

    // Tree size
    const TREE = clamp(Math.min(W, H) * 0.19, 95, 190)

    // Machine display size — keep aspect ratio of image (roughly square-ish, 560x480)
    const MACH_H = clamp(H * 0.28, 120, 200)
    const MACH_W = MACH_H * (560 / 480)  // natural aspect ratio of the sprite
    // Machine center-Y: tracks sit at treeY level  
    const MACH_CY = treeY - MACH_H * 0.05

    // The mulcher drum is on the LEFT side of the machine sprite
    // Sprite is the machine facing left; drum is roughly at x=0.22 of image width from left
    const drumFromRight = MACH_W * 0.22  // drum X from LEFT edge of drawn machine
    // machX is the CENTER of the machine (we'll draw image at machX - MACH_W/2)

    // Enter from right
    const machStartX = W + MACH_W * 0.6
    // At impact: machine left edge's drum point is at treeX
    const machImpactX = treeX + MACH_W / 2 - drumFromRight
    // Machine keeps going left after impact — exits off left side
    const machExitX = -MACH_W * 0.7

    // Timings
    const T = {
        treeGrowEnd: 340,
        machIn: 260,   // machine starts entering
        impact: 700,   // machine hits tree
        explode: 720,   // chips spawn
        machGone: 1500,  // machine off screen
        done: 2900,
    }

    const START = performance.now()
    let exploded = false, chips = [], shakeUntil = 0

    function frame(now) {
        const e = now - START
        if (e > T.done && exploded) { canvas.remove(); return }

        ctx.clearRect(0, 0, W, H)

        // Screen shake
        const shaking = now < shakeUntil
        if (shaking) {
            const mag = (1 - (now - (shakeUntil - 180)) / 180) * 10
            ctx.save()
            ctx.translate((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag)
        }

        // ── Tree (only before impact) ──
        if (!exploded) {
            const t = clamp(e / T.treeGrowEnd, 0, 1)
            const scale = easeBack(t)
            ctx.save()
            ctx.translate(treeX, treeY)
            ctx.scale(scale, scale)
            ctx.translate(-treeX, -treeY)
            // Shake near impact
            const preShake = e > T.impact - 120 ? (e - (T.impact - 120)) / 120 * 12 : 0
            drawPine(ctx, treeX, treeY, TREE, preShake)
            ctx.restore()
        }

        // ── Machine ──
        if (e >= T.machIn && machImg.complete) {
            let machX

            if (!exploded) {
                // Approach phase — easeOut deceleration
                const tIn = clamp((e - T.machIn) / (T.impact - T.machIn), 0, 1)
                machX = lerp(machStartX, machImpactX, easeOut(tIn))
            } else {
                // Post-impact — machine rolls through and off left
                const tOut = clamp((e - T.impact) / (T.machGone - T.impact), 0, 1)
                machX = lerp(machImpactX, machExitX, easeOut(tOut))
            }

            // Draw machine image — background stripped, facing left
            const cleanMach = getCleanMachine(machImg)
            ctx.save()
            ctx.translate(machX, MACH_CY)
            ctx.scale(-1, 1)
            ctx.drawImage(cleanMach, -MACH_W / 2, -MACH_H / 2, MACH_W, MACH_H)
            ctx.restore()

            // Dust trail behind machine (right side since it moved from right)
            if (!exploded && e > T.machIn + 100) {
                const trailAlpha = 0.08 * (1 - clamp((e - T.machIn) / (T.impact - T.machIn), 0, 1) * 0.4)
                ctx.save()
                ctx.globalAlpha = trailAlpha
                ctx.fillStyle = '#c8b89a'
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath()
                    ctx.arc(
                        machX + MACH_W * 0.5 + Math.random() * 40,
                        MACH_CY + MACH_H * 0.35 + (Math.random() - 0.5) * 20,
                        8 + Math.random() * 20, 0, Math.PI * 2
                    )
                    ctx.fill()
                }
                ctx.restore()
            }

            // Trigger explosion exactly at impact
            if (!exploded && e >= T.impact) {
                exploded = true
                shakeUntil = now + 210
                chips = spawnChips(treeX, treeY, TREE)

                // Impact flash
                const flash = ctx.createRadialGradient(treeX, treeY, 0, treeX, treeY, TREE * 1.3)
                flash.addColorStop(0, 'rgba(255,245,180,0.95)')
                flash.addColorStop(0.35, 'rgba(255,210,60,0.5)')
                flash.addColorStop(1, 'rgba(255,200,0,0)')
                ctx.fillStyle = flash
                ctx.beginPath(); ctx.arc(treeX, treeY, TREE * 1.3, 0, Math.PI * 2); ctx.fill()
            }
        }

        // ── Chip physics ──
        if (exploded) {
            const FLOOR = H - 4, GRAV = 0.50
            let alive = false
            for (const p of chips) {
                const age = now - p.born
                if (age >= p.life) continue
                alive = true
                p.vy += GRAV; p.x += p.vx; p.y += p.vy
                p.angle += p.rot; p.vx *= 0.987
                p.alpha = clamp(1 - age / p.life, 0, 1)

                if (p.y + (p.puff ? p.puffR : p.h) > FLOOR) {
                    p.y = FLOOR - (p.puff ? p.puffR : p.h)
                    p.vy *= -p.bounce; p.vx *= 0.68; p.rot *= 0.55
                }

                ctx.save()
                ctx.globalAlpha = p.alpha
                ctx.translate(p.x, p.y)
                ctx.rotate(p.angle)
                if (p.puff) {
                    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.puffR)
                    g.addColorStop(0, 'rgba(210,185,140,0.65)')
                    g.addColorStop(1, 'rgba(210,185,140,0)')
                    ctx.fillStyle = g
                    ctx.beginPath(); ctx.arc(0, 0, p.puffR, 0, Math.PI * 2); ctx.fill()
                } else {
                    ctx.fillStyle = p.color
                    ctx.beginPath()
                    ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, Math.min(p.w, p.h) * 0.28)
                    ctx.fill()
                    ctx.fillStyle = 'rgba(255,255,255,0.18)'
                    ctx.beginPath()
                    ctx.roundRect(-p.w / 2, -p.h / 2, p.w * 0.45, p.h * 0.36, 1)
                    ctx.fill()
                }
                ctx.restore()
            }
            if (!alive) { canvas.remove(); return }
        }

        if (shaking) ctx.restore()
        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}
