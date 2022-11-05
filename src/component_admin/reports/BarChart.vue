<template>
  <Bar
    v-if="loaded"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    style="width:75%"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
  },
  data: () => ({
    loaded: false,
    chartData: {
        labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        datasets: [
            {
                label: 'Bookings',
                data: {}
            }
        ]
    }
  }),
  async mounted () {
    this.loaded = false

    try {
        
    await this.$axios.get('/admin/r_groups/get_list')
    .then(({data}) => {
        this.$store.dispatch('admin_report/set_pending_data', data.data_pending)
        this.$store.dispatch('admin_report/set_done_data', data.data_done)
        this.$store.dispatch('admin_report/set_cancelled_data', data.data_canceled)
        //this.chartData.datasets[0].data = data.monthly
        //console.log(data.monthly)
        var months = [1,2,3,4,5,6,7,8,9,10,11,12]
        var months_name = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
        months.forEach(i => {
            if(data.monthly[i] != null){
                this.chartData.datasets[0].data[months_name[i - 1]] = data.monthly[i].length
            }
        })
        console.log(this.chartData.datasets[0].data)
    })

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>