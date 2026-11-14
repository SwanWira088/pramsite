import type { Directive } from 'vue'

type RevealValue = number | undefined

let observer: IntersectionObserver | null = null

const getObserver = () => {
  if (observer) return observer

  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )

  return observer
}

export const reveal: Directive<HTMLElement, RevealValue> = {
  mounted(el, binding) {
    el.classList.add('reveal')

    if (binding.value) {
      el.style.transitionDelay = `${binding.value}ms`
    }

    const activeObserver = getObserver()

    if (!activeObserver) {
      el.classList.add('is-visible')
      return
    }

    activeObserver.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
