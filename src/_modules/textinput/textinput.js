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
          $(el.currentTarget).removeClass('error')
          $(el.currentTarget).parent().find('.error-message').remove()
        })
      } else {
        $(field).removeClass('error').parent().find('.error-message').remove()
      }
    })
// VALIDATE VISIBLE EMAIL INPUTS \\
    if($(`#${element}`).find('input[type="email"]:visible')) {
      $(`#${element}`).find('input[type="email"]').each((idx, ele) => {
        if(!this.validateEmail($(ele).val())) {
          $(ele).addClass('error').parent().append('<b class="error-message">Invalid Email!</b>')
          $(ele).change((el) => {
            this.validateEmail($(el.currentTarget).val(), () => {
              $(ele).removeClass('error').parent().find('.error-message').remove()
            })
          })
        } else {
          $(ele).removeClass('error').parent().find('.error-message').remove()
        }
      })
    }
// VALIDATE VISIBLE DROPDOWNS INPUTS \\
    if($(`#${element}`).find('.dropdown:visible')) {
      $('.dropdown').each((indx, select) => {
        if($(select).val() === null) {
          $(select).addClass('error').parent().append('<b class="error-message">Selection Required!</b>')
          $(select).change((el) => {
            $(el.currentTarget).removeClass('error')
            $(el.currentTarget).parent().find('.error-message').remove()
          })
        } else {
          $(select).removeClass('error').closest('.error-message').remove()
        }
      })
    }
// VALIDATE VISIBLE TABS INPUTS \\
    if($(`#${element}`).find('.tabs-list:visible')) {
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
// VALIDATE VISIBLE PASSWORD INPUTS AND MATCH PASSWORD CONFIRM \\
    if($(`#${element}`).find('input[name="password"]:visible') && $(`#${element}`).find('input[name="confirmPassword"]:visible')) {
      const pass = $(`#${element}`).find('input[name="password"]')
      const passConf = $(`#${element}`).find('input[name="confirmPassword"]')
      const bothFields = $(`#${element}`).find('input[type="password"]')

      if($(pass).val() !== $(passConf).val()) {
        $(passConf).parent().append('<b class="error-message">Passwords Dont Match!</b>')
        $(bothFields).addClass('error').change(() => {
          $(passConf).parent().find('.error-message').remove()
          $(bothFields).removeClass('error')
        })
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
        if($(`input[name=${radioArray[i]}]:checked`).length <= 0) {
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

  validateEmail(email, callBack) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(callBack && re.test(email)) {
      return callBack()
    } else {
      return re.test(email)
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

