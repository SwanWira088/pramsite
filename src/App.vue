<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/', label: 'Beranda', tag: 'home' },
  { to: '/profile', label: 'Data Diri', tag: 'me' },
  { to: '/class', label: 'Kelas', tag: 'class' },
  { to: '/school', label: 'Sekolah', tag: 'school' },
  { to: '/report', label: 'Laporan PKL', tag: 'report' },
  { to: '/contact', label: 'Kontak', tag: 'hi' },
]

const isMenuOpen = ref(false)
const scrollProgress = ref(0)
const isScrolled = ref(false)
const footerVisible = ref(true)
const showTop = ref(false)
const wiping = ref(false)
const sparkleLayer = ref(null)

let idleTimer = null
let wipeTimer = null
let lastSparkle = 0

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
  isScrolled.value = scrollTop > 30
  showTop.value = scrollTop > 360
  footerVisible.value = false

  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    footerVisible.value = true
  }, 650)
}

const triggerWipe = () => {
  wiping.value = false
  if (wipeTimer) clearTimeout(wipeTimer)

  requestAnimationFrame(() => {
    wiping.value = true
    wipeTimer = setTimeout(() => {
      wiping.value = false
    }, 880)
  })
}

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const makeSparkle = (event) => {
  if (!event || reducedMotion()) return
  if (!window.matchMedia('(pointer: fine)').matches) return

  const now = Date.now()
  if (now - lastSparkle < 55) return
  lastSparkle = now

  const layer = sparkleLayer.value
  if (!layer) return

  const sparkle = document.createElement('span')
  const symbols = ['✦', '✧', '•']
  sparkle.className = 'cursor-sparkle'
  sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)]
  sparkle.style.left = `${event.clientX}px`
  sparkle.style.top = `${event.clientY}px`
  sparkle.style.setProperty('--drift', `${Math.random() * 46 - 23}px`)
  sparkle.style.setProperty('--spin', `${Math.random() * 220 - 110}deg`)
  sparkle.style.fontSize = `${8 + Math.random() * 10}px`
  sparkle.style.color = Math.random() > 0.45 ? '#F8ABA0' : '#17233D'
  layer.appendChild(sparkle)

  setTimeout(() => sparkle.remove(), 780)
}

const handlePointerMove = (event) => makeSparkle(event)

watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
    triggerWipe()
  },
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('pointermove', handlePointerMove)
  if (idleTimer) clearTimeout(idleTimer)
  if (wipeTimer) clearTimeout(wipeTimer)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

  <div class="bg-decor" aria-hidden="true">
    <div class="bg-dots"></div>
    <div class="bg-blob blob-pink"></div>
    <div class="bg-blob blob-navy"></div>
    <div class="bg-ring ring-one"></div>
    <div class="bg-ring ring-two"></div>
    <span class="bg-spark spark-one">✦</span>
    <span class="bg-spark spark-two">✧</span>
  </div>

  <header class="nav-shell" :class="{ scrolled: isScrolled }">
    <router-link to="/" class="brand" @click="closeMenu" aria-label="Kembali ke beranda">
      <span class="brand-sticker">PW</span>
      <span class="brand-text">pramudya<span>wira</span></span>
    </router-link>

    <nav class="nav-links" aria-label="Navigasi utama">
      <router-link
        v-for="(item, index) in navItems"
        :key="item.tag"
        :to="item.to"
        class="nav-link"
        :class="{ 'is-active': route.path === item.to }"
      >
        <span class="nav-index">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="nav-dot"></span>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <button
      class="menu-toggle"
      :class="{ open: isMenuOpen }"
      @click="toggleMenu"
      :aria-expanded="isMenuOpen"
      aria-label="Buka menu navigasi"
    >
      <span></span>
      <span></span>
    </button>
  </header>

  <div class="mobile-menu" :class="{ open: isMenuOpen }">
    <div class="menu-deco menu-deco-one"></div>
    <div class="menu-deco menu-deco-two"></div>
    <span class="menu-star">✦</span>

    <div class="mobile-menu-inner">
      <p class="menu-eyebrow">Navigasi Cepat</p>
      <router-link
        v-for="(item, index) in navItems"
        :key="item.tag"
        :to="item.to"
        class="mobile-link"
        :style="{ '--i': index }"
        @click="closeMenu"
      >
        <span class="m-index">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="m-label">{{ item.label }}</span>
        <span class="m-arrow">↗</span>
      </router-link>
      <p class="menu-footer">PKL 2025 / 2026 · PT Cerebrum Edukanesia Nusantara</p>
    </div>
  </div>

  <main class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <footer class="site-footer" :class="{ hidden: !footerVisible }">
    <span class="footer-left">© 2026 Pramudya Wira</span>
    <span class="footer-dot"></span>
    <span class="footer-right">Portfolio PKL · Cerebrum</span>
  </footer>

  <button class="to-top" :class="{ show: showTop }" @click="scrollToTop" aria-label="Kembali ke atas">
    <span>↑</span>
  </button>

  <div class="route-wipe" :class="{ active: wiping }" aria-hidden="true">
    <span class="wipe-panel wipe-pink"></span>
    <span class="wipe-panel wipe-white"></span>
    <span class="wipe-panel wipe-navy"></span>
  </div>

  <div ref="sparkleLayer" class="sparkle-layer" aria-hidden="true"></div>
</template>

<style>
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
:root {
  --pink: #f8aba0;
  --pink-soft: #ffd5ce;
  --pink-deep: #e98275;
  --seashell: #fff5ee;
  --navy: #17233d;
  --navy-soft: #24345a;
  --white: #ffffff;
  --muted: #5c6580;
  --line: rgba(23, 35, 61, 0.14);
  --shadow-hard: 5px 5px 0 var(--navy);
  --shadow-soft: 0 18px 40px rgba(23, 35, 61, 0.12);
  --radius: 24px;
  --font-body: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;
  --font-display: 'Baloo 2', 'Trebuchet MS', var(--font-body);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-body);
  background-color: var(--seashell);
  color: var(--navy);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-display);
  letter-spacing: -0.02em;
  color: var(--navy);
}

a {
  color: inherit;
}

::selection {
  background: var(--pink);
  color: var(--navy);
}

/* ============================================================
   BACKGROUND DECOR
   ============================================================ */
.bg-decor {
  position: fixed;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 8%, rgba(248, 171, 160, 0.35), transparent 34%),
    radial-gradient(circle at 88% 18%, rgba(255, 255, 255, 0.9), transparent 30%),
    radial-gradient(circle at 70% 92%, rgba(23, 35, 61, 0.08), transparent 40%),
    var(--seashell);
}

.bg-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(23, 35, 61, 0.13) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.35;
  mask-image: linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent);
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.55;
  animation: blobFloat 18s ease-in-out infinite alternate;
}

.blob-pink {
  width: 420px;
  height: 420px;
  background: rgba(248, 171, 160, 0.55);
  top: -120px;
  left: -100px;
}

.blob-navy {
  width: 360px;
  height: 360px;
  background: rgba(23, 35, 61, 0.16);
  bottom: -120px;
  right: -80px;
  animation-duration: 24s;
}

.bg-ring {
  position: absolute;
  border: 2px dashed rgba(23, 35, 61, 0.16);
  border-radius: 50%;
  animation: spin 40s linear infinite;
}

.ring-one {
  width: 240px;
  height: 240px;
  top: 22%;
  right: 6%;
}

.ring-two {
  width: 150px;
  height: 150px;
  bottom: 16%;
  left: 5%;
  animation-direction: reverse;
  animation-duration: 28s;
}

.bg-spark {
  position: absolute;
  font-size: 1.6rem;
  color: var(--pink-deep);
  opacity: 0.5;
  animation: bob 5s ease-in-out infinite;
}

.spark-one {
  top: 30%;
  left: 8%;
}

.spark-two {
  top: 62%;
  right: 10%;
  color: var(--navy);
  animation-delay: 1.4s;
}

/* ============================================================
   SCROLL PROGRESS
   ============================================================ */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--pink-deep), var(--pink), var(--navy));
  z-index: 9999;
  transition: width 0.12s linear;
  border-radius: 0 999px 999px 0;
}

/* ============================================================
   NAVBAR — FLOATING STICKER DOCK
   ============================================================ */
.nav-shell {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1180px, calc(100% - 28px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 9px 12px 9px 16px;
  background: rgba(255, 255, 255, 0.86);
  border: 2px solid var(--navy);
  border-radius: 999px;
  box-shadow: 4px 4px 0 rgba(23, 35, 61, 0.92);
  backdrop-filter: blur(16px);
  z-index: 1000;
  transition: top 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.nav-shell.scrolled {
  top: 8px;
  padding: 7px 10px 7px 14px;
  box-shadow: 3px 3px 0 rgba(23, 35, 61, 0.92);
  background: rgba(255, 255, 255, 0.95);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-sticker {
  position: relative;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--pink);
  border: 2px solid var(--navy);
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--navy);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.brand-sticker::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px dashed rgba(23, 35, 61, 0.45);
  animation: spin 14s linear infinite;
}

.brand:hover .brand-sticker {
  transform: rotate(-12deg) scale(1.08);
}

.brand-text {
  font-family: var(--font-display);
  font-size: 1.06rem;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.brand-text span {
  color: var(--pink-deep);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 13px;
  border-radius: 999px;
  text-decoration: none;
  color: var(--navy);
  font-size: 0.84rem;
  font-weight: 600;
  transition: background 0.25s ease, transform 0.25s ease, color 0.25s ease;
}

.nav-index {
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  opacity: 0.45;
  transition: opacity 0.25s ease;
}

.nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--pink);
  transform: scale(0.6);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.nav-link:hover {
  background: rgba(248, 171, 160, 0.26);
  transform: translateY(-2px) rotate(-1deg);
}

.nav-link:hover .nav-dot {
  transform: scale(1.2);
}

.nav-link.is-active {
  background: var(--navy);
  color: var(--white);
  box-shadow: 2px 2px 0 var(--pink);
}

.nav-link.is-active .nav-index {
  opacity: 0.7;
}

.nav-link.is-active .nav-dot {
  background: var(--pink);
  transform: scale(1);
  box-shadow: 0 0 0 3px rgba(248, 171, 160, 0.22);
}

.menu-toggle {
  display: none;
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid var(--navy);
  background: var(--pink);
  cursor: pointer;
  z-index: 1100;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease;
}

.menu-toggle:hover {
  transform: rotate(6deg) scale(1.05);
}

.menu-toggle span {
  position: absolute;
  left: 50%;
  width: 20px;
  height: 2.5px;
  border-radius: 999px;
  background: var(--navy);
  transform: translateX(-50%);
  transition: transform 0.35s ease, opacity 0.25s ease;
}

.menu-toggle span:nth-child(1) {
  top: 18px;
}

.menu-toggle span:nth-child(2) {
  bottom: 18px;
}

.menu-toggle.open {
  background: var(--navy);
}

.menu-toggle.open span {
  background: var(--pink);
}

.menu-toggle.open span:nth-child(1) {
  top: 21px;
  transform: translateX(-50%) rotate(45deg);
}

.menu-toggle.open span:nth-child(2) {
  bottom: 21px;
  transform: translateX(-50%) rotate(-45deg);
}

/* ============================================================
   MOBILE MENU — CIRCLE CLIP REVEAL
   ============================================================ */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 950;
  background: var(--navy);
  color: var(--seashell);
  padding: 108px 26px 40px;
  display: flex;
  align-items: center;
  clip-path: circle(0% at calc(100% - 45px) 45px);
  visibility: hidden;
  transition: clip-path 0.62s cubic-bezier(0.77, 0, 0.18, 1), visibility 0s 0.62s;
  overflow: hidden;
}

.mobile-menu.open {
  clip-path: circle(150% at calc(100% - 45px) 45px);
  visibility: visible;
  transition: clip-path 0.62s cubic-bezier(0.77, 0, 0.18, 1), visibility 0s;
}

.mobile-menu-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}

.menu-eyebrow {
  margin: 0 0 10px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--pink);
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 13px 6px;
  border-bottom: 1px solid rgba(255, 245, 238, 0.14);
  text-decoration: none;
  color: var(--seashell);
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 6vw, 2.1rem);
  font-weight: 700;
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.4s ease, transform 0.4s ease, color 0.25s ease;
}

.mobile-menu.open .mobile-link {
  opacity: 1;
  transform: translateY(0);
  transition-delay: calc(0.1s + (var(--i) * 0.045s));
}

.m-index {
  font-family: var(--font-body);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--pink);
  opacity: 0.85;
}

.m-label {
  flex: 1;
  transition: transform 0.28s ease, color 0.28s ease;
}

.m-arrow {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--pink);
  transition: transform 0.28s ease;
}

.mobile-link:hover .m-label,
.mobile-link.router-link-exact-active .m-label {
  color: var(--pink);
  transform: translateX(6px);
}

.mobile-link:hover .m-arrow {
  transform: translate(4px, -4px);
}

.menu-footer {
  margin: 26px 0 0;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: rgba(255, 245, 238, 0.55);
}

.menu-deco {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
}

.menu-deco-one {
  width: 260px;
  height: 260px;
  top: -90px;
  left: -80px;
  background: rgba(248, 171, 160, 0.18);
}

.menu-deco-two {
  width: 200px;
  height: 200px;
  bottom: -60px;
  right: -50px;
  border: 2px dashed rgba(248, 171, 160, 0.4);
  animation: spin 30s linear infinite;
}

.menu-star {
  position: absolute;
  top: 26%;
  right: 12%;
  font-size: 2.4rem;
  color: var(--pink);
  opacity: 0.6;
  animation: bob 4s ease-in-out infinite;
}

/* ============================================================
   MAIN & PAGE TRANSITION
   ============================================================ */
.main-content {
  padding: 138px clamp(16px, 5vw, 64px) 150px;
  min-height: 100vh;
}

.page-enter-active {
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease;
}

.page-leave-active {
  transition: opacity 0.26s ease, transform 0.3s ease, filter 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(26px) rotate(0.4deg) scale(0.99);
  filter: blur(6px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-18px) rotate(-0.4deg) scale(0.99);
  filter: blur(6px);
}

/* ============================================================
   GLOBAL BUILDING BLOCKS
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(28px) scale(0.985);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--white);
  border: 1.5px solid var(--navy);
  box-shadow: 2px 2px 0 var(--navy);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--navy);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 26px;
  border-radius: 999px;
  border: 2px solid var(--navy);
  font-family: var(--font-body);
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, background 0.25s ease;
}

.btn-primary {
  background: var(--pink);
  color: var(--navy);
  box-shadow: 4px 4px 0 var(--navy);
}

.btn-outline {
  background: var(--white);
  color: var(--navy);
  box-shadow: 4px 4px 0 var(--pink);
}

.btn:hover {
  transform: translate(-1px, -3px) rotate(-0.6deg);
  box-shadow: 6px 7px 0 var(--navy);
}

.btn-outline:hover {
  box-shadow: 6px 7px 0 var(--pink);
}

.btn:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--navy);
}

/* ============================================================
   FOOTER — AUTO HIDE, MINIMAL
   ============================================================ */
.site-footer {
  position: fixed;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%) translateY(0);
  z-index: 900;
  width: min(650px, calc(100% - 26px));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 9px 22px;
  border-radius: 999px;
  background: rgba(23, 35, 61, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 12px 28px rgba(23, 35, 61, 0.22);
  backdrop-filter: blur(12px);
  color: var(--seashell);
  font-size: 0.74rem;
  letter-spacing: 0.02em;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
}

.site-footer.hidden {
  transform: translateX(-50%) translateY(calc(100% + 28px));
  opacity: 0;
}

.footer-left {
  font-weight: 700;
  color: var(--white);
}

.footer-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--pink);
}

.footer-right {
  color: rgba(255, 245, 238, 0.7);
}

.to-top {
  position: fixed;
  right: 20px;
  bottom: 76px;
  z-index: 950;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--navy);
  background: var(--pink);
  color: var(--navy);
  font-size: 1.15rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 3px 3px 0 var(--navy);
  display: grid;
  place-items: center;
  opacity: 0;
  transform: translateY(18px) scale(0.8);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s ease;
}

.to-top.show {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.to-top:hover {
  background: var(--pink-soft);
  transform: translateY(-4px) rotate(-6deg);
}

/* ============================================================
   ROUTE WIPE
   ============================================================ */
.route-wipe {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  overflow: hidden;
}

.wipe-panel {
  position: absolute;
  inset: 0;
  transform: translateY(-102%);
}

.route-wipe.active .wipe-panel {
  animation: wipePanel 0.72s cubic-bezier(0.77, 0, 0.18, 1) forwards;
}

.wipe-pink {
  background: var(--pink);
}

.wipe-white {
  background: var(--white);
  animation-delay: 0.06s !important;
}

.wipe-navy {
  background: var(--navy);
  animation-delay: 0.12s !important;
}

/* ============================================================
   CURSOR SPARKLES
   ============================================================ */
.sparkle-layer {
  position: fixed;
  inset: 0;
  z-index: 9997;
  pointer-events: none;
  overflow: hidden;
}

.cursor-sparkle {
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: sparkleFloat 0.78s ease-out forwards;
  font-weight: 700;
}

.confetti-piece {
  position: absolute;
  width: 9px;
  height: 9px;
  animation: confettiBurst var(--d) cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ============================================================
   KEYFRAMES
   ============================================================ */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-14px) rotate(8deg);
  }
}

@keyframes blobFloat {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(40px, 30px) scale(1.12);
  }
  100% {
    transform: translate(-25px, 50px) scale(0.95);
  }
}

@keyframes wipePanel {
  0% {
    transform: translateY(-102%);
  }
  42% {
    transform: translateY(0);
  }
  58% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(102%);
  }
}

@keyframes sparkleFloat {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
  }
  25% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--drift)), calc(-50% - 42px)) scale(1.1) rotate(var(--spin));
  }
}

@keyframes confettiBurst {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translate(var(--x), var(--y)) scale(0.7) rotate(var(--r));
  }
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1080px) {
  .nav-index {
    display: none;
  }

  .nav-link {
    padding: 9px 11px;
    font-size: 0.8rem;
  }
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .nav-shell {
    padding: 8px 10px 8px 14px;
  }

  .main-content {
    padding: 118px 18px 128px;
  }
}

@media (max-width: 520px) {
  .brand-text {
    display: none;
  }

  .nav-shell {
    width: calc(100% - 20px);
    top: 10px;
  }

  .main-content {
    padding: 104px 14px 122px;
  }

  .site-footer {
    bottom: 10px;
    justify-content: center;
    padding: 8px 16px;
    font-size: 0.68rem;
  }

  .footer-right,
  .footer-dot {
    display: none;
  }

  .to-top {
    right: 14px;
    bottom: 62px;
    width: 44px;
    height: 44px;
  }

  .bg-ring,
  .bg-spark {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}
</style>
