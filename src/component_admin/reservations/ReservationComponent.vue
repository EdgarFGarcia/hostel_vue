<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h2 class="pb-10">Bookings</h2>
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="reservation_header" :items="get_reservation_list" class="elevation-1">
                    <template v-slot:item="{ item }">
                        <tr v-if="item.get_room_info" @click="check_details(item)" style="cursor: pointer;">
                            <td>
                                <small>
                                    {{ moment(item.created_at).format('YYYY-MM-DD') }}
                                    <br>
                                    {{ moment(item.created_at).format('h:mm a') }}
                                </small>
                            </td>
                            <td>
                                {{ item.get_room_info.get_room_parent_information.name }} - {{ item.get_room_info.room_name }}
                                <br>
                                <small>{{ item.get_user.name }} — </small>
                                <small v-if="item.adult_count == 1">{{ item.adult_count }} adult </small>
                                <small v-if="item.adult_count > 1">{{ item.adult_count }} adults </small>
                                <small v-if="item.child_count == 1">and {{ item.child_count }} child</small>
                                <small v-if="item.child_count > 1">and {{ item.child_count }} children</small>
                            </td>
                            <td>
                                {{ item.check_in_date_time }} to {{ item.will_be_available_at }}
                            </td>
                            <td>
                                {{ item.payable | currency('₱') }}
                                <br>
                                <small v-if="item.is_paid">paid</small>
                                <small v-else>unpaid</small>
                            </td>
                            <td>
                                <v-btn text>
                                    <small>View ></small>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        
        <v-row justify="center">
            <v-dialog v-model="dialog_room_information" persistent max-width="650">
                <v-card v-if="booking_selected != null">
                    <v-card-title class="text-h5">
                        Booking Details
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-img style="border-radius:5px;" :src="`${img_src}/images/${booking_selected.get_room_info.get_room_parent_information.image}`" />
                            </v-col>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="8">
                                        <h3 style="font-weight:400;">{{ booking_selected.get_room_info.get_room_parent_information.name }}</h3>
                                        <h4 style="font-weight:400;">{{ booking_selected.get_room_info.room_name }}</h4>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn small text>View ></v-btn>
                                    </v-col>
                                </v-row>
                                
                                <p class="mt-5" style="font-weight:700;margin-bottom:9px;">Booked by</p>
                                
                                <v-row>
                                    <v-col cols="2">
                                        <v-avatar
                                            color="grey"
                                            size="45"
                                            v-if="booking_selected.get_user.image == null"
                                        >
                                            <strong style="fontsize: 20px;color:white;">{{ booking_selected.get_user.name[0] }}</strong>
                                        </v-avatar>
                                        <v-avatar
                                            v-else
                                            color="grey"
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
                                
                                <v-btn class="mt-3" style="margin-left:47px;" small text>View Profile ></v-btn>
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
                                <b v-else>unpaid <v-btn class="ml-2" small text @click="mark_as_paid(booking_selected)"><small>Mark as paid</small></v-btn></b>
                            </v-col>
                            <v-col cols="6">
                                Housekeeping:
                            </v-col>
                            <v-col cols="6">
                                <b style="margin-left:-12px;">
                                    <v-btn small text disabled v-if="booking_selected.checked">
                                        <small>Checked</small>
                                    </v-btn>
                                    <v-btn small text v-else-if="booking_selected.to_check == 0" @click="check(booking_selected)">
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
                                <v-btn style="margin-left:-12px;" small text v-if="booking_selected.get_additional.amount_due == 0" @click="charge(booking_selected)">
                                    <small>Charge user</small>
                                </v-btn>
                                <div v-else>
                                    <b>{{ booking_selected.get_additional.amount_due | currency('₱') }}</b>
                                    <small class="ml-3 mr-3">—</small>
                                    <b v-if="booking_selected.get_additional.amount_paid >= booking_selected.get_additional.amount_due">paid</b>
                                    <b v-else>unpaid
                                        <v-btn
                                            class="ml-2"
                                            text small
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
export default {
    components: {
    },
    props: [
    ],
    data: () => ({
        reservation_header: [
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
            }
        ],
        dialog_room_information: false,
        dialog_additional: false,
        reason: null,
        amount_due: null,
        additional_check_in_id: null,
        booking_selected: null,
        img_src: null
    }),
    async mounted() {
        await this.$store.dispatch('admin_reservation/fetch_reservations')
    },
    created() {
        this.img_src = process.env.VUE_APP_URL
    },
    computed: {
        ...mapGetters({
            get_reservation_list: 'admin_reservation/get_reservation_list',
            get_room_information: 'admin_reservation/get_room_information'
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
        }
    },
    watch: {
    }
}
</script>

<style scoped lang="scss">
.v-data-table.row-height-50 td {
    height: 76px !important;
}

.v-data-table::v-deep th {
    font-size: 16px !important;
    font-weight: bold;
}
</style>