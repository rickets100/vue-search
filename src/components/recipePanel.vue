<style lang="scss">
  .results {
    .result{
      .title{

      }
      .thumbnail{

      }
      .ingredients{

      }
    }
  }
</style>

<template>
  <div>
    <label for="search-box">Search: </label>
    <input name="search-box" ref="search-box" type="text" v-model="searchTerm" v-on:keyup.enter="search"/>
    <button v-on:click="search">Go</button>
    <div class='results'>
      <div class="result" v-for="result in results">
        <a class="title" :href="result.href" target="_blank">{{ result.title }}</a>
        <img class="thumbnail" v-if="result.thumbnail" :src="result.thumbnail" />
        <div class="ingredients">{{ result.ingredients }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipePuppy from '../api/rp-api.js';

  export default {
    name: 'recipePanel',
    data() {
      return {
        searchTerm: '',
        results: []
     }
    },
    methods: {
      search() {
        console.log('searching', this.searchTerm);
        if (!this.searchTerm) {
          this.reset();
          return;
        }

        RecipePuppy.search({
          q: this.searchTerm
        }).then((response) => {
          console.log('response:', response);
          this.results = response.data.results;
        }).catch((error) => {
          console.log(error);
        })
      },
      reset() {
        this.searchTerm = '';
        this.results = [];
      }
    }
  }
</script>
