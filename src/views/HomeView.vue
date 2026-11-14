<template>
  <div class="home">
    <section class="hero-card" v-reveal>
      <div class="hero-tape tape-left" aria-hidden="true"></div>
      <div class="hero-tape tape-right" aria-hidden="true"></div>

      <div class="hero-copy">
        <span class="eyebrow">Portfolio PKL · 2025 / 2026</span>

        <h1 class="title">
          Website Sidang
          <span class="title-mark">Laporan <em>PKL</em></span>
        </h1>

        <p class="subtitle">
          Presentasi Praktik Kerja Lapangan yang dibungkus jadi portofolio interaktif.
          <span>Milik Pramudya Wira Andhara</span>, siswa XI PPLG 2 SMK Yadika Soreang.
        </p>

        <div class="action-buttons">
          <button class="btn btn-primary" @click="startPresentation">
            Mulai Presentasi <span class="btn-arrow">→</span>
          </button>
          <button class="btn btn-outline" @click="downloadLaporan">
            <span class="down-icon">↓</span> Unduh Laporan
          </button>
        </div>

        <div class="hero-meta">
          <div class="meta-item">
            <span class="meta-label">Peserta</span>
            <strong>Pramudya Wira Andhara</strong>
            <small>XI PPLG 2 · SMK Yadika Soreang</small>
          </div>
          <span class="meta-divider"></span>
          <div class="meta-item">
            <span class="meta-label">Tempat PKL</span>
            <strong>PT Cerebrum Edukanesia Nusantara</strong>
            <small>EdTech · Kab. Bandung</small>
          </div>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="visual-sticker sticker-code">&lt;/&gt;</div>
        <div class="visual-sticker sticker-year">2026</div>
        <div class="visual-sticker sticker-mood">belajar<br>terus</div>

        <div class="photo-frame">
          <div class="photo-tape"></div>
          <img src="../assets/potoprofilwira.png" alt="Foto Pramudya Wira Andhara" />
          <div class="photo-caption">
            <span class="live-dot"></span>
            sedang PKL di Cerebrum
          </div>
        </div>

        <div class="blob-orbit"></div>
      </div>

      <div class="confetti-layer" aria-hidden="true"></div>
    </section>

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <span>PKL 2025 / 2026</span><span class="star">✦</span>
        <span>WEB DEVELOPMENT</span><span class="star">✦</span>
        <span>PT CEREBRUM EDUKANESIA NUSANTARA</span><span class="star">✦</span>
        <span>SMK YADIKA SOREANG</span><span class="star">✦</span>
        <span>PKL 2025 / 2026</span><span class="star">✦</span>
        <span>WEB DEVELOPMENT</span><span class="star">✦</span>
        <span>PT CEREBRUM EDUKANESIA NUSANTARA</span><span class="star">✦</span>
        <span>SMK YADIKA SOREANG</span><span class="star">✦</span>
      </div>
    </div>

    <section class="quick-grid">
      <router-link to="/report" class="quick-card card-report" v-reveal="40">
        <span class="quick-index">01</span>
        <h3>Laporan PKL</h3>
        <p>Profil PT Cerebrum Edukanesia Nusantara, kegiatan, teknologi, dan hasil PKL.</p>
        <span class="quick-cta">Baca laporan <span>→</span></span>
      </router-link>

      <router-link to="/profile" class="quick-card card-profile" v-reveal="120">
        <span class="quick-index">02</span>
        <h3>Data Diri</h3>
        <p>Kenalan dulu — profil singkat, progress PKL, dan tech stack yang dipakai.</p>
        <span class="quick-cta">Kenalan yuk <span>→</span></span>
      </router-link>

      <router-link to="/contact" class="quick-card card-contact" v-reveal="200">
        <span class="quick-index">03</span>
        <h3>Kontak</h3>
        <p>Instagram, WhatsApp, dan TikTok. Mari terhubung atau sekadar menyapa.</p>
        <span class="quick-cta">Sapa aku <span>→</span></span>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const downloadLaporan = () => {
  const fileUrl = '/PRAMUDYAFILE.docx'
  const link = document.createElement('a')
  link.href = fileUrl
  link.setAttribute('download', 'PRAMUDYAFILE.docx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const startPresentation = () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const layer = document.querySelector('.confetti-layer')

  if (layer && !prefersReduced) {
    const colors = ['#F8ABA0', '#17233D', '#FFFFFF', '#FFD5CE', '#E98275']

    for (let i = 0; i < 40; i += 1) {
      const piece = document.createElement('span')
      piece.className = 'confetti-piece'
      piece.style.left = `${45 + Math.random() * 10}%`
      piece.style.top = '58%'
      piece.style.background = colors[Math.floor(Math.random() * colors.length)]
      piece.style.setProperty('--x', `${(Math.random() - 0.5) * 560}px`)
      piece.style.setProperty('--y', `${-80 - Math.random() * 320}px`)
      piece.style.setProperty('--r', `${Math.random() * 720 - 360}deg`)
      piece.style.setProperty('--d', `${0.7 + Math.random() * 0.7}s`)
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px'
      layer.appendChild(piece)
      setTimeout(() => piece.remove(), 1600)
    }
  }

  setTimeout(() => router.push('/report'), 320)
}
</script>

<style scoped>
.home {
  max-width: 1120px;
  margin: 0 auto;
}

/* ================= HERO ================= */
.hero-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: clamp(24px, 5vw, 64px);
  align-items: center;
  padding: clamp(28px, 5vw, 64px);
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 32px;
  box-shadow: 8px 8px 0 var(--navy);
  overflow: hidden;
}

.hero-card::before {
  content: '';
  position: absolute;
  width: 340px;
  height: 340px;
  top: -160px;
  right: -80px;
  border-radius: 50%;
  background: rgba(248, 171, 160, 0.28);
}

.hero-tape {
  position: absolute;
  width: 96px;
  height: 26px;
  background: rgba(248, 171, 160, 0.7);
  border: 1px dashed rgba(23, 35, 61, 0.25);
  z-index: 3;
}

.tape-left {
  top: 18px;
  left: -26px;
  transform: rotate(-38deg);
}

.tape-right {
  bottom: 26px;
  right: -30px;
  transform: rotate(-38deg);
}

.hero-copy {
  position: relative;
  z-index: 2;
}

.title {
  margin: 18px 0 14px;
  font-size: clamp(2.5rem, 6vw, 4.4rem);
  line-height: 0.98;
  font-weight: 800;
}

.title-mark {
  display: inline-block;
  position: relative;
  color: var(--navy);
}

.title-mark em {
  font-style: normal;
  position: relative;
  color: var(--navy);
  z-index: 1;
}

.title-mark::after {
  content: '';
  position: absolute;
  left: 0.1em;
  right: 0.1em;
  bottom: 0.08em;
  height: 0.3em;
  background: var(--pink);
  border-radius: 999px;
  z-index: 0;
  transform: rotate(-1.2deg);
}

.subtitle {
  max-width: 46ch;
  margin: 0 0 28px;
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.75;
}

.subtitle span {
  color: var(--navy);
  font-weight: 700;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn-arrow {
  transition: transform 0.25s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.down-icon {
  font-size: 1.05rem;
  line-height: 1;
}

.hero-meta {
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-top: 34px;
  padding-top: 24px;
  border-top: 1.5px dashed var(--line);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.meta-label {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--pink-deep);
}

.meta-item strong {
  font-size: 0.88rem;
  line-height: 1.3;
}

.meta-item small {
  color: var(--muted);
  font-size: 0.72rem;
}

.meta-divider {
  width: 1.5px;
  background: var(--line);
  border-radius: 999px;
}

/* ================= HERO VISUAL ================= */
.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 360px;
  z-index: 2;
}

.photo-frame {
  position: relative;
  width: min(260px, 68vw);
  padding: 12px 12px 58px;
  background: var(--seashell);
  border: 2px solid var(--navy);
  border-radius: 22px;
  transform: rotate(4deg);
  box-shadow: 7px 7px 0 var(--navy);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-visual:hover .photo-frame {
  transform: rotate(-2deg) scale(1.03);
}

.photo-frame img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 14px;
  border: 2px solid var(--navy);
  display: block;
}

.photo-tape {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 92px;
  height: 24px;
  background: rgba(248, 171, 160, 0.85);
  border: 1px dashed rgba(23, 35, 61, 0.3);
}

.photo-caption {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--navy);
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--pink-deep);
  animation: pulseDot 1.6s ease-in-out infinite;
}

.visual-sticker {
  position: absolute;
  display: grid;
  place-items: center;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 800;
  border: 2px solid var(--navy);
  box-shadow: 4px 4px 0 var(--navy);
  animation: floatSticker 5s ease-in-out infinite;
  z-index: 3;
}

.sticker-code {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: var(--pink);
  top: 6%;
  left: 2%;
  font-size: 1.1rem;
  transform: rotate(-10deg);
}

.sticker-year {
  width: 74px;
  height: 74px;
  border-radius: 18px;
  background: var(--navy);
  color: var(--seashell);
  bottom: 10%;
  right: 0;
  font-size: 1.15rem;
  transform: rotate(8deg);
  animation-delay: 1.2s;
}

.sticker-mood {
  padding: 10px 14px;
  border-radius: 14px;
  background: var(--white);
  color: var(--navy);
  top: 12%;
  right: -2%;
  font-size: 0.78rem;
  line-height: 1.15;
  transform: rotate(6deg);
  animation-delay: 0.6s;
}

.blob-orbit {
  position: absolute;
  width: 320px;
  height: 320px;
  border: 2px dashed rgba(23, 35, 61, 0.22);
  border-radius: 50%;
  animation: spin 34s linear infinite;
  z-index: 1;
}

.confetti-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 5;
}

/* ================= MARQUEE ================= */
.marquee {
  margin: 34px 0;
  padding: 13px 0;
  border-top: 2px solid var(--navy);
  border-bottom: 2px solid var(--navy);
  background: var(--pink);
  overflow: hidden;
  transform: rotate(-0.6deg);
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 28px;
  width: max-content;
  animation: marquee 26s linear infinite;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.92rem;
  letter-spacing: 0.1em;
  color: var(--navy);
  white-space: nowrap;
}

.marquee .star {
  color: var(--white);
  font-size: 1.1rem;
}

/* ================= QUICK CARDS ================= */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.quick-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 26px 24px 22px;
  border-radius: 22px;
  border: 2px solid var(--navy);
  background: var(--white);
  box-shadow: 5px 5px 0 var(--navy);
  text-decoration: none;
  color: var(--navy);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

.quick-card::after {
  content: '';
  position: absolute;
  width: 110px;
  height: 110px;
  right: -40px;
  bottom: -45px;
  border-radius: 50%;
  background: rgba(248, 171, 160, 0.35);
  transition: transform 0.4s ease;
}

.quick-card:hover {
  transform: translate(-2px, -5px) rotate(-0.6deg);
  box-shadow: 8px 9px 0 var(--navy);
}

.quick-card:hover::after {
  transform: scale(1.45);
}

.quick-index {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--pink-deep);
}

.quick-card h3 {
  margin: 0;
  font-size: 1.35rem;
}

.quick-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.6;
}

.quick-cta {
  margin-top: auto;
  padding-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 800;
}

.quick-cta span {
  transition: transform 0.25s ease;
}

.quick-card:hover .quick-cta span {
  transform: translateX(5px);
}

.card-report {
  background: var(--white);
}

.card-profile {
  background: var(--seashell);
}

.card-contact {
  background: var(--pink-soft);
}

/* ================= KEYFRAMES ================= */
@keyframes pulseDot {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(233, 130, 117, 0.45);
  }
  50% {
    box-shadow: 0 0 0 7px rgba(233, 130, 117, 0);
  }
}

@keyframes floatSticker {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -12px;
  }
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

/* ================= RESPONSIVE ================= */
@media (max-width: 900px) {
  .hero-card {
    grid-template-columns: 1fr;
    text-align: left;
    gap: 32px;
    box-shadow: 6px 6px 0 var(--navy);
  }

  .hero-visual {
    min-height: 300px;
    order: -1;
  }

  .photo-frame {
    width: min(230px, 60vw);
  }

  .quick-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .hero-card {
    padding: 24px 20px 30px;
    border-radius: 24px;
  }

  .title {
    font-size: clamp(2.15rem, 11vw, 3rem);
  }

  .hero-meta {
    flex-direction: column;
    gap: 12px;
  }

  .meta-divider {
    display: none;
  }

  .action-buttons .btn {
    flex: 1;
    padding: 12px 16px;
    font-size: 0.84rem;
  }

  .sticker-mood {
    right: -6px;
  }

  .sticker-year {
    right: -4px;
  }

  .hero-visual {
    min-height: 260px;
  }

  .photo-frame {
    width: min(210px, 62vw);
  }
}
</style>
