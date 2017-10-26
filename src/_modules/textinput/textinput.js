import $ from 'jquery'

export default class TextInput {
  constructor() {
  	this.emailInput = document.querySelector('input[type="email"]')

    if(this.emailInput) {
    	this.emailInput.addEventListener('focusout', () => {
    		if(!this.validateEmail(this.emailInput.value)) {
    			this.emailInput.classList.add('error')
          this.emailInput.insertAdjacentHTML('afterEnd', '<b class="error-message">Invalid '+this.emailInput.parentNode.childNodes[1].innerHTML.replace(':', '')+'!</b>');
    		} else {
    			this.emailInput.classList.remove('error')
          this.emailInput.parentNode.removeChild(this.emailInput.nextSibling)
    		}
    	})
    }

    $('.personal_form__form, .contact-form__form').submit((e) => {
      e.preventDefault()

      if($(e.target).find('.phone-validate')) {
        let phoneNumber = ''

        $('.phone-validate').find('input').each((idx, item) => {
          phoneNumber += $(item).val().replace('+', '')
        })
        
        if(!this.validatePhoneNumber(`+${phoneNumber}`)) {
          $('.phone-validate').append('<b class="error-message">Invalid Phone Number!</b>');
          $('.phone-validate').find('input').addClass('error').focus((ele) => {
            $(ele.target).removeClass('error')
            $('.phone-validate').find('.error-message').remove()
          })
        } else {
          $('.phone-validate').find('input').removeClass('error')
          $('.phone-validate').find('.error-message').remove()
        } 
      }

      $(e.target).find('input:not(.error)').each((indx, field) => {
        if($(field).val().length < 1) {
          $(field).parent().append('<b class="error-message">Input Required!</b>');
          $(field).addClass('error').focus((el) => {
            $(el.target).removeClass('error')
            $(el.target).parent().find('.error-message').remove()
          })
        } else {
          $(field).removeClass('error')
          $(field).parent().find('.error-message').remove()
        }
      })

      if($(e.target).find('.dropdown')) {
        $('.dropdown').each((indx, select) => {
          if($(select).val() === null) {
            $(select).addClass('error').change((el) => {
              $(el.target).removeClass('error')
            })
          } else {
            $(select).removeClass('error')
          }
        })
      } 

      if($(e.target).find('.radiowrap__radio')) {
        let radioCategories = []

        $('.radiowrap__radio').each((indx, radio) => {
          radioCategories.push($(radio).attr('name'))
        })

        const radioArray = Array.from(new Set(radioCategories))

        for(let i = 0; i < radioArray.length; i++) {
          if($(`input[name=${radioArray[i]}]:checked`).length <= 0) {
            $(`input[name=${radioArray[i]}]`).addClass('error').change(() => {
              $(`input[name=${radioArray[i]}]`).removeClass('error')
            })
          } else {
            $(`input[name=${radioArray[i]}]`).removeClass('error')
          }
        }
      } 
    })
  }

  validateEmail(email) {
    if (email.length < 1) {
      return true
    } else {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }

  validatePhoneNumber(phoneNumber) {
    if (phoneNumber < 1) {
      return true
    } else {
      const reg = /^(?=(?:\D*\d){10,15}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$/;
      return reg.test(phoneNumber)
    }
  }
}


