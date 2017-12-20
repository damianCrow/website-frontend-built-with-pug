import $ from 'jquery'

export default class Modal {
  constructor() {
    
    $('.launch-modal').click((e) => {
      e.preventDefault()

      let modalObj = {}

      switch($(e.target).attr('name')) {
        case 'terms':
          modalObj = {
            modal: {class: 'gold'}, 
            heading: {text: 'Regulation & Licencing'}, 
            paragraphs: [
              {text: 'CFDs and Spot FX are leveraged products and carry a high degree of risk to your capital. It is possible to lose more than your initial investment so only speculate with money you can afford to lose. CFDs and Spot FX may not be suitable for all investors so please ensure you fully understand the risks involved, seeking independent advice if necessary.'},
              {text: 'BlackPearlFX is a trading name of Black Pearl Securities Limited (Company number 08823678). Black Pearl Securities Limited is authorized and regulated by the Financial Conduct Authority, Financial Services Register Number 688456. Registered office address: 36 Whitefriars Street, London, EC4Y 8BQ. United Kingdom'},
              {text: 'Relationships listed throughout the website may be directly or indirectly established with Black Pearl Securities Limited or its trading name BlackPearlFX. The Entities listed include custodian banks, clearing partners, liquidity providers, technology providers, news & market data vendors, among others. Names and Logos of listed entities are the property of their respective owners.'},
              {text: 'BlackPearlEX’s Payment and Foreign Currency Exchange Services are provided by Ebury Partners UK Limited. Ebury Partners UK Limited is authorised and regulated by the Financial Conduct Authority as an Authorised Payment Institution (Financial Services Register No. 522933).'}
            ]
          }
        break;
        case '':
         // MORE ANOTHER CASE BASED ON THE ELEMENT ATTRIBUTE PASSED TO CLICK CALLBACK \\
         break;
        //....
      }

      this.launchModal(modalObj)
    })
  }

  launchModal(configObj, callBack) {
    configObj.heading.class = configObj.heading.class || ''
    configObj.heading.text = configObj.heading.text || ''
    configObj.modal.class = configObj.modal.class || ''

    let modal = `<div class="modal ${configObj.modal.class}">
      <span class="modal__close">&times;</span>
      <h3 class="modal__heading">${configObj.heading.text}</h3>`

    for(let i = 0; i < configObj.paragraphs.length; i++) {
      configObj.paragraphs[i].class = configObj.paragraphs[i].class || ''
      configObj.paragraphs[i].text = configObj.paragraphs[i].text || ''
      const paragraph = `<p class="modal__text ${configObj.paragraphs[i].class}">${configObj.paragraphs[i].text}</p>`

      modal += paragraph

      if(i === configObj.paragraphs.length - 1) {
        modal += `</div>`
      }
    }
   
    $('body').append($(modal))
    $('body').addClass('modal-open')
    $('.modal__close').click(() => {
      
      if(callBack) {
        callBack()
      }
      this.closeModal()
    })
  }

  closeModal() {
    $('.modal').addClass('closed')
    $('body').removeClass('modal-open')

    setTimeout(() => {
      $('.modal').remove()
    }, 1000)
  }
}
