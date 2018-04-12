<template>
  <div>
    <label for="search-box">Search: </label>
    <input name="search-box" ref="search-box" type="text" v-model="searchTerm" v-on:keyup.enter="search"/>
    <button v-on:click="search">Go</button>
  </div>
</template>

<script>
import EventBus from '../helpers/event-bus.js';

export default {
  name: 'searchBar',
  data() {
    return {
      searchTerm: '',
   }
  },
  methods: {
    search() {
      console.log('+++++');
      EventBus.$emit('searchRequested', this.searchTerm);
    }
  }
}
</script>
