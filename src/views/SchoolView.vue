<template>
  <div class="school-layout">
    <div class="header-container">
      <h2>Identitas <span>Sekolah</span></h2>
      
      <!-- INTERAKTIF & COLORFUL CUSTOM DROPDOWN -->
      <div class="custom-dropdown-wrapper">
        <span class="dropdown-label">Pilih Jenjang:</span>
        
        <div class="custom-dropdown">
          <!-- Tombol Utama Dropdown -->
          <button 
            @click="toggleDropdown" 
            class="dropdown-trigger"
            :class="{ 'is-active': isOpen }"
            :style="{ '--current-color': currentSchool.themeColor }"
          >
            <span class="badge" :style="{ backgroundColor: currentSchool.themeColor }">
              {{ currentSchool.level }}
            </span>
            <span class="school-name-text">{{ currentSchool.name }}</span>
            <span class="chevron-icon" :class="{ 'rotate': isOpen }">▼</span>
          </button>

          <!-- List Pilihan Menu (Muncul saat di-klik) -->
          <transition name="slide-fade">
            <ul v-if="isOpen" class="dropdown-menu">
              <li 
                v-for="(school, index) in schoolData" 
                :key="index"
                @click="selectSchool(index)"
                class="dropdown-item"
                :class="{ 'selected': selectedSchoolIndex === index }"
                :style="{ '--hover-color': school.themeColor }"
              >
                <span class="badge" :style="{ backgroundColor: school.themeColor }">
                  {{ school.level }}
                </span>
                {{ school.name }}
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>

    <!-- KONTEN DINAMIS DENGAN BORDER WARNA MENYESUAIKAN JENJANG -->
    <div 
      class="content-grid" 
      :key="selectedSchoolIndex"
      :style="{ borderLeftColor: currentSchool.themeColor }"
    >
      <div class="text-content">
        <h3 :style="{ color: currentSchool.themeColor }">{{ currentSchool.name }}</h3>
        <p>{{ currentSchool.deskripsi }}</p>
        <ul>
          <li><strong>Alamat:</strong> {{ currentSchool.alamat }}</li>
          <li><strong>Kepala Sekolah:</strong> {{ currentSchool.kepsek }}</li>
          <li><strong>Pembimbing:</strong> {{ currentSchool.pembimbing }}</li>
          <li>
            <strong>{{ currentSchool.fiturLabel }}:</strong> 
            <span v-html="currentSchool.fiturValue"></span>
          </li>
        </ul>
      </div>
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

// Data sekolah ditambah properti 'themeColor' untuk kustomisasi warna neon
const schoolData = ref([
  {
    level: 'SMK',
    name: 'SMK Yadika Soreang',
    themeColor: '#a855f7', // Ungu
    deskripsi: 'Laporan ini disusun sebagai salah satu syarat ketuntasan Praktik Kerja Lapangan (PKL) pada program keahlian yang ditekuni.',
    alamat: 'Jl. Bojongkoneng, Kp. Karang Anyar, RT 04/05, Cingcin, Kec. Soreang, Kabupaten Bandung, Jawa Barat.',
    kepsek: 'Ibu Yeti Nuraeni',
    pembimbing: '...',
    fiturLabel: 'Jurusan',
    fiturValue: ' Perhotelan, <i><b>PPLG</b></i>, Akutansi'
  },
  {
    level: 'SMP',
    name: 'SMPN 1 Cangkuang',
    themeColor: '#3b82f6', // Biru
    deskripsi: 'Membentuk karakter siswa yang unggul, berprestasi, dan siap melanjutkan ke jenjang pendidikan yang lebih tinggi.',
    alamat: 'Jl. Tenjolaya. RT06/RW07. Dusun Ciluncat. Desa Ciluncat Kec. Cangkuang Kab. Bandung.',
    kepsek: 'Bu Nenden Surtini',
    pembimbing: 'Wakel Kelas 7, 8, 9',
    fiturLabel: 'Ekstrakurikuler',
    fiturValue: ' Pramuka, Paskibra, PMR, Futsal, Voli, Taekwondo, '
  },
  {
    level: 'SD',
    name: 'SDN 2 Soreang',
    themeColor: '#FF0000', // Hijau Emerald
    deskripsi: 'Menanamkan fondasi karakter dasar, kreativitas, dan ilmu pengetahuan sejak usia dini dengan lingkungan belajar yang menyenangkan.',
    alamat: 'Jl. Terusan Cipatik No.44, Desa Pamekaran, Kecamatan Soreang, Kabupaten Bandung.',
    kepsek: 'Bu Teti Roswati',
    pembimbing: 'Wakel 1, 2, 3, 4, 5, 6',
    fiturLabel: 'Akreditasi',
    fiturValue: 'A (Sangat Baik)'
  }
])

const currentSchool = computed(() => schoolData.value[selectedSchoolIndex.value])

// Fungsi untuk menutup dropdown ketika user klik di luar area dropdown
const closeDropdownOutside = (e) => {
  if (!e.target.closest('.custom-dropdown')) {
    isOpen.value = false
  }
}
onMounted(() => window.addEventListener('click', closeDropdownOutside))
onUnmounted(() => window.removeEventListener('click', closeDropdownOutside))
</script>

<style scoped>
.school-layout {
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 20px;
}

h2 {
  font-size: 2.5rem;
  margin: 0;
}

h2 span {
  color: var(--accent-purple, #a855f7);
}

/* --- STYLE INTERAKTIF CUSTOM DROPDOWN --- */
.custom-dropdown-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dropdown-label {
  color: #a3a3a3;
  font-size: 0.95rem;
}

.custom-dropdown {
  position: relative;
  width: 260px;
}

.dropdown-trigger {
  width: 100%;
  background: #171717;
  color: white;
  border: 2px solid #262626;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Efek Glow & Border mengikuti warna sekolah saat aktif/hover */
.dropdown-trigger:hover, .dropdown-trigger.is-active {
  border-color: var(--current-color);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.05), 0 0 10px var(--current-color);
}

.school-name-text {
  flex-grow: 1;
  text-align: left;
  font-weight: 500;
}

.badge {
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  margin-right: 10px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.chevron-icon {
  font-size: 0.75rem;
  color: #737373;
  transition: transform 0.3s ease;
}

.chevron-icon.rotate {
  transform: rotate(180deg);
  color: #fff;
}

/* Menu List Dropdown */
.dropdown-menu {
  position: absolute;
  top: 115%;
  left: 0;
  width: 100%;
  background: #171717;
  border: 1px solid #262626;
  border-radius: 12px;
  padding: 6px;
  list-style: none;
  margin: 0;
  z-index: 50;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

.dropdown-item {
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  color: #d4d4d4;
}

/* Hover Item mengikuti warna masing-masing jenjang */
.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  padding-left: 18px; /* Efek bergeser sedikit */
  border-left: 3px solid var(--hover-color);
}

.dropdown-item.selected {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-weight: bold;
}

/* --- BOX KONTEN UTAMA --- */
.content-grid {
  background: var(--bg-card, #171717);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #262626;
  border-left: 5px solid #a855f7; /* Default warna, di-override dinamis lewat inline style */
  transition: border-left-color 0.5s ease;
  animation: fadeIn 0.4s ease-out;
}

.text-content h3 {
  font-size: 1.8rem;
  margin-top: 0;
  transition: color 0.5s ease;
}

.text-content ul {
  list-style-type: none;
  padding: 0;
}

.text-content li {
  margin-bottom: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.02);
}

/* --- ANIMASI TRANSISI --- */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>