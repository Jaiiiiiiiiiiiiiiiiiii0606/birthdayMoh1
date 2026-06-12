import QRCode from 'qrcode'
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PNG } from 'pngjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://happy-birthday-xi-green.vercel.app/'

const CELL = 11
const QUIET = 4
const HEART_SCALE = 0.38

function heartPathPoints(w, h) {
  const cx = w / 2
  const cy = h / 2 + h * 0.04
  const points = []
  for (let i = 0; i <= 360; i++) {
    const t = (i / 360) * Math.PI * 2
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    const px = cx + x * HEART_SCALE * w
    const py = cy - y * HEART_SCALE * h
    points.push({ x: px, y: py })
  }
  return { points, cx, cy }
}

function isInsideHeart(px, py, w, h) {
  const cx = w / 2
  const cy = h / 2 + h * 0.06
  const nx = (px - cx) / (w * HEART_SCALE)
  const ny = (cy - py) / (h * HEART_SCALE)
  return Math.pow(nx * nx + ny * ny - 1, 3) - nx * nx * Math.pow(ny, 3) <= 0.18
}

function buildHeartQr(url) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' })
  const count = qr.modules.size
  const qrW = (count + QUIET * 2) * CELL
  const qrH = qrW

  const canvasW = Math.round(qrW * 1.35)
  const canvasH = Math.round(qrH * 1.45)
  const qrX = Math.round((canvasW - qrW) / 2)
  const qrY = Math.round((canvasH - qrH) / 2 + 8)

  const pixels = Buffer.alloc(canvasW * canvasH * 4)

  const setPixel = (x, y, r, g, b, a = 255) => {
    if (x < 0 || y < 0 || x >= canvasW || y >= canvasH) return
    const i = (canvasW * y + x) * 4
    pixels[i] = r
    pixels[i + 1] = g
    pixels[i + 2] = b
    pixels[i + 3] = a
  }

  for (let y = 0; y < canvasH; y++) {
    for (let x = 0; x < canvasW; x++) {
      if (!isInsideHeart(x, y, canvasW, canvasH)) {
        setPixel(x, y, 0, 0, 0, 0)
        continue
      }

      const inQrArea =
        x >= qrX && x < qrX + qrW && y >= qrY && y < qrY + qrH

      if (inQrArea) {
        const col = Math.floor((x - qrX) / CELL) - QUIET
        const row = Math.floor((y - qrY) / CELL) - QUIET
        const isDark =
          col >= 0 &&
          col < count &&
          row >= 0 &&
          row < count &&
          qr.modules.get(row, col)

        if (isDark) {
          setPixel(x, y, 30, 20, 50)
        } else {
          setPixel(x, y, 255, 255, 255)
        }
      } else {
        const dist = Math.hypot(x - canvasW / 2, y - canvasH / 2)
        const maxDist = canvasW * 0.35
        const t = Math.min(1, dist / maxDist)
        setPixel(
          x,
          y,
          Math.round(255 - t * 20),
          Math.round(230 - t * 40),
          Math.round(240 - t * 20),
        )
      }
    }
  }

  const { points } = heartPathPoints(canvasW, canvasH)
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    const steps = 8
    const next = points[(i + 1) % points.length]
    for (let s = 0; s <= steps; s++) {
      const t = s / steps
      const x = Math.round(p.x + (next.x - p.x) * t)
      const y = Math.round(p.y + (next.y - p.y) * t)
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (dx * dx + dy * dy <= 6) {
            setPixel(x + dx, y + dy, 255, 45, 149)
          }
        }
      }
    }
  }

  let modulesSvg = ''
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!qr.modules.get(row, col)) continue
      const x = qrX + (col + QUIET) * CELL
      const y = qrY + (row + QUIET) * CELL
      modulesSvg += `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" fill="#1a1030"/>`
    }
  }

  const heartPathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ') + ' Z'

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}" viewBox="0 0 ${canvasW} ${canvasH}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#fff0f5"/>
      <stop offset="100%" stop-color="#ffd6e8"/>
    </radialGradient>
  </defs>
  <path d="${heartPathD}" fill="url(#bg)"/>
  <rect x="${qrX - 8}" y="${qrY - 8}" width="${qrW + 16}" height="${qrH + 16}" rx="12" fill="#ffffff"/>
  ${modulesSvg}
  <path d="${heartPathD}" fill="none" stroke="#ff2d95" stroke-width="5"/>
</svg>`

  const png = new PNG({ width: canvasW, height: canvasH })
  png.data = pixels

  return { svg, png, canvasW, canvasH }
}

const { svg, png } = buildHeartQr(SITE_URL)
const publicDir = join(__dirname, '../public')

writeFileSync(join(publicDir, 'heart-qr.svg'), svg)
writeFileSync(join(publicDir, 'heart-qr.png'), PNG.sync.write(png))

console.log('Generated public/heart-qr.svg and public/heart-qr.png')
