<template>
    <v-container fluid class="pa-0 ma-0">
        <v-alert color="deep-purple accent-4" dark>
            Reservation Details
        </v-alert>
        <v-data-table :headers="reservation_header" :items="get_reservation_list" class="elevation-1">
            <template v-slot:item="{ item }">
                <tr v-if="item.get_room_info">
                    <td>
                        {{ item.get_user.name }}
                        <br>
                        {{ item.get_user.email }}
                    </td>
                    <td>
                        <v-btn dark @click="check_details(item)">
                            {{item.get_room_info.room_name}}
                        </v-btn>
                    </td>
                    <td>
                        {{ item.check_in_date_time }}
                    </td>
                    <td>
                        {{ item.will_be_available_at }}
                    </td>
                    <td>
                        {{ item.duration }} Day(s)
                    </td>
                    <td>
                        {{ item.total_checked_in }}
                    </td>
                    <td>
                        {{ item.adult_count }}
                    </td>
                    <td>
                        {{ item.child_count }}
                    </td>
                    <td>
                        {{ item.payable | currency('₱') }}
                    </td>
                    <td>
                        <v-btn v-if="!item.is_paid" dark @click="mark_as_paid(item)">
                            Mark as paid
                        </v-btn>
                        <v-btn v-else disabled>
                            Room paid
                        </v-btn>
                    </td>
                    <td>
                        <v-btn v-if="item.checked" disabled>
                            Checked
                        </v-btn>
                        <v-btn v-else-if="item.to_check == 0" dark @click="check(item)">
                            Mark to check
                        </v-btn>
                        <v-btn v-else-if="!item.checked" disabled>
                            To check
                        </v-btn>
                    </td>
                    <td>
                        <label v-if="item.get_additional != null && item.get_additional.amount_due == 0">
                            {{ item.get_additional.reason }}
                        </label>
                        <label v-else>No report</label>
                    </td>
                    <td v-if="item.get_additional != null">
                        {{ item.get_additional.amount_due | currency('₱') }}
                    </td>
                    <td v-else>
                        No additional
                    </td>
                    <td>
                        <label
                            v-if="item.get_additional != null && item.get_additional.amount_due > 0 && item.get_additional.amount_paid >= item.get_additional.amount_due">
                            Paid
                        </label>
                        <label v-else>No additional</label>
                    </td>
                    <td>
                    </td>
                    <td>
                        <v-btn v-if="item.get_additional != null && item.get_additional.amount_due == 0"
                            dark @click="charge(item)">
                            Charge
                        </v-btn>
                        <v-btn v-else-if="item.get_additional != null" disabled>
                            Charged
                        </v-btn>
                        <v-btn v-else-if="item.get_additional == null" disabled>
                            N/A
                        </v-btn>
                    </td>
                    <td>
                        <v-btn
                            v-if="item.get_additional != null && item.get_additional.amount_paid < item.get_additional.amount_due"
                            dark @click="extra_paid(item)">
                            Paid fee
                        </v-btn>
                        <v-btn v-else-if="item.get_additional != null && item.get_additional.amount_due > 0" disabled>
                            Fee paid
                        </v-btn>
                        <v-btn v-else disabled>
                            N/A
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-row justify="center">
            <v-dialog v-model="dialog_room_information" persistent max-width="560">
                <v-card v-if="Object.keys(get_room_information).length > 0">
                    <v-card-title class="text-h5">
                        Room Information of: {{ get_room_information.room_name }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ get_room_information.get_room_parent_information.description }}
                    </v-card-subtitle>
                    <v-card-text>
                        <v-img :src="`${img_src}/images/${get_room_information.get_room_parent_information.image}`" />
                    </v-card-text>
                    <v-card-text>
                        <v-row>
                            <v-col cols="4"
                                v-for="(item, itemindex) in get_room_information.get_room_parent_information.facilities"
                                :key="itemindex">
                                <v-icon>mdi-check</v-icon>
                                {{ item }}
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
export default {
    components: {
    },
    props: [
    ],
    data: () => ({
        reservation_header: [
            {
                text: 'User'
            },
            {
                text: 'Room'
            },
            {
                text: 'Check-in Date'
            },
            {
                text: 'Check-out Date'
            },
            {
                text: 'Duration'
            },
            {
                text: 'Total check-ins'
            },
            {
                text: 'Adult Count'
            },
            {
                text: 'Child Count'
            },
            {
                text: 'Room Price'
            },
            {
                text: 'Paid'
            },
            {
                text: 'Checked'
            },
            {
                text: 'Report'
            },
            {
                text: 'Additional'
            },
            {
                text: 'Additional Paid'
            },
            {
                text: ''
            },
            {
                text: ''
            },
            {
                text: ''
            },
        ],
        dialog_room_information: false,
        dialog_additional: false,
        reason: null,
        amount_due: null,
        additional_check_in_id: null,
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
        async check_details(data) {
            await this.$axios.get('/admin/reservation/g_reservation_details', {
                room_id: data.actual_room_id
            })
                .then(({ data }) => {
                    if (data.response) {
                        this.dialog_room_information = true
                    }
                    this.$store.dispatch('admin_reservation/set_room_information', data.data)
                })
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
                })
        },
        async check(data) {
            console.log(data)
            await this.$axios.post('/admin/reservation/to_check', {
                check_in_id: data.id
            })
                .then(({ data }) => {
                    this.$store.dispatch('admin_reservation/set_reservations', data.data)
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