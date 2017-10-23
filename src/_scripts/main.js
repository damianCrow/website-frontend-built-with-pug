// Main javascript entry point
// Should handle bootstrapping/starting application
import Menu from '../_modules/menu/menu'
import Nav from '../_modules/nav/nav'
import TextInput from '../_modules/textinput/textinput'
import Slider from '../_modules/slider/slider'
import Product from '../_modules/product/product'


class Main {
  constructor() {
    // super()
    this.navs = document.getElementsByClassName('toggle-nav')

    // protoMessage()
    this.textInput = new TextInput()
    this.slider = new Slider()
    this.product = new Product()
    this.initSections()
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
  }
}

new Main()
