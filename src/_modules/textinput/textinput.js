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

  validateEmail(email) {
  	if(email.length < 1) {
	    return true
	  } else {
	  	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	  }
	}
}
