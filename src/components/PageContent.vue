<template>
  <div id="PC">
    <div id="content">
      <ul>
      <li v-for="item in this.items" :key="item.name">
          <p id="itemName">{{item.name}}</p>
          <img v-bind:src="item.imageURL">
          <p id="price">$ {{item.price}}</p>
          <qc v-bind:item="item" v-on:counter="onCounter"></qc>
        </li>
      </ul>      
    </div>
    <div id="nav">
      <basket v-bind:bkt="itemsSelected" v-bind:items="items"></basket>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import basket from './Basket.vue'
import database from '../firebase.js'
import QC from './QuantityCounter.vue'
Vue.component('basket',basket)
Vue.component('database',database)
Vue.component('qc',QC)
export default {
  name: 'PC',
  data(){
    return{
      itemsSelected:[],
      items:[],
    }
  },
  components:{
    'basket':basket,
    'qc':QC,
  },
  methods:{
    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {

        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item_name == item.name && count>0){
            this.itemsSelected.splice(i,1);
            this.itemsSelected.push([item.name, count, item.price]);
            return;
          }
          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          else if (item_name ==item.name && count==0){
            this.itemsSelected.splice(i,1);
            return;
          }
          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
          else if (i==this.itemsSelected.length-1 && item_name !=item.name){
            this.itemsSelected.push([item.name, count, item.price]);
            return;
          }          
        }
      }
    },
    fetchItems: function(){
      database.collection('menu').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.id=doc.id
            this.items.push(item) 
            })      
        })    
    },
  },
  created: function(){
    this.fetchItems()
  },
}
</script>

<style scoped> 
#itemsList { 
  width: 78%; 
  max-width: 70%; 
  margin: 0px; 
  padding: 0 5px; 
  box-sizing: border-box; 
} 
ul { 
  display: flex; 
  flex-wrap: wrap; 
  list-style-type: none; 
  padding: 0; 
  width: 78%; 
} 
li { 
  flex-grow: 1; 
  flex-basis: 300px; 
  text-align: center; 
  padding: 10px; 
  border: 1px solid #222; 
  margin: 10px; 
} 
img { 
  width: 200px; 
  height: 200px; 
} 
 
#price { 
  font-size: 30px; 
} 
 
#itemName { 
  font-size: 30px; 
} 
 
nav{
  padding-top: 0px;
  float: right;
  width: 25%;
  background: white;
  padding-right: 20px;
  height: 10px; 
  top:10% ;
}
#content {
  float: left;
  padding: 20px;
  width: 75%;
  background-color: white;
  height: 700px;
  
}

</style>


