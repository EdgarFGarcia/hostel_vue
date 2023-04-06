<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-select filled dense v-model="chart_type" placeholder="Filter by"
                    :items="['Age', 'Gender', 'User type']" @change="refresh_data"></v-select>
            </v-col>
        </v-row>
        <Bar v-if="loaded" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey" style="width:100%" />
        <Bar v-else :chart-data="chartDataInactive" :chart-id="chartIdInactive" :dataset-id-key="datasetIdKey"
            style="width:100%" />
    </div>
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
        chart_type: 'Age',
        loaded: false,
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Users',
                    backgroundColor: ["#B3CDDE"],
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
    async mounted() {
        this.get_age()
    },
    methods: {
        async refresh_data() {
            if (this.chart_type == "Age") {
                this.get_age()
            }
            if (this.chart_type == "Gender") {
                this.get_gender()
            }
            if (this.chart_type == "User type") {
                this.get_user_type()
            }
        },
        async get_age() {
            this.loaded = false
            this.chartData.datasets[0].data = {}
            await this.$axios.get('/admin/report/analytics_age')
                .then(({ data }) => {
                    var ages_names = ["18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80"]
                    this.chartData.labels = ages_names
                    this.chartData.datasets[0].backgroundColor = ['#B3CDDE']
                    for (var i = 18; i < 90; i++){
                        if (data.data[i] != null) {
                            this.chartData.datasets[0].data[ages_names[i - 18]] = data.data[i].length
                        }
                    }
                    this.loaded = true
                })
        },
        async get_gender() {
            this.loaded = false
            this.chartData.datasets[0].data = {}
            await this.$axios.get('/admin/report/analytics_gender')
                .then(({ data }) => {
                    var genders_name = ['Male', 'Female', 'Non-binary']
                    this.chartData.labels = genders_name
                    this.chartData.datasets[0].backgroundColor = ['pink', '#B3CDDE', 'lightgrey']
                    if (data.data['Female']) {
                        this.chartData.datasets[0].data['Female'] = data.data['Female'].length
                    }
                    if (data.data['Male']) {
                        this.chartData.datasets[0].data['Male'] = data.data['Male'].length
                    }
                    if (data.data['Non-binary']) {
                        this.chartData.datasets[0].data['Non-binary'] = data.data['Non-binary'].length
                    }
                    
                    this.loaded = true
                })
        },
        async get_user_type() {
            this.loaded = false
            this.chartData.datasets[0].data = {}
            await this.$axios.get('/admin/report/analytics_user_type')
                .then(({ data }) => {
                    var type_name = ['Student', 'Vacationer', 'Foreigner']
                    this.chartData.labels = type_name
                    this.chartData.datasets[0].backgroundColor = ['#B3CDDE']
                    if (data.student) {
                        this.chartData.datasets[0].data['Student'] = data.student.length
                    }
                    if (data.vacationer) {
                        this.chartData.datasets[0].data['Vacationer'] = data.vacationer.length
                    }
                    if (data.foreigner) {
                        this.chartData.datasets[0].data['Foreigner'] = data.foreigner.length
                    }
                    this.loaded = true
                })
        },
    },
}
</script>



<style scoped lang="scss">
::v-deep .mx-datepicker input {
    height: 40px;
    background-color: #F0F0F0;
}
</style>