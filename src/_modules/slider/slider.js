import $ from 'jquery'
import 'slick-carousel'

export default class Slider {
  constructor() {
    $('.slider-container').slick({
      autoplay: true,
      autoplaySpeed: 7000,
      arrows: false,
      speed: 650,
      dots: true,
      fade: true,
      customPaging: (slick, index) => (
        `<div class="progress__wrap"><a class="progress__wrap__text">${(index + 1)}</a></div>`
      ),
    })
  }
}
