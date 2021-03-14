<template>
    <div id="content">
      <ul>  
        {{this.orders}}
      <span v-for="item in this.orders" :key="item[0]">
        <li>
          <span v-for="food in item[1]" :key="food.id">
          <p>{{food[0]}}: {{food[1]}}</p>
          </span>
          <button  v-bind:id="item[0]" v-on:click="deleteItem($event); fetchItems()"> Delete </button>
          <button v-bind:id="item[0]" v-on:click="route($event)"> Modify </button>
        </li>
        
      </span> 
    </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import database from '../firebase.js'
Vue.component('database',database)
export default {
  data(){
    return{
      orders:[],
    }
  },
  methods:{
    fetchItems: function(){
      database.collection('orders').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.id = doc.id,
            this.orders.push([doc.id, doc.data()]) 
          })        
        })    
    },
    deleteItem: function(event){
      let doc_id = event.target.getAttribute("id");
      database.collection('orders').doc(doc_id).delete().then(() => location.reload());
    },
    route: function(event){
      let doc_id = event.target.getAttribute("id");
      this.$router.push({path: '/Modify', name: 'modify', params: {id:doc_id}})
    }

  },
  created: function(){
    this.fetchItems()
  },
}
</script>
<style>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 85px;
  height: 60px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  text-align:center;
}
</style>