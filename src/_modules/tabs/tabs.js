import { removeClass, addClass } from '../../_scripts/helper-functions'

export default class Tabs {
  constructor(tabsNode) {
    this.parent = tabsNode
    this.eachTab = tabsNode.getElementsByClassName('tabs__tab')
    this.eachTabContent = tabsNode.querySelectorAll('.tabs__content-wrapper [data-tab-link]')
    // eslint-disable-next-line prefer-destructuring
    this.tabWrapper = tabsNode.getElementsByClassName('tabs__content-wrapper')[0]

    window.onload = () => {
      this.setSizes()
      this.setPreferences()
    }
  }

  setSizes() {
    removeClass(this.tabWrapper, 'tabs__content--transition')
    this.tabWrapper.style.height = 'auto'
    const currentActiveTab = this.parent.getElementsByClassName('tabs__content--active')[0]

    for (let i = 0; i < this.eachTab.length; i += 1) {
      this.eachTabContent[i].setAttribute('data-orginal-height', this.eachTabContent[i].offsetHeight)
    }

    this.tabWrapper.style.height = `${currentActiveTab.offsetHeight}px`
    addClass(this.tabWrapper, 'tabs__content--transition')
  }

  setPreferences() {
    for (let i = 0; i < this.eachTab.length; i += 1) {
      this.eachTab[i].addEventListener('click', e => this.toggleTab(e))
    }
  }

  toggleTab(e) {
    for (let i = 0; i < this.eachTab.length; i += 1) {
      // Remove active from the other tabs.
      removeClass(this.eachTab[i], 'tabs__tab--active')

      // Remove active from other tab contents.
      removeClass(this.eachTabContent[i], 'tabs__content--active')
    }

    const tabContent = this.parent.querySelector(`section[data-tab-link="${e.target.getAttribute('data-tab-link')}"]`)
    this.tabWrapper.style.height = `${tabContent.getAttribute('data-orginal-height')}px`
    addClass(tabContent, 'tabs__content--active')
    addClass(e.target, 'tabs__tab--active')
  }
}
