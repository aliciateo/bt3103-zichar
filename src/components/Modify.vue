<template>
  <div>
    <ul>
      <span v-for="item in this.datapacket" :key="item.id">
        <li>
          <span v-for="(food,index) in item" :key="index">
          <p>
          {{food[0]}}: {{food[1]}}
          </p>
          <input v-model="updateNumbers[index]" id=index placeholder=0 type="number" min="0">
          </span>
        </li>
        <button v-on:click="updateOrder()">Update Order</button>
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
      datapacket:[],
      updateNumbers:[],
      dpCopy:[],
      id: this.$route.params.id, 
      test: 0,
    }
  },

  methods:{
    fetchItems: function(){
      database.collection('orders').doc(this.id).get().then((doc)=>{
          let item ={}
          item=doc.data()
          this.datapacket.push(item)
        })  
    },  
    updateOrder: function(){
      this.dpCopy = this.datapacket.slice()
      this.dpCopy = this.dpCopy[0]
      for (let j = 0; j < Object.keys(this.datapacket[0]).length; j++){
        if (this.updateNumbers[j]!=null){
          var temp = this.datapacket[0][j];
          this.dpCopy[j]= [temp[0],Number(this.updateNumbers[j]),temp[2]];
        }  
      }
      database.collection('orders').doc(this.id).set(Object.assign({}, this.dpCopy)).then(() => this.$router.push({path: '/Orders'}));
    },  
  },
  created: function(){
    this.fetchItems()
  },
}
</script>

<style>
 h1{
   background-color:#BCC6CC;
   text-align:center;
   padding: 10%;
 }
</style>
