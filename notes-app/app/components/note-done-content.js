import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card'],
  actions: {
    deleteNote() {
      const model = this.get('model');
      model.destroyRecord();
    }
  }
});
