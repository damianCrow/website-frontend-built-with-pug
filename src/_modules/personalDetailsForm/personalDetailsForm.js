import $ from 'jquery'
import 'nodep-date-input-polyfill'

export default class PersonalDetailsForm {
  constructor(textInput) {
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
        // if(currentIndex < newIndex) {
        //   return textInput.validateForm(`personalDetailsForm-p-${currentIndex}`, () => true, () => false)
        // } else {
          return true
        // }
      },
      onStepChanged(event, currentIndex, priorIndex) {
        $(`#personalDetailsForm-p-${currentIndex}`).find('.error').removeClass('error')
        
        if (currentIndex < priorIndex) {
         $('#personalDetailsFormProgress').find(`.progress[data-index="${priorIndex}"]`).removeClass('active complete')
         $('#personalDetailsFormProgress').find(`.progress[data-index="${currentIndex}"]`).removeClass('complete').addClass('active')
        } else {
          $('#personalDetailsFormProgress').find(`.progress[data-index="${priorIndex}"]`).removeClass('active').addClass('complete')
          $('#personalDetailsFormProgress').find(`.progress[data-index="${currentIndex}"]`).addClass('active')
        }
      },
      onFinishing(event, currentIndex) {
        if(textInput.validateForm(`personalDetailsForm-p-${currentIndex}`, () => true, () => false)) {
          $(this).submit()
        }
      },
      onFinished(event, currentIndex) {
          alert('Submitted!')
      }
    })
  }
}