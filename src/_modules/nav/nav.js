// TODO: Move these to an import helper functions, from here:
// https://plainjs.com/javascript/traversing/get-siblings-of-an-element-40/
function getNextSiblings(el, filter) {
  const siblings = []
  while (el = el.nextSibling) { if (!filter || filter(el)) siblings.push(el) }
  return siblings
}

function exampleFilter(el) {
  return el.nodeName.toLowerCase() === 'li'
}

export default class Nav {
  constructor() {
    this.categories = document.querySelectorAll('.main-nav__item--sub-nav-item .main-nav__link')
    this.allItems = document.querySelectorAll('.main-nav__list > .main-nav__item')
    this.item = document.querySelector('.main-nav__item')

    this.categoryToggle()

    this.itemHeight = 0
    this.sectionHeights = []

    this.getSizes()
  }

  categoryToggle() {
    const { categories } = this

    Array.from(categories).forEach(category => category.addEventListener('click', (e) => {
      const subMenuContainer = e.currentTarget.parentNode
      if (subMenuContainer.classList.contains('main-nav__item--active-sub-nav')) {
        this.visibleNavs()
        subMenuContainer.classList.remove('main-nav__item--active-sub-nav')
      } else {
        this.visibleNavs()
        Array.from(categories).forEach((category) => {
          category.parentNode.classList.remove('main-nav__item--active-sub-nav')
        })
        subMenuContainer.classList.add('main-nav__item--active-sub-nav')
        this.visibleNavs(subMenuContainer)
      }
    }))
  }

  getSizes() {
    this.itemHeight = this.item.offsetHeight

    let allSectionsTotalHeight = 0
    Array.from(this.allItems).forEach((category) => {
      category.style.transform = `translateY(-${allSectionsTotalHeight}px)`
      category.dataset.closedPosistion = (0 - allSectionsTotalHeight)
      allSectionsTotalHeight += category.offsetHeight - this.itemHeight
      this.sectionHeights.push(category.offsetHeight)
    })
  }

  visibleNavs(chosenItem) {
    let navItem

    if (!chosenItem) {
      navItem = document.querySelector('.main-nav__item--active-sub-nav')
    } else {
      navItem = chosenItem
    }

    if (navItem) {
      const sectionHeight = navItem.offsetHeight
      const nextItems = getNextSiblings(navItem, exampleFilter)
      Array.from(nextItems).forEach((item) => {
        const currentTranslate = 0 - +item.style.transform.replace(/[^0-9.]/g, '')
        const newPosistion = (currentTranslate + sectionHeight) - this.itemHeight
        // console.log(chosenItem ? newPosistion : item.dataset.closedPosistion)
        item.style.transform = `translateY(${chosenItem ? newPosistion : item.dataset.closedPosistion}px)`
      })
    }
  }

  // mobileSubNav(lockBody, team) {
  //   const { menu, header, burger } = this

  //   menu.addEventListener('click', (e) => {
  //     if (menu.classList.contains('sub-nav--active')) {
  //       menu.classList.remove('sub-nav--active')
  //       header.classList.remove('main-header--sub-nav-open')
  //       burger.classList.remove('burger--sub-nav-open')
  //       lockBody(false)
  //       team.closeSub(null, e)
  //     } else {
  //       menu.classList.add('sub-nav--active')
  //       header.classList.add('main-header--sub-nav-open')
  //       burger.classList.add('burger--sub-nav-open')
  //       lockBody(true)
  //       team.closeSub(null, e)
  //     }
  //   })
  // }
}
