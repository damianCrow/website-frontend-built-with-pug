import Swiper from 'swiper'

export default class Carousel {
  constructor() {
    this.carouselContainer = document.getElementsByClassName('carousel')[0]
    this.carouselWrapper = this.carouselContainer.getElementsByClassName('carousel__wrapper')[0]
    this.carouselWrapperName = this.carouselWrapper.classList[0]
    this.carouselSlideName = this.carouselWrapper.getElementsByTagName('div')[0].classList[0]
    this.nextButton = this.carouselContainer.getElementsByClassName('carousel__next')[0]
    this.prevButton = this.carouselContainer.getElementsByClassName('carousel__prev')[0]
  }

  init() {
    const mySwiper = new Swiper('.carousel', {
      autoplay: 5000,
      effect: 'fade',
      speed: 1000,
      loop: true,
      mode: 'horizontal',
      nextButton: this.nextButton,
      prevButton: this.prevButton,
      slideClass: this.carouselSlideName,
      wrapperClass: 'carousel__wrapper',
    })
  }
}
