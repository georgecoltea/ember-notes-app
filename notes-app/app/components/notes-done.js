import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  dragOver: function(event) {
    event.preventDefault();
  },
  drop: function(event) {
    const id = event.dataTransfer.getData('text/data');
    const record = this.get('model').content.find(o => o.id == id).record;

    record.set('isDone', true);
    record.save();
  }
});
