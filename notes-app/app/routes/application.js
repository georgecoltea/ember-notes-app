import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      notes: this.store.findAll('note'),
      // users: this.store.findAll('user')
    });
		// return this.store.findAll('note');
  },
  // setupController(controller, models) {
  //   controller.setProperties(models)
  // },
  actions: {
    openModal: function(modalName) {
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      });
    },
    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
