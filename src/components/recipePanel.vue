<style lang="scss">
  .recipe-panel-content{
      display: flex;
  }

  .search-bar {
    height: 40px;
    padding-top: 12px;
    margin: 0 8px 10px 5px;
    background-color: #47476b;
    color: white;
    font-weight: bold;
  }

  .results {
    display: flex;
    justify-content: flex-start;
  }
</style>

<template>
  <div>
    <SearchBar class="search-bar"></SearchBar>
    <div class="recipe-panel-content">
      <Results :dishes="results" class="results"></Results>
      <MealPlanner></MealPlanner>
    </div>
  </div>
</template>

<script>
  import EventBus from '../helpers/eventBus.js';
  import RecipePuppy from '../api/rpApi.js';
  import SearchBar from './searchBar';
  import Results from './results';
  import MealPlanner from './mealPlanner';

  export default {
    name: 'recipePanel',
    components: {
      SearchBar,
      Results,
      MealPlanner
    },
    data() {
      return {
        searchTerm: '',
        results: []
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
