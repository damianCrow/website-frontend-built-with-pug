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

    // Collect the first collection of items with their nested sub navs
    this.imediateItems = this.parent.querySelectorAll('.toggle-nav__list > .toggle-nav__item')

    this.allItemDetails = this.calculateSizes(this.imediateItems)
    console.log('allItemDetails', this.allItemDetails)
    this.applyEventListners()
  }

  calculateSizes(level, heightOfSelectedNav = 0, startingPosition = 0) {
    console.log('startingPosition', startingPosition)

    // Starts as 0, if we're opening a nav then that's also considered
    let totalHeightOfPreviousItems = 0
    const itemDetails = []
    // Cycle though each item on this level and grab it's orginal height.
    for (let i = 0; i < level.length; i += 1) {
      if (i === startingPosition) {
        totalHeightOfPreviousItems -= heightOfSelectedNav
      }

      // Orginal height of the sub nav without transforms.
      const orginalHeight = level[i].offsetHeight
      // We will use the height of the first list item link as a reference.
      const firstLinkHeight = level[i].querySelector('.toggle-nav__link, .toggle-nav__sub-link').offsetHeight
      // Will return an array of objects, with details of each subitem
      // const subItems = this.checkForSubItems(level[i])

      itemDetails[i] = {
        element: level[i],
        orginalHeight,
        firstLinkHeight,
        totalHeightOfPreviousItems,
        // subItems,
        level,
      }

      console.log('i', i)
      console.log('itemDetails[i]', itemDetails[i])

      this.closeItem(itemDetails[i].element, itemDetails[i].totalHeightOfPreviousItems)

      // Total up how much we will need to shift the next item by.
      totalHeightOfPreviousItems += orginalHeight - firstLinkHeight
      // console.log(subItems.length)
    }
    return itemDetails
  }

  checkForSubItems(parentItem) {
    const subNav = parentItem.querySelector('.toggle-nav__sub-nav')
    const subItems = subNav ? subNav.children : []
    return this.calculateSizes(subItems)
  }

  // Close the previous subnav by hiding this one over it (by moving it upwards)
  closeItem(item, totalHeightOfPreviousItems) {
    item.style.transform = `translateY(-${totalHeightOfPreviousItems}px)`
  }

  applyEventListners() {
    for (let i = 0; i < this.allItemDetails.length; i += 1) {
      this.allItemDetails[i].element.addEventListener('click', (e) => {
        e.stopPropagation()
        // removeClass(this.allItemDetails[i].level, 'toggle-nav__item--active-sub-nav')
        console.log('i', i)
        for (let j = i + 1; j < this.allItemDetails.length; j += 1) {
          console.log(this.allItemDetails[j].totalHeightOfPreviousItems)
          console.log(this.allItemDetails[i + 1].totalHeightOfPreviousItems)
          this.allItemDetails[j].element.style.transform = `translateY(-${this.allItemDetails[j].totalHeightOfPreviousItems - this.allItemDetails[i + 1].totalHeightOfPreviousItems}px)`
        }
      })
    }
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
