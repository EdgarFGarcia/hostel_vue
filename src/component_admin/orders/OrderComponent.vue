<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h2 class="pb-10 ml-5 mr-4">Orders</h2>
        <v-row>
            <v-col cols="12">
                <v-card style="border-radius: 16px;padding:20px;" width="100%">
                    <div class="mb-5">
                        <v-btn class="primary mr-3" @click="order_type = 'food'">Food</v-btn>
                        <v-btn class="primary mr-3" @click="order_type = 'transpo'">Transportation</v-btn>
                        <v-btn class="primary mr-3" @click="order_type = 'massage'">Massage and Spa</v-btn>
                    </div>
                    <v-data-table v-if="order_type == 'food'" :headers="order_header" :items="get_orders">
                        <template v-slot:item="{ item }">
                            <tr v-if="!isMobile()" style="height:90px;">
                                <td>
                                    <small>#{{ item.id }}</small>
                                </td>
                                <td>
                                    {{ item.order_type }}
                                </td>
                                <td>
                                    {{ item.name }}
                                </td>
                                <td>
                                    {{ item.get_user.name }}
                                </td>
                                <td>
                                    {{ item.price | currency('₱') }}
                                    <small class="ml-2 mr-2"> </small>
                                    <small v-if="item.paid">paid</small>
                                    <small v-else>unpaid</small>
                                </td>
                                <td>
                                    {{ item.quantity }}
                                </td>
                            </tr>
                            <tr v-else style="height:auto;padding-top:10px;padding-bottom:10px;">
                                <td>
                                    <v-row>
                                        <v-col cols="12">
                                            <small>#{{ item.id }}</small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.order_type }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.name }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.get_user.name }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.price | currency('₱') }}
                                            <small class="ml-2 mr-2"> </small>
                                            <small v-if="item.paid">paid</small>
                                            <small v-else>unpaid</small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.quantity }}
                                        </v-col>
                                    </v-row>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                    <v-data-table v-if="order_type == 'transpo'" :headers="transpo_header" :items="get_transpo">
                        <template v-slot:item="{ item }">
                            <tr v-if="!isMobile()" style="height:90px;">
                                <td>
                                    <small>#{{ item.id }}</small>
                                </td>
                                <td>
                                    {{ item.transpo_type }}
                                </td>
                                <td>
                                    {{ item.get_user.name }}
                                </td>
                                <td>
                                    {{ item.pick_up_location }}
                                    <br>
                                    {{ item.pick_up_date }}
                                </td>
                                <td>
                                    {{ item.drop_off_location }}
                                </td>
                                <td>
                                    {{ item.message }}
                                </td>
                                <td>
                                    {{ item.payable | currency('₱') }}
                                    <br>
                                    <small v-if="item.is_paid">paid</small>
                                    <small v-else>unpaid</small>
                                </td>
                            </tr>
                            <tr v-else style="height:auto;padding-top:10px;padding-bottom:10px;">
                                <td>
                                    <v-row>
                                        <v-col cols="12">
                                            <small>#{{ item.id }}</small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.transpo_type }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.get_user.name }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.pick_up_location }}
                                            <br>
                                            {{ item.pick_up_date }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.drop_off_location }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.payable | currency('₱') }}
                                            <br>
                                            <small v-if="item.is_paid">paid</small>
                                            <small v-else>unpaid</small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.quantity }}
                                        </v-col>
                                    </v-row>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                    <v-data-table v-if="order_type == 'massage'" :headers="massage_header" :items="get_massage">
                        <template v-slot:item="{ item }">
                            <tr v-if="!isMobile()" style="height:90px;">
                                <td>
                                    <small>#{{ item.id }}</small>
                                </td>
                                <td>
                                    {{ item.massage_date }}
                                </td>
                                <td>
                                    {{ item.name }}
                                </td>
                                <td>
                                    {{ item.get_user.name }}
                                </td>
                                <td>
                                    {{ item.payable | currency('₱') }}
                                    <br>
                                    <small v-if="item.paid">paid</small>
                                    <small v-else>unpaid</small>
                                </td>
                            </tr>
                            <tr v-else style="height:auto;padding-top:10px;padding-bottom:10px;">
                                <td>
                                    <v-row>
                                        <v-col cols="12">
                                            <small>#{{ item.id }}</small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.massage_date }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.name }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.get_user.name }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.payable | currency('₱') }}
                                            <br>
                                            <small v-if="item.paid">paid</small>
                                            <small v-else>unpaid</small>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            {{ item.quantity }}
                                        </v-col>
                                    </v-row>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        
        <v-row v-if="order_type == 'food'">
            <v-col cols="8"></v-col>
            <v-col cols="4">
                <download-excel :data="paid_orders" name="paid_orders.xls">
                    <v-btn color="#447FA6" dark>Export Paid Orders</v-btn>
                </download-excel>
            </v-col>
        </v-row>
        
        <v-row v-if="order_type == 'transpo'">
            <v-col cols="8"></v-col>
            <v-col cols="4">
                <download-excel :data="paid_transpo" name="paid_transpo.xls">
                    <v-btn color="#447FA6" dark>Export Paid Transpo</v-btn>
                </download-excel>
            </v-col>
        </v-row>
        
        <v-row v-if="order_type == 'massage'">
            <v-col cols="8"></v-col>
            <v-col cols="4">
                <download-excel :data="paid_massage" name="paid_massage.xls">
                    <v-btn color="#447FA6" dark>Export Paid Massage</v-btn>
                </download-excel>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="add_price_model" persistent max-width="400">
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
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    components: {
    },
    props: [
    ],
    data: () => ({
        order_header: [
            {
                text: 'ID', value: 'id', sortable: true, width: '1%'
            },
            {
                text: 'Type', value: 'order_type', sortable: true, width: '10%'
            },
            {
                text: 'Name', value: 'name', sortable: true, width: '50%'
            },
            {
                text: 'User', value: 'get_user.name', sortable: true, width: '50%'
            },
            {
                text: 'Price', sortable: false
            },
            {
                text: 'Quantity', sortable: false
            }
        ],
        transpo_header: [
            {
                text: 'ID', value: 'id', sortable: true, width: '1%'
            },
            {
                text: 'Transpo Type', value: 'transpo_type', sortable: true, width: '10%'
            },
            {
                text: 'User', sortable: false
            },
            {
                text: 'Pick Up', sortable: true, width: '50%'
            },
            {
                text: 'Drop Off', sortable: true, width: '50%'
            },
            {
                text: 'Message', sortable: false
            },
            {
                text: 'Payable', sortable: false
            }
        ],
        massage_header: [
            {
                text: 'ID', value: 'id', sortable: true, width: '1%'
            },
            {
                text: 'Date', sortable: false, width: '50%'
            },
            {
                text: 'Name', value: 'name', sortable: true, width: '50%'
            },
            {
                text: 'User', value: 'get_user.name', sortable: true, width: '50%'
            },
            {
                text: 'Price', sortable: false
            }
        ],
        transpo_id: 0,
        order_type: 'food',
        add_price_model: false,
        added_price: 0,
        paid_orders: [],
        paid_transpo: [],
        paid_massage: [],

    }),
    async mounted() {
        this.$store.dispatch('admin_orders/fetch_orders')
        this.$store.dispatch('admin_orders/fetch_paid_orders')
        this.set_paid()
    },
    created() {
    },
    computed: {
        ...mapGetters({
            get_paid_orders: 'admin_orders/get_paid_orders',
            get_paid_transpo: 'admin_orders/get_paid_transpo',
            get_paid_massage: 'admin_orders/get_paid_massage',
            get_orders: 'admin_orders/get_orders',
            get_transpo: 'admin_orders/get_transpo',
            get_massage: 'admin_orders/get_massage',
        })
    },
    methods: {
        moment: function (time) {
            return moment(time);
        },
        set_paid() {
            for (let i = 0; i < this.get_paid_orders.length; i++) {
                this.paid_orders[i] = { Date: null, User: null, Food: null, Quantity: null, Price: null }
                if (this.get_paid_orders[i].get_user) {
                    let user = this.get_paid_orders[i].get_user.name
                    this.paid_orders[i].User = user
                }
                else {
                    this.paid_orders[i].User = "Deleted user"
                }

                this.paid_orders[i].Date = moment(this.get_paid_orders[i].created_at).format('MMM DD, YYYY')
                this.paid_orders[i].Food = this.get_paid_orders[i].name
                this.paid_orders[i].Quantity = this.get_paid_orders[i].quantity
                this.paid_orders[i].Price = this.get_paid_orders[i].price
            }
            console.log(this.paid_orders)
            
            for (let i = 0; i < this.get_paid_transpo.length; i++) {
                this.paid_transpo[i] = { User: null, Transpo: null, Date: null, PickupLocation: null, DropoffLocation: null, Message: null, Price: null }
                if (this.get_paid_transpo[i].get_user) {
                    let user = this.get_paid_transpo[i].get_user.name
                    this.paid_transpo[i].User = user
                }
                else {
                    this.paid_transpo[i].User = "Deleted user"
                }

                this.paid_transpo[i].Transpo = this.get_paid_transpo[i].transpo_type
                this.paid_transpo[i].Date = this.get_paid_transpo[i].pick_up_date
                this.paid_transpo[i].PickupLocation = this.get_paid_transpo[i].pick_up_location
                this.paid_transpo[i].DropoffLocation = this.get_paid_transpo[i].drop_off_location
                this.paid_transpo[i].Message = this.get_paid_transpo[i].message
                this.paid_transpo[i].Price = this.get_paid_transpo[i].payable
            }
            console.log(this.paid_transpo)

            for (let i = 0; i < this.get_paid_massage.length; i++) {
                this.paid_massage[i] = { User: null, Massage: null, Date: null, Price: null }
                if (this.get_paid_massage[i].get_user) {
                    let user = this.get_paid_massage[i].get_user.name
                    this.paid_massage[i].User = user
                }
                else {
                    this.paid_massage[i].User = "Deleted user"
                }

                this.paid_massage[i].Massage = this.get_paid_massage[i].name
                this.paid_massage[i].Date = this.get_paid_massage[i].massage_date
                this.paid_massage[i].Price = this.get_paid_massage[i].payable
            }
            console.log(this.paid_massage)
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

<style scoped lang="scss"></style>