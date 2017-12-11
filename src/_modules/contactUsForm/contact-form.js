import $ from 'jquery'

export default class ContactUsForm {
  constructor(textInput) {
  	if ($('.contact-form__form').length) {
  		const formId = $('.contact-form__form').get(0).id
	    $(`#${formId}`).submit((e) => {
	      if (!textInput.validateForm(formId, () => true, () => false)) {
	        e.preventDefault()
	      }
	    })
  	}
  }
}