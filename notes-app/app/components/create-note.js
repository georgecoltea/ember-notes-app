import Ember from 'ember';

export default Ember.Component.extend({
  errorMessage: '',
  store: Ember.inject.service(),
  displayAddNoteContainer: false,
  actions: {
    createNote() {
      const noteTitle = this.get('noteTitle');
      const noteContent = this.get('noteContent');
      const fileList = this.element.getElementsByClassName('add-note-image-upload');

      if (fileList[0].files.length > 0) {
        if (noteTitle && noteContent) {
          const reader = new FileReader();
          const file = fileList[0].files[0];
          let imageData;

          reader.onload = () => {
            imageData = reader.result;
            const note = this.get('store').createRecord('note', {
              title: noteTitle,
              content: noteContent,
              isPinned: false,
              image: imageData
            });

            note.save().then(function () {
            }).catch(function () {
            });
          };

          if (file) {
            reader.readAsDataURL(file);
          }

          this.set('noteTitle', '');
          this.set('noteContent', '');
          this.set('errorMessage', '');

          this.set('displayAddNoteContainer', false);
        } else {
          this.set('errorMessage', `Don't be lazy!`);
          this.set('displayAddNoteContainer', true);
        }

      } else {
        if (noteTitle && noteContent) {
          const note = this.get('store').createRecord('note', {
            title: noteTitle,
            content: noteContent,
            isPinned: false
          });

          note.save().then(function () {
            console.log('success');
          }).catch(function () {
            console.log('error');
          });

          this.set('noteTitle', '');
          this.set('noteContent', '');
          this.set('errorMessage', '');

          this.set('displayAddNoteContainer', false);
        } else {
          this.set('errorMessage', `Don't be lazy!`);
          this.set('displayAddNoteContainer', true);
        }
      }
    },
    openAddNote() {
      this.set('displayAddNoteContainer', true);
    },
    cancelNoteAdd() {
      this.set('displayAddNoteContainer', false);
    }
  }
});
