<template>
  <div class="class-page">
    <header class="class-head" v-reveal>
      <div>
        <span class="eyebrow">XI PPLG 2 · SMK Yadika Soreang</span>
        <h2>Daftar Nama <span>Teman Kelas</span></h2>
        <p>Satu kelas, banyak cerita. Cari nama temanmu di sini.</p>
      </div>

      <div class="class-stat">
        <strong>{{ filteredStudents.length }}</strong>
        <span>dari {{ students.length }} siswa</span>
      </div>
    </header>

    <div class="toolbar" v-reveal="60">
      <label class="search-box">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input v-model="query" type="search" placeholder="Cari nama teman..." aria-label="Cari nama teman" />
        <button v-if="query" class="clear-btn" @click="query = ''" aria-label="Hapus pencarian">×</button>
      </label>

      <button class="chip-btn" @click="toggleSort">
        Urut {{ sortMode === 'za' ? 'Z–A' : 'A–Z' }}
        <span class="chip-arrow" :class="{ flip: sortMode === 'za' }">↓</span>
      </button>

      <button class="chip-btn chip-shuffle" :class="{ active: sortMode === 'random' }" @click="shuffleStudents">
        Acak
        <span class="chip-spark">✦</span>
      </button>
    </div>

    <div v-if="filteredStudents.length" class="student-grid">
      <article
        v-for="(student, index) in filteredStudents"
        :key="student.id"
        class="student-card"
        v-reveal="(index % 12) * 28"
      >
        <span class="absen-circle">{{ student.noAbsen }}</span>
        <div class="avatar">{{ initials(student.nama) }}</div>
        <h4 :title="student.nama">{{ student.nama }}</h4>
        <span class="status-tag">Murid PPLG 2</span>
        <span class="card-star" aria-hidden="true">✦</span>
      </article>
    </div>

    <div v-else class="empty-state" v-reveal>
      <span class="empty-mark">?</span>
      <h3>Nama tidak ditemukan</h3>
      <p>Coba kata kunci lain, atau hapus pencarian.</p>
      <button class="btn btn-primary" @click="query = ''">Tampilkan semua</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const query = ref('')
const sortMode = ref('az')

const students = ref([
  { id: 1, noAbsen: 1, nama: 'Alifa Aprilyanti W' },
  { id: 2, noAbsen: 2, nama: 'Arvin Ferdian' },
  { id: 3, noAbsen: 3, nama: 'Azwar Nurul H' },
  { id: 4, noAbsen: 4, nama: 'D saefulloh' },
  { id: 5, noAbsen: 5, nama: 'Dhiyya Ayu Maisaan' },
  { id: 6, noAbsen: 6, nama: 'Dicky Abdul R' },
  { id: 7, noAbsen: 7, nama: 'Farhan Al-Farizi' },
  { id: 8, noAbsen: 8, nama: 'Fauzan Seva N' },
  { id: 9, noAbsen: 9, nama: 'Gio Maulana' },
  { id: 10, noAbsen: 10, nama: 'Kahfi Rahmatulloh' },
  { id: 11, noAbsen: 11, nama: 'Kanzi Cibil P' },
  { id: 12, noAbsen: 12, nama: 'Midza Prada Al G' },
  { id: 13, noAbsen: 13, nama: 'Muhammad Abdul' },
  { id: 14, noAbsen: 14, nama: 'Muhammad Luthfi' },
  { id: 15, noAbsen: 15, nama: 'Muhammad Nabil' },
  { id: 16, noAbsen: 16, nama: 'Muhammad Rizqy' },
  { id: 17, noAbsen: 17, nama: 'Muhammad Yogi P' },
  { id: 18, noAbsen: 18, nama: 'Muhammad Adeng' },
  { id: 20, noAbsen: 20, nama: 'Nabil Ramdan A' },
  { id: 21, noAbsen: 21, nama: 'Nazwa Nurahma F' },
  { id: 22, noAbsen: 22, nama: 'Nizam Fauzan' },
  { id: 23, noAbsen: 23, nama: 'Nur Fitri K' },
  { id: 24, noAbsen: 24, nama: 'Pramudya Wira A' },
  { id: 25, noAbsen: 25, nama: 'Rafly Rodiansyah' },
  { id: 26, noAbsen: 26, nama: 'Rahmat Rizal Alfauzi' },
  { id: 27, noAbsen: 27, nama: 'Rahmi Nurfazriah' },
  { id: 28, noAbsen: 28, nama: 'Raissa Adhi Pratama' },
  { id: 29, noAbsen: 29, nama: 'Reditya Adha Y' },
  { id: 30, noAbsen: 30, nama: 'Reisya Mutiara R' },
  { id: 31, noAbsen: 31, nama: 'Rika Riski Nopiani' },
  { id: 32, noAbsen: 32, nama: 'Salsa Nur Afifah R' },
  { id: 33, noAbsen: 33, nama: 'Teddy Heryawan' },
  { id: 34, noAbsen: 34, nama: 'Topik Hermawan' },
])

const filteredStudents = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  const list = students.value.filter((student) =>
    student.nama.toLowerCase().includes(keyword),
  )

  if (sortMode.value === 'random') return list

  return [...list].sort((a, b) =>
    sortMode.value === 'za'
      ? b.nama.localeCompare(a.nama, 'id')
      : a.nama.localeCompare(b.nama, 'id'),
  )
})

const toggleSort = () => {
  sortMode.value = sortMode.value === 'za' ? 'az' : 'za'
}

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

const shuffleStudents = () => {
  const list = [...students.value]
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  students.value = list
  sortMode.value = 'random'
}
</script>

<style scoped>
.class-page {
  max-width: 1120px;
  margin: 0 auto;
}

.class-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 26px;
}

.class-head h2 {
  margin: 16px 0 8px;
  font-size: clamp(2rem, 5vw, 2.9rem);
}

.class-head h2 span {
  color: var(--pink-deep);
}

.class-head p {
  margin: 0;
  color: var(--muted);
  font-size: 0.94rem;
}

.class-stat {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 22px;
  border-radius: 20px;
  background: var(--pink);
  border: 2px solid var(--navy);
  box-shadow: 4px 4px 0 var(--navy);
  transform: rotate(2deg);
}

.class-stat strong {
  font-family: var(--font-display);
  font-size: 1.7rem;
  line-height: 1;
}

.class-stat span {
  font-size: 0.66rem;
  font-weight: 700;
  color: rgba(23, 35, 61, 0.7);
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.search-box {
  flex: 1;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  height: 48px;
  border-radius: 999px;
  background: var(--white);
  border: 2px solid var(--navy);
  box-shadow: 3px 3px 0 var(--navy);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.search-box:focus-within {
  transform: translateY(-2px);
  box-shadow: 5px 5px 0 var(--pink);
}

.search-icon {
  font-size: 1.2rem;
  color: var(--pink-deep);
  line-height: 1;
}

.search-box input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--navy);
}

.search-box input::placeholder {
  color: var(--muted);
}

.clear-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: var(--pink-soft);
  color: var(--navy);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.chip-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 20px;
  border-radius: 999px;
  border: 2px solid var(--navy);
  background: var(--white);
  color: var(--navy);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 3px 3px 0 var(--navy);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, background 0.25s ease;
}

.chip-btn:hover {
  transform: translateY(-3px);
  box-shadow: 5px 6px 0 var(--navy);
  background: var(--pink-soft);
}

.chip-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--navy);
}

.chip-shuffle {
  background: var(--pink);
}

.chip-btn.active {
  background: var(--pink);
  box-shadow: 3px 3px 0 var(--pink-deep);
}

.chip-arrow {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.chip-arrow.flip {
  transform: rotate(180deg);
}

.chip-spark {
  font-size: 0.85rem;
  transition: transform 0.3s ease;
}

.chip-shuffle:hover .chip-spark {
  transform: rotate(180deg) scale(1.2);
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 14px;
}

.student-card {
  position: relative;
  padding: 20px 18px 18px;
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 20px;
  box-shadow: 4px 4px 0 var(--navy);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background 0.3s ease;
}

.student-card::before {
  content: '';
  position: absolute;
  width: 90px;
  height: 90px;
  right: -38px;
  top: -38px;
  border-radius: 50%;
  background: rgba(248, 171, 160, 0.35);
  transition: transform 0.4s ease;
}

.student-card:hover {
  transform: translate(-2px, -5px) rotate(-0.8deg);
  box-shadow: 7px 8px 0 var(--navy);
  background: var(--seashell);
}

.student-card:hover::before {
  transform: scale(1.5);
}

.absen-circle {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--navy);
  color: var(--seashell);
  font-size: 0.76rem;
  font-weight: 800;
}

.avatar {
  width: 44px;
  height: 44px;
  margin: 12px 0 10px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 2px solid var(--navy);
  background: var(--pink);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 800;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.student-card:hover .avatar {
  transform: rotate(-8deg) scale(1.08);
}

.student-card h4 {
  position: relative;
  z-index: 1;
  margin: 0 0 6px;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-tag {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.card-star {
  position: absolute;
  bottom: 12px;
  right: 14px;
  color: var(--pink-deep);
  opacity: 0;
  transform: scale(0.5) rotate(-20deg);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.student-card:hover .card-star {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.empty-state {
  max-width: 460px;
  margin: 40px auto;
  padding: 36px 28px;
  text-align: center;
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 24px;
  box-shadow: 6px 6px 0 var(--navy);
}

.empty-mark {
  display: inline-grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--pink);
  border: 2px solid var(--navy);
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
}

.empty-state h3 {
  margin: 14px 0 6px;
  font-size: 1.3rem;
}

.empty-state p {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 0.88rem;
}

.empty-state .btn {
  padding: 10px 22px;
  font-size: 0.82rem;
}

@media (max-width: 640px) {
  .class-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .class-stat {
    align-self: flex-start;
    flex-direction: row;
    gap: 8px;
    align-items: baseline;
    transform: rotate(-1.5deg);
  }

  .search-box {
    flex-basis: 100%;
  }

  .student-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }

  .student-card {
    padding: 16px 14px;
  }
}
</style>
