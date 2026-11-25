<template>
  <div class="profile-page">
    <header class="page-head" v-reveal>
      <span class="eyebrow">Kenalan dulu, yuk</span>
      <h2>Data Diri <span>Saya</span></h2>
      <p>Sedikit cerita tentang siapa yang sedang PKL dan apa yang sedang dipelajari.</p>
    </header>

    <div class="profile-card" v-reveal="80">
      <div class="card-tape" aria-hidden="true"></div>

      <div class="avatar-section">
        <div class="avatar-wrapper">
          <div class="avatar-ring" aria-hidden="true"></div>
          <img src="../assets/potoprofilwira.png" alt="Foto Pramudya Wira Andhara" class="profile-img" />
          <span class="hello-sticker">HALO!</span>

          <div class="status-dot-wrapper" title="Lagi PKL">
            <span class="pulse-dot"></span>
            <span class="status-text">PKL berjalan</span>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="tag-group">
          <span class="tag">STUDENT</span>
          <span class="tag tag-developer">DEVELOPER</span>
          <span class="tag tag-pkl">PKL 2026</span>
        </div>

        <h3>PRAMUDYA WIRA ANDHARA</h3>

        <div class="info-list">
          <div class="info-row">
            <span class="info-icon">◆</span>
            <span class="info-label">NIS / NISN</span>
            <span class="info-value">0081756602</span>
          </div>
          <div class="info-row">
            <span class="info-icon">◆</span>
            <span class="info-label">Sekolah</span>
            <span class="info-value">SMK Yadika Soreang</span>
          </div>
          <div class="info-row">
            <span class="info-icon">◆</span>
            <span class="info-label">Jurusan</span>
            <span class="info-value">Rekayasa Perangkat Lunak (PPLG)</span>
          </div>
          <div class="info-row highlight-row">
            <span class="info-icon">✦</span>
            <span class="info-label">Tempat PKL</span>
            <span class="info-value">PT Cerebrum Edukanesia Nusantara</span>
          </div>
        </div>

        <div class="pkl-progress-container">
          <div class="pkl-header">
            <span>Progress PKL</span>
            <span class="progress-value">{{ pklProgress }}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" :style="{ width: shownProgress + '%' }">
              <span class="progress-glint"></span>
            </div>
          </div>
          <p class="progress-note">Terus bertumbuh, sedikit demi sedikit.</p>
        </div>

        <div class="tech-stack-section">
          <h4>Tech Stack yang Dipakai</h4>
          <div class="tech-badges">
            <button
              v-for="tech in techSkills"
              :key="tech.name"
              class="tech-badge"
              :class="{ popped: poppedTech === tech.name }"
              :style="{ '--tech-color': tech.color }"
              @click="popTech(tech.name)"
            >
              {{ tech.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const pklProgress = ref(8.3)
const shownProgress = ref(0)
const poppedTech = ref('')
let progressTimer = null
let popTimer = null

const techSkills = ref([
  { name: 'HTML', color: '#e34c26' },
  { name: 'CSS', color: '#264de4' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Vue.js', color: '#42b883' },
  { name: 'Laravel', color: '#bd34fe' },
  { name: 'PHP', color: '#bd34fe' },
])

const popTech = (name) => {
  poppedTech.value = name
  if (popTimer) clearTimeout(popTimer)
  popTimer = setTimeout(() => {
    poppedTech.value = ''
  }, 650)
}

onMounted(() => {
  progressTimer = setTimeout(() => {
    shownProgress.value = pklProgress.value
  }, 320)
})

onUnmounted(() => {
  if (progressTimer) clearTimeout(progressTimer)
  if (popTimer) clearTimeout(popTimer)
})
</script>

<style scoped>
.profile-page {
  max-width: 920px;
  margin: 0 auto;
}

.page-head {
  margin-bottom: 28px;
}

.page-head h2 {
  margin: 16px 0 8px;
  font-size: clamp(2rem, 5vw, 2.9rem);
}

.page-head h2 span {
  color: var(--pink-deep);
}

.page-head p {
  margin: 0;
  color: var(--muted);
  font-size: 0.96rem;
}

.profile-card {
  position: relative;
  display: flex;
  gap: clamp(24px, 4vw, 42px);
  align-items: center;
  padding: clamp(26px, 4vw, 46px);
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 28px;
  box-shadow: 8px 8px 0 var(--navy);
}

.card-tape {
  position: absolute;
  top: -14px;
  left: 44px;
  width: 100px;
  height: 26px;
  background: rgba(248, 171, 160, 0.75);
  border: 1px dashed rgba(23, 35, 61, 0.3);
  transform: rotate(-4deg);
}

.avatar-section {
  flex-shrink: 0;
}

.avatar-wrapper {
  position: relative;
  width: 210px;
  height: 210px;
}

.avatar-ring {
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  border: 2px dashed rgba(23, 35, 61, 0.35);
  animation: spin 22s linear infinite;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--navy);
  position: relative;
  z-index: 2;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.avatar-wrapper:hover .profile-img {
  transform: rotate(-4deg) scale(1.03);
}

.hello-sticker {
  position: absolute;
  top: -8px;
  right: -14px;
  z-index: 3;
  padding: 5px 10px;
  border-radius: 10px;
  background: var(--pink);
  border: 2px solid var(--navy);
  box-shadow: 2px 2px 0 var(--navy);
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  transform: rotate(8deg);
  animation: wiggle 4s ease-in-out infinite;
}

.status-dot-wrapper {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 13px;
  border-radius: 999px;
  background: var(--navy);
  color: var(--seashell);
  white-space: nowrap;
  border: 2px solid var(--navy);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--pink);
  animation: pulse 1.6s ease-in-out infinite;
}

.status-text {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.info {
  flex: 1;
  min-width: 0;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 11px;
  border-radius: 999px;
  border: 1.5px solid var(--navy);
  background: var(--pink);
  color: var(--navy);
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.tag-developer {
  background: var(--navy);
  color: var(--seashell);
}

.tag-pkl {
  background: var(--white);
}

.info h3 {
  margin: 14px 0 16px;
  font-size: clamp(1.45rem, 3.6vw, 2rem);
  line-height: 1.05;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 12px;
  background: rgba(255, 245, 238, 0.7);
  border: 1px solid var(--line);
  font-size: 0.85rem;
  transition: transform 0.25s ease, background 0.25s ease;
}

.info-row:hover {
  transform: translateX(4px);
  background: var(--seashell);
}

.info-icon {
  color: var(--pink-deep);
  font-size: 0.7rem;
}

.info-label {
  width: 96px;
  flex-shrink: 0;
  color: var(--muted);
  font-weight: 600;
}

.info-value {
  font-weight: 700;
}

.highlight-row {
  background: var(--pink-soft);
  border-color: rgba(23, 35, 61, 0.2);
}

.highlight-row .info-icon {
  color: var(--navy);
}

/* PROGRESS */
.pkl-progress-container {
  margin-top: 18px;
  padding: 14px;
  border-radius: 16px;
  background: var(--seashell);
  border: 1.5px solid var(--line);
}

.pkl-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.76rem;
  font-weight: 700;
}

.progress-value {
  color: var(--pink-deep);
}

.progress-bar-bg {
  height: 12px;
  border-radius: 999px;
  background: rgba(23, 35, 61, 0.1);
  border: 1px solid rgba(23, 35, 61, 0.16);
  overflow: hidden;
}

.progress-bar-fill {
  position: relative;
  height: 100%;
  min-width: 14px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--pink-deep), var(--pink));
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}

.progress-glint {
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 20%, rgba(255, 255, 255, 0.6) 50%, transparent 80%);
  transform: translateX(-100%);
  animation: glint 2.4s ease-in-out infinite;
}

.progress-note {
  margin: 8px 0 0;
  font-size: 0.68rem;
  color: var(--muted);
}

/* TECH */
.tech-stack-section {
  margin-top: 18px;
}

.tech-stack-section h4 {
  margin: 0 0 10px;
  font-size: 0.82rem;
  color: var(--muted);
  font-family: var(--font-body);
  letter-spacing: 0.04em;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-badge {
  padding: 7px 14px;
  border-radius: 999px;
  border: 1.5px solid var(--navy);
  background: var(--white);
  color: var(--navy);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease, background 0.22s ease;
}

.tech-badge:hover {
  transform: translateY(-4px) rotate(-2deg);
  background: color-mix(in srgb, var(--tech-color) 15%, white);
  box-shadow: 3px 3px 0 var(--navy);
}

.tech-badge.popped {
  animation: techPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: var(--pink);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes wiggle {
  0%,
  100% {
    transform: rotate(8deg);
  }
  50% {
    transform: rotate(-4deg);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(248, 171, 160, 0.6);
  }
  70% {
    box-shadow: 0 0 0 7px rgba(248, 171, 160, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(248, 171, 160, 0);
  }
}

@keyframes glint {
  0%,
  45% {
    transform: translateX(-100%);
  }
  75%,
  100% {
    transform: translateX(100%);
  }
}

@keyframes techPop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.15) rotate(-3deg);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 760px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
    box-shadow: 6px 6px 0 var(--navy);
  }

  .tag-group,
  .tech-badges {
    justify-content: center;
  }

  .info-list {
    text-align: left;
  }

  .avatar-wrapper {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 480px) {
  .info-row {
    flex-wrap: wrap;
    gap: 4px 10px;
  }

  .info-label {
    width: auto;
  }

  .info-value {
    width: 100%;
    padding-left: 17px;
  }
}
</style>
