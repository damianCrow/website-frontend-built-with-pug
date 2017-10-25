// TODO: Change this to import
// require('element-dataset').default()

// TODO: Move these to an import helper functions, from here:
// https://plainjs.com/javascript/traversing/get-siblings-of-an-element-40/
function nextSiblings(el, filter) {
  const siblings = []
  while (el = el.nextSibling) { if (!filter || filter(el)) siblings.push(el) }
  return siblings
}

function exampleFilter(el) {
  return el.nodeName.toLowerCase() === 'li'
}

export default class Nav {
  constructor(config) {
    this.animatedHeight = config.animatedHeight
    this.parent = config.parent
    this.categories = this.parent.querySelectorAll('.toggle-nav__item--sub-nav-container')
    this.allSubNavs = this.parent.querySelectorAll('.toggle-nav__list > .toggle-nav__item--sub-nav-container > .toggle-nav__sub-nav')
    this.firstLevelItems = this.parent.querySelectorAll('.toggle-nav__list > .toggle-nav__item')
    // this.secondLevelItems = this.parent.querySelectorAll('.toggle-nav__sub-nav-container > .toggle-nav__sub-nav > .toggle-nav__item')
    this.item = this.parent.querySelector('.toggle-nav__item')
    this.subItem = this.parent.querySelector('.toggle-nav__item--sub-item')

    this.categoryToggle()

    this.itemHeight = 0
    this.allItemsFirstLevelTotalHeight = 0
    this.allItemsSecondLevelTotalHeight = 0
    this.sectionHeights = []

    this.processLevels()
  }

  categoryToggle() {
    const { categories } = this

    Array.from(categories).forEach(category => category.addEventListener('click', (e) => {
      const subMenuContainer = e.currentTarget
      this.closeNavs()

      if (subMenuContainer.classList.contains('toggle-nav__item--active-sub-nav')) {
        subMenuContainer.classList.remove('toggle-nav__item--active-sub-nav')
      } else {
        Array.from(categories).forEach((category) => {
          category.classList.remove('toggle-nav__item--active-sub-nav')
        })
        subMenuContainer.classList.add('toggle-nav__item--active-sub-nav')
        this.visibleNavs(subMenuContainer)
      }
    }))
  }

  processLevels() {
    // let containerHeight = 0
    this.itemHeight = this.item.offsetHeight
    this.subItemHeight = this.subItem.offsetHeight

    Array.from(this.firstLevelItems).forEach((category) => {
      if (this.animatedHeight) {
        category.setAttribute('data-orginal-height', category.offsetHeight)
        category.style.height = `${this.itemHeight}px`
      } else {
        category.style.transform = `translateY(-${this.allItemsFirstLevelTotalHeight}px)`
        category.setAttribute('data-closed-posistion', (0 - this.allItemsFirstLevelTotalHeight))
      }
      // containerHeight = this.itemHeight * (index + 1)
      this.allItemsFirstLevelTotalHeight += category.offsetHeight - this.itemHeight
      this.sectionHeights.push(category.offsetHeight)
      this.sectionHeights.push(category.offsetHeight)
    })


    Array.from(this.allSubNavs).forEach((subNav) => {
      let allItemsSecondLevelTotalHeight = 0
      // const subItems = subNav.children.querySelectorAll('> .toggle-nav__item')
      const subItems = subNav.children
      console.log(subItems)
      Array.from(subItems).forEach((category, index) => {
        if (this.animatedHeight) {
          category.setAttribute('data-orginal-height', category.offsetHeight)
          category.style.height = `${this.subItemHeight}px`
        } else {
          category.style.transform = `translateY(-${allItemsSecondLevelTotalHeight}px)`
          category.setAttribute('data-closed-posistion', (0 - allItemsSecondLevelTotalHeight))
        }
        // containerHeight = this.itemHeight * (index + 1)
        allItemsSecondLevelTotalHeight += category.offsetHeight - this.subItemHeight
        this.sectionHeights.push(category.offsetHeight)
        this.sectionHeights.push(category.offsetHeight)
      })
    })
    // this.parent.setAttribute('data-total-height', containerHeight)
  }

  closeNavs() {
    Array.from(this.firstLevelItems).forEach((item) => {
      if (this.animatedHeight) {
        item.style.height = `${this.itemHeight}px`
      } else {
        item.style.transform = `translateY(${item.getAttribute('data-closed-posistion')}px)`
      }
    })
  }

  visibleNavs(chosenItem) {
    if (this.animatedHeight) {
      chosenItem.style.height = `${chosenItem.getAttribute('data-orginal-height')}px`
    } else {
      const sectionHeight = chosenItem.offsetHeight
      const nextItems = nextSiblings(chosenItem, exampleFilter)
      Array.from(nextItems).forEach((item) => {
        const currentTranslate = 0 - +item.style.transform.replace(/[^0-9.]/g, '')
        const newPosistion = (currentTranslate + sectionHeight) - this.itemHeight
        item.style.transform = `translateY(${newPosistion}px)`
      })
    }
  }
}
