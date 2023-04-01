<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h2 class="pb-10 ml-5">Users</h2>
        <v-row>
            <v-col cols="12">
                <v-card style="border-radius: 16px;padding:20px;" width="100%">
                    <v-data-table :headers="user_headers" :items="get_users">
                        <template v-slot:item="{ item }">
                            <tr @click="open_profile(item)" style="cursor: pointer;height:75px;">
                                <td>
                                    <v-row>
                                        <v-col cols="2">
                                            <v-avatar
                                                color="#447FA6"
                                                size="45"
                                                v-if="item.image == null"
                                            >
                                                <strong style="font-size: 20px;color:white;text-transform:uppercase;">{{ item.name[0] }}</strong>
                                            </v-avatar>
                                            <v-avatar
                                                v-else
                                                color="#447FA6"
                                                size="45"
                                            >
                                                <v-img
                                                    :src="`${img_src}/${item.image}`"
                                                    :aspect-ratio="1"
                                                />
                                            </v-avatar>
                                        </v-col>
                                        <v-col cols="10">
                                            <v-layout align-center style="height:45px;">
                                                <h3 class="ml-2">{{ item.name }}</h3>
                                            </v-layout>
                                        </v-col>
                                    </v-row>
                                </td>
                                <td>
                                    {{ moment(item.created_at).format('MMMM D, YYYY') }}
                                </td>
                                <td>
                                    <div v-if="item.get_current_booking && item.get_current_booking.get_room_info && item.get_current_booking.get_room_info.get_room_parent_information">{{ item.get_current_booking.get_room_info.get_room_parent_information.name }} - {{ item.get_current_booking.get_room_info.room_name }}</div>
                                    <div v-else>None</div>
                                </td>
                                <td>
                                    <v-btn text>
                                        <small>View profile ></small>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
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
                            <v-col cols="11">
                                <v-layout align-center style="height:60px;">
                                    <h2 class="ml-7">{{ profile.name }}</h2>
                                    <v-spacer/>
                                    <h5 class="ml-7">Member since {{ moment(profile.created_at).format('MMMM D, YYYY') }}</h5>
                                </v-layout>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
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
                            <v-col cols="6">
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
                        <v-row>
                            <v-col cols="12">
                                <h2>Room booked</h2>
                            </v-col>
                            <v-col cols="6" v-if="profile.get_current_booking && profile.get_current_booking.get_room_info && profile.get_current_booking.get_room_info.get_room_parent_information">
                                <v-img style="border-radius:5px;" :src="`${img_src}/images/${profile.get_current_booking.get_room_info.get_room_parent_information.image}`" />
                            </v-col>
                            <v-col cols="6" v-if="profile.get_current_booking && profile.get_current_booking.get_room_info && profile.get_current_booking.get_room_info.get_room_parent_information">
                                <h3 style="font-weight:400;">{{ profile.get_current_booking.get_room_info.get_room_parent_information.name }}</h3>
                                <h4 style="font-weight:400;">{{ profile.get_current_booking.get_room_info.room_name }}</h4>
                                <v-btn class="mt-3" style="margin-left:-12px;" small text @click="view_booking(profile.get_current_booking)">View Booking ></v-btn>
                            </v-col>
                            <v-col cols="12" v-if="!profile.get_current_booking">
                                N/A
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="close_profile()">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        
        <h2 class="pb-10 ml-5 mt-15">Admin and Housekeeping Users</h2>
        <v-btn style="color:white;background-color:#447FA6;" class="ml-5 mt-4" @click="add_account_modal = true;"><b>Add</b></v-btn>
        <v-row>
            <v-col cols="12">
                <v-card style="border-radius: 16px;padding:20px;" width="100%">
                    <v-data-table
                        :headers="admin_headers"
                        :items="get_admins"
                    >
                        <template v-slot:item="{ item }">
                            <tr>
                                <td style="height:75px;">
                                    <v-row>
                                        <v-col cols="2">
                                            <v-avatar
                                                color="#447FA6"
                                                size="45"
                                                v-if="item.image == null"
                                            >
                                                <strong style="font-size: 20px;color:white;text-transform:uppercase;">{{ item.name[0] }}</strong>
                                            </v-avatar>
                                            <v-avatar
                                                v-else
                                                color="#447FA6"
                                                size="45"
                                            >
                                                <v-img
                                                    :src="`${img_src}/${item.image}`"
                                                    :aspect-ratio="1"
                                                />
                                            </v-avatar>
                                        </v-col>
                                        <v-col cols="10">
                                            <v-layout align-center style="height:45px;">
                                                <h3 class="ml-2">{{ item.name }}</h3>
                                            </v-layout>
                                        </v-col>
                                    </v-row>
                                </td>
                                <td>
                                    <div v-if="item.role_id == 2">Admin</div>
                                    <div v-else>Housekeeping</div>
                                </td>
                                <td style="text-align:right;">
                                    <v-btn v-if="item.id != 9 && item.id != 2" text color="red" @click="delete_account(item.id)"><small>Remove account</small></v-btn>
                                    <v-btn v-else disabled text color="red"><small>Can't remove</small></v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        
        <v-row justify="center">
            <v-dialog v-model="add_account_modal" persistent max-width="600">
                <v-card>
                    <v-card-title class="text-h5">
                        Add account
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            placeholder="Name"
                            v-model="name"
                        ></v-text-field>
                        <v-text-field
                            placeholder="Email"
                            v-model="email"
                        ></v-text-field>
                        <v-text-field
                            placeholder="Password"
                            v-model="password"
                        ></v-text-field>
                        <v-select
                            placeholder="Account Type"
                            v-model="account_type"
                            :items="types"
                            item-text="text"
                            item-value="value"
                        ></v-select>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="add_account_modal = false">
                            Cancel
                        </v-btn>
                        <v-btn style="background-color:#447FA6;color:white;" @click="add_account()">
                            Add account
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        
        
        ADD FAKE DATA
        <v-row
            no-gutters
            class="mt-3"
        >
            <v-col>
                <date-picker v-model="selected_day" valueType="format" type="datetime"></date-picker>
                <v-select
                    v-model="selected_user"
                    :items="[{ text: 'Male, 25, student', value: 91 }, { text: 'Female, 29, vacationer', value: 92 }, { text: 'Female, 21, foreigner', value: 93 }]"
                >
                    <template v-slot:prepend-inner>
                        <v-icon small style="position: relative; top:4px;"> mdi-account-school </v-icon> 
                    </template>
                </v-select>
                <v-btn
                    @click="add_data"
                >
                    Add Data
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import moment from 'moment'
export default {
    components: {
        DatePicker
    },
    computed: {
        ...mapGetters({
            get_user: 'auth/get_user',
            get_users: 'admin_users/get_users',
            get_admins: 'admin_users/get_admins',
            profile: 'admin_users/get_selected_user'
        })
    },
    data() {
        return {
            user_headers: [
                {
                    text: 'Name', sortable: false
                },
                {
                    text: 'Member since', sortable: false
                },
                {
                    text: 'Room booked', sortable: false
                },
                {
                    text: '', sortable: false
                },
            ],
            admin_headers: [
                {
                    text: 'Name', sortable: false, width: '50%'
                },
                {
                    text: 'Role', sortable: false, width: '50%'
                },
                {
                    text: '', sortable: false
                }
            ],
            types: [
                { text: 'Admin', value: 2 },
                { text: 'Housekeeper', value: 3 }
            ],
            name: null,
            email: null,
            password: null,
            add_account_modal: false,
            show_profile: false,
            account_type: null,
            selected_day: null,
            selected_user: null,
            img_src: null
        }
    },
    async mounted() {
        await this.$store.dispatch('admin_users/fetch_users')
    },
    async created() {
        this.img_src = process.env.VUE_APP_URL
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
        view_booking(booking) {
            this.$store.dispatch('admin_reservation/set_selected_room', booking)
            this.$router.push('/admin_reservations')
        },
        async open_profile(item) {
            this.$store.dispatch('admin_users/set_selected_user', item)
            this.show_profile = true
        },
        async close_profile() {
            this.$store.dispatch('admin_users/set_selected_user', null)
            this.show_profile = false
        },
        async add_data() {
            await this.$axios.post('/admin/accounts/add_data', { day: this.selected_day, user: this.selected_user })
                .then(() => {
                this.showSnackBar("Successfully added")
            })
        },
        async delete_account(id) {
            await this.$axios.post('/admin/accounts/delete_account', { id: id })
                .then(() => {
                    this.showSnackBar("Removed account successfully")
                    this.$store.dispatch('admin_users/fetch_users')
            })
        },
        async add_account() {
            this.showSnackBar("Please wait...")
            let payload = {
                name: this.name,
                email: this.email,
                password: this.password,
                role_id: this.account_type
            }
            await this.$axios.post('/admin/accounts/add_account', payload)
                .then(({ data }) => {
                    this.add_account_modal = false
                    this.showSnackBar(data.message)
                    this.$store.dispatch('admin_users/fetch_users')
                })
        }
    }

}
</script>

<style lang="scss" scoped>
.v-data-table::v-deep th {
    font-size: 16px !important;
    font-weight: bold;
}
</style>