export default class Menu {
  constructor(lockBody, team) {

    this.menu = document.getElementById('main-menu')
    this.burger = document.getElementById('main-burger')
    // this.menu = document.getElementById('main-menu')
    this.header = document.getElementsByClassName('main-header')[0]

    this.burgerMenu()
    // this.mobileSubNav(lockBody, team)
  }

  burgerMenu() {
    const { burger, menu } = this

    burger.addEventListener('click', () => {
      if (burger.classList.contains('burger--active')) {
        menu.classList.remove('main-menu--active')
        document.body.classList.remove('locked--main-menu')
        burger.classList.remove('burger--active')
      } else {
        document.body.classList.add('locked--main-menu')
        burger.classList.add('burger--active')
        menu.classList.add('main-menu--active')
      }
    })
  }

  mobileSubNav(lockBody, team) {
    const { menu, header, burger } = this

    menu.addEventListener('click', (e) => {
      if (menu.classList.contains('sub-nav--active')) {
        menu.classList.remove('sub-nav--active')
        header.classList.remove('main-header--sub-nav-open')
        burger.classList.remove('burger--sub-nav-open')
        lockBody(false)
        team.closeSub(null, e)
      } else {
        menu.classList.add('sub-nav--active')
        header.classList.add('main-header--sub-nav-open')
        burger.classList.add('burger--sub-nav-open')
        lockBody(true)
        team.closeSub(null, e)
      }
    })
  }
}
