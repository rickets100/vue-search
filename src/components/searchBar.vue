<template>
  <div>
    <label for="search-box">Search: </label>
    <input name="search-box" ref="search-box" type="text" v-model="searchTerm" v-on:keyup.enter="search"/>
    <button v-on:click="search">Go</button>
  </div>
</template>

<script>
import EventBus from '../helpers/eventBus.js';

export default {
  name: 'searchBar',
  mounted(){
    this.$nextTick(() =>{
      this.search();
    })
  },
  data() {
    return {
      searchTerm: '',
   }
  },
  methods: {
    search() {
      EventBus.$emit('searchRequested', this.searchTerm);
    }
  }
}
</script>
