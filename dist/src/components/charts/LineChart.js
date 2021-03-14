import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: []
        },
        options: {
            legend: { display: true},
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        },
        colors:["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850",'#000000'],
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data.region_metadata.forEach(region => {
                this.datacollection.datasets.push({data:[], label:region.name, borderColor:'',fill:false})
            })
            response.data.items.forEach(reading => {
                this.datacollection.labels.push(reading.timestamp);
                for (let i=0;i<this.datacollection.datasets.length;i++){
                    var temp = Object.values(reading.readings.psi_twenty_four_hourly)[i];
                    this.datacollection.datasets[i].data.push(temp);
                    this.datacollection.datasets[i].borderColor= this.colors[i];
                }
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}