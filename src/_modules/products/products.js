import $ from 'jquery'
import Slick from 'slick-carousel'

export default class Slider {
  constructor() {
  	$('.slider-container').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 10000,
		  arrows: false,
		  speed: 1000,
		  dots: true,
		  customPaging: function(slick, index) {
        return `<div class="progress__wrap"><a class="progress__wrap__text">${(index + 1)}</a></div>`;
    	},
		});
	}
}
