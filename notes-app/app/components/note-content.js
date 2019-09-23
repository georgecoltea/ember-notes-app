import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['card'],
  isEditable: false,
  actions: {
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
      const colorTabClassList = colorTab[0].classList;
      const colorPaletteVisible = colorTabClassList.contains('d-block');

      if (colorPaletteVisible) {
        colorTabClassList.remove('d-block');
      } else {
        colorTabClassList.add('d-block');
      }

    },
    setNoteColor(color) {
      const note = this.get('model');

      note.set('background', color);
      note.save();

      const colorTab = this.element.getElementsByClassName('colors');
      colorTab[0].classList.remove('d-block');
    }
  },
  dragStart: function(event) {
    event.dataTransfer.setData('text/data', this.get('model.id'));
  }
});
