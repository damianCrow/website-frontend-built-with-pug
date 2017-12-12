import $ from 'jquery'

export default class TabsList {
  constructor() {
  	
  	$('.tabs-list__item').click((e) => {
  		$(e.currentTarget).addClass('selected')
  		
  		$(e.currentTarget).siblings().each((idx, item) => {

  			if($(item).is('input')) {

  				$(item).val($(e.currentTarget).attr("data-value"))
  			}
  			
  			$(item).removeClass('selected')
  		})
  	})
  }
}
