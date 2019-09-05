import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,
  primaryKey: '_id',
    serializeId: function(id) {
        return id.toString();
    }
});
