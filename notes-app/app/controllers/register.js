import Ember from 'ember';

export default Ember.Controller.extend({
  errorMessage: '',
  validateEmail(email) {
    /**
     * Regex that validates email address
     * It checks for: min 8 chars, @ sign, end . symbol
     */
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  validateInputs(email, password, confirmPassword) {
    if (!email || !password || !confirmPassword) {
      this.set('errorMessage', 'Please fill in all the details');
      return false;
    }

    if (!this.validateEmail(email)) {
      this.set('errorMessage', 'Please enter a valid email address');
      return false;
    }

    if (password !== confirmPassword) {
      this.set('errorMessage', 'The passwords did not match');
      return false;
    }

    return true;
  },
  actions: {
    registerUser() {
      const email = this.get('userEmail');
      const password = this.get('userPassword');
      const confirmPassword = this.get('userPasswordConfirm');

      const inputsValid = this.validateInputs(email, password, confirmPassword);

      if (inputsValid) {
        $.post("http://localhost:8080/api/register", {
          email: email,
          password: password
        }).then(function () {
          document.location = "/login";
        }, function (res) {
          let error = res.responseText;
          const formattedError = error.replace(/"/g, '');
          this.set('errorMessage', formattedError);
        }.bind(this));
      }
    }
  }

});
