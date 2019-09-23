import Ember from 'ember';

export default Ember.Controller.extend({
  errorMessage: '',
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  validateInputs(email, password) {
    if (!email || !password ) {
      this.set('errorMessage', 'Please fill in all the details');
      return false;
    }

    if (!this.validateEmail(email)) {
      this.set('errorMessage', 'Please enter a valid email address');
      return false;
    }

    return true;
  },
  actions: {
    loginUser() {
      const email = this.get('userEmail');
      const password = this.get('userPassword');

      const inputsValid = this.validateInputs(email, password);

      if (inputsValid) {
        $.post("http://localhost:8080/api/login", {
            email: email,
            password: password
          }).then(function (res) {
            // document.location = "/notes";
            console.log(res);
          }, function (res) {
            let error = res.responseText;
            const formattedError = error.replace(/"/g, '');
            this.set('errorMessage', formattedError);
          }.bind(this));
      }
    }
  }

});
