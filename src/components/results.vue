<style lang="scss">
  .result {
    border: 1px solid seagreen;

    .title {
      border: 1px solid orchid;
    }

    .thumbnail {

    }

    .ingredients {
      border: 1px solid orange;
    }
  }
</style>

<template>
  <div>
    <div class="ingredients">
      <div class="result" v-for="dish in dishes">
        <a class="title" :href="dish.href" target="_blank">{{ dish.title }}</a>
        <img class="thumbnail" v-if="dish.thumbnail" :src="dish.thumbnail" />
        <div class="ingredients">{{ dish.ingredients }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../helpers/event-bus.js';

export default {
  name: 'results',
  props: {
    dishes: {
      type: Array,
      required: true
    }
  }
}
</script>
