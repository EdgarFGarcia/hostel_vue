<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h2 class="pb-10 ml-5 mr-4">Bookings</h2>
        <v-btn class="mb-9 mr-5" color="#447FA6" dark @click="show_add_data = true">Add Booking</v-btn>
        <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                style="margin-top:-20px;"
                label="Filter by date or date range"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                no-title
                range
                scrollable
            >
            <v-select
                label="Filter by"
                outlined
                dense
                v-model="selected_filter"
                return-object
                :items="[{ text: 'Created', value: 'created_at' }, { text: 'Check-in date', value: 'check_in_date_time' }, { text: 'Check-out date', value: 'will_be_available_at' }]"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="filterDate(date)"
                style="margin-top:-20px;"
            >
                Filter
            </v-btn>
            </v-date-picker>
        </v-menu>
        <v-btn @click="reset_data()" color="primary" text style="margin-top:-20px;">Reset</v-btn>
        <v-row>
            <v-col cols="12">
                <v-card style="border-radius: 16px;padding:20px;" width="100%">
                    <v-data-table :headers="reservation_header" :items="get_reservation_list">
                        <template v-slot:item="{ item }">
                            <tr v-if="!isMobile()" @click="check_details(item)" style="cursor: pointer;height:75px;">
                                <td>
                                    #<small>{{ item.id }}</small>
                                </td>
                                <td>
                                    <small>
                                        {{ moment(item.created_at).format('YYYY-MM-DD') }}
                                        <br>
                                        {{ moment(item.created_at).format('h:mm a') }}
                                    </small>
                                </td>
                                <td>
                                    <b v-if="item.get_room_info" style="font-weight:550;font-size:16px;">{{ item.get_room_info.get_room_parent_information.name }} - {{ item.get_room_info.room_name }}</b>
                                    <b v-else style="font-weight:550;font-size:16px;">Deleted room</b>
                                    <br>
                                    <small>{{ item.get_user.name }} — </small>
                                    <small v-if="item.adult_count == 1">{{ item.adult_count }} adult </small>
                                    <small v-if="item.adult_count > 1">{{ item.adult_count }} adults </small>
                                    <small v-if="item.child_count == 1">and {{ item.child_count }} child</small>
                                    <small v-if="item.child_count > 1">and {{ item.child_count }} children</small>
                                </td>
                                <td>
                                    {{ item.check_in_date_time }} <small class="ml-1 mr-1">—</small> {{ item.will_be_available_at }}
                                </td>
                                <td>
                                    {{ item.payable | currency('₱') }}
                                    <br>
                                    <small class="mr-2"> </small>
                                    <small v-if="item.is_paid">paid</small>
                                    <small v-else>unpaid</small>
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
                                            #<small>{{ item.id }}</small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <small>
                                                {{ moment(item.created_at).format('YYYY-MM-DD') }} - 
                                                {{ moment(item.created_at).format('h:mm a') }}
                                            </small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <b v-if="item.get_room_info" style="font-weight:550;font-size:16px;">{{ item.get_room_info.get_room_parent_information.name }} - {{ item.get_room_info.room_name }}</b>
                                            <b v-else style="font-weight:550;font-size:16px;">Deleted room</b>
                                            <br>
                                            <small>{{ item.get_user.name }} — </small>
                                            <small v-if="item.adult_count == 1">{{ item.adult_count }} adult </small>
                                            <small v-if="item.adult_count > 1">{{ item.adult_count }} adults </small>
                                            <small v-if="item.child_count == 1">and {{ item.child_count }} child</small>
                                            <small v-if="item.child_count > 1">and {{ item.child_count }} children</small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.check_in_date_time }} <small class="ml-1 mr-1">—</small> {{ item.will_be_available_at }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.payable | currency('₱') }}
                                            <br>
                                            <small class="mr-2"> </small>
                                            <small v-if="item.is_paid">paid</small>
                                            <small v-else>unpaid</small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
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
        
        <v-row>
            <v-col cols="8"></v-col>
            <v-col cols="4">
                <download-excel :data="sales" name="booking_sales.xls">
                    <v-btn color="#447FA6" dark>Export Sales</v-btn>
                </download-excel>
            </v-col>
        </v-row>
        
        <v-row justify="center">
            <v-dialog v-model="dialog_room_information" persistent max-width="650">
                <v-card v-if="booking_selected != null">
                    <v-card-title class="text-h5">
                        Booking #{{ booking_selected.id }}
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6" v-if="booking_selected.get_room_info">
                                <v-img style="border-radius:5px;" :src="`${img_src}/images/${booking_selected.get_room_info.get_room_parent_information.image}`" />
                            </v-col>
                            <v-col cols="6" v-else>
                                <v-img style="border-radius:5px;"/>
                            </v-col>
                            <v-col :cols="isMobile() ? 12 : 6">
                                <v-row>
                                    <v-col cols="8" v-if="booking_selected.get_room_info">
                                        <h3 style="font-weight:400;">{{ booking_selected.get_room_info.get_room_parent_information.name }}</h3>
                                        <h4 style="font-weight:400;">{{ booking_selected.get_room_info.room_name }}</h4>
                                    </v-col>
                                    <v-col cols="8" v-else>
                                        <h3 style="font-weight:400;">Deleted room</h3>
                                    </v-col>
                                    <v-col cols="4">
                                        <!--<v-btn small text>View ></v-btn>-->
                                    </v-col>
                                </v-row>
                                
                                <p class="mt-5" style="font-weight:700;margin-bottom:9px;">Booked by</p>
                                
                                <v-row>
                                    <v-col cols="2">
                                        <v-avatar
                                            color="#447FA6"
                                            size="45"
                                            v-if="booking_selected.get_user.image == null"
                                        >
                                            <strong style="font-size: 20px;color:white;text-transform:uppercase;">{{ booking_selected.get_user.name[0] }}</strong>
                                        </v-avatar>
                                        <v-avatar
                                            v-else
                                            color="#447FA6"
                                            size="45"
                                        >
                                            <v-img
                                                :src="`${img_src}/${booking_selected.get_user.image}`"
                                                :aspect-ratio="1"
                                            />
                                        </v-avatar>
                                    </v-col>
                                    <v-col cols="10">
                                        <v-layout align-center style="height:45px;">
                                            <h3 class="ml-2">{{ booking_selected.get_user.name }}</h3>
                                        </v-layout>
                                    </v-col>
                                </v-row>
                                
                                <v-btn class="mt-3" style="margin-left:47px;" small outlined text @click="view_profile(booking_selected)">View Profile ></v-btn>
                            </v-col>
                        </v-row>
                        
                        <v-row>
                            <v-col cols="6">
                                Check-in and check-out:
                            </v-col>
                            <v-col cols="6">
                                <b>{{ booking_selected.check_in_date_time }} to {{ booking_selected.will_be_available_at }} - {{ booking_selected.duration }} day(s)</b>
                            </v-col>
                            <v-col cols="6">
                                Number of guests:
                            </v-col>
                            <v-col cols="6">
                                <b v-if="booking_selected.adult_count == 1">{{ booking_selected.adult_count }} adult </b>
                                <b v-if="booking_selected.adult_count > 1">{{ booking_selected.adult_count }} adults </b>
                                <b v-if="booking_selected.child_count == 1">and {{ booking_selected.child_count }} child</b>
                                <b v-if="booking_selected.child_count > 1">and {{ booking_selected.child_count }} children</b>
                            </v-col>
                            <v-col cols="6">
                                Total Amount:
                            </v-col>
                            <v-col cols="6">
                                <b>{{ booking_selected.payable | currency('₱') }}</b>
                                <small class="ml-3 mr-3">—</small>
                                <b v-if="booking_selected.is_paid">paid</b>
                                <b v-else>unpaid <v-btn class="ml-2" small outlined text @click="mark_as_paid(booking_selected)"><small>Mark as paid</small></v-btn></b>
                            </v-col>
                            <v-col cols="6">
                                PWD/Senior ID:
                            </v-col>
                            <v-col cols="6">
                                <b v-if="booking_selected.get_user.pwd_id">{{ booking_selected.get_user.pwd_id }}</b>
                                <b v-else>None</b>
                            </v-col>
                            <v-col cols="6">
                                Housekeeping:
                            </v-col>
                            <v-col cols="6">
                                <b style="margin-left:-12px;">
                                    <v-btn small text disabled v-if="booking_selected.checked">
                                        <small>Checked</small>
                                    </v-btn>
                                    <v-btn small outlined text v-else-if="booking_selected.to_check == 0" @click="check(booking_selected)">
                                        <small>Request report</small>
                                    </v-btn>
                                    <v-btn small text disabled v-else-if="!booking_selected.checked">
                                        <small>To check</small>
                                    </v-btn>
                                </b>
                            </v-col>
                            <v-col cols="6" v-if="booking_selected.get_additional">
                                Room report:
                            </v-col>
                            <v-col cols="6" v-if="booking_selected.get_additional">
                                <b>
                                    {{ booking_selected.get_additional.reason }}
                                </b>
                            </v-col>
                            <v-col cols="6" v-if="booking_selected.get_additional != null">
                                Additional fees:
                            </v-col>
                            <v-col cols="6" v-if="booking_selected.get_additional != null">
                                <v-btn style="margin-left:-12px;" small outlined text v-if="booking_selected.get_additional.amount_due == 0" @click="charge(booking_selected)">
                                    <small>Charge user</small>
                                </v-btn>
                                <div v-else>
                                    <b>{{ booking_selected.get_additional.amount_due | currency('₱') }}</b>
                                    <small class="ml-3 mr-3">—</small>
                                    <b v-if="booking_selected.get_additional.amount_paid >= booking_selected.get_additional.amount_due">paid</b>
                                    <b v-else>unpaid
                                        <v-btn
                                            class="ml-2"
                                            text small outlined
                                            @click="extra_paid(booking_selected)">
                                            <small>Mark as paid</small>
                                        </v-btn>
                                    </b>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog_room_information = false">
                            Done
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        
        <v-row justify="center">
            <v-dialog v-model="show_profile" persistent max-width="650">
                <v-card v-if="profile != null">
                    <v-card-title class="text-h5">
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="1">
                                <v-avatar
                                    color="#447FA6"
                                    size="60"
                                    v-if="profile.image == null"
                                >
                                    <strong v-if="profile.name" style="font-size: 30px;color:white;text-transform:uppercase;">{{ profile.name[0] }}</strong>
                                </v-avatar>
                                <v-avatar
                                    v-else
                                    color="#447FA6"
                                    size="60"
                                >
                                    <v-img
                                        :src="`${img_src}/${profile.image}`"
                                        :aspect-ratio="1"
                                    />
                                </v-avatar>
                            </v-col>
                            <v-col v-if="!isMobile()" cols="11">
                                <v-layout align-center style="height:60px;">
                                    <h2 class="ml-7">{{ profile.name }}</h2>
                                    <v-spacer/>
                                    <h5 class="ml-7">Member since {{ moment(profile.created_at).format('MMMM D, YYYY') }}</h5>
                                </v-layout>
                            </v-col>
                            <v-col v-else cols="11">
                                <v-layout align-center style="height:60px;">
                                    <h2 class="ml-11">{{ profile.name }}</h2>
                                </v-layout>
                            </v-col>
                            <v-col v-if="isMobile()" cols="12">
                                <h5 class="ml-7">Member since {{ moment(profile.created_at).format('MMMM D, YYYY') }}</h5>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="isMobile() ? 12 : 6">
                                <v-row>
                                    <v-col cols="3">
                                        Status:
                                    </v-col>
                                    <v-col cols="9" style="text-align:right;">
                                        <b v-if="profile.is_guest">Guest</b>
                                        <b v-else>Verified</b>
                                    </v-col>
                                    <v-col cols="3">
                                        Email:
                                    </v-col>
                                    <v-col cols="9" style="text-align:right;">
                                        <b v-if="!profile.is_guest">{{ profile.email }}</b>
                                        <b v-else>N/A</b>
                                    </v-col>
                                    <v-col cols="3">
                                        Mobile:
                                    </v-col>
                                    <v-col cols="9" style="text-align:right;">
                                        <b v-if="profile.mobile">{{ profile.mobile }}</b>
                                        <b v-else>N/A</b>
                                    </v-col>
                                    <v-col cols="3">
                                        Gender:
                                    </v-col>
                                    <v-col cols="9" style="text-align:right;">
                                        <b v-if="profile.gender">{{ profile.gender }}</b>
                                        <b v-else>N/A</b>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col :cols="isMobile() ? 12 : 6">
                                <v-row>
                                    <v-col cols="3">
                                        Age:
                                    </v-col>
                                    <v-col cols="9" style="text-align:right;">
                                        <b v-if="profile.age">{{ profile.age }}</b>
                                        <b v-else>N/A</b>
                                    </v-col>
                                    <v-col cols="4">
                                        Student:
                                    </v-col>
                                    <v-col cols="8" style="text-align:right;">
                                        <b v-if="profile.student">Yes</b>
                                        <b v-else>No</b>
                                    </v-col>
                                    <v-col cols="4">
                                        Vactioner:
                                    </v-col>
                                    <v-col cols="8" style="text-align:right;">
                                        <b v-if="profile.vacationer">Yes</b>
                                        <b v-else>No</b>
                                    </v-col>
                                    <v-col cols="4">
                                        Foreigner:
                                    </v-col>
                                    <v-col cols="8" style="text-align:right;">
                                        <b v-if="profile.foreigner">Yes</b>
                                        <b v-else>No</b>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="show_profile = false">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="show_add_data" persistent max-width="560">
                <v-card>
                    <v-card-title>
                        Add Booking (for use in report)
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col :cols="isMobile() ? 12 : 6">
                                <date-picker placeholder="Date of booking" v-model="selected_day" valueType="format" type="datetime"></date-picker>
                            </v-col>
                            <v-col :cols="isMobile() ? 12 : 6">
                                <v-select
                                    label="User"
                                    outlined
                                    dense
                                    style="margin-top:0px;"
                                    v-model="selected_user"
                                    :items="[{ text: 'John Doe', value: 91 }, { text: 'Jane Doe', value: 92 }, { text: 'Jim Doe', value: 93 }]"
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon small style="position: relative; top:4px;"> mdi-account-school </v-icon> 
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn outlined text @click="show_add_data = false">Cancel</v-btn>
                            <v-btn
                                dark
                                color="#447FA6"
                                @click="add_data()"
                            >
                                Add Data
                            </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="dialog_additional" persistent max-width="560">
                <v-card>
                    <v-card-title class="text-h5">
                        Charge additional for damages, penalties etc.
                    </v-card-title>
                    <v-card-text>
                        <v-text-field placeholder="Amount" v-model="amount_due">
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog_additional = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green darken-1" text @click="confirm_additional_payment()">
                            Confirm additional
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: {
        DatePicker
    },
    props: [
    ],
    data: () => ({
        reservation_header: [
            {
                text: 'ID', value: 'id', sortable: true, width:'1%'
            },
            {
                text: 'Created', sortable: false, width: '10%'
            },
            {
                text: 'Booking Details', sortable: false
            },
            {
                text: 'Check-in and check-out', sortable: false
            },
            {
                text: 'Price', sortable: false
            },
            {
                text: '', sortable: false
            },
        ],
        dialog_room_information: false,
        dialog_additional: false,
        reason: null,
        amount_due: null,
        profile: null,
        show_profile: false,
        booking_selected: null,
        additional_check_in_id: null,
        img_src: null,
        show_add_data: false,
        selected_day: null,
        selected_user: null,
        menu: false,
        date: null,
        sales: [],
        selected_filter: { text: 'Created', value: 'created_at' },
    }),
    async mounted() {
        this.$store.dispatch('admin_reservation/fetch_reservations')
        this.$store.dispatch('admin_reservation/fetch_sales')
        this.set_sales()
        this.open_room_from_outside()
    },
    created() {
        this.img_src = process.env.VUE_APP_URL
    },
    computed: {
        ...mapGetters({
            get_reservation_list: 'admin_reservation/get_reservation_list',
            get_sales: 'admin_reservation/get_sales',
            get_room_information: 'admin_reservation/get_room_information',
            get_selected_room: 'admin_reservation/get_selected_room'
        })
    },
    methods: {
        showSnackBar(message) {
            this.$store.commit("auth/setMessage",
                { show: true, message: message },
                { root: 1 })
        },
        moment: function (time) {
            return moment(time);
        },
        set_sales() {
            for (let i = 0; i < this.get_sales.length; i++){
                this.sales[i] = { User: null, Room: null, Checkin: null, Checkout: null, Amount: null }
                if (this.get_sales[i].get_user) {
                    let user = this.get_sales[i].get_user.name
                    this.sales[i].User = user
                }
                else {
                    this.sales[i].User = "Deleted user"
                }
                if (this.get_sales[i].get_room_info) {
                    let room = this.get_sales[i].get_room_info.room_name
                    this.sales[i].Room = room
                }
                else {
                    this.sales[i].Room = "Deleted room"
                }

                this.sales[i].Checkin = this.get_sales[i].check_in_date_time
                this.sales[i].Checkout = this.get_sales[i].will_be_available_at
                this.sales[i].Amount = this.get_sales[i].payable
            }
            console.log(this.sales)
        },
        reset_data() {
            this.$store.dispatch('admin_reservation/fetch_reservations')
        },
        async filterDate(date) {
            this.menu = false
            console.log(this.selected_filter.value)
            let payload = { start_date: date[0], end_date: date[1], filter_type: this.selected_filter.value }
            console.log(payload)
            await this.$axios.get('admin/reservation/bookings_by_date', payload)
                .then(({ data }) => {
                    console.log(data)
                    this.$store.commit('admin_reservation/set_reservation_list', data.data)
                })
        },
        async add_data() {
            await this.$axios.post('/admin/accounts/add_data', { day: this.selected_day, user: this.selected_user })
                .then(() => {
                    this.showSnackBar("Successfully added")
                    this.show_add_data = false
                })
        },
        open_room_from_outside() {
            if (this.get_selected_room != null) {
                console.log(this.get_selected_room.id)
                this.$axios.get('/admin/reservation/get_room', { check_in_id: this.get_selected_room.id })
                    .then(({ data }) => {
                        console.log(data)
                        this.booking_selected = data.data
                        this.dialog_room_information = true
                        this.$store.dispatch('admin_reservation/set_selected_room', null)
                    })
            }
        },
        view_profile(profile) {
            console.log(profile.get_user)
            this.profile = profile.get_user
            this.dialog_room_information = false
            this.show_profile = true
        },
        async check_details(data) {
            this.booking_selected = data
            this.dialog_room_information = true
        },
        charge(data) {
            this.additional_check_in_id = data.id
            console.log(data.id)
            this.dialog_additional = true
        },
        mark_as_paid(data) {
            this.$axios.post('/admin/reservation/mark_as_paid', {
                check_in_id: data.id
            })
                .then(({ data }) => {
                    this.$store.dispatch('admin_reservation/set_reservations', data.data)
                    this.booking_selected = data.room
                })
        },
        extra_paid(data) {
            console.log(data)
            this.$axios.post('/admin/reservation/extra_paid', {
                check_in_id: data.id,
                amount_due: data.get_additional.amount_due
            })
                .then(({ data }) => {
                    this.$store.dispatch('admin_reservation/set_reservations', data.data)
                    this.booking_selected = data.room
                })
        },
        async check(data) {
            console.log(data)
            await this.$axios.post('/admin/reservation/to_check', {
                check_in_id: data.id
            })
                .then(({ data }) => {
                    this.$store.dispatch('admin_reservation/set_reservations', data.data)
                    this.booking_selected = data.room
                })
        },
        async confirm_additional_payment() {
            await this.$axios.post('/admin/reservation/charge_additional_admin', {
                check_in_id: this.additional_check_in_id,
                amount_due: this.amount_due
            })
                .then(({ data }) => {
                    if (!data.response) {
                        this.showSnackBar(data.message)
                    }
                    else {
                        this.dialog_additional = false
                        this.booking_selected = data.room
                        this.$store.dispatch('admin_reservation/set_reservations', data.data)
                    }
                })
        },
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        },
    },
    watch: {
    }
}
</script>

<style scoped lang="scss">

.v-data-table::v-deep th {
    font-size: 16px !important;
    font-weight: bold;
}
</style>