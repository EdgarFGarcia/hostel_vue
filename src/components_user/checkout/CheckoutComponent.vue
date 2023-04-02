<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h3>Food</h3>
        <v-data-table
            :headers="orders_header"
            :items="orders['food']"
            style="width:100%;margin-bottom:30px;"
            disable-pagination
            hide-default-footer
            class="elevation-1">
            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        x{{ item.quantity }} {{ item.name }}, placed at {{ moment(item.created_at).format('MMMM Do YYYY, h:mm a') }}
                    </td>
                    <td>
                        {{ item.price }}
                    </td>
                </tr>
            </template>
        </v-data-table>
        <h3>Transpo</h3>
        <v-data-table
            :headers="orders_header"
            :items="orders['transpo']"
            style="width:100%;margin-bottom:30px;"
            disable-pagination
            hide-default-footer
            class="elevation-1">
            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        {{ item.pick_up_location }} to {{ item.drop_off_location }} by {{ item.transpo_type }}
                    </td>
                    <td>
                        {{ item.payable }}
                    </td>
                </tr>
            </template>
        </v-data-table>
        <h3>Massage</h3>
        <v-data-table
            :headers="orders_header"
            :items="orders['massage']"
            style="width:100%;margin-bottom:30px;"
            disable-pagination
            hide-default-footer
            class="elevation-1">
            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        {{ item.name }}
                    </td>
                    <td>
                        {{ item.payable }}
                    </td>
                </tr>
            </template>
        </v-data-table>
        <h3>Total</h3>
        <v-data-table
            :headers="orders_header"
            :items="total"
            style="width:100%;margin-bottom:30px;"
            disable-pagination
            hide-default-footer
            class="elevation-1">
            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        {{ item.name }}
                    </td>
                    <td>
                        {{ item.payable }}
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-btn class="mt-5 btn primary" @click="paymongo()">
            Pay now
        </v-btn>

        <v-row justify="center">
            <v-dialog v-model="paymongo_model" persistent max-width="400">
                <v-card>
                    <v-card-title class="mb-5">
                        <small>Payable Amount: ₱{{ total[0].payable }}</small>
                    </v-card-title>
                    <v-card-subtitle>
                        Payment options
                    </v-card-subtitle>
                    <v-card-text>
                        <strong>Scan QR Code using GCash App</strong>
                        <v-row align="center" justify="center" class="mt-5 mb-5" style="height:200px">
                            <img :src="require('../../assets/gcash_connector_hostel.png')" contain
                                style="width: 175px; height: 175px;" justify="center" />
                        </v-row>
                        <strong>Or pay with credit/debit card</strong><br><br>
                        <v-btn color="#596377" style="margin-left:28%" dark @click="paymongo_card_create_intent()">
                            Credit/Debit
                        </v-btn>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="paymongo_model = false">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="redirect_model" persistent max-width="400">
                <v-card>
                    <v-card-title class="mb-5">
                        <small>Payable Amount: ₱{{ total[0].payable }}</small>
                    </v-card-title>
                    <v-card-text>
                        Please wait...
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="card_details_model" persistent max-width="400">
                <v-card>
                    <v-card-title class="mb-5">
                        <small>Enter your card details</small>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field placeholder="Card Number" v-model="details.card_number">
                        </v-text-field>
                        <v-text-field placeholder="Expiry Month" v-model="details.exp_month">
                        </v-text-field>
                        <v-text-field placeholder="Expiry Year" v-model="details.exp_year">
                        </v-text-field>
                        <v-text-field placeholder="CVC" v-model="details.cvc">
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="paymongo_card_cancel()">
                            Cancel
                        </v-btn>
                        <v-btn color="green darken-1" text @click="paymongo_card_create_method()">
                            Confirm Payment
                        </v-btn>
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
        id: null,
        paymongo_model: false,
        amount: 0,
        additional_model: false,
        redirect_model: false,
        card_details_model: false,
        intent_id: null,
        to_paymongo: 0,
        qr_code: false,
        total: [{
            name: 'Total',
            payable: 0
        }],
        details: {
            card_number: null,
            exp_month: null,
            exp_year: null,
            cvc: null
        },
        orders_header: [
            {
                text: 'Description',
                sortable: false,
            },
            {
                text: 'Price',
                sortable: false,
                width: '10%'
            },
        ],
        orders: [],
    }),
    async mounted() {
        this.get_orders()
    },
    created() {
    },
    computed: {
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
        async get_orders() {
            await this.$axios.get('/user/auth_user/get_checkout')
                .then(({ data }) => {
                    console.log(data)
                    this.orders = data
                    this.total[0].payable = 0
                    this.orders.food.forEach((item) => {
                        this.total[0].payable += parseInt(item.price)
                    })
                    this.orders.transpo.forEach((item) => {
                        this.total[0].payable += item.payable
                    })
                    this.orders.massage.forEach((item) => {
                        this.total[0].payable += item.payable
                    })
                    console.log(data)
                })
        },
        async pay_checkout() {
            await this.$axios.post('/user/auth_user/pay_checkout')
                .then(({ data }) => {
                    this.orders = data
                    this.total[0].payable = 0
                })
        },
        paymongo() {
            this.paymongo_model = true
        },
        async paymongo_card_create_intent() { // PAY WITH CARD, CREATE PAYMENT
            this.paymongo_model = false
            this.redirect_model = true
            await this.$axios.post('r/payment/paymongo_card_create_intent_food', { payable: this.total[0].payable })
                .then(({ data }) => {
                    this.intent_id = data.data.attributes.client_key
                    this.to_paymongo = data.data.attributes.amount
                    this.redirect_model = false
                    this.card_details_model = true
                })
        },
        async paymongo_card_create_method() { // PAY WITH CARD, SEND PAYMENT
            let payload = {
                id: this.id,
                card_number: this.details.card_number,
                exp_month: this.details.exp_month,
                exp_year: this.details.exp_year,
                cvc: this.details.cvc,
                client_key: this.intent_id,
                amount: this.to_paymongo,
                order_type: this.order_type
            }
            await this.$axios.post('r/payment/paymongo_card_create_method_food', payload)
                .then(() => {
                    //this.orders = data
                    this.pay_checkout()
                    this.showSnackBar('Success!')
                    this.card_details_model = false
                })
        },
        paymongo_card_cancel() {
            this.card_details_model = false
            this.details.card_number = null
            this.details.exp_month = null
            this.details.exp_year = null
            this.details.cvc = null
        },
    },
    watch: {
    }
}
</script>

<style scoped lang="scss"></style>