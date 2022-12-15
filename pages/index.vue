<template>
  <div class="container-fluid">
    <div class="p-4 justify-content-center">
      <!-- <logo /> -->
    </div>
    <h1>okok</h1>
    <div class="row">
      <ul>
        <li v-for="(topic, i) in topics" :key="i"  >{{topic.ID}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  components: {
  },
  async fetch() {
    await this.get_topics()
  },
  // async fetch({ store }) {
  //   await store.dispatch('admin/topics/get_topics')
  // },
  created(){
    //  this.$store.dispatch('admin/topics/get_topics')
    // this.get_topics()
  },

  computed: {
    ...mapState('admin/topics',["topics"]),
    // ...mapState('admin/topics',{
    //   topics: (state) => {
    //     return state.admin.topics.topics
    //   }
    // })
  },
  methods:{
    ...mapActions('admin/topics',["get_topics"])
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>