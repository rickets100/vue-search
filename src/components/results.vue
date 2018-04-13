<style lang="scss">
  .dish {
    border-bottom: 1px solid grey;
    margin: 5px;
    justify-content: flex-start;

    .dish-title {
      text-align: left;
      a {
        text-decoration: none;
        color: black;
        font-weight: bold;

        &:hover {
          color: red;
          &:after {
            content: ' >';
          }
        }
      }
    }

    .dish-details {
      display: flex;
      padding-bottom: 10px;

      .thumbnail-wrapper{
        display: flex;
        width: 100px;
        height: 100px;

        .thumbnail{
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          width: 100px;
          height: 100px;
          border-radius: 2px;
        }

      }
      .ingredients {
        flex-basis: 75%;
        padding-left: 8px;
        text-align: left;
      }
    }
  }
</style>

<template>
  <div>
    <div>
      <div class="dish" v-for="dish in dishes">
        <div class="dish-title">
          <a :href="dish.href" target="_blank">{{ dish.title }}</a>
          <button v-on:click="onAddDishClick(dish)">Add to Meal</button>
        </div>
        <div class="dish-details">
          <div class="thumbnail-wrapper">
            <div v-if="dish.thumbnail" class="thumbnail" :style="'background-image: url('+ dish.thumbnail + ');'">
            </div>
          </div>
          <div class="ingredients">{{ dish.ingredients }}</div>
        </div>
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
  },
  methods: {
    onAddDishClick(dish) {
      console.log('onAddDishClick', dish);
      EventBus.$emit('addDish', dish);
    }
  }
}
</script>
