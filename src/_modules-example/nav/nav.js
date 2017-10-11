export default class Nav {
  constructor(lockBody, team) {
    this.subNav = document.getElementsByClassName('sub-nav')[0]
    this.burger = document.getElementById('main-burger')
    this.menu = document.getElementById('main-menu')
    this.header = document.getElementsByClassName('main-header')[0]

    this.burgerMenu()
    this.mobileSubNav(lockBody, team)
  }

  burgerMenu() {
    const { burger, menu } = this

    burger.addEventListener('click', () => {
      if (burger.classList.contains('burger--active')) {
        menu.classList.remove('main-menu--active')
        burger.classList.remove('burger--active')
      } else {
        burger.classList.add('burger--active')
        menu.classList.add('main-menu--active')
      }
    })
  }

  mobileSubNav(lockBody, team) {
    const { subNav, header, burger } = this

    subNav.addEventListener('click', (e) => {
      if (subNav.classList.contains('sub-nav--active')) {
        subNav.classList.remove('sub-nav--active')
        header.classList.remove('main-header--sub-nav-open')
        burger.classList.remove('burger--sub-nav-open')
        lockBody(false)
        team.closeSub(null, e)
      } else {
        subNav.classList.add('sub-nav--active')
        header.classList.add('main-header--sub-nav-open')
        burger.classList.add('burger--sub-nav-open')
        lockBody(true)
        team.closeSub(null, e)
      }
    })
  }
}
