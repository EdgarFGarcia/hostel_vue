<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-select filled dense v-model="chart_type" :items="['Year', 'Month', 'Week', 'Day']" @change="refresh_data"></v-select>
      </v-col>
      <v-col cols="6">
        <date-picker style="width:100%;" v-if="chart_type == 'Year'" v-model="year" @change="pick_year" valueType="format"
          type="year"></date-picker>
        <date-picker style="width:100%;" v-if="chart_type == 'Month'" v-model="month" @change="pick_month" valueType="format"
          type="month"></date-picker>
        <date-picker style="width:100%;" v-if="chart_type == 'Week'" v-model="week" @change="pick_week" valueType="format"
          type="week"></date-picker>
        <date-picker style="width:100%;" v-if="chart_type == 'Day'" v-model="day" @change="pick_day" valueType="format"
          type="day"></date-picker>
      </v-col>
    </v-row>
    <Bar v-if="loaded" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey" style="width:100%" />
    <Bar v-else :chart-data="chartDataInactive" :chart-id="chartIdInactive" :dataset-id-key="datasetIdKey" style="width:100%" />
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
    chartIdInactive: {
      type: String,
      default: 'bar-chart-inactive'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
  },
  data: () => ({
    year: moment().format('YYYY'),
    month: moment().format('YYYY-MM'),
    week: moment().format('w'),
    day: moment().format('YYYY-MM-DD'),
    chart_type: 'Year',
    loaded: false,
    chartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Bookings',
          data: {}
        }
      ]
    },
    chartDataInactive: {
      labels: [''],
      datasets: [
        {
          label: '',
          data: {}
        }
      ]
    }
  }),
  methods: {
    async refresh_data() {
      if (this.chart_type == "Year") {
        this.pick_year()
      }
      if (this.chart_type == "Month") {
        this.pick_month()
      }
      if (this.chart_type == "Week") {
        this.pick_week()
      }
      if (this.chart_type == "Day") {
        this.pick_day()
      }
    },
    async pick_year() {
      this.loaded = false
      this.chartData.datasets[0].data = {}
      await this.$axios.get('/admin/report/report_yearly', this.year)
        .then(({ data }) => {
          var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          var months_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          this.chartData.labels = months_name
          months.forEach(i => {
            if (data.data[i] != null) {
              this.chartData.datasets[0].data[months_name[i - 1]] = data.data[i].length
            }
          })
          this.loaded = true
        })
    },
    async pick_month() {
      this.loaded = false
      this.chartData.datasets[0].data = {}
      await this.$axios.get('/admin/report/report_monthly', this.month.substring(5))
        .then(({ data }) => {
          var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
          var days_name = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
          this.chartData.labels = days_name
          days.forEach(i => {
            if (data.data[i] != null) {
              this.chartData.datasets[0].data[days_name[i - 1]] = data.data[i].length
            }
          })
          this.loaded = true
        })
    },
    async pick_week() {
      this.loaded = false
      this.chartData.datasets[0].data = {}
      await this.$axios.get('/admin/report/report_weekly', this.week)
        .then(({ data }) => {
          var days = [0, 1, 2, 3, 4, 5, 6]
          var days_name = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          this.chartData.labels = days_name
          days.forEach(i => {
            if (data.data[i] != null) {
              this.chartData.datasets[0].data[days_name[i]] = data.data[i].length
            }
          })
          this.loaded = true
        })
    },
    async pick_day() {
      this.loaded = false
      this.chartData.datasets[0].data = {}
      await this.$axios.get('/admin/report/report_daily', this.day.substring(8))
        .then(({ data }) => {
          var days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
          var days_name = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM']
          this.chartData.labels = days_name
          days.forEach(i => {
            if (data.data[i] != null) {
              this.chartData.datasets[0].data[days_name[i]] = data.data[i].length
            }
          })
          this.loaded = true
        })
    }
  },
  async mounted() {
    this.loaded = false
    try {
      await this.$axios.get('/admin/report/report_yearly', this.year)
        .then(({ data }) => {
          var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          var months_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          months.forEach(i => {
            if (data.data[i] != null) {
              this.chartData.datasets[0].data[months_name[i - 1]] = data.data[i].length
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



<style scoped lang="scss">
::v-deep .mx-datepicker input {
  height: 40px;
  background-color: #F0F0F0;
}
</style>