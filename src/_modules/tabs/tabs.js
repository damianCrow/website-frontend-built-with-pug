import { removeClass, addClass } from '../../_scripts/helper-functions'

export default class Tabs {
  constructor(tabsNode) {
    this.parent = tabsNode
    this.eachTab = tabsNode.getElementsByClassName('tabs__tab')
    this.eachTabContent = tabsNode.getElementsByTagName('section')
    // eslint-disable-next-line prefer-destructuring
    this.tabWrapper = tabsNode.getElementsByClassName('tabs__content-wrapper')[0]

    this.setPreferences()
  }

  setPreferences() {
    for (let i = 0; i < this.eachTab.length; i += 1) {
      this.eachTabContent[i].dataset.orginalHeight = this.eachTabContent[i].offsetHeight
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

    const tabContent = this.parent.querySelector(`section[data-tab-link="${e.srcElement.dataset.tabLink}"]`)
    this.tabWrapper.style.height = `${tabContent.dataset.orginalHeight}px`
    addClass(tabContent, 'tabs__content--active')
    addClass(e.srcElement, 'tabs__tab--active')
  }
}
