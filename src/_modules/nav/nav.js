import { removeClass, addClass, hasClass } from '../../_scripts/helper-functions'

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
    this.allItems = this.parent.getElementsByClassName('toggle-nav__item')
    this.categories = this.parent.querySelectorAll('.toggle-nav__item--sub-nav-container, .toggle-nav__item--sub-sub-nav-container')
    this.allSubNavs = this.parent.querySelectorAll('.toggle-nav__list > .toggle-nav__item--sub-nav-container > .toggle-nav__sub-nav')
    this.firstLevelItems = this.parent.querySelectorAll('.toggle-nav__list > .toggle-nav__item')
    this.secondLevelItems = this.parent.querySelectorAll('.toggle-nav__item--sub-nav-container > .toggle-nav__sub-nav > .toggle-nav__item')
    this.item = this.parent.querySelector('.toggle-nav__item')
    this.subItem = this.parent.querySelector('.toggle-nav__item--sub-item')

    this.categoryToggle()

    this.itemHeight = 0
    this.allItemsFirstLevelTotalHeight = 0
    this.allItemsSecondLevelTotalHeight = 0
    this.subSectionHeights = []

    this.processLevels()
  }

  categoryToggle() {
    const { categories } = this

    Array.from(categories).forEach(category => category.addEventListener('click', (e) => {
      e.stopPropagation()
      const subMenuContainer = category

      let levelItems = this.allItems

      if (hasClass(subMenuContainer, 'toggle-nav__item--sub-sub-nav-container')) {
        levelItems = this.secondLevelItems
      }

      this.closeNavs(levelItems)

      if (subMenuContainer.classList.contains('toggle-nav__item--active-sub-nav')) {
        subMenuContainer.classList.remove('toggle-nav__item--active-sub-nav')
        // Logic needed here for following parent items to close up to prev sibling sub-items
        if (hasClass(subMenuContainer, 'toggle-nav__item--sub-sub-nav-container')) {
          console.log('setting to midway')
          this.visibleNavs(subMenuContainer)
          // this.midWayFirstLevel(subMenuContainer)
        }
      } else {
        Array.from(levelItems).forEach((category) => {
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

    Array.from(this.firstLevelItems).forEach((firstLevelItem) => {
      let allItemsSecondLevelTotalHeight = 0
      const subItems = firstLevelItem.querySelectorAll('.toggle-nav__item--sub-nav-container > .toggle-nav__sub-nav > .toggle-nav__item')

      Array.from(subItems).forEach((category) => {
        if (this.animatedHeight) {
          category.setAttribute('data-orginal-height', category.offsetHeight)
          category.style.height = `${this.subItemHeight}px`
        } else {
          category.style.transform = `translateY(-${allItemsSecondLevelTotalHeight}px)`
          category.setAttribute('data-closed-posistion', (0 - allItemsSecondLevelTotalHeight))
          category.setAttribute('data-open-posistion', category.offsetHeight)
        }
        // containerHeight = this.itemHeight * (index + 1)
        allItemsSecondLevelTotalHeight += category.offsetHeight - this.subItemHeight
      })

      // Will build an array of sub-section heights
      this.subSectionHeights.push(allItemsSecondLevelTotalHeight)
    })
    // console.log('this.subSectionHeights', this.subSectionHeights)

    Array.from(this.firstLevelItems).forEach((category, index) => {
      if (this.animatedHeight) {
        category.setAttribute('data-orginal-height', category.offsetHeight)
        category.style.height = `${this.itemHeight}px`
      } else {
        category.style.transform = `translateY(-${this.allItemsFirstLevelTotalHeight}px)`
        category.setAttribute('data-closed-posistion', (0 - this.allItemsFirstLevelTotalHeight))
        category.setAttribute('data-open-posistion', (category.offsetHeight - this.subSectionHeights[index]))
      }
      // containerHeight = this.itemHeight * (index + 1)
      this.allItemsFirstLevelTotalHeight += category.offsetHeight - this.itemHeight
    })


    // this.parent.setAttribute('data-total-height', containerHeight)
  }

  closeNavs(level) {
    Array.from(level).forEach((item) => {
      if (this.animatedHeight) {
        item.style.height = `${this.itemHeight}px`
      } else {
        // console.log(item.getAttribute('data-closed-posistion'))
        item.style.transform = `translateY(${item.getAttribute('data-closed-posistion')}px)`
      }
    })
  }

  visibleNavs(chosenItem, closing) {
    if (this.animatedHeight) {
      chosenItem.style.height = `${chosenItem.getAttribute('data-orginal-height')}px`
    } else {
      const sectionHeight = chosenItem.getAttribute('data-open-posistion')
      const nextItemsOnOwnLevel = nextSiblings(chosenItem, exampleFilter)
      const nextItemsOnParentLevel = nextSiblings(chosenItem.parentNode.parentNode, exampleFilter)

      const nextItems = nextItemsOnOwnLevel.concat(nextItemsOnParentLevel)

      console.log('nextItems', nextItems)

      Array.from(nextItems).forEach((item) => {
        const currentTranslate = 0 - +item.style.transform.replace(/[^0-9.]/g, '')
        // console.log('currentTranslate', currentTranslate)
        let newPosistion = 0
        if (closing) {
          newPosistion = (currentTranslate - parseInt(sectionHeight)) + this.itemHeight
        } else {
          newPosistion = (currentTranslate + parseInt(sectionHeight)) - this.itemHeight
        }
        // console.log('newPosistion', newPosistion)
        // if (!item.hasAttribute('data-midway-posistion')) {
        //   item.setAttribute('data-midway-posistion', newPosistion)
        // }

        item.style.transform = `translateY(${newPosistion}px)`
      })
    }
  }
}
