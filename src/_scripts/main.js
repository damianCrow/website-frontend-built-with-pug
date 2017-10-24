import 'babel-polyfill'
import objectFitImages from 'object-fit-images'

// Main javascript entry point
// Should handle bootstrapping/starting application
import Menu from '../_modules/menu/menu'
import SideMenu from '../_modules/side-menu/side-menu'
import Nav from '../_modules/nav/nav'
import TextInput from '../_modules/textinput/textinput'
import Slider from '../_modules/slider/slider'
import Product from '../_modules/product/product'
import Tabs from '../_modules/tabs/tabs'
import Contact from '../_modules/contact/contact'

class Main {
  constructor() {
    // super()
    this.navs = document.getElementsByClassName('toggle-nav')
    this.sideMenus = document.getElementsByClassName('side-menu')
    this.tabsNodes = document.getElementsByClassName('tabs')

    // protoMessage()
    this.textInput = new TextInput()
    this.slider = new Slider()
    this.product = new Product()
    this.initSections()
    objectFitImages()
  }

  initSections() {
    // TODO: A better way of initating these modules.
    new Menu()

    const toggleNavs = []
    Array.from(this.navs).forEach((foundNav) => {
      if (foundNav.classList.contains('toggle-nav--animated-height')) {
        toggleNavs.push(new Nav({ animatedHeight: true, parent: foundNav }))
      } else {
        toggleNavs.push(new Nav({ parent: foundNav }))
      }
    })

    const sideMenus = []
    Array.from(this.sideMenus).forEach((sideMenu) => {
      sideMenus.push(new SideMenu({ sideMenu }))
    })

    const tabSets = []
    Array.from(this.tabsNodes).forEach((tabSet) => {
      tabSets.push(new Tabs(tabSet))
    })

    if (document.getElementById('map')) {
      this.contact = new Contact()
    }
  }
}

new Main()
