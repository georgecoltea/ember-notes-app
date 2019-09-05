import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['card'],
  isEditable: false,
  actions: {
    deleteNote() {
      const model = this.get('model');
      model.destroyRecord();
    },
    editNote() {
      const contenteditable = this.element.querySelectorAll('[contenteditable]');
      const title = contenteditable[0].textContent;
      const content = contenteditable[1].textContent;
      const note = this.get('model');

      note.set('title', title);
      note.set('content', content);
      note.save();
      this.set('isEditable', false);
    },
    enableEdit() {
      this.set('isEditable', true);
    },
    pinPost() {
      const note = this.get('model');
      const pinStatus = note.get('isPinned');

      note.set('isPinned', !pinStatus);
      note.save();
    },
    enableColors() {
      const colorTab = this.element.getElementsByClassName('colors');

      if (colorTab[0].classList.contains('d-block')) {
        colorTab[0].classList.remove('d-block');
      } else {
        colorTab[0].classList.add('d-block');
      }

    },
    setNoteColor(color) {
      const note = this.get('model');

      note.set('background', color);
      note.save();

      const colorTab = this.element.getElementsByClassName('colors');
      colorTab[0].classList.remove('d-block');
    },
    // click: function() {
    //   console.log('here');
    //   this.sendAction('openModal', 'myModal');
    // }
    // openModal: function(modalName) {
    //   return this.render(modalName, {
    //     into: 'application',
    //     outlet: 'modal'
    //   });
    // },
    // closeModal: function() {
    //   return this.disconnectOutlet({
    //     outlet: 'modal',
    //     parentView: 'application'
    //   });
    // }
  }
});
