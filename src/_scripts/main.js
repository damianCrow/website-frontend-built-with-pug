// Main javascript entry point
// Should handle bootstrapping/starting application

// import { TweenLite } from 'gsap'
// import ScrollToPlugin from 'gsap/ScrollToPlugin'
// import Team from '../_modules/team/team'
import Menu from '../_modules/menu/menu'
import Nav from '../_modules/nav/nav'

// import Countdown from '../_modules/countdown/countdown'
// import SideNav from '../_modules/side-nav/side-nav'
// import PageControls from '../_modules/page-controls/page-controls'
import TextInput from '../_modules/textinput/textinput'
import Slider from '../_modules/slider/slider'

// function protoMessage() {
//   document.querySelector('.prototype-message').addEventListener('click', (e) => {
//     e.currentTarget.style.display = 'none'
//   })
// }

class Main {
  constructor() {
    // super()
    // this.body = document.getElementsByTagName('body')[0]
    // this.mainHeader = document.getElementsByClassName('main-header')[0]
    // this.mainLogo = document.getElementsByClassName('main-header__logo')[0]
    // this.burger = document.getElementById('main-burger')
    // this.subNav = document.getElementsByClassName('sub-nav')[0]
    // this.subNavLinks = document.querySelectorAll('[data-page-link]')
    // this.subNavMenuLinks = document.querySelectorAll('.sub-nav__item [data-page-link]')
    // this.fullSections = document.querySelectorAll('.site-contents__full:not(.site-contents__full--between)')
    // this.sideNavs = document.getElementsByClassName('side-nav')
    // this.carousels = document.getElementsByClassName('carousel')

    // this.mobileWidth = 960
    // this.supportOffset = window.pageYOffset !== undefined
    // this.lastKnownPos = 0
    // this.ticking = false
    // this.wheelTicking = false
    // this.scrollDir
    // this.pageBumpTimeOut = 4500


    // this.resizeTimer
    // this.pageBumpTimer
    // this.setDimensions()
    // this.resizeEvent()
    // this.scrollEvent()
    // this.navChangeOver(document.body.scrollTop)
    // this.subMenuScrollTo()

    // protoMessage()
    this.textInput = new TextInput()
    this.slider = new Slider()
    this.initSections()
  }

  initSections() {
    // TODO: A better way of initating these modules.
    new Menu()
    new Nav()
  }
}

new Main()
