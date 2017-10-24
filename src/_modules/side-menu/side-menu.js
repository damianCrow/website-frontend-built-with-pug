export default class SideMenu {
  constructor(config) {
    this.sideMenu = config.sideMenu
    this.categories = this.sideMenu.querySelector('.toggle-nav')
    this.categoriesTitle = this.sideMenu.querySelector('.side-menu__title')
    this.categoryToggle()
  }

  categoryToggle() {
    this.categories.style.transform = `translateY(-${this.categories.getAttribute('data-total-height')}px)`
    this.sideMenu.setAttribute('data-closed', '')

    this.categoriesTitle.addEventListener('click', () => {
      this.categories.removeAttribute('data-start-shut')
      if (!(this.sideMenu.hasAttribute('data-closed'))) {
        this.sideMenu.setAttribute('data-closed', '')
        this.categories.style.transform = `translateY(-${this.categories.getAttribute('data-total-height')}px)`
      } else {
        this.categories.style.transform = ''
        this.sideMenu.removeAttribute('data-closed')
      }
    })
  }
}
