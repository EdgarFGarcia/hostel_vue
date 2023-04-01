<template>
    <v-container fluid>
        <h2>Create Account</h2>
        <v-row
            no-gutters
            class="mt-3"
        >
            <v-col>
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
                    v-model="selected_type"
                    :items="types"
                    item-text="text"
                    item-value="value"
                ></v-select>
                <v-btn
                    @click="add_account"
                >
                    Add Account
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="mb-10">
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="accounts"
                >
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>
                                {{ item.name }}
                            </td>
                            <td>
                                {{ item.email }}
                            </td>
                            <td>
                                {{ item.mobile }}
                            </td>
                            <td>
                                <div v-if="item.role_id == 2">Admin</div>
                                <div v-else>Housekeeper</div>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
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
export default {
    components: {
        DatePicker
    },
    computed: {
        ...mapGetters({
            get_user: 'auth/get_user'
        })
    },
    async mounted() {
    },
    async created() {
        this.get_accounts()
    },
    data() {
        return {
            accounts: [],
            selected_day: null,
            selected_user: null,
            headers: [
                {
                    text: 'Name',
                    value: 'name'
                },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Mobile',
                    value: 'mobile'
                },
                {
                    text: 'Role',
                    value: 'role_id'
                },
            ],
            types: [
                { text: 'Admin', value: 2 },
                { text: 'Housekeeper', value: 3 }
            ],
            name: null,
            email: null,
            password: null,
            selected_type: null
        }
    },
    methods: {
        showSnackBar(message) {
            this.$store.commit("auth/setMessage",
                { show: true, message: message },
                { root: 1 })
        },
        async add_data() {
            console.log(this.selected_day)
            console.log(this.selected_user)
            await this.$axios.post('/admin/accounts/add_data', { day: this.selected_day, user: this.selected_user })
                .then(() => {
                this.showSnackBar("Successfully added")
            })
        },
        async get_accounts() {
            await this.$axios.get('/admin/accounts/get_accounts')
                .then(({ data }) => {
                    console.log(data)
                    if (data.response) {
                        this.accounts = data.data
                    }
                })
        },
        async add_account() {
            let payload = {
                name: this.name,
                email: this.email,
                password: this.password,
                role_id: this.selected_type
            }
            console.log(payload)
            await this.$axios.post('/admin/accounts/add_account', payload)
                .then(({ data }) => {
                    console.log(data)
                    this.showSnackBar(data.message)
                    this.get_accounts()
                })
        }
    }

}
</script>

<style lang="scss" scoped>
</style>