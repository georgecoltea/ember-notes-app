import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('components', function() {
    this.route('note-content');
  });
  this.route('test');
  this.route('register');
  this.route('login');
  this.route('notes');
});

export default Router;
