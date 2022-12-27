<template>
  <div>
    <div class="heading">
      <h1>Infinite Scroll</h1>
      <h4>A simple infinite scroll example using Vue.js</h4>
    </div>

    <div class="container" id="app">
      <div class="list-group-wrapper">
        <transition name="fade">
          <div class="loading" v-show="loading">
            <span class="fa fa-spinner fa-spin"></span> Loading
          </div>
        </transition>
        <ul class="list-group" id="infinite-list">
          <li class="list-group-item" v-for="(item,index) in this.deverlopers"  :key="index">{{item.ID}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script >
import { mapActions, mapState } from 'vuex'

export default{


  data() {
    return{
      loading: false,
    nextItem: 1,
    items: []
    }
   
  },
  components: {
    // draggable
  },
  create(){
    this.get_deverlopers_scroll({
            params:{
              page: this.nextItem,
              perPage: 5
            }
          })
  },
  mounted () {

    // Detect when scrolled to bottom.
    const listElm = document.querySelector('#infinite-list');
    listElm.addEventListener('scroll', e => {
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.loadMore();
      }
    });

    // Initially load some items.
    this.loadMore();

  },
  computed:{
    ...mapState('admin/deverlopers',["deverlopers", "deverlopers_scroll","datas"]),

  },
  methods: {
    ...mapActions('admin/deverlopers',["get_deverlopers_scroll","get_deverlopers", "change_positions"]),
    loadMore () {
      
      /** This is only for this demo, you could 
        * replace the following with code to hit 
        * an endpoint to pull in more data. **/
      this.loading = true;
      setTimeout(e => {
        // for (var i = 0; i < 20; i++) {
          // this.items.push('Item ' + this.nextItem++);
          this.nextItem++
          this.get_deverlopers_scroll({
            params:{
              page: this.nextItem,
              perPage: 5
            }
          })
        // }
        this.loading = false;
      }, 200);
      /**************************************/
      
    }
  }
}
</script>
<style>


body {
  background-color:#5c4084;
  padding: 50px;
}
.container {
  padding: 40px 80px 15px 80px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 800px;
}
.heading {
  text-align: center;
}

.heading h1 {
    background: -webkit-linear-gradient(#fff, #999);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    text-align: center;
    margin: 0 0 5px 0;
    font-weight: 900;
    font-size: 4rem;
    color: #fff;
  }

  .heading h4 {
    color: lighten(#5c3d86,30%);
    text-align: center;
    margin: 0 0 35px 0;
    font-weight: 400;
    font-size: 24px;
  }

.list-group-wrapper {
  position: relative;
}
.list-group {
  overflow: auto;
  height: 14.5vh;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}
.list-group-item {
  margin-top: 1px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid #dce4ec;
  color: #000;
}
.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 9;
  background: #5c4084;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>