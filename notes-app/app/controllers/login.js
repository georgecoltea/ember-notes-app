import Ember from 'ember';

export default Ember.Controller.extend({
  errorMessage: '',
  actions: {
    loginUser() {
      const email = this.get('userEmail');
      const password = this.get('userPassword');
      console.log('log')
    }
  }
});
