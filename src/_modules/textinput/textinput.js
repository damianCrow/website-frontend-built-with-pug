export default class TextInput {
  constructor() {
    this.emailInput = document.querySelector('input[type=“email”]')
    if (this.emailInput) {
      this.emailInput.addEventListener('focusout', () => {
        if (!this.validateEmail(this.emailInput.value)) {
          this.emailInput.classList.add('error')
        } else {
          this.emailInput.classList.remove('error')
        }
      })
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
}
