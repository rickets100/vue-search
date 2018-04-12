import Vue from 'vue';
import EventBus from '../event-bus.js';

EventBus.$on('search_executed', results => {
  console.log('got here');
  console.log(`Testing: ${results}`);
});
