<style lang="scss">
  .meal-planner {
    max-width: 0;
    min-width: 0;
    margin-left: 20px;
    padding: 0 5px 0 5px;
    border-left: 1px solid gray;

    &.has-meals {
      max-width: auto;
      min-width: 230px;
    }

    .meals-header {
      padding-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
    }

    .meal {
      margin-top: 12px;
      text-transform: capitalize;
      font-style: italic;
      font-weight: bold;
      border-bottom: 1px solid gray;

      &:first-of-type {
        margin-top: 0;
      }
      .dish {
        border: none;
        padding: 5px 0 5px 0;
        text-align: left;
        font-weight: normal;
      }
    }

    .btn-remove {
      border-radius: 3px;
      padding: 3px;
      background-color: #e0e0eb;
      font-weight: bold;
      color: black;
      text-transform: uppercase;
    }


  }

  .meal-selector{
    .mask {
      position: fixed;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .5);
    }

    .meals-list {
      position: fixed;
      padding: 24px;
      width: 300px;
      height: 300px;
      top: calc(50% - 150px);
      left: calc(50% - 125px);
      background-color: #fff;

      .add-options {
        text-align: left;
      }

      .meal-name {
        font-weight: bold;
        text-align: left;
      }

      .current-dish {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 16px;
        border-bottom: 3px solid #990000;
      }

      .separator {
        padding: 20px 0 20px 0;
      }

      .btn-close {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: none;
        background-color: #2e5885;
        font-size: 16px;
        font-weight: bold;
        color: white;
        text-transform: uppercase;
      }
    }
  }
</style>

<template>
  <div class="meal-planner" :class="{ 'has-meals': meals.length > 0 }">
    <div v-if="meals.length > 0" class="meals-header">MEALS</div>
    <div class="meal" v-for="meal,i in meals">
      {{ meal.name }}
      <div class="dish" v-for="dish,j in meal.dishes">
        <button v-on:click="removeCurrentDishFromMeal(i,j)" class="btn-remove">X</button>
        {{ dish.title }}
      </div>
    </div>

    <div v-if="currentDish" class="meal-selector">
      <div class="mask"></div>
      <div class="meals-list">
        <div class="current-dish">{{ this.currentDish.title }}</div>
        <div v-if="meals.length" class="add-options">Add to an Existing Meal: </div>
        <div v-for="meal,i in meals" class="meal-name">
          <button v-on:click="addCurrentDishtoMeal(i)">Add</button>
          {{meal.name}}
        </div>
        <div v-if="meals.length" class="separator">- OR - </div>
        <div class="add-options">
          <label for="new-meal">Create New Meal: </label>
          <input name="new-meal" v-on:keyup.enter="onAddMealClick()" v-model="newMealName" autofocus></input>
        </div>
        <button v-on:click="onClose()" class="btn-close">X</button>
      </div>
    </div>

  </div>
</template>

<script>
  import EventBus from '../helpers/eventBus.js';

  export default {
    name: 'mealPlanner',
    data() {
      return {
        meals: [
      ],
      currentDish: null,
      newMealName: null
     }
    },
    mounted() {
      EventBus.$on("addDish", this.onAddDish);
    },
    beforeDestroy() {
      EventBus.$off('addDish', this.onAddDish);
    },
    methods: {
      onAddDish(dish) {
        this.currentDish = dish;
      },
      addCurrentDishtoMeal(index) {
        this.meals[index].dishes.push(this.currentDish);
        this.currentDish = null;
      },
      removeCurrentDishFromMeal(mealIndex, dishIndex) {
        this.meals[mealIndex].dishes.splice(dishIndex, 1);
      },
      onAddMealClick() {
        let temp = {
          "name": this.newMealName,
          "dishes": []
        }
        this.meals.push(temp);
        this.newMealName = null;
      },
      onClose() {
        this.currentDish = null;
      }
    }
  }
</script>
