import Ember from 'ember';

export default Ember.Component.extend({
  errorMessage: '',
  store: Ember.inject.service(),
  displayAddNoteContainer: false,

  emptyInputs() {
    this.set('noteTitle', '');
    this.set('noteContent', '');
    this.set('errorMessage', '');
  },

  setAddNoteContainerDisplay(param) {
    this.set('displayAddNoteContainer', param);
  },

  storeNote(noteTitle, noteContent) {
    const fieldsFilled = noteTitle && noteContent;

    if (fieldsFilled) {
      const note = this.get('store').createRecord('note', {
        title: noteTitle,
        content: noteContent,
        isPinned: false
      });

      note.save().then().catch();

      this.emptyInputs();
      this.setAddNoteContainerDisplay(false);
    } else {
      this.set('errorMessage', `Don't be lazy!`);
      this.setAddNoteContainerDisplay(true);
    }
  },

  storeNoteWithImage(noteTitle, noteContent, fileList) {
    const fieldsFilled = noteTitle && noteContent;

    if (fieldsFilled) {
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

        note.save().then().catch();
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      this.emptyInputs();
      this.setAddNoteContainerDisplay(false);
    } else {
      this.set('errorMessage', `Don't be lazy!`);
      this.setAddNoteContainerDisplay(true);
    }
  },
  actions: {
    createNote() {
      const noteTitle = this.get('noteTitle');
      const noteContent = this.get('noteContent');
      const fileList = this.element.getElementsByClassName('add-note-image-upload');
      const hasImage = fileList[0].files.length > 0;

      if (hasImage) {
        this.storeNoteWithImage(noteTitle, noteContent, fileList);
      } else {
        this.storeNote(noteTitle, noteContent);
      }
    },
    openAddNote() {
      this.setAddNoteContainerDisplay(true);
    },
    cancelNoteAdd() {
      this.setAddNoteContainerDisplay(false);
    }
  }
});

