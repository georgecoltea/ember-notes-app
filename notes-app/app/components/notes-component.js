import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    if (document.getElementById('dumm')) {
      document.getElementById('pinned').style.display = "block";
    } else {
      document.getElementById('pinned').style.display = "none";
    }
  }
});
