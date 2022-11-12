<template>
    <v-container fill-height fluid class="pa-0 ma-0">
        <v-data-table
            :headers="orders_header"
            :items="orders"
            style="width:100%"
            class="elevation-1"
        >
            <template v-slot:item="{item}">
                <tr>
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
                        ₱{{item.price}}
                    </td>
                    <td v-if="item.paid">
                        Yes
                    </td>
                    <td v-else>
                        No
                    </td>
                    <td>
                        <v-btn
                            dark
                            v-if="!item.paid"
                            @click="paymongo(item)"
                        >
                            Pay
                        </v-btn>
                        <v-btn
                            disabled
                            v-else
                        >
                            Paid
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
        
      <v-row justify="center">
        <v-dialog
          v-model="paymongo_model"
          persistent
          max-width="400"
        >
          <v-card>
            <v-card-title class="mb-5">
              <small>Payable Amount: ₱{{amount}}</small>
            </v-card-title>
            <v-card-subtitle>
              Payment options
            </v-card-subtitle>
            <v-card-text>
              <!--<v-btn
                color="#596377"
                class="mr-3"
                dark
                @click="qr_code = true; paymongo_model = false;"
              >
                QR
              </v-btn>
              <v-btn
                color="#596377"
                class="mr-3"
                dark
                @click="paymongo_gcash_create_source(get_payable_data)"
              >
                GCash
              </v-btn>-->
              
              <strong>Scan QR Code using GCash App</strong>
              <v-row
                align="center"
                justify="center"
                class="mt-5 mb-5"
                style="height:200px"
              >
                <img
                  :src="require('../../assets/gcash_connector_hostel.png')"
                  contain
                  style="width: 175px; height: 175px;"
                  justify="center"
                />
              </v-row>
              <strong>Or pay with credit/debit card</strong><br><br>
              <v-btn
                color="#596377"
                style="margin-left:28%"
                dark
                @click="paymongo_card_create_intent()"
              >
                Credit/Debit
              </v-btn>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="paymongo_model = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      
      
      <v-row justify="center">
        <v-dialog
          v-model="redirect_model"
          persistent
          max-width="400"
        >
          <v-card>
            <v-card-title class="mb-5">
              <small>Payable Amount: ₱{{amount}}</small>
            </v-card-title>
            <v-card-text>
              Please wait...
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
      
      <v-row justify="center">
        <v-dialog
          v-model="card_details_model"
          persistent
          max-width="400"
        >
          <v-card>
            <v-card-title class="mb-5">
              <small>Enter your card details</small>
            </v-card-title>
            <v-card-text>
              <v-text-field
                placeholder="Card Number"
                v-model="details.card_number"
              >
              </v-text-field>
              <v-text-field
                placeholder="Expiry Month"
                v-model="details.exp_month"
              >
              </v-text-field>
              <v-text-field
                placeholder="Expiry Year"
                v-model="details.exp_year"
              >
              </v-text-field>
              <v-text-field
                placeholder="CVC"
                v-model="details.cvc"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="paymongo_card_cancel()"
              >
                Cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="paymongo_card_create_method()"
              >
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
    qr_code: false,
    details: {
      card_number: null,
      exp_month: null,
      exp_year: null,
      cvc: null
    },
    orders_header: [
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
    orders: []
  }),
  async mounted () {
    this.get_orders()
  },
  created () {
  },
  computed: {
  },
  methods: {
    moment: function (time) {
        return moment(time);
    },
    async get_orders(){
        await this.$axios.get('/user/auth_user/get_orders_user')
        .then(({data}) => {
            this.orders = data
            console.log(this.orders)
        })
    },
    paymongo(data){
      this.paymongo_model = true
      this.amount = data.price
      this.id = data.id
    },
    async paymongo_card_create_intent() { // PAY WITH CARD, CREATE PAYMENT
      this.paymongo_model = false
      this.redirect_model = true
      await this.$axios.post('r/payment/paymongo_card_create_intent_food', {payable: this.amount})
      .then(({data}) => {
        this.intent_id = data.data.attributes.client_key
        this.amount = data.data.attributes.amount
        this.redirect_model = false
        this.card_details_model = true
      })
    },
    async paymongo_card_create_method(){ // PAY WITH CARD, SEND PAYMENT
      let payload = {
        id: this.id,
        card_number: this.details.card_number,
        exp_month: this.details.exp_month,
        exp_year: this.details.exp_year,
        cvc: this.details.cvc,
        client_key: this.intent_id,
        amount: this.amount
      }
      await this.$axios.post('r/payment/paymongo_card_create_method_food', payload)
      .then(({data}) => {
        this.orders = data
        this.card_details_model = false
      })
    },
    paymongo_card_cancel(){
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

<style scoped lang="scss">
</style>