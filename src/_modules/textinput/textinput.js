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
  }

  validateForm(element, successCallBack, errorCallBack) {

    if($(`#${element}`).find('.phone-validate')) {
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

    $(`#${element}`).find('input:not(.error):not(.tabs-list__input)').each((indx, field) => {
      if($(field).val().length < 1) {
        $(field).parent().append('<b class="error-message">Input Required!</b>');
        $(field).addClass('error').focus((el) => {
          $(el.target).removeClass('error')
          $(el.target).parent().find('.error-message').remove()
        })
      } else {
        $(field).removeClass('error').parent().find('.error-message').remove()
      }
    })

    if($(`#${element}`).find('.dropdown')) {
      $('.dropdown').each((indx, select) => {
        if($(select).val() === null) {
          $(select).addClass('error').parent().append('<b class="error-message">Selection Required!</b>').change((el) => {
            $(el.target).removeClass('error')
            $(el.target).parent().find('.error-message').remove()
          })
        } else {
          $(select).removeClass('error').closest('.error-message').remove()
        }
      })
    }

    if($(`#${element}`).find('.tabs-list')) {
      $('.tabs-list').each((idx, list) => {
        if(!$(list).find('.tabs-list__item.selected').length) {
          $(list).addClass('error').parent().append('<b class="error-message">Selection Required!</b>')
          $(list).find('.tabs-list__item').click((e) => {
            console.log()
            $(e.currentTarget).parent().removeClass('error').siblings('.error-message').remove()
          })
        } else {
          $(list).parent().removeClass('error').siblings('.error-message').remove()
        }
      })
    }

    if($(`#${element}`).find('input[name="password"]') && $(`#${element}`).find('input[name="confirmPassword"]')) {
      const pass = $(`#${element}`).find('input[name="password"]')
      const passConf = $(`#${element}`).find('input[name="confirmPassword"]')
      const bothFields = $(`#${element}`).find('input[type="password"]')

      if($(pass).val() !== $(passConf).val()) {
        $(passConf).parent().append('<b class="error-message">Passwords Dont Match!</b>')
        $(bothFields).addClass('error')
      }
    }

    if($(`#${element}`).find('.radiowrap__radio')) {
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

    if($(`#${element}`).find('input.error').length === 0) {
      // SUCCESSFULL FORM VALIDATION! CALL SUCCESS FUNCTION HERE \\
      return successCallBack()

    } else {
      // FAILED FORM VALIDATION! CALL FAIL FUNCTION HERE \\
      return errorCallBack()
    }
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

