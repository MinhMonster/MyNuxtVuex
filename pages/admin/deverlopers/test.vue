<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col mx-2 px-2 py-3 bg-light border rounded">
        <h6>Idea 💡</h6>
        <draggable class="draggable-list" v-model="tasks.ideas" :list="tasks.ideas"   @remove="testchange" @add="testchange" @change="testchange" group="tasks">
          <div v-for="(idea, i) in tasks.ideas" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ idea }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-light border rounded">
        <h6>Todo ✍</h6>
        <draggable class="draggable-list" :list="tasks.todos"   @remove="testchange" @add="testchange" @change="testchange" group="tasks">
          <div v-for="(todo, i) in tasks.todos" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ todo }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-light border rounded">
        <h6>In Progress 🗓</h6>
        <draggable
          class="draggable-list"
          :list="tasks.inProgress"   @remove="testchange" @add="testchange" @change="testchange"
          group="tasks"
        >
          <div v-for="(task, i) in tasks.inProgress" :key="i" >
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ task }}</p>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col mx-2 px-2 py-3 bg-light border rounded">
        <h6>Ready to go ✅</h6>
        <draggable class="draggable-list" :list="tasks.completed"   @remove="testchange" @add="testchange" @change="testchange" group="tasks">
          <div v-for="(task, i) in tasks.completed" :key="i">
            <div class="bg-white mt-3 p-2 shadow border rounded">
              <p>{{ task }}</p>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      tasks: {
        ideas: ["Migrate codebase to TypeScript"],
        todos: ["Dockerize App", "Add vue.draggable to project"],
        inProgress: ["Implement Web3 Features", "Bump to vite.js"],
        completed: [],
      },
    };
  },
  methods:{
    testchange(event){
      console.log(event);
    }
  }
};
</script>

<style scoped>
h6 {
  font-weight: 700;
}
.col {
  height: 90vh;
  overflow: auto;
}
.draggable-list {
  min-height: 10vh;
}
.draggable-list > div {
  cursor: pointer;
}
</style>