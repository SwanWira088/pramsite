<template>
  <div class="card-layout">
    <h2>Data Diri <span>Saya</span></h2>
    <div class="card">
      
      <div class="avatar-section">
        <div class="avatar-wrapper">
          <img src="../assets/potoprofilwira.png" alt="Foto Pramudya" class="profile-img" />
          <div class="glow-effect"></div>
          
          <div class="status-dot-wrapper" title="Lagi Ngoding">
            <span class="pulse-dot"></span>
            <span class="status-text">Coding...</span>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="tag-group">
          <span class="tag">STUDENT</span>
          <span class="tag tag-developer">DEVELOPER</span>
        </div>
        
        <h3>PRAMUDYA WIRA ANDHARA</h3>
        
        <p><strong>NIS/NISN:</strong> 0081756602</p>
        <p><strong>Sekolah:</strong> SMK Yadika Soreang</p>
        <p><strong>Sekolah Jurusan:</strong> Rekayasa Perangkat Lunak (RPL)</p>
        <p><strong>Tempat PKL:</strong> PT. <span class="wish">Cerebrum Edukanesia Nusantara</span></p>

        <div class="pkl-progress-container">
          <div class="pkl-header">
            <span>PKL Progress Bar</span>
            <span>{{ pklProgress }}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" :style="{ width: pklProgress + '%' }"></div>
          </div>
        </div>

        <div class="tech-stack-section">
          <h4>Tech Stack yang Dipakai:</h4>
          <div class="tech-badges">
            <span 
              v-for="tech in techSkills" 
              :key="tech.name" 
              class="tech-badge"
              :style="{ '--tech-color': tech.color }"
            >
              {{ tech.name }}
            </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Ganti angka 65 ini dengan persentase real berjalannya PKL kamu!
const pklProgress = ref(1)

// Daftar skill dengan kustomisasi warna neon masing-masing saat di-hover
const techSkills = ref([
  { name: 'HTML5', color: '#e34c26' },
  { name: 'CSS3', color: '#264de4' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Vue.js', color: '#42b883' },
  { name: 'Vite', color: '#bd34fe' }
])
</script>

<style scoped>
.card-layout {
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 800;
}

h2 span {
  color: var(--accent-purple, #a855f7);
}

.card {
  background: var(--bg-card, #171717);
  padding: 3rem;
  border-radius: 24px;
  display: flex;
  gap: 3rem;
  align-items: center;
  border: 1px solid #262626;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  position: relative;
  overflow: hidden;
}

/* Layout Avatar */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.avatar-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid var(--accent-purple, #a855f7);
  position: relative;
  z-index: 2;
}

.glow-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--accent-purple, #a855f7);
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.3;
  z-index: 1;
}

/* --- LIVE STATUS PULSE DOT --- */
.status-dot-wrapper {
  position: absolute;
  bottom: 5px;
  right: 15px;
  background: #222;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
  border: 1px solid #333;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border-radius: 50%;
  position: relative;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #10b981;
  border-radius: 50%;
  animation: pulse 1.5s infinite ease-in-out;
}

.status-text {
  font-size: 0.75rem;
  color: #e4e4e7;
  font-weight: 600;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

/* --- INFO & BADGES --- */
.info {
  z-index: 2;
  flex-grow: 1;
}

.tag-group {
  display: flex;
  gap: 8px;
}

.tag {
  background: var(--accent-purple, #a855f7);
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.tag-developer {
  background: #3b82f6;
}

.info h3 {
  font-size: 2.2rem;
  margin: 15px 0 10px 0;
  font-weight: 800;
  color: #fff;
}

.info p {
  color: #a1a1aa;
  line-height: 1.6;
  margin: 6px 0;
  font-size: 1.05rem;
}

.info p strong {
  color: #e4e4e7;
}

.wish {
  font-style: italic;
  color: #c084fc;
  font-weight: bold;
}

/* --- PKL PROGRESS BAR --- */
.pkl-progress-container {
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.02);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #262626;
}

.pkl-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #a1a1aa;
  margin-bottom: 6px;
  font-weight: bold;
}

.progress-bar-bg {
  width: 100%;
  height: 8px;
  background: #262626;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-purple, #a855f7), #3b82f6);
  border-radius: 10px;
  transition: width 1s ease-in-out;
}

/* --- TECH STACK INTERACTIVE GLOW --- */
.tech-stack-section {
  margin-top: 20px;
}

.tech-stack-section h4 {
  font-size: 0.9rem;
  color: #71717a;
  margin-bottom: 10px;
}

.tech-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tech-badge {
  background: #1f1f1f;
  border: 1px solid #333;
  color: #d4d4d4;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.tech-badge:hover {
  transform: translateY(-3px);
  border-color: var(--tech-color);
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px var(--tech-color);
}

/* Responsif untuk HP */
@media (max-width: 650px) {
  .card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
  
  .tag-group, .tech-badges {
    justify-content: center;
  }
}
</style>