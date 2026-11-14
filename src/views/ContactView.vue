<template>
  <div class="contact-page">
    <header class="contact-head" v-reveal>
      <span class="eyebrow">Kontak & Sosial Media</span>
      <h2>Mari <span>Terhubung</span></h2>
      <p>
        Punya pertanyaan soal PKL, mau kolaborasi, atau sekadar menyapa?
        Semua kanal di bawah ini terbuka untukmu.
      </p>
    </header>

    <div class="contact-layout">
      <section class="social-panel" aria-label="Daftar sosial media">
        <article
          v-for="(social, index) in socials"
          :key="social.id"
          class="social-card"
          :class="social.accent"
          v-reveal="index * 70"
        >
          <div class="social-icon">{{ social.short }}</div>

          <div class="social-copy">
            <h3>{{ social.name }}</h3>
            <p>{{ social.desc }}</p>
            <span class="handle">{{ social.handle }}</span>
          </div>

          <div class="social-actions">
            <a
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-open"
            >
              Buka <span>↗</span>
            </a>
            <button class="copy-btn" @click="copyText(social.handle, social.id)">
              {{ copied === social.id ? 'Tersalin!' : 'Salin' }}
            </button>
          </div>

          <span class="social-spark" aria-hidden="true">✦</span>
        </article>

        <div class="contact-meta" v-reveal="220">
          <div class="meta-block">
            <span class="meta-label">Lokasi</span>
            <span class="meta-value">Kab. Bandung, Jawa Barat</span>
          </div>
          <div class="meta-block">
            <span class="meta-label">Status</span>
            <span class="meta-value status-value">
              <span class="status-dot"></span> Terbuka untuk kolaborasi
            </span>
          </div>
        </div>
      </section>

      <aside class="message-card" v-reveal="140">
        <span class="message-tape" aria-hidden="true"></span>
        <span class="message-spark" aria-hidden="true">✧</span>

        <h3>Kirim Pesan Cepat</h3>
        <p class="message-sub">Pesanmu akan diteruskan langsung ke WhatsApp.</p>

        <form @submit.prevent="sendMessage">
          <label class="field">
            <span>Nama</span>
            <input v-model="form.name" type="text" placeholder="Siapa namamu?" />
          </label>

          <label class="field">
            <span>Pesan</span>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Tulis pesan atau pertanyaanmu di sini..."
            ></textarea>
          </label>

          <p v-if="error" class="form-error">{{ error }}</p>

          <button class="btn btn-primary send-btn" type="submit">
            Kirim via WhatsApp <span class="send-arrow">→</span>
          </button>
        </form>

        <div class="wa-number">
          <span class="wa-label">Nomor WhatsApp</span>
          <button class="wa-copy" @click="copyText('0895-2863-3287', 'wa-number')">
            {{ copied === 'wa-number' ? 'Nomor tersalin!' : '0895-2863-3287' }}
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const socials = [
  {
    id: 'ig',
    name: 'Instagram',
    short: 'IG',
    handle: '@swanwira',
    url: 'https://instagram.com/swanwira',
    desc: 'Cerita sehari-hari, proses PKL, dan potongan project yang sedang dikerjakan.',
    accent: 'social-pink',
  },
  {
    id: 'wa',
    name: 'WhatsApp',
    short: 'WA',
    handle: '0895-2863-3287',
    url: 'https://wa.me/6289528633287',
    desc: 'Kanal paling cepat untuk tanya-tanya, diskusi, atau kerja sama.',
    accent: 'social-navy',
  },
  {
    id: 'tt',
    name: 'TikTok',
    short: 'TT',
    handle: '@prmwira2',
    url: 'https://www.tiktok.com/@prmwira2',
    desc: 'Konten ringan, dokumentasi kegiatan, dan sisi lain dari proses belajar.',
    accent: 'social-white',
  },
]

const form = reactive({
  name: '',
  message: '',
})

const error = ref('')
const copied = ref('')
let copyTimer = null

const markCopied = (id) => {
  copied.value = id
  if (copyTimer) clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copied.value = ''
  }, 1800)
}

const copyText = async (text, id) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const helper = document.createElement('textarea')
    helper.value = text
    helper.style.position = 'fixed'
    helper.style.opacity = '0'
    document.body.appendChild(helper)
    helper.select()
    document.execCommand('copy')
    document.body.removeChild(helper)
  }

  markCopied(id)
}

const sendMessage = () => {
  error.value = ''

  if (!form.name.trim() || !form.message.trim()) {
    error.value = 'Isi nama dan pesan dulu, ya.'
    return
  }

  const text = `Halo Pramudya! Saya ${form.name.trim()}.\n\n${form.message.trim()}`
  window.open(`https://wa.me/6289528633287?text=${encodeURIComponent(text)}`, '_blank')
}
</script>

<style scoped>
.contact-page {
  max-width: 1080px;
  margin: 0 auto;
}

.contact-head {
  margin-bottom: 28px;
}

.contact-head h2 {
  margin: 16px 0 8px;
  font-size: clamp(2rem, 5vw, 3rem);
}

.contact-head h2 span {
  color: var(--pink-deep);
}

.contact-head p {
  margin: 0;
  max-width: 56ch;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.contact-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 20px;
  align-items: start;
}

/* ============ SOCIAL CARDS ============ */
.social-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.social-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 22px;
  border: 2px solid var(--navy);
  border-radius: 22px;
  box-shadow: 5px 5px 0 var(--navy);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

.social-card:hover {
  transform: translate(-2px, -5px) rotate(-0.5deg);
  box-shadow: 8px 9px 0 var(--navy);
}

.social-pink {
  background: var(--pink);
}

.social-navy {
  background: var(--navy);
  color: var(--seashell);
}

.social-white {
  background: var(--white);
}

.social-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 18px;
  border: 2px solid var(--navy);
  background: var(--white);
  color: var(--navy);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 800;
  transform: rotate(-4deg);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.social-navy .social-icon {
  background: var(--pink);
}

.social-card:hover .social-icon {
  transform: rotate(4deg) scale(1.06);
}

.social-copy {
  flex: 1;
  min-width: 0;
}

.social-copy h3 {
  margin: 0 0 3px;
  font-size: 1.15rem;
  color: inherit;
}

.social-copy p {
  margin: 0 0 5px;
  font-size: 0.78rem;
  line-height: 1.55;
  color: inherit;
  opacity: 0.78;
}

.handle {
  display: inline-block;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.social-navy .handle {
  color: var(--pink);
}

.social-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
}

.social-open,
.copy-btn {
  padding: 7px 14px;
  border-radius: 999px;
  border: 1.5px solid var(--navy);
  background: var(--white);
  color: var(--navy);
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 800;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background 0.22s ease, transform 0.22s ease;
}

.social-open {
  background: var(--navy);
  color: var(--seashell);
}

.social-navy .social-open {
  background: var(--pink);
  color: var(--navy);
}

.social-open:hover,
.copy-btn:hover {
  transform: translateY(-2px);
}

.social-pink .social-open:hover,
.social-white .social-open:hover {
  background: var(--pink-deep);
  color: var(--white);
}

.social-spark {
  position: absolute;
  right: 18px;
  top: 10px;
  font-size: 1rem;
  opacity: 0.45;
}

.social-navy .social-spark {
  color: var(--pink);
}

/* ============ META ============ */
.contact-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}

.meta-block {
  flex: 1;
  min-width: 180px;
  padding: 13px 16px;
  border-radius: 16px;
  background: var(--white);
  border: 1.5px solid var(--navy);
  box-shadow: 3px 3px 0 var(--pink);
}

.meta-label {
  display: block;
  margin-bottom: 3px;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--pink-deep);
}

.meta-value {
  font-size: 0.82rem;
  font-weight: 700;
}

.status-value {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--pink-deep);
  animation: pulseDot 1.6s ease-in-out infinite;
}

/* ============ MESSAGE CARD ============ */
.message-card {
  position: relative;
  padding: 26px 24px;
  background: var(--white);
  border: 2px solid var(--navy);
  border-radius: 24px;
  box-shadow: 6px 6px 0 var(--navy);
}

.message-tape {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  width: 100px;
  height: 24px;
  background: rgba(248, 171, 160, 0.8);
  border: 1px dashed rgba(23, 35, 61, 0.3);
}

.message-spark {
  position: absolute;
  top: 14px;
  right: 16px;
  color: var(--pink-deep);
  font-size: 1.2rem;
  animation: bob 4s ease-in-out infinite;
}

.message-card h3 {
  margin: 4px 0 4px;
  font-size: 1.3rem;
}

.message-sub {
  margin: 0 0 18px;
  font-size: 0.8rem;
  color: var(--muted);
}

.field {
  display: block;
  margin-bottom: 12px;
}

.field span {
  display: block;
  margin-bottom: 5px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pink-deep);
}

.field input,
.field textarea {
  width: 100%;
  padding: 11px 14px;
  border-radius: 14px;
  border: 1.5px solid var(--navy);
  background: var(--seashell);
  color: var(--navy);
  font-family: var(--font-body);
  font-size: 0.86rem;
  resize: vertical;
  outline: none;
  transition: box-shadow 0.2s ease, background 0.2s ease;
}

.field input:focus,
.field textarea:focus {
  background: var(--white);
  box-shadow: 3px 3px 0 var(--pink);
}

.form-error {
  margin: 0 0 10px;
  font-size: 0.76rem;
  font-weight: 700;
  color: #b23b2e;
}

.send-btn {
  width: 100%;
  padding: 12px 18px;
  font-size: 0.84rem;
}

.send-arrow {
  transition: transform 0.25s ease;
}

.send-btn:hover .send-arrow {
  transform: translateX(4px);
}

.wa-number {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1.5px dashed var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.wa-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.wa-copy {
  border: none;
  background: none;
  padding: 0;
  font-family: var(--font-body);
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--navy);
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: var(--pink);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

@keyframes pulseDot {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(233, 130, 117, 0.45);
  }
  50% {
    box-shadow: 0 0 0 7px rgba(233, 130, 117, 0);
  }
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

@media (max-width: 860px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .social-card {
    flex-wrap: wrap;
    padding: 18px;
    gap: 12px;
  }

  .social-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    font-size: 0.92rem;
  }

  .social-copy {
    flex-basis: calc(100% - 60px);
  }

  .social-actions {
    flex-direction: row;
    width: 100%;
  }

  .social-open,
  .copy-btn {
    flex: 1;
  }

  .message-card {
    padding: 22px 18px;
  }
}
</style>
