<template>
    <v-container fill-height fluid class="pa-0 ma-0">
        <v-tabs
            v-model="tab"
            grow
            dark
            color="basil"
            background-color="deep-purple accent-4"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="service in status"
            :key="service.id"
            :href="`#tab-${service.id}`"
          >
            <label
                style="color: white;"
            >
                {{ service.name }}
            </label>
          </v-tab>
        </v-tabs>
        <v-tabs-items 
            v-model="tab"
            class="mt-5 justify-center align-center"
            style="width: 100%;"
        >
            <v-tab-item
                value="tab-1"
            >
                <v-row>
                    <v-col
                        cols="12"
                    >
                        <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    label="Picker without buttons"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                range
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-data-table
                    :headers="table_headers"
                    :items="get_pending_data"
                    class="elevation-1"
                >
                    <template v-slot:item="{item}">
                        <tr>
                            <td>
                                {{item.get_user.name}}
                            </td>
                            <td>
                                {{item.duration}} Day(s)
                            </td>
                            <td>
                                {{item.check_in_date_time}} 
                            </td>
                            <td>
                                {{item.will_be_available_at}}
                            </td>
                            <td>
                                {{moment(item.created_at).format("MMM DD, YYYY")}}
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-tab-item>
        </v-tabs-items>
        <v-tabs-items 
            v-model="tab"
            class="mt-5 justify-center align-center"
            style="width: 100%;"
        >
            <v-tab-item
                value="tab-2"
            >
                <v-row>
                    <v-col
                        cols="12"
                    >
                        <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dates"
                                label="Select Date Range"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                dense
                            ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="dates"
                                range
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-data-table
                    :headers="table_headers"
                    :items="get_done_data"
                    class="elevation-1"
                >
                    <template v-slot:item="{item}">
                        <tr>
                            <td>
                                {{item.get_user.name}}
                            </td>
                            <td>
                                {{item.duration}} Day(s)
                            </td>
                            <td>
                                {{item.check_in_date_time}} 
                            </td>
                            <td>
                                {{item.will_be_available_at}}
                            </td>
                            <td>
                                {{moment(item.created_at).format("MMM DD, YYYY")}}
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-tab-item>
        </v-tabs-items>
        <v-tabs-items 
            v-model="tab"
            class="mt-5 justify-center align-center"
            style="width: 100%;"
        >
            <v-tab-item
                value="tab-3"
            >
                <v-row>
                    <v-col
                        cols="12"
                    >
                        <v-menu
                            v-model="menu3"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date3"
                                label="Select Date Range"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                dense
                            ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date3"
                                range
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-data-table
                    :headers="table_headers"
                    :items="get_cancelled_data"
                    class="elevation-1"
                >
                    <template v-slot:item="{item}">
                        <tr>
                            <td>
                                {{item.get_user.name}}
                            </td>
                            <td>
                                {{item.duration}} Day(s)
                            </td>
                            <td>
                                {{item.check_in_date_time}} 
                            </td>
                            <td>
                                {{item.will_be_available_at}}
                            </td>
                            <td>
                                {{moment(item.created_at).format("MMM DD, YYYY")}}
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-tab-item>
        </v-tabs-items>
        <v-row>
            <v-col
                cols="12"
            >
                <h2>Monthly Bookings</h2>
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
            </v-col>
            <v-col
                cols="9"
            >
                <div
                    v-for="(day, index) in get_weekly"
                    :key="index"
                    class="mb-5"
                >
                    <div
                        v-for="(data, index) in day"
                        :key="index"
                        class="mb-5"
                    >
                        {{data.payable}}
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './BarChart'
import moment from 'moment'
export default {
  components: {
    BarChart
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
            text: 'Room'
        },
        {
            text: 'Sunday'
        },
        {
            text: 'Monday'
        },
        {
            text: 'Tuesday'
        },
        {
            text: 'Wednesday'
        },
        {
            text: 'Thursday'
        },
        {
            text: 'Friday'
        },
        {
            text: 'Saturday'
        }
    ],
    date: [],
    menu1: false,
    dates: [],
    menu2: false,
    date3: [],
    menu3: false,
    get_weekly: []
  }),
  async mounted () {
    await this.$axios.get('/admin/r_groups/get_list')
    .then(({data}) => {
        this.$store.dispatch('admin_report/set_pending_data', data.data_pending)
        this.$store.dispatch('admin_report/set_done_data', data.data_done)
        this.$store.dispatch('admin_report/set_cancelled_data', data.data_canceled)
    }),
    await this.$axios.get('/admin/r_groups/get_weekly')
    .then(({data}) => {
        this.get_weekly = data.weekly_room_1
        console.log(this.get_weekly)
    })
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
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>