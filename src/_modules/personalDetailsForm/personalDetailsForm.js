import $ from 'jquery'
import 'nodep-date-input-polyfill'

const allDocsViewed = () => {
  if($('.must-view').length === $('.must-view.viewed').length) {
    return true
  } else {
    $('#docksWrapper').append('<b style="right: auto;" class="error-message">You must view all documentation before finishing!</b>');
  }
}

export default class PersonalDetailsForm {
  constructor(textInput, modal) {
    $('#personalDetailsForm').steps({
      headerTag: 'h1',
      bodyTag: 'section',
      transitionEffect: 1,
      saveState: true,
      onInit() {
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
            url: 'some/end/point',
            data: $(e.currentTarget).serialize(),
            success: (data) => {
              console.log(data)
            }, 
            error: (data) => {
              console.log(data)
            }
          })
        }
      },
      onFinished(event, currentIndex) {
        $(`.progress[data-index="${currentIndex}"]`).removeClass('active').addClass('complete')
        $('#formWrapper').addClass('success')
      }
    })

    $('input[name="USACitizen"]').change((e) => {
      if($(e.currentTarget).val() === 'Yes') {
        modal.launchModal({
          modal: {class: 'gold'}, 
          heading: {text: "I'm sorry Trump is your president."}, 
          paragraphs: [
            {text: 'Some text about why bp prime cannot provide you with a service.'},
            {text: 'Some more text about why bp prime cannot provide you with a service.'}
          ]
        })
      }
    })

    $('.must-view').click((e) => {
      $('#docksWrapper').find('.error-message').remove()

      if(!$(e.currentTarget).hasClass('viewed')) {
        $(e.currentTarget).addClass('viewed')
      }
    })

    $('#employmentStatus').change((e) => {
      if($(e.currentTarget).val() === 'Unemployed' || $(e.currentTarget).val() === 'Student') {
        $('.hide-if-irrelevant').css({'display': 'none'})
      } else {
        $('.hide-if-irrelevant').css({'display': 'flex'})
      }
    })
  }
}