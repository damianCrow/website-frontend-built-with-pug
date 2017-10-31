import { removeClass, addClass } from '../../_scripts/helper-functions'

export default class Tabs {
  constructor(tabsNode) {
    this.parent = tabsNode
    this.eachTab = tabsNode.getElementsByClassName('tabs__tab')
    this.eachTabContent = tabsNode.querySelectorAll('.tabs__content-wrapper [data-tab-link]')
    // eslint-disable-next-line prefer-destructuring
    this.tabWrapper = tabsNode.getElementsByClassName('tabs__content-wrapper')[0]
    this.firstActiveTab = tabsNode.getElementsByClassName('tabs__content--active')[0]

    this.setPreferences()
  }

  setPreferences() {
    for (let i = 0; i < this.eachTab.length; i += 1) {
      this.eachTabContent[i].setAttribute('data-orginal-height', this.eachTabContent[i].offsetHeight)

      // this.eachTabContent[i].dataset.orginalHeight = this.eachTabContent[i].offsetHeight
      this.eachTab[i].addEventListener('click', e => this.toggleTab(e))
    }

    console.log(this.tabWrapper)
    this.tabWrapper.style.height = `${this.firstActiveTab.getAttribute('data-orginal-height')}px`
    addClass(this.tabWrapper, 'tabs__content--transition')
  }

  toggleTab(e) {
    for (let i = 0; i < this.eachTab.length; i += 1) {
      // Remove active from the other tabs.
      removeClass(this.eachTab[i], 'tabs__tab--active')

      // Remove active from other tab contents.
      removeClass(this.eachTabContent[i], 'tabs__content--active')
    }

    const tabContent = this.parent.querySelector(`section[data-tab-link="${e.srcElement.getAttribute('data-tab-link')}"]`)
    this.tabWrapper.style.height = `${tabContent.getAttribute('data-orginal-height')}px`
    addClass(tabContent, 'tabs__content--active')
    addClass(e.srcElement, 'tabs__tab--active')
  }
}
