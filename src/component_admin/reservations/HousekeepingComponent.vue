<template>
    <v-container fluid class="pa-0 ma-0">
        <v-alert color="deep-purple accent-4" dark>
            Rooms To Check For Housekeeping
        </v-alert>
        <v-data-table :headers="reservation_header" :items="get_check_list" class="elevation-1">
            <template v-slot:item="{ item }">
                <tr class="mx-5" v-if="!isMobile() && item.will_be_available_at > moment(this_day).format('MMM D, YYYY')">
                    <td>
                        {{ item.get_user.name }}
                    </td>
                    <td>
                        {{ item.total_checked_in }}
                    </td>
                    <td>
                        <div v-if="item.get_room_info != null">{{ item.get_room_info.get_room_parent_information.name }}</div>
                        <div v-else>Deleted room</div>
                    </td>
                    <td>
                        <div v-if="item.get_room_info != null">{{ item.get_room_info.room_name }}</div>
                        <div v-else>Deleted room</div>
                    </td>
                    <td>
                        {{ item.check_in_date_time }}
                    </td>
                    <td>
                        {{ item.will_be_available_at }}
                    </td>
                    <td>
                        <v-btn v-if="item.get_additional == null && !item.checked" dark @click="charge(item)">
                            Report
                        </v-btn>
                        <v-btn v-else disabled>
                            Reported
                        </v-btn>
                    </td>
                    <td>
                        <v-btn v-if="!item.checked" dark @click="checked(item)">
                            Mark As Checked
                        </v-btn>
                        <v-btn v-else disabled>
                            Checked
                        </v-btn>
                    </td>
                </tr>
                <tr class="mx-5" v-else-if="isMobile() && item.will_be_available_at > moment(this_day).format('MMM D, YYYY')" style="padding-top:10px;padding-bottom:10px;">
                    <td>
                        <v-row>
                            <v-col cols="12">
                                {{ item.get_user.name }}
                            </v-col>
                            <v-col cols="12">
                                {{ item.total_checked_in }}
                            </v-col>
                            <v-col cols="12">
                                <div v-if="item.get_room_info != null">{{ item.get_room_info.get_room_parent_information.name }}</div>
                                <div v-else>Deleted room</div>
                            </v-col>
                            <v-col cols="12">
                                <div v-if="item.get_room_info != null">{{ item.get_room_info.room_name }}</div>
                                <div v-else>Deleted room</div>
                            </v-col>
                            <v-col cols="12">
                                {{ item.check_in_date_time }}
                            </v-col>
                            <v-col cols="12">
                                {{ item.will_be_available_at }}
                            </v-col>
                            <v-col cols="12">
                                <v-btn v-if="item.get_additional == null && !item.checked" dark @click="charge(item)">
                                    Report
                                </v-btn>
                                <v-btn v-else disabled>
                                    Reported
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-btn v-if="!item.checked" dark @click="checked(item)">
                                    Mark As Checked
                                </v-btn>
                                <v-btn v-else disabled>
                                    Checked
                                </v-btn>
                            </v-col>
                        </v-row>
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
                        Report damages, penalties etc.
                    </v-card-title>
                    <v-card-text>
                        <v-text-field placeholder="Reason" v-model="reason">
                        </v-text-field>
                        <!--<v-text-field
                        placeholder="Amount"
                        v-model="amount_due"
                    >
                    </v-text-field>-->
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog_additional = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green darken-1" text @click="confirm_additional_payment()">
                            Confirm
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
                text: 'Name'
            },
            {
                text: 'Guests'
            },
            {
                text: 'Room'
            },
            {
                text: 'Actual Room'
            },
            {
                text: 'Check In'
            },
            {
                text: 'Check Out'
            },
            {
                text: ''
            },
            {
                text: ''
            }
        ],
        dialog_room_information: false,
        dialog_additional: false,
        reason: null,
        this_day: Date(),
        amount_due: null,
        additional_check_in_id: null,
        img_src: null
    }),
    async mounted() {
        await this.$store.dispatch('admin_reservation/fetch_check_list')
    },
    created() {
        this.img_src = process.env.VUE_APP_URL
    },
    computed: {
        ...mapGetters({
            get_check_list: 'admin_reservation/get_check_list',
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
        checked(data) {
            this.$axios.post('/admin/reservation/checked', {
                check_in_id: data.id
            })
                .then(({ data }) => {
                    this.$store.dispatch('admin_reservation/set_check_list', data.data)
                })
        },
        charge(data) {
            this.additional_check_in_id = data.id
            this.dialog_additional = true
        },
        mark_as_paid(data) {
            this.$axios.post('/admin/reservation/mark_as_paid', {
                check_in_id: data.id
            })
                .then(() => {
                    this.$router.go(0)
                })
        },
        extra_paid(data) {
            this.$axios.post('/admin/reservation/extra_paid', {
                check_in_id: data.id,
                amount_due: data.get_additional.amount_due
            })
                .then(({ data }) => {
                    this.$store.dispatch('admin_reservation/set_check_list', data.data)
                })
        },
        async confirm_additional_payment() {
            await this.$axios.post('/admin/reservation/charge_additional', {
                check_in_id: this.additional_check_in_id,
                reason: this.reason,
                amount_due: 0
            })
                .then(({ data }) => {
                    if (!data.response) {
                        this.showSnackBar(data.message)
                    }
                    else {
                        this.dialog_additional = false
                        this.reason = null
                        this.amount_due = null
                        this.showSnackBar('Charged successfully')
                        this.$store.dispatch('admin_reservation/set_check_list', data.data)
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
.v-data-table.row-height-50 td {
    height: 76px !important;
}

.v-data-table::v-deep th {
    font-size: 16px !important;
    font-weight: bold;
}
</style>