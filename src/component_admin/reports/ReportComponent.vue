<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h2 class="pb-10 ml-5 mr-4">Reports</h2>
        <v-row>
            <v-col cols="12">
                <v-card style="border-radius: 16px;padding:20px;" width="100%">
                    
                </v-card>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col
                cols="12"
            >
                <h2>Bookings</h2>
            </v-col>
            <v-col
                cols="12"
            >
                <BarChart/>
            </v-col>
            <v-col
                cols="12"
            >
                <h2>Weekly Revenue</h2>
                <strong>Week Number </strong>
                <date-picker @change="get_weekly" v-model="week" valueType="YYYY w" type="week"></date-picker>
                {{moment(week_start).format('MMM DD, YYYY')}} to {{moment(week_end).format('MMM DD, YYYY')}}
            </v-col>
            
            <v-col
                cols="2"
            >
                <strong>Bunk Bed</strong>
            </v-col>
            <v-col
                cols="7"
            >
                <v-data-table
                    :headers="weekly_table_headers"
                    :items="weekly_room_1"
                    hide-default-footer
                    class="elevation-1"
                >
                    <template v-slot:item="{item}">
                        <tr>
                            <td>
                                {{item.Header}}
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Sunday}}</div><div v-else>{{item.Sunday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Monday}}</div><div v-else>{{item.Monday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Tuesday}}</div><div v-else>{{item.Tuesday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Wednesday}}</div><div v-else>{{item.Wednesday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Thursday}}</div><div v-else>{{item.Thursday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Friday}}</div><div v-else>{{item.Friday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Saturday}}</div><div v-else>{{item.Saturday}}</div>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
            <v-col cols="3"></v-col>
            
            <v-col
                cols="2"
            >
                <strong>One Bedroom Suites</strong>
            </v-col>
            <v-col
                cols="7"
            >
                <v-data-table
                    :headers="weekly_table_headers"
                    :items="weekly_room_2"
                    hide-default-footer
                    class="elevation-1"
                >
                    <template v-slot:item="{item}">
                        <tr>
                            <td>
                                {{item.Header}}
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Sunday}}</div><div v-else>{{item.Sunday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Monday}}</div><div v-else>{{item.Monday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Tuesday}}</div><div v-else>{{item.Tuesday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Wednesday}}</div><div v-else>{{item.Wednesday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Thursday}}</div><div v-else>{{item.Thursday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Friday}}</div><div v-else>{{item.Friday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Saturday}}</div><div v-else>{{item.Saturday}}</div>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
            <v-col cols="3"></v-col>
            
            <v-col
                cols="2"
            >
                <strong>Standard Double Room</strong>
            </v-col>
            <v-col
                cols="7"
            >
                <v-data-table
                    :headers="weekly_table_headers"
                    :items="weekly_room_3"
                    hide-default-footer
                    class="elevation-1"
                >
                    <template v-slot:item="{item}">
                        <tr>
                            <td>
                                {{item.Header}}
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Sunday}}</div><div v-else>{{item.Sunday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Monday}}</div><div v-else>{{item.Monday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Tuesday}}</div><div v-else>{{item.Tuesday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Wednesday}}</div><div v-else>{{item.Wednesday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Thursday}}</div><div v-else>{{item.Thursday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Friday}}</div><div v-else>{{item.Friday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Saturday}}</div><div v-else>{{item.Saturday}}</div>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
            <v-col cols="3"></v-col>
            
            <v-col
                cols="2"
            >
                <strong>Deluxe Double Room</strong>
            </v-col>
            <v-col
                cols="7"
            >
                <v-data-table
                    :headers="weekly_table_headers"
                    :items="weekly_room_4"
                    hide-default-footer
                    class="elevation-1"
                >
                    <template v-slot:item="{item}">
                        <tr>
                            <td>
                                {{item.Header}}
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Sunday}}</div><div v-else>{{item.Sunday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Monday}}</div><div v-else>{{item.Monday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Tuesday}}</div><div v-else>{{item.Tuesday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Wednesday}}</div><div v-else>{{item.Wednesday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Thursday}}</div><div v-else>{{item.Thursday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Friday}}</div><div v-else>{{item.Friday}}</div>
                            </td>
                            <td>
                                <div v-if="item.Header == 'Amount'">₱{{item.Saturday}}</div><div v-else>{{item.Saturday}}</div>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
            <v-col cols="3"></v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './BarChart'
import moment from 'moment'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  components: {
    BarChart,
    DatePicker
  },
  props: [
  ],
  data: () => ({
    tab: null,
    status: [
        {
            id:     1,
            name:   'Pending'
        },
        {
            id:     2,
            name:   'Done'
        },
        {
            id:     3,
            name:   'Cancelled'
        }
    ],
    table_headers: [
        {
            text: 'Name'
        },
        {
            text: 'Duration'
        },
        {
            text: 'Check In Date'
        },
        {
            text: 'Check Out Date'
        },
        {
            text: 'Created At'
        }
    ],
    weekly_table_headers: [
        {
            text: '',
            sortable: false
        },
        {
            text: 'Monday',
            sortable: false
        },
        {
            text: 'Tuesday',
            sortable: false
        },
        {
            text: 'Wednesday',
            sortable: false
        },
        {
            text: 'Thursday',
            sortable: false
        },
        {
            text: 'Friday',
            sortable: false
        },
        {
            text: 'Saturday',
            sortable: false
        },
        {
            text: 'Sunday',
            sortable: false
        }
    ],
    date: [],
    menu1: false,
    dates: [],
    menu2: false,
    date3: [],
    menu3: false,
    week: moment().format('YYYY w'),
    week_start: null,
    week_end: null,
    weekly_room_1: [{ Header: 'Amount', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }, { Header: 'People', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 } ],
    weekly_room_2: [{ Header: 'Amount', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }, { Header: 'People', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 } ],
    weekly_room_3: [{ Header: 'Amount', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }, { Header: 'People', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 } ],
    weekly_room_4: [{ Header: 'Amount', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }, { Header: 'People', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 } ],
  }),
  async mounted () {
    await this.$axios.get('/admin/r_groups/get_list')
    .then(({data}) => {
        this.$store.dispatch('admin_report/set_pending_data', data.data_pending)
        this.$store.dispatch('admin_report/set_done_data', data.data_done)
        this.$store.dispatch('admin_report/set_cancelled_data', data.data_canceled)
    }),
    this.get_weekly()
  },
  created () {
  },
  computed: {
    ...mapGetters({
        // get_pending_data:           'admin_report/get_pending_data',
        // get_done_data:              'admin_report/get_done_data',
        // get_cancelled_data:         'admin_report/get_cancelled_data'
    }),
    get_pending_data(){
        return this.$store.getters['admin_report/get_pending_data'](this.date)
    },
    get_done_data(){
        return this.$store.getters['admin_report/get_done_data'](this.dates)
    },
    get_cancelled_data(){
        return this.$store.getters['admin_report/get_cancelled_data'](this.date3)
    }
  },
  methods: {
    moment: function (time) {
        return moment(time);
    },
    async get_weekly() {
        await this.$axios.get('/admin/r_groups/get_weekly', this.week)
        .then(({data}) => {
            this.weekly_room_1 = [{ Header: 'Amount', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }, { Header: 'People', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 } ]
            this.weekly_room_2 = [{ Header: 'Amount', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }, { Header: 'People', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 } ]
            this.weekly_room_3 = [{ Header: 'Amount', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }, { Header: 'People', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 } ]
            this.weekly_room_4 = [{ Header: 'Amount', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }, { Header: 'People', Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 } ]
            console.log(data)
            this.week_start = data.week_start
            this.week_end = data.week_end
            if (data.weekly_room['Bunk Bed'] != null) {
                for (let i = 0; i < data.weekly_room['Bunk Bed'].length; i++) {
                    if (moment(data.weekly_room['Bunk Bed'][i].created_at).format('dddd') == 'Sunday') {
                        this.weekly_room_1[0].Sunday += data.weekly_room['Bunk Bed'][i].payable
                        this.weekly_room_1[1].Sunday += 1
                    }
                    if (moment(data.weekly_room['Bunk Bed'][i].created_at).format('dddd') == 'Monday') {
                        this.weekly_room_1[0].Monday += data.weekly_room['Bunk Bed'][i].payable
                        this.weekly_room_1[1].Monday += 1
                    }
                    if (moment(data.weekly_room['Bunk Bed'][i].created_at).format('dddd') == 'Tuesday') {
                        this.weekly_room_1[0].Tuesday += data.weekly_room['Bunk Bed'][i].payable
                        this.weekly_room_1[1].Tuesday += 1
                    }
                    if (moment(data.weekly_room['Bunk Bed'][i].created_at).format('dddd') == 'Wednesday') {
                        this.weekly_room_1[0].Wednesday += data.weekly_room['Bunk Bed'][i].payable
                        this.weekly_room_1[1].Wednesday += 1
                    }
                    if (moment(data.weekly_room['Bunk Bed'][i].created_at).format('dddd') == 'Thursday') {
                        this.weekly_room_1[0].Thursday += data.weekly_room['Bunk Bed'][i].payable
                        this.weekly_room_1[1].Thursday += 1
                    }
                    if (moment(data.weekly_room['Bunk Bed'][i].created_at).format('dddd') == 'Friday') {
                        this.weekly_room_1[0].Friday += data.weekly_room['Bunk Bed'][i].payable
                        this.weekly_room_1[1].Friday += 1
                    }
                    if (moment(data.weekly_room['Bunk Bed'][i].created_at).format('dddd') == 'Saturday') {
                        this.weekly_room_1[0].Saturday += data.weekly_room['Bunk Bed'][i].payable
                        this.weekly_room_1[1].Saturday += 1
                    }
                }
            }
            if (data.weekly_room['One Bedroom Suites'] != null) {
                for (let i = 0; i < data.weekly_room['One Bedroom Suites'].length; i++) {
                    if (moment(data.weekly_room['One Bedroom Suites'][i].created_at).format('dddd') == 'Sunday') {
                        this.weekly_room_2[0].Sunday += data.weekly_room['One Bedroom Suites'][i].payable
                        this.weekly_room_2[1].Sunday += 1
                    }
                    if (moment(data.weekly_room['One Bedroom Suites'][i].created_at).format('dddd') == 'Monday') {
                        this.weekly_room_2[0].Monday += data.weekly_room['One Bedroom Suites'][i].payable
                        this.weekly_room_2[1].Monday += 1
                    }
                    if (moment(data.weekly_room['One Bedroom Suites'][i].created_at).format('dddd') == 'Tuesday') {
                        this.weekly_room_2[0].Tuesday += data.weekly_room['One Bedroom Suites'][i].payable
                        this.weekly_room_2[1].Tuesday += 1
                    }
                    if (moment(data.weekly_room['One Bedroom Suites'][i].created_at).format('dddd') == 'Wednesday') {
                        this.weekly_room_2[0].Wednesday += data.weekly_room['One Bedroom Suites'][i].payable
                        this.weekly_room_2[1].Wednesday += 1
                    }
                    if (moment(data.weekly_room['One Bedroom Suites'][i].created_at).format('dddd') == 'Thursday') {
                        this.weekly_room_2[0].Thursday += data.weekly_room['One Bedroom Suites'][i].payable
                        this.weekly_room_2[1].Thursday += 1
                    }
                    if (moment(data.weekly_room['One Bedroom Suites'][i].created_at).format('dddd') == 'Friday') {
                        this.weekly_room_2[0].Friday += data.weekly_room['One Bedroom Suites'][i].payable
                        this.weekly_room_2[1].Friday += 1
                    }
                    if (moment(data.weekly_room['One Bedroom Suites'][i].created_at).format('dddd') == 'Saturday') {
                        this.weekly_room_2[0].Saturday += data.weekly_room['One Bedroom Suites'][i].payable
                        this.weekly_room_2[1].Saturday += 1
                    }
                }
            }
            if (data.weekly_room['Standard Double Room'] != null) {
                for (let i = 0; i < data.weekly_room['Standard Double Room'].length; i++) {
                    if (moment(data.weekly_room['Standard Double Room'][i].created_at).format('dddd') == 'Sunday') {
                        this.weekly_room_3[0].Sunday += data.weekly_room['Standard Double Room'][i].payable
                        this.weekly_room_3[1].Sunday += 1
                    }
                    if (moment(data.weekly_room['Standard Double Room'][i].created_at).format('dddd') == 'Monday') {
                        this.weekly_room_3[0].Monday += data.weekly_room['Standard Double Room'][i].payable
                        this.weekly_room_3[1].Monday += 1
                    }
                    if (moment(data.weekly_room['Standard Double Room'][i].created_at).format('dddd') == 'Tuesday') {
                        this.weekly_room_3[0].Tuesday += data.weekly_room['Standard Double Room'][i].payable
                        this.weekly_room_3[1].Tuesday += 1
                    }
                    if (moment(data.weekly_room['Standard Double Room'][i].created_at).format('dddd') == 'Wednesday') {
                        this.weekly_room_3[0].Wednesday += data.weekly_room['Standard Double Room'][i].payable
                        this.weekly_room_3[1].Wednesday += 1
                    }
                    if (moment(data.weekly_room['Standard Double Room'][i].created_at).format('dddd') == 'Thursday') {
                        this.weekly_room_3[0].Thursday += data.weekly_room['Standard Double Room'][i].payable
                        this.weekly_room_3[1].Thursday += 1
                    }
                    if (moment(data.weekly_room['Standard Double Room'][i].created_at).format('dddd') == 'Friday') {
                        this.weekly_room_3[0].Friday += data.weekly_room['Standard Double Room'][i].payable
                        this.weekly_room_3[1].Friday += 1
                    }
                    if (moment(data.weekly_room['Standard Double Room'][i].created_at).format('dddd') == 'Saturday') {
                        this.weekly_room_3[0].Saturday += data.weekly_room['Standard Double Room'][i].payable
                        this.weekly_room_3[1].Saturday += 1
                    }
                }
            }
            if (data.weekly_room['Deluxe Double Room'] != null) {
                for (let i = 0; i < data.weekly_room['Deluxe Double Room'].length; i++) {
                    if (moment(data.weekly_room['Deluxe Double Room'][i].created_at).format('dddd') == 'Sunday') {
                        this.weekly_room_4[0].Sunday += data.weekly_room['Deluxe Double Room'][i].payable
                        this.weekly_room_4[1].Sunday += 1
                    }
                    if (moment(data.weekly_room['Deluxe Double Room'][i].created_at).format('dddd') == 'Monday') {
                        this.weekly_room_4[0].Monday += data.weekly_room['Deluxe Double Room'][i].payable
                        this.weekly_room_4[1].Monday += 1
                    }
                    if (moment(data.weekly_room['Deluxe Double Room'][i].created_at).format('dddd') == 'Tuesday') {
                        this.weekly_room_4[0].Tuesday += data.weekly_room['Deluxe Double Room'][i].payable
                        this.weekly_room_4[1].Tuesday += 1
                    }
                    if (moment(data.weekly_room['Deluxe Double Room'][i].created_at).format('dddd') == 'Wednesday') {
                        this.weekly_room_4[0].Wednesday += data.weekly_room['Deluxe Double Room'][i].payable
                        this.weekly_room_4[1].Wednesday += 1
                    }
                    if (moment(data.weekly_room['Deluxe Double Room'][i].created_at).format('dddd') == 'Thursday') {
                        this.weekly_room_4[0].Thursday += data.weekly_room['Deluxe Double Room'][i].payable
                        this.weekly_room_4[1].Thursday += 1
                    }
                    if (moment(data.weekly_room['Deluxe Double Room'][i].created_at).format('dddd') == 'Friday') {
                        this.weekly_room_4[0].Friday += data.weekly_room['Deluxe Double Room'][i].payable
                        this.weekly_room_4[1].Friday += 1
                    }
                    if (moment(data.weekly_room['Deluxe Double Room'][i].created_at).format('dddd') == 'Saturday') {
                        this.weekly_room_4[0].Saturday += data.weekly_room['Deluxe Double Room'][i].payable
                        this.weekly_room_4[1].Saturday += 1
                    }
                }
            }
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>