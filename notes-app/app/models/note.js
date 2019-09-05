import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  isPinned: DS.attr('boolean'),
  image: DS.attr('string'),
  background: DS.attr('string')
});
