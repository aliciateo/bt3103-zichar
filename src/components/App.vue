<template>
  <div id="App">
    <title-alicia></title-alicia>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './Header.vue'
  export default {
    name: 'App',
    data() {
      return{
      }
    },
    components:{
      'title-alicia':Header,
    }
  }
</script>

<style>
 h1{
   background-color:#BCC6CC;
   text-align:center;
   padding: 10%;
 }
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
