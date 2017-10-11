import { TweenLite } from 'gsap'

export default class SideNav {
  constructor(lockBody) {
    this.body = document.getElementsByTagName('body')[0]
    this.raceHub = document.getElementById('race-hub')
    this.raceHubContents = document.getElementsByClassName('race-hub__contents')[0]
    this.sideSelector = document.getElementsByClassName('third-nav__select-race')[0]
    this.sideBurger = document.getElementById('hub-burger')
    this.sideNav = document.getElementsByClassName('side-nav')[0]
    this.mainHeaderHeight = document.getElementsByClassName('main-header')[0].offsetHeight

    this.lockBody = lockBody

    this.burgerTap()
    this.scrollInsideOnly()
  }

  burgerTap() {
    this.sideSelector.addEventListener('click', () => {
      if (this.sideNav.classList.contains('side-nav--active')) {
        this.sideNav.classList.remove('side-nav--active')
        this.sideBurger.classList.remove('burger--active')
        this.raceHubContents.classList.remove('race-hub__contents--faded')
        this.lockBody(false)
      } else {
        this.lockBody(true)
        const scrollPos = this.raceHub.offsetTop - this.mainHeaderHeight

        if (window.scrollTop === scrollPos) {
          this.raceHubContents.classList.add('race-hub__contents--faded')
          this.sideNav.classList.add('side-nav--active')
          this.sideBurger.classList.add('burger--active')
        } else {
          TweenLite.to(window, 0.25, {
            scrollTo: this.raceHub.offsetTop - this.mainHeaderHeight,
            onComplete: () => {
              this.raceHubContents.classList.add('race-hub__contents--faded')
              this.sideNav.classList.add('side-nav--active')
              this.sideBurger.classList.add('burger--active')
            },
          })
        }
      }
    })
  }

  closeSideNav() {
    const { sideNav } = this

    if (sideNav.classList.contains('side-nav--active')) {
      sideNav.classList.remove('side-nav--active')
      this.sideBurger.classList.remove('burger--active')
      this.raceHubContents.classList.remove('race-hub__contents--faded')
      this.lockBody(false)
    }
  }

  scrollInsideOnly() {
    const unlock = () => {
      this.closeSideNav()
    }

    this.raceHub.addEventListener('click', unlock.bind(this), false)

    document.onkeydown = (evt) => {
      const event = evt || window.event
      if (event.keyCode === 27) {
        this.closeSideNav()
      }
    }
  }
}
