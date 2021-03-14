import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Dishes Popularity",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850",'#000000'],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false
        },
        rawOrders: [],
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
          if (doc.id != null){
            this.rawOrders.push(doc.data())
          }
        })
        this.process();
        this.renderChart(this.datacollection, this.options)
      })
    },
    process: function(){
        for (let i = 0; i < Object.keys(this.rawOrders).length; i++){
          for (let j = 0; j < Object.keys(this.rawOrders[0]).length; j++){
            for (let k = 0; k < this.datacollection.labels.length;k++){
              if (this.datacollection.labels[k] == Object.values(this.rawOrders[i])[j][0]){
                this.datacollection.datasets[0].data[k]+=Object.values(this.rawOrders[i])[j][1];
                break;
                }
            }
            if (i<1){
              this.datacollection.labels.push(Object.values(this.rawOrders[i])[j][0]);
              this.datacollection.datasets[0].data.push(Object.values(this.rawOrders[i])[j][1]);
            } 
          }   
        }
      }
    },
  created () {
    this.fetchItems()
    this.process()
  }
}
