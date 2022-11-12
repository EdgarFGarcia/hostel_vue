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
                <v-data-table :headers="orders_header" :items="orders_transpo" style="width:100%" class="elevation-1">
                    <template v-slot:item="{item}">
                        <tr v-if="orders_transpo != null">
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
            <v-tab-item value="Massage and Spa">
                <v-data-table :headers="orders_header" :items="orders_massage" style="width:100%" class="elevation-1">
                    <template v-slot:item="{item}">
                        <tr v-if="orders_massage != null">
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
        </v-tabs-items>
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
        orders_food: [],
        orders_transpo: [],
        orders_massage: [],

    }),
    async mounted() {
        this.get_orders()
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
                    this.orders_transpo = data['Transportation']
                    this.orders_massage = data['Massage and Spa']
                })
        },
        async order_paid(order) {
            await this.$axios.post('/user/auth_user/pay_order', order)
                .then(({ data }) => {
                    let arr = []
                    arr.push(...data["Food"], ...data["Dr. Bread"], ...data['Dr. Wine'], ...data['Buccaneers'])
                    this.orders_food = arr
                    this.orders_transpo = data['Transportation']
                    this.orders_massage = data['Massage and Spa']
                    console.log(this.orders)
                })
        }
    },
    watch: {
    }
}
</script>

<style scoped lang="scss">

</style>