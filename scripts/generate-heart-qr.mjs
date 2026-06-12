import QRCode from 'qrcode'
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PNG } from 'pngjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://happy-birthday-xi-green.vercel.app/'
const CELL = 8
const PADDING = 4

function isInsideHeart(px, py, width, height) {
  const nx = (px / width) * 2.8 - 1.4
  const ny = (1.35 - py / height) * 2.6 - 1.0
  return Math.pow(nx * nx + ny * ny - 1, 3) - nx * nx * Math.pow(ny, 3) <= 0.12
}

function buildHeartQr(url) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' })
  const count = qr.modules.size
  const total = count + PADDING * 2
  const w = total * CELL
  const h = total * CELL

  const pixels = Buffer.alloc(w * h * 4)

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (w * y + x) * 4
      const insideHeart = isInsideHeart(x + 0.5, y + 0.5, w, h)

      const col = Math.floor(x / CELL) - PADDING
      const row = Math.floor(y / CELL) - PADDING
      const isModule =
        col >= 0 &&
        col < count &&
        row >= 0 &&
        row < count &&
        qr.modules.get(row, col)

      if (insideHeart && isModule) {
        pixels[i] = 45
        pixels[i + 1] = 27
        pixels[i + 2] = 78
        pixels[i + 3] = 255
      } else if (insideHeart) {
        pixels[i] = 255
        pixels[i + 1] = 245
        pixels[i + 2] = 248
        pixels[i + 3] = 255
      } else {
        pixels[i] = 255
        pixels[i + 1] = 255
        pixels[i + 2] = 255
        pixels[i + 3] = 255
      }
    }
  }

  let modulesSvg = ''
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!qr.modules.get(row, col)) continue
      const cx = (col + PADDING + 0.5) * CELL
      const cy = (row + PADDING + 0.5) * CELL
      if (isInsideHeart(cx, cy, w, h)) {
        const x = (col + PADDING) * CELL
        const y = (row + PADDING) * CELL
        modulesSvg += `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="1.5" fill="#2d1b4e"/>`
      }
    }
  }

  const heartOutline = `
    <path d="M${w/2},${h*0.88} C${w*0.08},${h*0.55} ${w*0.02},${h*0.22} ${w*0.28},${h*0.12}
      C${w*0.42},${h*0.06} ${w*0.5},${h*0.18} ${w/2},${h*0.28}
      C${w*0.5},${h*0.18} ${w*0.58},${h*0.06} ${w*0.72},${h*0.12}
      C${w*0.98},${h*0.22} ${w*0.92},${h*0.55} ${w/2},${h*0.88} Z"
      fill="none" stroke="#ff2d95" stroke-width="4" opacity="0.9"/>
  `

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fff5f8"/>
      <stop offset="100%" stop-color="#fce4ec"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  ${modulesSvg}
  ${heartOutline}
</svg>`

  const png = new PNG({ width: w, height: h })
  png.data = pixels

  return { svg, png, w, h }
}

const { svg, png } = buildHeartQr(SITE_URL)
const publicDir = join(__dirname, '../public')

writeFileSync(join(publicDir, 'heart-qr.svg'), svg)
writeFileSync(join(publicDir, 'heart-qr.png'), PNG.sync.write(png))

console.log('Generated public/heart-qr.svg and public/heart-qr.png')
