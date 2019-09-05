import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    if (document.getElementById('dumm')) {
      document.getElementById('pinned').style.display = "block";
    } else {
      document.getElementById('pinned').style.display = "none";
    }
  }
  // store: Ember.inject.service(),
  // actions: {
  //   deleteNote(id) {
  //     const note = this.get('model').findBy('_id', id);
  //     note.destroyRecord();
  //   },
  //   editNote(id, title, content) {
  //     // const noteTitle = this.get('noteTitle');
  //     // const noteContent = this.get('noteContent');

  //     const noteTitle = title;
  //     const noteContent = content;

  //     var contenteditable = this.querySelector('[contenteditable]'),
  //     text = contenteditable.textContent;

  //     const note = this.get('model').findBy('_id', id);

  //     console.log({noteTitle, noteContent, text, contenteditable});

  //     console.log(contenteditable);

  //     // note.set('title', noteTitle);
  //     // note.set('content', noteContent);
  //     // note.save();
  //   },
  // //   openModal: function(target) {
  // //     var modal = this.get('comp-' + target);
  // //     modal.send('toggleModal');
  // // }
//  }
});
