<template>
  <div>
    <strong>Year </strong>
    <date-picker v-model="year" @change="pick_year" valueType="format" type="year"></date-picker>
    <Bar
      v-if="loaded"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      style="width:75%"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import moment from 'moment'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar, DatePicker },
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
    year: moment().format('YYYY'),
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
  methods: {
    async pick_year() {
      this.loaded = false
      this.chartData.datasets[0].data = {}
      console.log(this.year)
      await this.$axios.get('/admin/r_groups/get_list', this.year)
      .then(({data}) => {
        console.log(data)
        this.loaded = true
          var months = [1,2,3,4,5,6,7,8,9,10,11,12]
          var months_name = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
          months.forEach(i => {
              if(data.monthly[i] != null){
                  this.chartData.datasets[0].data[months_name[i - 1]] = data.monthly[i].length
              }
          })
      })
      }
  },
  async mounted () {
    this.loaded = false
    try {
        
    await this.$axios.get('/admin/r_groups/get_list', this.year)
    .then(({data}) => {
        var months = [1,2,3,4,5,6,7,8,9,10,11,12]
        var months_name = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
        months.forEach(i => {
            if(data.monthly[i] != null){
                this.chartData.datasets[0].data[months_name[i - 1]] = data.monthly[i].length
            }
        })
    })

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>