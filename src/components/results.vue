<style lang="scss">
  .dish {
    justify-content: flex-start;
    margin: 5px;
    border-bottom: 1px solid grey;

    &:first-of-type {
      padding: 5px;
      border-top: 1px solid grey;
    }

    .dish-header {
      display: flex;
      justify-content: space-between;

      .btn-add-dish {
        display: inline-block;
        padding: 5px;
        background-color: #e0e0eb;
        border-radius: 3px;
        color: black;
        font-weight: bold;
        text-transform: uppercase;

        &:hover {
          background-color: #47476b;
          color: white;
        }
      }

      .dish-title {
        text-align: left;

        a {
          color: black;
          font-weight: bold;
          text-decoration: none;

          &:hover {
            color: #6699cc;
            &::after {
              content: " >";
            }
          }
        }
      }
    }

    .dish-details {
      display: flex;
      padding-bottom: 10px;

      .thumbnail-wrapper {
        display: flex;
        width: 100px;
        height: 100px;

        .thumbnail {
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
        <div class="dish-header">
          <div class="dish-title">
            <a :href="dish.href" target="_blank">{{ dish.title }}</a>
          </div>
          <button v-on:click="onAddDishClick(dish)" class="btn-add-dish">Add to Meal</button>
        </div>
        <div class="dish-details">
          <div class="thumbnail-wrapper">
            <div v-if="dish.thumbnail" class="thumbnail" :style="'background-image: url('+ dish.thumbnail + ');'">
            </div>
          </div>
          <div class="ingredients">
            {{ dish.ingredients }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../helpers/eventBus.js';

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
      EventBus.$emit('addDish', dish);
    }
  }
}
</script>
