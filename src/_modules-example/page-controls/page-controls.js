import { TweenLite } from 'gsap'
import ScrollSnap from 'scroll-snap'

export default class PageControls {
  constructor() {
    this.currentLockedSection
  }

  lockBody(lock) {
    const body = document.getElementsByTagName('body')[0]

    if (lock) {
      body.classList.add('lock')
    } else {
      body.classList.remove('lock')
    }
  }

  scrollToSection(section) {
    this.currentLockedSection = typeof(section) === 'undefined' ? this.currentLockedSection : section

    if (this.currentLockedSection) {
      return new Promise((resolve, reject) => {
        const scrollPos = (section.getBoundingClientRect().top + document.body.scrollTop) - this.mainHeaderHeight

        TweenLite.to(window, 0.5, {
          scrollTo: scrollPos,
          onComplete: () => {
            resolve()
          },
        })
      })
    }
  }

  autoScrollSanp(allSectionPos, scrollPos) {
    if (allSectionPos.length > 0) {
      const sections = allSectionPos

      const closest = sections.reduce((prev, curr) => {
        return (Math.abs(curr.top - scrollPos) < Math.abs(prev.top - scrollPos) ? curr : prev)
      })

      clearTimeout(this.scrollSnapTime)

      if (scrollPos > (allSectionPos[0].offsetTop / 2)) {
        this.scrollSnapTime = setTimeout(() => {
          const scrollPos = closest.offsetTop - this.mainHeaderHeight
          TweenLite.to(window, 1, { scrollTo: scrollPos })
        }, 500)
      }
    }
  }
}
