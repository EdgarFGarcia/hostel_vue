<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h2 class="pb-10 ml-5 mr-4">Bookings</h2>
        <v-row>
            <v-col cols="12">
                <v-card style="border-radius: 16px;padding:20px;" width="100%">
                    <v-data-table :headers="actual_room_header" :items="get_actual_rooms">
                        <template v-slot:item="{ item }">
                            <tr v-if="!isMobile()" @click="check_details(item)" style="cursor: pointer;height:75px;">
                                <td>
                                    <small>#{{ item.id }}</small>
                                </td>
                                <td>
                                    {{ item.room_name }}
                                </td>
                                <td>
                                    <v-btn text>
                                        <small>View ></small>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr v-else @click="check_details(item)" style="cursor: pointer;height:auto;padding-top:10px;padding-bottom:10px;">
                                <td>
                                    <v-row>
                                        <v-col cols="12">
                                            <small>#{{ item.id }}</small>
                                        </v-col>
                                        <v-col cols="12">
                                            {{ item.room_name }}
                                        </v-col>
                                        <v-col cols="12">
                                            <v-btn text>
                                                <small>View ></small>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        
        <v-row justify="center">
            <v-dialog v-model="show_calendar" persistent max-width="500">
                <v-card v-if="actual_room != null">
                    <v-card-title>
                        Booking Calendar for {{ actual_room.room_name }}
                        <v-spacer/>
                        <v-btn outlined text @click="show_calendar = false">Close</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col v-if="!isMobile()" cols="2"></v-col>
                            <v-col cols="7">
                                <DatePicker
                                    v-model="date"
                                    :disabled-dates="disabled_days"
                                    :min-date="new Date().toISOString().substr(0, 10)"
                                />
                            </v-col>
                            <v-col cols="3"></v-col>
                            <v-col cols="12">
                                {{ dates_taken }} bookings
                            </v-col>
                            <v-col cols="12">
                                <v-data-table :sort-by.sync="sortBy"
                                        :sort-desc.sync="sortDesc" :headers="booking_header" :items="bookings">
                                    <template v-slot:item="{ item }">
                                        <tr v-if="!isMobile()" style="height:75px;">
                                            <td>
                                                {{ item.get_user.name }}
                                                <br>
                                                <small>#{{ item.get_user.id }}</small>
                                            </td>
                                            <td>
                                                {{ item.check_in_date_time }}
                                            </td>
                                            <td>
                                                {{ item.will_be_available_at }}
                                            </td>
                                        </tr>
                                        <tr v-else style="height:auto;padding-top:10px;padding-bottom:10px;">
                                            <td>
                                                <v-row>
                                                    <v-col cols="12">
                                                        User: {{ item.get_user.name }}
                                                        <br>
                                                        <small>#{{ item.get_user.id }}</small>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        Check in: {{ item.check_in_date_time }}
                                                    </v-col>
                                                    <v-col cols="12">
                                                        Check out: {{ item.will_be_available_at }}
                                                    </v-col>
                                                </v-row>
                                            </td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { DatePicker } from 'v-calendar';
import moment from 'moment'
export default {
    components: {
        DatePicker
    },
    computed: {
        ...mapGetters({
            get_user: 'auth/get_user',
            get_actual_rooms: 'admin_actual_rooms/get_actual_rooms'
        })
    },
    async mounted() {
        this.$store.dispatch('admin_actual_rooms/fetch_actual_rooms')
    },
    async created() {
    },
    data: () => ({
        actual_room_header: [
            {
                text: 'ID', value: 'id', sortable: true, width: '1%'
            },
            {
                text: 'Room Name', value: 'room_name', sortable: true, width: '50%'
            },
            {
                text: '', sortable: false
            },
        ],
        booking_header: [
            {
                text: 'User', sortable: false
            },
            {
                text: 'Check in', sortable: false
            },
            {
                text: 'Check out', sortable: false
            },
        ],
        sortDesc: true,
        sortBy: 'id',
        date: null,
        disabled_days: null,
        actual_room: null,
        dates_taken: 0,
        bookings: [],
        show_calendar: false
    }),
    methods: {
        showSnackBar(message) {
            this.$store.commit("auth/setMessage",
                { show: true, message: message },
                { root: 1 })
        },
        moment: function (time) {
            return moment(time);
        },
        check_details(item) {
            this.date = null
            this.actual_room = item
            console.log(this.actual_room.id)
            this.$axios.post('/r/rooms/checked_in_dates', this.actual_room.id)
            .then(({ data }) => {
                console.log(data)
                this.disabled_days = []
                this.show_calendar = true
                this.dates_taken = 0
                this.bookings = []
                data.data.forEach((check_in) => {
                    console.log(check_in)
                    this.bookings.push(check_in)
                    this.dates_taken += 1
                    let dates = check_in.check_in_date_time.split(' ')
                    let newdate = parseInt(dates[1].slice(0, -1)) + check_in.duration
                    //let finaldate = dates[0] + ' ' + newdate.toString() + ', ' + dates[2]
                    //let finaldate = new Date(dates[2], '2', newdate.toString())
                    let finaldate = {
                        start: new Date(dates[2], moment().month(dates[0]).format("M") - 1, dates[1].slice(0, -1).toString()),
                        end: new Date(dates[2], moment().month(dates[0]).format("M") - 1, newdate.toString())
                    }
                    this.disabled_days.push(finaldate)
                })
            })
        },
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                console.log("mobile")
                return true
            } else {
                console.log("desktop")
                return false
            }
        },
        
    }

}
</script>

<style lang="scss" scoped>
</style>