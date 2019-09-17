import Ember from 'ember';

export default Ember.Controller.extend({
  errorMessage: '',
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  actions: {
    registerUser() {
      const email = this.get('userEmail');
      const password = this.get('userPassword');
      const confirmPassword = this.get('userPasswordConfirm');

      if (email && password && confirmPassword) {
        if (this.validateEmail(email)) {
          if (password === confirmPassword) {
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
          } else {
            this.set('errorMessage', 'The passwords did not match');
          }
        } else {
          this.set('errorMessage', 'Please enter a valid email address');
        }
      } else {
        this.set('errorMessage', 'Please fill in all the details');
      }

    }
  }

});
