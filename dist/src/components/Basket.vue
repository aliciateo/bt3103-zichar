<template>
  <div id="basket">
    <p> Menu:</p>
    <ul>
      <span v-for="i in bkt" v-bind:key="i.id">
        <li class="bullet"> {{i[0]}} x {{i[1]}}</li>
        {{items[0][0]}}
        <br>
      </span>
    </ul>
    <button v-on:click="findTotal(); sendOrders();">Calculate Total</button>
    <p> Subtotal: ${{subtotal}} </p>
    <p> Grandtotal: ${{grandtotal}} </p>
    
  </div>
  
</template>

<script>
import Vue from 'vue'
import database from '../firebase.js'
Vue.component('database',database)
export default {
  name: 'basket',
  props:{
    bkt: {
      type: Array,
    },
    items: {
      type: Array,
    },
  },
  data(){
    return{
      subtotal:0,
      grandtotal:0,
      fullbkt:[],

    }
  },
  methods:{
    findTotal: function(){
      var i;
      this.subtotal=0;
      this.grandtotal=0;
      for(i=0;i<this.bkt.length;i++){
        this.subtotal += this.bkt[i][1]*this.bkt[i][2];
      }
      this.grandtotal= (this.subtotal*1.07).toFixed(2);
    },
    sendOrders: function() {
      this.fullbkt = this.bkt.slice();
      for (let i = 0; i < this.items.length; i++) {
        var found = false;
        for (let j = 0; j < this.fullbkt.length; j++) {
          if(this.items[i].name == this.fullbkt[j][0] ){
            found = true;
          }
          if(!found && j==this.bkt.length-1){
            this.fullbkt.push([this.items[i].name,0,this.items[i].price]);
          }
        }
      }
      database.collection('orders').add(Object.assign({}, this.fullbkt)).then(() => location.reload());
    }
  },
}
</script>
<style>
  .bullet {
    list-style-type: disc;
    flex-grow: 1;
    flex-basis: 300px;
    text-align: left;
    padding: 10px;
    border: 0px solid #222;
    margin: 10px;
    color: black;
    height:20px;
    width:200px;
  }
  .notes {
    width:200px;
  }
button {
  width: 550px;
  height: 160px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>
