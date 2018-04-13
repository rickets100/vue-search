<style lang="scss">
  .meal-planner {
    max-width: 0;
    min-width: 0;

    &.has-meals {
      border: 1px solid red;
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
      width: 300px;
      height: 300px;
      top: calc(50% - 150px);
      left: calc(50% - 125px);
      background-color: #fff;
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
        <div v-for="meal,i in meals">
          {{meal.name}}
          <button v-on:click="addCurrentDishtoMeal(i)">Add to This Meal</button>
        </div>
        <label for="new-meal">New Meal: </label>
          <input name="new-meal" v-on:keyup.enter="onAddMealClick()" v-model="newMealName"></input>
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
        console.log('_______', this.currentDish);
      },
      addCurrentDishtoMeal(index) {
        this.meals[index].dishes.push(this.currentDish);
        this.currentDish = null;
      },
      removeCurrentDishFromMeal(mealIndex, dishIndex) {
        this.meals[mealIndex].dishes.splice(dishIndex,1);
      },
      onAddMealClick(foo) {
        let temp = {
          "name": this.newMealName,
          "dishes": []
        }
        console.log('foo', foo);
        this.meals.push(temp);
        this.newMealName = null;
      }
    },
    watch: {
    }
  }
</script>
