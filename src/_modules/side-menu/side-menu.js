export default class SideMenu {
  constructor(config) {
    this.sideMenu = config.sideMenu
    this.categories = this.sideMenu.querySelector('.toggle-nav')
    this.categoriesTitle = this.sideMenu.querySelector('.side-menu__title')
    this.categoryToggle()
  }

  categoryToggle() {
    this.categories.style.transform = `translateY(-${this.categories.dataset.totalHeight}px)`
    this.sideMenu.setAttribute('data-closed', '')

    this.categoriesTitle.addEventListener('click', () => {
      this.categories.removeAttribute('data-start-shut')
      if (!('closed' in this.sideMenu.dataset)) {
        this.sideMenu.setAttribute('data-closed', '')
        this.categories.style.transform = `translateY(-${this.categories.dataset.totalHeight}px)`
      } else {
        this.categories.style.transform = ''
        this.sideMenu.removeAttribute('data-closed')
      }
    })
  }
}
