<template>
    <v-container fill-height fluid class="pa-0 ma-0">
        <v-tabs v-model="tab" grow dark color="basil" background-color="deep-purple accent-4">
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab :href="`#Food`">
                <label style="color: white;">
                    Food
                </label>
            </v-tab>
            <v-tab :href="`#Transportation`">
                <label style="color: white;">
                    Transportation
                </label>
            </v-tab>
            <v-tab :href="`#Massage and Spa`">
                <label style="color: white;">
                    Massage and Spa
                </label>
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="mt-5 justify-center align-center" style="width: 100%;">
            <v-tab-item value="Food">
                <v-data-table :headers="orders_header" :items="orders_food" style="width:100%" class="elevation-1">
                    <template v-slot:item="{item}">
                        <tr v-if="item != null">
                            <td>
                                {{item.get_user.name}}
                            </td>
                            <td>
                                {{item.order_type}}
                            </td>
                            <td>
                                {{item.name}}
                            </td>
                            <td>
                                {{item.quantity}}
                            </td>
                            <td>
                                {{moment(item.created_at).format("h:mm:ss a, MMM DD, YYYY")}}
                            </td>
                            <td>
                                {{item.price}}
                            </td>
                            <td v-if="item.paid">
                                Yes
                            </td>
                            <td v-else>
                                No
                            </td>
                            <td>
                                <v-btn dark v-if="!item.paid" @click="order_paid(item.id)">
                                    Paid
                                </v-btn>
                                <v-btn disabled v-else>
                                    Paid
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-tab-item>
            <v-tab-item value="Transportation">
                <v-data-table :headers="orders_header_transpo" :items="orders_transpo" style="width:100%" class="elevation-1">
                    <template v-slot:item="{item}">
                        <tr v-if="orders_transpo != null">
                            <td>
                                {{item.get_user.name}}
                            </td>
                            <td>
                                {{item.transpo_type}}
                            </td>
                            <td>
                                {{ moment(item.pick_up_date).format("h:mm:ss a, MMM DD, YYYY") }}
                            </td>
                            <td>
                                {{item.pick_up_location}}
                            </td>
                            <td>
                                {{item.drop_off_location}}
                            </td>
                            <td>
                                {{item.message}}
                            </td>
                            <td>
                                {{item.payable}}
                            </td>
                            <td v-if="item.is_paid">
                                Yes
                            </td>
                            <td v-else>
                                No
                            </td>
                            <td>
                                <v-btn dark @click="add_transpo_price(item.id)">Add</v-btn>
                            </td>
                            <td>
                                <v-btn dark v-if="!item.is_paid" @click="mark_as_paid_transpo(item.id)">
                                    Paid
                                </v-btn>
                                <v-btn disabled v-else>
                                    Paid
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-tab-item>
            <v-tab-item value="Massage and Spa">
                <v-data-table :headers="orders_header_massage" :items="orders_massage" style="width:100%" class="elevation-1">
                    <template v-slot:item="{item}">
                        <tr v-if="orders_massage != null">
                            <td>
                                {{item.get_user.name}}
                            </td>
                            <td>
                                {{item.name}}
                            </td>
                            <td>
                                {{ moment(item.massage_date).format("h:mm:ss a, MMM DD, YYYY") }}
                            </td>
                            <td>
                                {{item.payable}}
                            </td>
                            <td v-if="item.paid">
                                Yes
                            </td>
                            <td v-else>
                                No
                            </td>
                            <td>
                                <v-btn dark v-if="!item.paid" @click="mark_as_paid_massage(item.id)">
                                    Paid
                                </v-btn>
                                <v-btn disabled v-else>
                                    Paid
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-tab-item>
        </v-tabs-items>
        <v-row justify="center">
            <v-dialog
            v-model="add_price_model"
            persistent
            max-width="400"
            >
            <v-card>
                <v-card-title class="mb-5">
                <small>Add Price</small>
                </v-card-title>
                <v-card-text>
                    <v-text-field type="number" placeholder="Amount" v-model="added_price"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn dark @click="submit_added_price">Submit</v-btn>
                    <v-btn dark @click="cancel_add">Cancel</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import moment from 'moment'
export default {
    components: {
    },
    props: [
    ],
    data: () => ({
        tab: "Food",
        orders_header: [
            {
                text: 'User',
                sortable: false
            },
            {
                text: 'Type',
                sortable: false
            },
            {
                text: 'Order',
                sortable: false
            },
            {
                text: 'Quantity',
                sortable: false
            },
            {
                text: 'Time',
                sortable: false
            },
            {
                text: 'Price',
                sortable: false
            },
            {
                text: 'Paid',
                sortable: false
            },
            {
                text: 'Mark as paid',
                sortable: false
            }
        ],
        orders_header_transpo: [
            {
                text: 'User',
                sortable: false
            },
            {
                text: 'Type',
                sortable: false
            },
            {
                text: 'Pick up date',
                sortable: false
            },
            {
                text: 'Pick up location',
                sortable: false
            },
            {
                text: 'Drop off location',
                sortable: false
            },
            {
                text: 'Message',
                sortable: false
            },
            {
                text: 'Price',
                sortable: false
            },
            {
                text: 'Is paid',
                sortable: false
            },
            {
                text: 'Add Price',
                sortable: false
            },
            {
                text: 'Mark as paid',
                sortable: false
            }
        ],
        orders_header_massage: [
            {
                text: 'User',
                sortable: false
            },
            {
                text: 'Massage type',
                sortable: false
            },
            {
                text: 'Schedule',
                sortable: false
            },
            {
                text: 'Price',
                sortable: false
            },
            {
                text: 'Paid',
                sortable: false
            },
            {
                text: 'Mark as paid',
                sortable: false
            }
        ],
        orders_food: [],
        orders_transpo: [],
        orders_massage: [],
        transpo_id: 0,
        add_price_model: false,
        added_price: 0

    }),
    async mounted() {
        this.get_orders()
        this.get_transpo()
        this.get_massages()
    },
    created() {
    },
    computed: {
    },
    methods: {
        moment: function (time) {
            return moment(time);
        },
        async get_orders() {
            await this.$axios.get('/user/auth_user/get_orders')
                .then(({ data }) => {
                    let arr = []
                    arr.push(...data["Food"], ...data["Dr. Bread"], ...data['Dr. Wine'], ...data['Buccaneers'])
                    this.orders_food = arr
                })
        },
        add_transpo_price(id) {
            this.transpo_id = id
            this.add_price_model = true
        },
        cancel_add() {
            this.add_price_model = false
            this.transpo_id = 0
            this.added_price = 0
        },
        async submit_added_price() {
            let payload = {
                id: this.transpo_id,
                price: this.added_price
            }
            await this.$axios.post('/user/auth_user/add_price_transpo', payload)
            .then(({ data }) => {
                console.log(data)
                this.add_price_model = false
                this.orders_transpo = data
            })
        },
        async mark_as_paid_transpo(id) {
            await this.$axios.post('/user/auth_user/mark_as_paid_transpo', id)
                .then(({ data }) => {
                    this.orders_transpo = data
                })
        },
        async mark_as_paid_massage(id) {
            await this.$axios.post('/user/auth_user/mark_as_paid_massage', id)
                .then(({ data }) => {
                    this.orders_massage = data
                })
        },
        async get_transpo() {
            await this.$axios.get('/user/auth_user/get_booked_transpo')
                .then(({ data }) => {
                    console.log(data)
                    this.orders_transpo = data
            })
        },
        async get_massages() {
            await this.$axios.get('/user/auth_user/get_massages')
                .then(({ data }) => {
                    console.log(data)
                    this.orders_massage = data
                })
        },
        async order_paid(order) {
            console.log(order)
            await this.$axios.post('/user/auth_user/pay_order', order)
                .then(({ data }) => {
                    console.log(this.orders)
                    let arr = []
                    arr.push(...data["Food"], ...data["Dr. Bread"], ...data['Dr. Wine'], ...data['Buccaneers'])
                    this.orders_food = arr
                })
        }
    },
    watch: {
    }
}
</script>

<style scoped lang="scss">

</style>