<template>
  <div class="school-page">
    <header class="school-head" v-reveal>
      <div class="head-copy">
        <span class="eyebrow">Jejak Pendidikan</span>
        <h2>Identitas <span>Sekolah</span></h2>
        <p>Dari SD sampai SMK — pilih jenjang untuk melihat detailnya.</p>
      </div>

      <div class="custom-dropdown-wrapper">
        <span class="dropdown-label">Pilih Jenjang</span>

        <div class="custom-dropdown">
          <button
            @click="toggleDropdown"
            class="dropdown-trigger"
            :class="{ 'is-active': isOpen }"
            :style="{ '--current-color': currentSchool.themeColor }"
            aria-haspopup="listbox"
            :aria-expanded="isOpen"
          >
            <span class="badge" :style="{ backgroundColor: currentSchool.themeColor, color: currentSchool.onColor }">
              {{ currentSchool.level }}
            </span>
            <span class="school-name-text">{{ currentSchool.name }}</span>
            <span class="chevron-icon" :class="{ rotate: isOpen }">▼</span>
          </button>

          <transition name="slide-fade">
            <ul v-if="isOpen" class="dropdown-menu" role="listbox">
              <li
                v-for="(school, index) in schoolData"
                :key="index"
                @click="selectSchool(index)"
                class="dropdown-item"
                :class="{ selected: selectedSchoolIndex === index }"
                :style="{ '--hover-color': school.themeColor }"
                role="option"
                :aria-selected="selectedSchoolIndex === index"
              >
                <span class="badge" :style="{ backgroundColor: school.themeColor, color: school.onColor }">
                  {{ school.level }}
                </span>
                {{ school.name }}
                <span v-if="selectedSchoolIndex === index" class="item-check">✦</span>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </header>

    <div
      class="content-grid"
      :key="selectedSchoolIndex"
      :style="{ '--school-color': currentSchool.themeColor }"
      v-reveal="60"
    >
      <div class="content-top">
        <span class="level-stamp" :style="{ backgroundColor: currentSchool.themeColor, color: currentSchool.onColor }">
          {{ currentSchool.level }}
        </span>
        <h3>{{ currentSchool.name }}</h3>
      </div>

      <p class="school-desc">{{ currentSchool.deskripsi }}</p>

      <ul class="detail-list">
        <li>
          <span class="detail-label">Alamat</span>
          <span class="detail-value">{{ currentSchool.alamat }}</span>
        </li>
        <li>
          <span class="detail-label">Kepala Sekolah</span>
          <span class="detail-value">{{ currentSchool.kepsek }}</span>
        </li>
        <li>
          <span class="detail-label">Pembimbing</span>
          <span class="detail-value">{{ currentSchool.pembimbing }}</span>
        </li>
        <li>
          <span class="detail-label">{{ currentSchool.fiturLabel }}</span>
          <span class="detail-value" v-html="currentSchool.fiturValue"></span>
        </li>
      </ul>

      <span class="content-spark" aria-hidden="true">✦</span>
    </div>

    <div class="journey" v-reveal="120">
      <span class="journey-label">Langsung lompat ke:</span>
      <button
        v-for="(school, index) in schoolData"
        :key="school.level"
        class="journey-step"
        :class="{ active: selectedSchoolIndex === index }"
        :style="{ '--step-color': school.themeColor, '--step-on': school.onColor }"
        @click="selectSchool(index)"
      >
        <span class="step-dot"></span>
        {{ school.level }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const selectedSchoolIndex = ref(0)
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectSchool = (index) => {
  selectedSchoolIndex.value = index
  isOpen.value = false
}

const schoolData = ref([
  {
    level: 'SMK',
    name: 'SMK Yadika Soreang',
    themeColor: '#17233d',
    onColor: '#fff5ee',
    deskripsi:
      'Sekolah tempat saya menempuh pendidikan kejuruan dan belajar lebih dalam tentang pengembangan perangkat lunak. Laporan ini disusun sebagai salah satu syarat ketuntasan Praktik Kerja Lapangan (PKL).',
    alamat:
      'Jl. Bojongkoneng, Kp. Karang Anyar, RT 04/05, Cingcin, Kec. Soreang, Kabupaten Bandung, Jawa Barat.',
    kepsek: 'Ibu Yeti Nuraeni',
    pembimbing: '...',
    fiturLabel: 'Jurusan',
    fiturValue: 'Perhotelan, <i><b>PPLG</b></i>, Akuntansi',
  },
  {
    level: 'SMP',
    name: 'SMPN 1 Cangkuang',
    themeColor: '#e98275',
    onColor: '#17233d',
    deskripsi:
      'Membentuk karakter siswa yang unggul, berprestasi, dan siap melanjutkan ke jenjang pendidikan yang lebih tinggi.',
    alamat:
      'Jl. Tenjolaya RT 06/RW 07, Dusun Ciluncat, Desa Ciluncat, Kec. Cangkuang, Kab. Bandung.',
    kepsek: 'Bu Nenden Surtini',
    pembimbing: 'Wali Kelas 7, 8, 9',
    fiturLabel: 'Ekstrakurikuler',
    fiturValue: 'Pramuka, Paskibra, PMR, Futsal, Voli, Taekwondo',
  },
  {
    level: 'SD',
    name: 'SDN 2 Soreang',
    themeColor: '#f8aba0',
    onColor: '#17233d',
    deskripsi:
      'Menanamkan fondasi karakter dasar, kreativitas, dan ilmu pengetahuan sejak usia dini dengan lingkungan belajar yang menyenangkan.',
    alamat:
      'Jl. Terusan Cipatik No.44, Desa Pamekaran, Kecamatan Soreang, Kabupaten Bandung.',
    kepsek: 'Bu Teti Roswati',
    pembimbing: 'Wali Kelas 1, 2, 3, 4, 5, 6',
    fiturLabel: 'Akreditasi',
    fiturValue: 'A (Sangat Baik)',
  },
])

const currentSchool = computed(() => schoolData.value[selectedSchoolIndex.value])

const closeDropdownOutside = (e) => {
  if (!e.target.closest('.custom-dropdown')) {
    isOpen.value = false
  }
}

onMounted(() => window.addEventListener('click', closeDropdownOutside))
onUnmounted(() => window.removeEventListener('click', closeDropdownOutside))
</script>

<style scoped>
.school-page {
  max-width: 900px;
  margin: 0 auto;
}

.school-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.head-copy h2 {
  margin: 16px 0 8px;
  font-size: clamp(2rem, 5vw, 2.9rem);
}

.head-copy h2 span {
  color: var(--pink-deep);
}

.head-copy p {
  margin: 0;
  color: var(--muted);
  font-size: 0.94rem;
}

/* ============ DROPDOWN ============ */
.custom-dropdown-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.dropdown-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pink-deep);
}

.custom-dropdown {
  position: relative;
  width: 270px;
}

.dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 11px 15px;
  border-radius: 999px;
  border: 2px solid var(--navy);
  background: var(--white);
  color: var(--navy);
  font-family: var(--font-body);
  cursor: pointer;
  box-shadow: 3px 3px 0 var(--navy);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.dropdown-trigger:hover,
.dropdown-trigger.is-active {
  transform: translateY(-2px);
  box-shadow: 5px 5px 0 var(--current-color);
  background: var(--seashell);
}

.school-name-text {
  flex: 1;
  text-align: left;
  font-size: 0.86rem;
  font-weight: 700;
}

.badge {
  padding: 3px 9px;
  margin-right: 10px;
  border-radius: 999px;
  border: 1.5px solid var(--navy);
  font-size: 0.64rem;
  font-weight: 800;
  color: var(--navy);
  background: var(--pink);
}

.dropdown-trigger .badge {
  color: var(--seashell);
}

.chevron-icon {
  font-size: 0.62rem;
  color: var(--muted);
  transition: transform 0.3s ease;
}

.chevron-icon.rotate {
  transform: rotate(180deg);
  color: var(--navy);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 100%;
  margin: 0;
  padding: 7px;
  list-style: none;
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 18px;
  box-shadow: 5px 6px 0 var(--navy);
  z-index: 50;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  color: var(--navy);
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, padding 0.2s ease;
}

.dropdown-item:hover {
  background: var(--pink-soft);
  transform: translateX(4px);
}

.dropdown-item.selected {
  background: var(--seashell);
  font-weight: 800;
}

.dropdown-item .badge {
  color: var(--seashell);
}

.item-check {
  margin-left: auto;
  color: var(--pink-deep);
  font-size: 0.7rem;
}

.slide-fade-enter-active {
  transition: opacity 0.24s ease, transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-fade-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* ============ CONTENT ============ */
.content-grid {
  position: relative;
  padding: clamp(24px, 4vw, 38px);
  background: var(--white);
  border: 2px solid var(--navy);
  border-left: 10px solid var(--school-color);
  border-radius: 26px;
  box-shadow: 7px 7px 0 var(--navy);
  animation: fadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}

.content-top {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.level-stamp {
  display: inline-grid;
  place-items: center;
  min-width: 54px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 2px solid var(--navy);
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--seashell);
}

.content-top h3 {
  margin: 0;
  font-size: clamp(1.4rem, 3.4vw, 1.9rem);
}

.school-desc {
  margin: 16px 0 22px;
  max-width: 62ch;
  color: var(--muted);
  font-size: 0.94rem;
  line-height: 1.75;
}

.detail-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.detail-list li {
  padding: 13px 15px;
  border-radius: 14px;
  background: var(--seashell);
  border: 1.5px solid var(--line);
  transition: transform 0.25s ease, background 0.25s ease;
}

.detail-list li:hover {
  transform: translateY(-3px) rotate(-0.5deg);
  background: var(--pink-soft);
}

.detail-label {
  display: block;
  margin-bottom: 4px;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--pink-deep);
}

.detail-value {
  font-size: 0.86rem;
  font-weight: 600;
  line-height: 1.55;
}

.content-spark {
  position: absolute;
  right: 22px;
  bottom: 18px;
  font-size: 2rem;
  color: var(--school-color);
  opacity: 0.3;
  animation: bob 5s ease-in-out infinite;
}

/* ============ JOURNEY ============ */
.journey {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.journey-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--muted);
}

.journey-step {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 2px solid var(--navy);
  background: var(--white);
  color: var(--navy);
  font-family: var(--font-body);
  font-size: 0.76rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 2px 2px 0 var(--navy);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s ease;
}

.journey-step:hover {
  transform: translateY(-3px) rotate(-2deg);
  background: var(--pink-soft);
}

.journey-step.active {
  background: var(--step-color);
  color: var(--step-on);
  transform: rotate(-2deg) scale(1.04);
}

.step-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.65;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(10deg);
  }
}

@media (max-width: 760px) {
  .school-head {
    align-items: flex-start;
  }

  .custom-dropdown-wrapper,
  .custom-dropdown {
    width: 100%;
  }

  .detail-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .content-grid {
    border-left-width: 7px;
  }

  .content-top {
    gap: 10px;
  }
}
</style>
