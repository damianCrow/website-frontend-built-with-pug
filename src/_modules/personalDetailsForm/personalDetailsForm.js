import $ from 'jquery'
import 'nodep-date-input-polyfill'

const allDocsViewed = () => {
  if($('.must-view').length === $('.must-view.viewed').length) {
    return true
  } else {
    $('#docksWrapper').append('<b style="right: auto;" class="error-message">You must view all documentation before agreeing to terms!</b>');
  }
}

export default class PersonalDetailsForm {
  constructor(textInput, modal) {
    $('#personalDetailsForm').steps({
      headerTag: 'h1',
      bodyTag: 'section',
      transitionEffect: 1,
      saveState: true,
      onInit(test) {
        console.log(test)
        $('#personalDetailsFormProgress').find('.progress[data-index="0"]').addClass('active')
        $('ul[aria-label="Pagination"]').css({'list-style': 'none', 'height': '25px', 'padding': 0})
        $('ul[aria-label="Pagination"] > li > a').addClass('button--green button--medium button').css({'color': 'white', 'position': 'absolute'})
        $('a[href="#next"], a[href="#finish"]').css({'right': 0})
      },
      onStepChanging(event, currentIndex, newIndex) {
        if(currentIndex < newIndex) {
          return textInput.validateForm(`personalDetailsForm-p-${currentIndex}`, () => true, () => false)
        } else {
          return true
        }
      },
      onStepChanged(event, currentIndex, priorIndex) {

        if(currentIndex === 3) {
          const countries = ['AUSTRALIA','AUSTRIA','CHILE','CROATIA','CZECH REPUBLIC','DENMARK','FINLAND','GERMANY','GREECE','ICELAND','IRELAND','ISLE OF MAN','ITALY','LITHUANIA','NORWAY','POLAND','PORTUGAL','SPAIN','SWEDEN','SWITZERLAND','UNITED KINGDOM']

          $(countries).each((idx, item) => {
            if($('#nationality')[0].selectedOptions[0].innerHTML.toUpperCase() === item) {
              $('#uploadOptional').remove()
            }
          })
        }

        $(window).scrollTop(0)
        $(`#personalDetailsForm-p-${currentIndex}`).find('.error').removeClass('error')
        $(`#personalDetailsForm-p-${currentIndex}`).find('.error-message').remove()
     
        if (currentIndex < priorIndex) {
          $('#personalDetailsFormProgress').find(`.progress[data-index="${priorIndex}"]`).removeClass('active complete')
          $('#personalDetailsFormProgress').find(`.progress[data-index="${currentIndex}"]`).removeClass('complete').addClass('active')
        } else {
          $('#personalDetailsFormProgress').find(`.progress[data-index="${priorIndex}"]`).removeClass('active').addClass('complete')
          $('#personalDetailsFormProgress').find(`.progress[data-index="${currentIndex}"]`).addClass('active')
        }
      },
      onFinishing(e, currentIndex) {

        if(textInput.validateForm(`personalDetailsForm-p-${currentIndex}`, () => true, () => false) && allDocsViewed()) {
          
          $.ajax({
            type: "POST",
            url: $('#personalDetailsForm').attr('action'),
            data: $(e.currentTarget).serialize(),
            success: (data) => {
              const dataObj = JSON.parse(data)

              if(dataObj.status === 'success') {
                $(`.progress[data-index="${currentIndex}"]`).removeClass('active').addClass('complete')
                $('#formWrapper').addClass('success')
              } else {
                $('#formWrapper').addClass('error')
                $('#error-details').html(dataObj.error_msg)
              }
            }, 
            error: (data) => {
              $('#formWrapper').addClass('error')
              $('#error-details').html(data.responseText)
            }
          })
        }
      },
      onFinished(event, currentIndex) {}
    })

    $('input[name="USACitizen"]').change((e) => {
      if($(e.currentTarget).val() === 'Yes') {

        modal.launchModal({
          modal: {class: 'gold'}, 
          heading: {text: "I'm sorry, but we cannot offer you our services."}, 
          paragraphs: [
            {text: 'BP Prime is authorised and regulated by the Financial Conduct Authority (FCA) in the United Kingdom but under strict laws set by the regulators; Canadian Securities Administrators (CSA) and the U.S. Securities & Exchange Commission (SEC) we are unable to offer our products to residents or citizens of either the United States of America and Canada.'}
          ]
        }, () => {
          $('input[name="USACitizen"]')[0].checked = false
        })
      }
    })

    $('.must-view').click((e) => {
      $('#docksWrapper').find('.error-message').remove()

      if(!$(e.currentTarget).hasClass('viewed')) {
        $(e.currentTarget).addClass('viewed')
      }
    })

    $('input[name="termsAndConditions"]').click((e) => {

      if(allDocsViewed()) {
        $('input[name="termsAndConditions"]')[0].checked = true
      } else {
        $('input[name="termsAndConditions"]')[0].checked = false
      }
    })

    $('#employmentStatus').change((e) => {
      
      if($(e.currentTarget).val() === 'Unemployed' || $(e.currentTarget).val() === 'Student' || $(e.currentTarget).val() === 'House-keeper') {
        $('.hide-if-irrelevant').css({'display': 'none'}).find('input').val('Na').removeClass('error').parent().find('.error-message').remove()
      } else if($(e.currentTarget).val() === 'Self employed') {
        $('.hide-if-irrelevant').css({'display': 'flex'}).find('input').val('')
        $('.not-self-employed.hide-if-irrelevant').css({'display': 'none'}).find('input').val('Na').removeClass('error').parent().find('.error-message').remove()
      } else {
        $('.hide-if-irrelevant').css({'display': 'flex'}).find('input').val('')
      }
    })
  }
}