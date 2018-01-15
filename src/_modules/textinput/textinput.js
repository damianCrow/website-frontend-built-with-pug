import $ from 'jquery'

export default class TextInput {
  constructor() {}

  validateForm(element, successCallBack, errorCallBack) {
// VALIDATE VISIBLE PHONE NUMBER INPUTS \\
    if($(`#${element}`).find('.phone-validate')) {
      let phoneNumber = ''

      $('.phone-validate').find('input:visible').each((idx, item) => {
        phoneNumber += $(item).val().replace('+', '')
      })

      if(!this.validatePhoneNumber(`+${phoneNumber}`)) {
        $('.phone-validate').find('input').removeClass('error')
        $('.phone-validate').find('.error-message').remove()

        $('.phone-validate').append('<b class="error-message">Invalid Phone Number!</b>');
        $('.phone-validate').find('input').addClass('error').focus((ele) => {
          $(ele.currentTarget).removeClass('error')
          $('.phone-validate').find('.error-message').remove()
        })
      } else {
        $('.phone-validate').find('input').removeClass('error')
        $('.phone-validate').find('.error-message').remove()
      } 
    }
// VALIDATE VISIBLE TEXT INPUTS \\
    $(`#${element}`).find('input:visible:not(.error):not(.tabs-list__input):not([type="email"])').each((indx, field) => {
      if($(field).val().length < 1) {
        $(field).parent().append('<b class="error-message">Input Required!</b>');
        $(field).addClass('error').focus((el) => {
          this.removeError(el.currentTarget)
        })
      } else {
        this.removeError(field)
      }
    })
// VALIDATE VISIBLE EMAIL INPUTS \\
    if($(`#${element}`).find('input[type="email"]:visible')) {
      $(`#${element}`).find('input[type="email"]').each((idx, ele) => {
        if(!this.validateEmail($(ele).val())) {

          this.removeError(ele)
          $(ele).addClass('error').parent().append('<b class="error-message">Invalid Email!</b>')

          $(ele).change((el) => {
            this.validateEmail($(el.currentTarget).val(), () => {
              this.removeError(ele)
            })
          })
        } else {
          this.removeError(ele)
        }
      })
    }
// VALIDATE VISIBLE DROPDOWNS INPUTS \\
    if($(`#${element}`).find('.dropdown:visible')) {
      $('.dropdown').each((indx, select) => {
        if($(select).val() === null) {

          this.removeError(select)
          $(select).addClass('error').parent().append('<b class="error-message">Selection Required!</b>')
          $(select).change((el) => {
            this.removeError(el.currentTarget)
          })
        } else {
          this.removeError(select)
        }
      })
    }
// VALIDATE VISIBLE TABS INPUTS \\
    if($(`#${element}`).find('.tabs-list:visible')) {
      $('.tabs-list').each((idx, list) => {
        if(!$(list).find('.tabs-list__item.selected').length) {

          $(list).parent().find('.error-message').remove()
          $(list).addClass('error').parent().append('<b class="error-message">Selection Required!</b>')
          $(list).find('.tabs-list__item').click((e) => {
            $(e.currentTarget).parent().removeClass('error').siblings('.error-message').remove()
          })
        } else {
          $(list).parent().removeClass('error').siblings('.error-message').remove()
        }
      })
    }
// VALIDATE VISIBLE PASSWORD INPUTS AND MATCH PASSWORD CONFIRM \\
    if($(`#${element}`).find('input[name="password"]:visible') && $(`#${element}`).find('input[name="confirmPassword"]:visible')) {
      const pass = $(`#${element}`).find('input[name="password"]')
      const passConf = $(`#${element}`).find('input[name="confirmPassword"]')
      const bothFields = $(`#${element}`).find('input[type="password"]')

      if($(pass).length && $(pass).val().length) {

        if(this.validatePassword($(pass).val())) {

          if($(pass).val() !== $(passConf).val()) {
            this.removeError(passConf)
            $(passConf).parent().append('<b class="error-message">Passwords Dont Match!</b>')
            $(bothFields).addClass('error').change(() => {
              $(passConf).parent().find('.error-message').remove()
              $(bothFields).removeClass('error')
            })
          } 
        } else {
          this.removeError(pass)
          $(pass).addClass('error').parent().append('<b class="error-message">Password must be 8 characters minimum, with at least 1 uppercase character!</b>')
        }
      }
    }
// VALIDATE VISIBLE RADIO BUTTONS INPUTS \\
    if($(`#${element}`).find('.radiowrap__radio:visible')) {
      let radioCategories = []

      $('.radiowrap__radio').each((indx, radio) => {
        radioCategories.push($(radio).attr('name'))
      })

      const radioArray = Array.from(new Set(radioCategories))

      for(let i = 0; i < radioArray.length; i++) {
        
        if(!$(`input[name=${radioArray[i]}]:checked`).length) {
          $(`input[name=${radioArray[i]}]`).addClass('error').change(() => {
            $(`input[name=${radioArray[i]}]`).removeClass('error')
          })
        } else {
          $(`input[name=${radioArray[i]}]`).removeClass('error')
        }
      }
    }

    if(!$(`#${element}`).find('input.error').length && !$(`#${element}`).find('.error-message').length) {
      // SUCCESSFULL FORM VALIDATION! CALL SUCCESS FUNCTION HERE \\
      return successCallBack()

    } else {
      // FAILED FORM VALIDATION! CALL FAIL FUNCTION HERE \\
      return errorCallBack()
    }
  }

  removeError(ele) {
    $(ele).removeClass('error')
    $(ele).parent().find('.error-message').remove()
  }

  validateEmail(email, callBack) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(callBack && re.test(email)) {
      return callBack()
    } else {
      return re.test(email)
    }
  }

  validatePassword(password) {
    const validpassword = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/;
    return validpassword.test(password)
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

