<template>
  <div class="report-page">
    <header class="report-hero" v-reveal>
      <div class="report-hero-copy">
        <span class="eyebrow">Laporan Praktik Kerja Lapangan</span>
        <h2>Laporan <span>PKL</span></h2>
        <p>
          Catatan perjalanan Praktik Kerja Lapangan di
          <strong>PT Cerebrum Edukanesia Nusantara</strong> — perusahaan teknologi
          pendidikan yang membangun ekosistem bimbel online di Indonesia.
        </p>
      </div>

      <div class="hero-badge" aria-hidden="true">
        <span class="badge-year">2025<br />2026</span>
        <span class="badge-spark">✦</span>
      </div>

      <div class="hero-chips">
        <span>PT Cerebrum Edukanesia Nusantara</span>
        <span>EdTech · Kab. Bandung</span>
        <span>Web Development</span>
      </div>
    </header>

    <div class="report-layout">
      <aside class="sidebar">
        <div class="side-card">
          <h4 class="sidebar-title">Kontrol Presentasi</h4>

          <button @click="toggleAutoScroll" class="btn-scroll" :class="{ active: isScrolling }">
            <span class="scroll-icon">{{ isScrolling ? '❚❚' : '▶' }}</span>
            {{ isScrolling ? 'Pause' : 'Auto-Scroll' }}
          </button>

          <div class="speed-control">
            <label for="speed">Kecepatan <span>{{ scrollSpeed }}</span></label>
            <input id="speed" type="range" v-model="scrollSpeed" min="1" max="10" />
          </div>

          <hr class="divider" />

          <ul class="chapter-list">
            <li
              v-for="chapter in chapters"
              :key="chapter.id"
              :class="{ reading: activeChapter === chapter.id }"
              @click="scrollTo(chapter.id)"
            >
              <span class="chapter-num">{{ chapter.num }}</span>
              <span>{{ chapter.title }}</span>
            </li>
          </ul>

          <p class="side-note">Gunakan navigasi bab untuk berpindah bagian dengan cepat.</p>
        </div>
      </aside>

      <section class="content">
        <article id="bab1" class="section" v-reveal>
          <div class="section-head">
            <span class="chapter-no">01</span>
            <div>
              <h2>Pendahuluan</h2>
              <p class="section-sub">Latar belakang, tujuan, dan manfaat PKL.</p>
            </div>
          </div>

          <div class="prose">
            <h3>1.1 Latar Belakang</h3>
            <p>
              Laporan ini disusun sebagai bukti portofolio pelaksanaan Praktik Kerja
              Lapangan (PKL) sekaligus salah satu syarat kelulusan pada Kompetensi
              Keahlian Pengembangan Perangkat Lunak dan Gim di SMK Yadika Soreang.
              PKL menjadi jembatan antara pembelajaran di sekolah dan kebutuhan nyata
              dunia kerja, terutama di industri teknologi yang bergerak sangat cepat.
            </p>
            <p>
              Melalui PKL, siswa tidak hanya dituntut menguasai teknis pemrograman,
              tetapi juga belajar berkomunikasi, bekerja dalam tim, mengelola waktu,
              dan beradaptasi dengan budaya kerja profesional.
            </p>

            <h3>1.2 Tujuan PKL</h3>
            <ul class="point-list">
              <li>Mengenalkan siswa pada lingkup kerja nyata di industri pendidikan.</li>
              <li>Melatih keterampilan teknis dan non-teknis yang relevan dengan jurusan.</li>
              <li>Mempersiapkan mental serta kesiapan siswa setelah lulus sekolah.</li>
              <li>Menumbuhkan sikap disiplin, tanggung jawab, dan kemandirian.</li>
            </ul>

            <div class="two-col">
              <div class="mini-card">
                <h4>Manfaat untuk Siswa</h4>
                <p>
                  Mendapat pengalaman langsung, membangun portofolio, dan memahami
                  standar kerja industri sebelum benar-benar masuk dunia profesional.
                </p>
              </div>
              <div class="mini-card">
                <h4>Manfaat untuk Sekolah</h4>
                <p>
                  Menjadi sarana evaluasi kurikulum agar kompetensi yang diajarkan
                  tetap selaras dengan kebutuhan industri.
                </p>
              </div>
            </div>
          </div>
        </article>

        <article id="bab2" class="section" v-reveal>
          <div class="section-head">
            <span class="chapter-no">02</span>
            <div>
              <h2>Profil Perusahaan</h2>
              <p class="section-sub">Mengenal PT Cerebrum Edukanesia Nusantara.</p>
            </div>
          </div>

          <div class="prose">
            <h3>2.1 Identitas Perusahaan</h3>
            <div class="identity-grid">
              <div v-for="fact in companyFacts" :key="fact.label" class="identity-item">
                <span class="identity-label">{{ fact.label }}</span>
                <span class="identity-value">{{ fact.value }}</span>
              </div>
            </div>

            <h3>2.2 Sejarah Singkat</h3>
            <p>
              PT Cerebrum Edukanesia Nusantara berdiri sejak tahun 2018 dengan semangat
              memperluas akses pendidikan berkualitas bagi masyarakat Indonesia.
              Berawal dari platform bimbingan belajar online, Cerebrum tumbuh menjadi
              ekosistem pendidikan digital yang menaungi berbagai platform persiapan
              seleksi, seperti UTBK, CPNS, PPPK, BUMN, sekolah kedinasan, TNI-Polri,
              TOEFL, beasiswa, hingga TPA.
            </p>
            <p>
              Selama lebih dari delapan tahun, perusahaan terus mengembangkan produk,
              memperkuat tim, serta berkolaborasi bersama tutor, mentor, dan kontributor
              digital untuk menghadirkan pengalaman belajar yang lebih mudah diakses.
            </p>

            <div class="stat-strip">
              <div class="stat-item">
                <strong>2018</strong>
                <span>Tahun Berdiri</span>
              </div>
              <div class="stat-item">
                <strong>8+</strong>
                <span>Tahun Pengalaman</span>
              </div>
              <div class="stat-item">
                <strong>10+</strong>
                <span>Platform Digital</span>
              </div>
              <div class="stat-item">
                <strong>50–200</strong>
                <span>Karyawan</span>
              </div>
            </div>

            <h3>2.3 Visi dan Misi</h3>
            <div class="two-col">
              <div class="mini-card accent-card">
                <h4>Visi</h4>
                <p>
                  Menjadi ekosistem pendidikan digital yang adaptif, relevan, dan
                  berdampak bagi masyarakat Indonesia.
                </p>
              </div>
              <div class="mini-card">
                <h4>Misi</h4>
                <ul class="point-list compact">
                  <li>Memperluas akses belajar berkualitas.</li>
                  <li>Mengembangkan teknologi pembelajaran yang inovatif.</li>
                  <li>Mendukung siswa, guru, dan orang tua dalam proses belajar.</li>
                </ul>
              </div>
            </div>

            <h3>2.4 Produk dan Platform</h3>
            <p>
              Ekosistem Cerebrum menghadirkan berbagai platform pembelajaran digital
              yang dilengkapi materi, latihan soal, tryout, pembahasan, live class,
              serta evaluasi progres belajar.
            </p>
            <div class="product-chips">
              <span v-for="product in products" :key="product" class="product-chip">
                {{ product }}
              </span>
            </div>

            <h3>2.5 Budaya Kerja</h3>
            <div class="culture-grid">
              <div v-for="culture in cultures" :key="culture.title" class="culture-item">
                <span class="culture-mark">✦</span>
                <div>
                  <h4>{{ culture.title }}</h4>
                  <p>{{ culture.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article id="bab3" class="section" v-reveal>
          <div class="section-head">
            <span class="chapter-no">03</span>
            <div>
              <h2>Pembahasan</h2>
              <p class="section-sub">Kegiatan, teknologi, kendala, dan hasil PKL.</p>
            </div>
          </div>

          <div class="prose">
            <h3>3.1 Gambaran Kegiatan PKL</h3>
            <p>
              Selama PKL, saya ditempatkan pada lingkungan kerja yang berfokus pada
              pengembangan produk digital. Kegiatan dimulai dari adaptasi budaya kerja,
              memahami produk dan alur kerja tim, kemudian berlanjut pada pengerjaan
              tugas-tugas pengembangan web sesuai arahan pembimbing lapangan.
            </p>

            <div class="timeline">
              <div v-for="(step, index) in timeline" :key="step.title" class="timeline-item">
                <span class="timeline-dot">{{ String(index + 1).padStart(2, '0') }}</span>
                <div class="timeline-body">
                  <h4>{{ step.title }}</h4>
                  <p>{{ step.text }}</p>
                </div>
              </div>
            </div>

            <h3>3.2 Teknologi yang Digunakan</h3>
            <p>
              Beberapa teknologi yang dipelajari dan digunakan selama proses PKL
              antara lain:
            </p>
            <div class="tech-grid">
              <div v-for="tech in technologies" :key="tech.name" class="tech-item">
                <span class="tech-dot" :style="{ background: tech.color }"></span>
                <div>
                  <strong>{{ tech.name }}</strong>
                  <span>{{ tech.role }}</span>
                </div>
              </div>
            </div>

            <h3>3.3 Kendala dan Solusi</h3>
            <div class="two-col">
              <div class="mini-card">
                <h4>Kendala</h4>
                <ul class="point-list compact">
                  <li>Adaptasi dengan alur kerja dan standar kode tim.</li>
                  <li>Menyesuaikan diri dengan tenggat pekerjaan.</li>
                  <li>Menemukan penyebab bug pada integrasi data.</li>
                </ul>
              </div>
              <div class="mini-card accent-card">
                <h4>Solusi</h4>
                <ul class="point-list compact">
                  <li>Bertanya dan berdiskusi aktif dengan pembimbing.</li>
                  <li>Mencatat prioritas pekerjaan secara terstruktur.</li>
                  <li>Membaca dokumentasi dan melakukan pengujian bertahap.</li>
                </ul>
              </div>
            </div>

            <h3>3.4 Hasil yang Dicapai</h3>
            <ul class="point-list">
              <li>Memahami alur kerja pengembangan produk digital di industri.</li>
              <li>Mampu membangun antarmuka web yang responsif dan interaktif.</li>
              <li>Terbiasa menggunakan Git dan kolaborasi kode dalam tim.</li>
              <li>Memiliki portofolio serta pengalaman kerja nyata.</li>
            </ul>
          </div>
        </article>

        <article id="bab4" class="section" v-reveal>
          <div class="section-head">
            <span class="chapter-no">04</span>
            <div>
              <h2>Penutup</h2>
              <p class="section-sub">Kesimpulan dan saran.</p>
            </div>
          </div>

          <div class="prose">
            <h3>4.1 Kesimpulan</h3>
            <p>
              Praktik Kerja Lapangan di PT Cerebrum Edukanesia Nusantara memberikan
              pengalaman berharga dalam memahami dunia kerja, khususnya industri
              teknologi pendidikan. Selain meningkatkan kemampuan teknis, PKL juga
              melatih kedisiplinan, komunikasi, dan tanggung jawab.
            </p>

            <h3>4.2 Saran</h3>
            <ul class="point-list">
              <li>Untuk sekolah: terus jalin kerja sama dengan industri teknologi.</li>
              <li>Untuk siswa: manfaatkan PKL untuk membangun portofolio nyata.</li>
              <li>Untuk perusahaan: pertahankan pembimbingan yang suportif bagi peserta PKL.</li>
            </ul>

            <div class="closing-card">
              <span class="closing-spark">✦</span>
              <p>
                Terima kasih kepada PT Cerebrum Edukanesia Nusantara, pembimbing,
                guru, dan semua pihak yang telah mendukung pelaksanaan PKL ini.
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollSpeed = ref(2)
const isScrolling = ref(false)
const activeChapter = ref('bab1')
const isComponentActive = ref(true)
let scrollInterval = null

const chapters = [
  { id: 'bab1', num: '01', title: 'Pendahuluan' },
  { id: 'bab2', num: '02', title: 'Profil Perusahaan' },
  { id: 'bab3', num: '03', title: 'Pembahasan' },
  { id: 'bab4', num: '04', title: 'Penutup' },
]

const companyFacts = [
  { label: 'Nama Perusahaan', value: 'PT Cerebrum Edukanesia Nusantara' },
  { label: 'Bidang Usaha', value: 'Teknologi Pendidikan / Bimbel Online' },
  { label: 'Tahun Berdiri', value: '2018' },
  { label: 'Pendiri', value: 'Alif Towe & Aditya' },
  { label: 'Kantor Pusat', value: 'Margahurip, Banjaran, Kab. Bandung, Jawa Barat 40377' },
  { label: 'Jumlah Karyawan', value: '50–200 orang' },
  { label: 'Website', value: 'cerebrumcorp.id · cerebrum.id' },
  { label: 'Instagram', value: '@allaboutcere' },
  { label: 'Email', value: 'office@cerebrum.id' },
]

const products = [
  'Cerebrum',
  'JadiASN',
  'JadiBUMN',
  'JadiSEKDIN',
  'JadiPOLISI',
  'JadiPRAJURIT',
  'JagoTPA',
  'TOEFL Academy',
  'JadiBEASISWA',
  'JadiPPPK',
  'JadiPCPM',
]

const cultures = [
  {
    title: 'Belajar dan Berkembang',
    text: 'Tim didorong meningkatkan skill melalui pelatihan, diskusi, dan evaluasi.',
  },
  {
    title: 'Kolaborasi Tim yang Solid',
    text: 'Budaya kerja terbuka, suportif, dan saling membantu.',
  },
  {
    title: 'Sehat, Aktif, dan Seimbang',
    text: 'Aktivitas gym, mini soccer, dan voli untuk menjaga energi tim.',
  },
  {
    title: 'Ruang Ide dan Inovasi',
    text: 'Setiap tim diberi ruang mencoba pendekatan baru untuk produk.',
  },
]

const timeline = [
  {
    title: 'Orientasi dan Adaptasi',
    text: 'Mengenal lingkungan kerja, aturan, tools, serta alur komunikasi tim.',
  },
  {
    title: 'Mempelajari Produk dan Stack',
    text: 'Memahami produk Cerebrum dan teknologi yang digunakan untuk pengembangan.',
  },
  {
    title: 'Pengembangan Antarmuka',
    text: 'Mengerjakan komponen dan halaman web yang responsif serta interaktif.',
  },
  {
    title: 'Integrasi dan Pengujian',
    text: 'Menghubungkan tampilan dengan data serta memastikan fitur berjalan baik.',
  },
  {
    title: 'Evaluasi dan Dokumentasi',
    text: 'Mereview hasil pekerjaan bersama pembimbing dan menyusun dokumentasi.',
  },
]

const technologies = [
  { name: 'HTML', role: 'Struktur halaman', color: '#e34c26' },
  { name: 'CSS', role: 'Styling dan animasi', color: '#264de4' },
  { name: 'JavaScript', role: 'Interaksi halaman', color: '#f7df1e' },
  { name: 'Vue.js', role: 'Framework antarmuka', color: '#42b883' },
  { name: 'Laravel', role: 'Backend framework', color: '#bd34fe' },
  { name: 'PHP', role: 'Logika server', color: '#8892bf' },
  { name: 'Git', role: 'Version control', color: '#f05032' },
  { name: 'Figma', role: 'Desain antarmuka', color: '#a259ff' },
]

const updateProgress = () => {
  if (!isComponentActive.value) return

  const sections = chapters
    .map((chapter) => document.getElementById(chapter.id))
    .filter(Boolean)

  let current = chapters[0].id

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 180) {
      current = section.id
    }
  })

  activeChapter.value = current
}

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    if (isScrolling.value) toggleAutoScroll()
    element.classList.add('is-visible')
    const y = element.getBoundingClientRect().top + window.scrollY - 140
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

const toggleAutoScroll = () => {
  if (isScrolling.value) {
    if (scrollInterval) clearInterval(scrollInterval)
    isScrolling.value = false
    return
  }

  isScrolling.value = true
  scrollInterval = setInterval(() => {
    if (!isComponentActive.value) {
      if (scrollInterval) clearInterval(scrollInterval)
      return
    }

    window.scrollBy({ top: Number(scrollSpeed.value), behavior: 'auto' })

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      if (scrollInterval) clearInterval(scrollInterval)
      isScrolling.value = false
    }
  }, 50)
}

onMounted(() => {
  isComponentActive.value = true
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  isComponentActive.value = false
  if (scrollInterval) clearInterval(scrollInterval)
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
.report-page {
  max-width: 1180px;
  margin: 0 auto;
}

/* ============ HERO ============ */
.report-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
  padding: clamp(24px, 4vw, 40px);
  margin-bottom: 26px;
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 28px;
  box-shadow: 7px 7px 0 var(--navy);
  overflow: hidden;
}

.report-hero::before {
  content: '';
  position: absolute;
  width: 280px;
  height: 280px;
  right: -110px;
  top: -130px;
  border-radius: 50%;
  background: rgba(248, 171, 160, 0.28);
}

.report-hero-copy {
  position: relative;
  z-index: 1;
}

.report-hero h2 {
  margin: 16px 0 10px;
  font-size: clamp(2.1rem, 5vw, 3rem);
}

.report-hero h2 span {
  color: var(--pink-deep);
}

.report-hero p {
  margin: 0;
  max-width: 62ch;
  color: var(--muted);
  font-size: 0.94rem;
  line-height: 1.7;
}

.report-hero p strong {
  color: var(--navy);
}

.hero-badge {
  position: relative;
  z-index: 1;
  width: 108px;
  height: 108px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--pink);
  border: 2px solid var(--navy);
  box-shadow: 4px 4px 0 var(--navy);
  transform: rotate(6deg);
}

.badge-year {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.05;
  text-align: center;
}

.badge-spark {
  position: absolute;
  top: -8px;
  right: 6px;
  color: var(--navy);
  font-size: 1.1rem;
  animation: bob 4s ease-in-out infinite;
}

.hero-chips {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hero-chips span {
  padding: 5px 13px;
  border-radius: 999px;
  border: 1.5px solid var(--navy);
  background: var(--seashell);
  font-size: 0.7rem;
  font-weight: 700;
}

/* ============ LAYOUT ============ */
.report-layout {
  display: flex;
  align-items: flex-start;
  gap: clamp(20px, 3vw, 34px);
}

.sidebar {
  position: sticky;
  top: 104px;
  width: 255px;
  flex-shrink: 0;
}

.side-card {
  padding: 20px;
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 22px;
  box-shadow: 5px 5px 0 var(--navy);
}

.sidebar-title {
  margin: 0 0 12px;
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--pink-deep);
}

.btn-scroll {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border-radius: 999px;
  border: 2px solid var(--navy);
  background: var(--navy);
  color: var(--seashell);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
}

.btn-scroll:hover {
  transform: translateY(-2px);
}

.btn-scroll.active {
  background: var(--pink);
  color: var(--navy);
}

.scroll-icon {
  font-size: 0.7rem;
}

.speed-control {
  margin: 14px 0;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--muted);
}

.speed-control label {
  display: flex;
  justify-content: space-between;
}

.speed-control span {
  color: var(--pink-deep);
}

.speed-control input {
  width: 100%;
  margin-top: 8px;
  accent-color: var(--pink-deep);
}

.divider {
  border: none;
  border-top: 1.5px dashed var(--line);
  margin: 14px 0;
}

.chapter-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chapter-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.chapter-list li:hover {
  background: var(--seashell);
  color: var(--navy);
  transform: translateX(3px);
}

.chapter-list li.reading {
  background: var(--pink-soft);
  color: var(--navy);
  font-weight: 800;
}

.chapter-num {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--pink-deep);
}

.side-note {
  margin: 14px 0 0;
  font-size: 0.68rem;
  line-height: 1.5;
  color: var(--muted);
}

/* ============ CONTENT ============ */
.content {
  flex: 1;
  min-width: 0;
}

.section {
  padding: clamp(22px, 4vw, 36px);
  margin-bottom: 26px;
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 26px;
  box-shadow: 6px 6px 0 var(--navy);
  scroll-margin-top: 140px;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 18px;
  margin-bottom: 20px;
  border-bottom: 1.5px dashed var(--line);
}

.chapter-no {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 16px;
  background: var(--pink);
  border: 2px solid var(--navy);
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  transform: rotate(-3deg);
}

.section-head h2 {
  margin: 0;
  font-size: clamp(1.4rem, 3.5vw, 1.9rem);
}

.section-sub {
  margin: 2px 0 0;
  font-size: 0.78rem;
  color: var(--muted);
}

.prose {
  font-size: 0.94rem;
  line-height: 1.8;
  color: #35405a;
}

.prose h3 {
  margin: 28px 0 10px;
  font-size: 1.15rem;
  color: var(--navy);
}

.prose h3:first-child {
  margin-top: 0;
}

.prose p {
  margin: 0 0 12px;
}

.point-list {
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.point-list li {
  position: relative;
  padding: 9px 12px 9px 34px;
  border-radius: 12px;
  background: var(--seashell);
  border: 1px solid var(--line);
  font-size: 0.88rem;
  line-height: 1.6;
}

.point-list li::before {
  content: '✦';
  position: absolute;
  left: 12px;
  top: 9px;
  color: var(--pink-deep);
  font-size: 0.75rem;
}

.point-list.compact li {
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 0.82rem;
}

.two-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin: 16px 0;
}

.mini-card {
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--seashell);
  border: 1.5px solid var(--line);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.mini-card:hover {
  transform: translateY(-3px) rotate(-0.4deg);
  box-shadow: 3px 4px 0 rgba(23, 35, 61, 0.16);
}

.mini-card h4 {
  margin: 0 0 6px;
  font-size: 0.98rem;
}

.mini-card p {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.65;
  color: var(--muted);
}

.accent-card {
  background: var(--pink-soft);
  border-color: rgba(23, 35, 61, 0.2);
}

/* identity */
.identity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin: 12px 0 4px;
}

.identity-item {
  padding: 11px 13px;
  border-radius: 12px;
  background: var(--seashell);
  border: 1.5px solid var(--line);
}

.identity-label {
  display: block;
  margin-bottom: 3px;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pink-deep);
}

.identity-value {
  display: block;
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.45;
  color: var(--navy);
}

/* stats */
.stat-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 10px;
  margin: 16px 0;
}

.stat-item {
  padding: 14px 12px;
  border-radius: 14px;
  background: var(--navy);
  color: var(--seashell);
  text-align: center;
  border: 2px solid var(--navy);
  transition: transform 0.25s ease, background 0.25s ease;
}

.stat-item:nth-child(even) {
  background: var(--pink);
  color: var(--navy);
}

.stat-item:hover {
  transform: translateY(-4px) rotate(-1deg);
}

.stat-item strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.3rem;
  line-height: 1.1;
}

.stat-item span {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  opacity: 0.8;
}

/* products */
.product-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 12px 0 4px;
}

.product-chip {
  padding: 6px 13px;
  border-radius: 999px;
  background: var(--white);
  border: 1.5px solid var(--navy);
  font-size: 0.72rem;
  font-weight: 700;
  box-shadow: 2px 2px 0 rgba(23, 35, 61, 0.2);
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.22s ease;
}

.product-chip:hover {
  transform: translateY(-3px) rotate(-2deg);
  background: var(--pink);
}

/* culture */
.culture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.culture-item {
  display: flex;
  gap: 10px;
  padding: 14px;
  border-radius: 14px;
  background: var(--seashell);
  border: 1.5px solid var(--line);
  transition: transform 0.25s ease, background 0.25s ease;
}

.culture-item:hover {
  transform: translateY(-3px);
  background: var(--pink-soft);
}

.culture-mark {
  color: var(--pink-deep);
  font-size: 0.8rem;
  margin-top: 2px;
}

.culture-item h4 {
  margin: 0 0 3px;
  font-size: 0.9rem;
}

.culture-item p {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.55;
  color: var(--muted);
}

/* timeline */
.timeline {
  position: relative;
  margin: 16px 0 4px;
  padding-left: 8px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 25px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    rgba(23, 35, 61, 0.25) 0,
    rgba(23, 35, 61, 0.25) 6px,
    transparent 6px,
    transparent 12px
  );
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 14px;
  padding: 0 0 16px;
}

.timeline-dot {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--pink);
  border: 2px solid var(--navy);
  font-size: 0.62rem;
  font-weight: 800;
}

.timeline-body {
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--seashell);
  border: 1px solid var(--line);
  flex: 1;
}

.timeline-body h4 {
  margin: 0 0 2px;
  font-size: 0.88rem;
}

.timeline-body p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.55;
  color: var(--muted);
}

/* tech grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 8px;
  margin: 12px 0 4px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--seashell);
  border: 1.5px solid var(--line);
  transition: transform 0.22s ease, background 0.22s ease;
}

.tech-item:hover {
  transform: translateY(-3px);
  background: var(--white);
}

.tech-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid rgba(23, 35, 61, 0.4);
  flex-shrink: 0;
}

.tech-item strong {
  display: block;
  font-size: 0.8rem;
}

.tech-item span {
  display: block;
  font-size: 0.66rem;
  color: var(--muted);
}

/* closing */
.closing-card {
  position: relative;
  margin-top: 18px;
  padding: 20px 22px;
  border-radius: 18px;
  background: var(--navy);
  color: var(--seashell);
  overflow: hidden;
}

.closing-card p {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.7;
}

.closing-spark {
  position: absolute;
  right: 16px;
  top: 10px;
  color: var(--pink);
  font-size: 1.6rem;
  opacity: 0.8;
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(10deg);
  }
}

/* ============ RESPONSIVE ============ */
@media (max-width: 860px) {
  .report-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: sticky;
    top: 92px;
    z-index: 60;
  }

  .side-card {
    padding: 12px 14px;
    border-radius: 18px;
    box-shadow: 4px 4px 0 var(--navy);
  }

  .sidebar-title,
  .speed-control,
  .side-note,
  .divider {
    display: none;
  }

  .btn-scroll {
    width: auto;
    padding: 8px 18px;
    font-size: 0.74rem;
  }

  .chapter-list {
    flex-direction: row;
    overflow-x: auto;
    gap: 6px;
    margin-top: 8px;
    padding-bottom: 2px;
    scrollbar-width: none;
  }

  .chapter-list::-webkit-scrollbar {
    display: none;
  }

  .chapter-list li {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 7px 11px;
    font-size: 0.72rem;
  }
}

@media (max-width: 560px) {
  .report-hero {
    grid-template-columns: 1fr;
  }

  .hero-badge {
    display: none;
  }

  .section {
    padding: 20px 16px;
    box-shadow: 4px 4px 0 var(--navy);
  }

  .section-head {
    gap: 10px;
  }

  .chapter-no {
    width: 42px;
    height: 42px;
    font-size: 0.9rem;
    border-radius: 13px;
  }

  .prose {
    font-size: 0.9rem;
  }

  .timeline::before {
    left: 21px;
  }

  .timeline-dot {
    width: 32px;
    height: 32px;
  }
}
</style>
