import $ from 'jquery'
import Slick from 'slick-carousel'

export default class Slider {
  constructor() {
  	$('.slider-container').slick({
		  autoplay: true,
		  autoplaySpeed: 7000,
		  arrows: false,
		  speed: 2000,
		  dots: true,
		  fade: true,
		  customPaging: function(slick, index) {
        return `<div class="progress__wrap"><a class="progress__wrap__text">${(index + 1)}</a></div>`;
    	},
		});
	}
}
