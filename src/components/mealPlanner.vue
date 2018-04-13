<style lang="scss">
  .meal-planner {
    max-width: 0;
    min-width: 0;
    margin-left: 20px;
    border-left: 1px solid gray;

    &.has-meals {
      max-width: auto;
      min-width: 230px;
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

        .separator {
          padding: 20px 0 20px 0;
        }
      }

      .current-dish {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 16px;
        border-bottom: 3px solid #2e5885;
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
    <div class="meal" v-for="meal,i in meals">
      {{meal.name}}
      <div class="dish" v-for="dish,j in meal.dishes">
        {{ dish.title }}
        <button v-on:click="removeCurrentDishFromMeal(i,j)">Remove</button>
      </div>
    </div>

    <div v-if="currentDish" class="meal-selector">
      <div class="mask"></div>
      <div class="meals-list">
        <div class="current-dish">{{ this.currentDish.title }}</div>
        <div v-if="meals.length" class="add-options">Add to an Existing Meal: </div>
        <div v-for="meal,i in meals" class="meal-name">
          {{meal.name}}
          <button v-on:click="addCurrentDishtoMeal(i)">Add</button>
          <div class="separator">- OR - </div>
        </div>
        <div class="add-options">
          <label for="new-meal">Create New Meal: </label>
          <input name="new-meal" v-on:keyup.enter="onAddMealClick()" v-model="newMealName" ></input>
        </div>
        <button v-on:click="onClose()" class="btn-close">X</button>

      </div>
    </div>

  </div>
</template>

<script>
  import EventBus from '../helpers/event-bus.js';

  export default {
    name: 'mealPlanner',
    components: {

    },
    data() {
      return {
        foo: '',
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
        this.currentDish =  dish;
      },
      addCurrentDishtoMeal(index) {
        this.meals[index].dishes.push(this.currentDish);
        this.currentDish = null;
      },
      removeCurrentDishFromMeal(mealIndex, dishIndex) {
        this.meals[mealIndex].dishes.splice(dishIndex,1);
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
    },
    watch: {
    }
  }
</script>
