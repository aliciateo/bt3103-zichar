<template>
    <div>
        <barchart-dash></barchart-dash>
        <linechart-dash></linechart-dash>
    </div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import LineChart from './charts/LineChart.vue'
  export default {
    name: 'Dashboard',
    data() {
      return{
      }
    },
    components:{
      'barchart-dash':BarChart,
      'linechart-dash':LineChart,
    }
  }
</script>