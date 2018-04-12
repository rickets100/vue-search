<style lang="scss">
  .results {
    border: 1px solid dodgerblue;
  }
</style>

<template>
  <div>
    <SearchBar></SearchBar>
    <Results :dishes="results" class="results"></Results>
  </div>
</template>

<script>
  import EventBus from '../helpers/event-bus.js';
  import RecipePuppy from '../api/rp-api.js';
  import SearchBar from './search-bar';
  import Results from './results';

  export default {
    name: 'recipePanel',
    components: {
      SearchBar,
      Results
    },
    data() {
      return {
        searchTerm: '',
        results: [],
     }
    },
    mounted(){
      EventBus.$on("searchRequested", this.onSearchRequested);
    },
    beforeDestroy(){
      EventBus.$off('searchRequested', this.onSearchRequested);
    },
    methods: {
      onSearchRequested(payLoad){
        this.searchTerm = payLoad;
      },
      search() {
        if (!this.searchTerm) {
          this.reset();
          return;
        }
        RecipePuppy.search({
          q: this.searchTerm
        }).then((response) => {
          console.log('response:', response);
          this.results = response.data.results;
          EventBus.$emit('gotResults', this.results);
        }).catch((error) => {
          console.log(error);
        })

      },
      reset() {
        this.searchTerm = '';
        this.results = [];
      }
    },
    watch: {
      searchTerm: {
        handler() {
          this.search();
        }
      }
    }
  }
</script>
