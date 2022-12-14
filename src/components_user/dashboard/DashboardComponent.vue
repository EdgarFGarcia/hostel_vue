<template>
  <v-container fill-height fluid>
    <v-row>
      <p v-if="get_my_rooms.length == 0" class="ml-10 mt-10">No bookings yet</p>
      <v-col cols="4" v-for="(room, roomindex) in orderBy(get_my_rooms, 'created_at', -1)" :key="roomindex">
        <v-card style="height:auto">
          <v-card-title class="text-small">
            <small>{{ room.get_room_info.room_name }}</small>
            <v-spacer />

            <small v-if="!room.is_paid">
              <small>Unpaid</small>
              <v-icon small>mdi-cancel</v-icon>
            </small>
            <small v-else><small>Paid</small>
              <v-icon small>mdi-check-underline-circle-outline</v-icon>
            </small>
          </v-card-title>
          <v-card-subtitle>
            <label>Check-in Date: {{ room.check_in_date_time }}, {{ room.check_in }}</label>
            <label style="display: block;">Check-out Date: {{ room.will_be_available_at }}, {{ room.check_out }}</label>
          </v-card-subtitle>
          <v-card-text>
            <label>Adult Count: {{ room.adult_count }}</label>
            <label style="display: block;">Child Count: {{ room.child_count }}</label>
            <label>Total Payable:
              <strong v-if="!room.is_paid" style="text-decoration: underline;">{{ room.payable | currency('₱') }}</strong>
              <strong
                v-else-if="room.get_additional != null && room.get_additional.amount_due > room.get_additional.amount_paid"
                style="text-decoration: underline;">{{ room.get_additional.amount_due | currency('₱') }} (additional
                payment)</strong>
            </label>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text outlined @click="room_to_cancel = room; cancel_model = true">
              cancel
            </v-btn>
            <v-btn color="#596377" dark class="pl-10 pr-10" v-if="!room.is_paid" @click="paymongo(room)">
              Pay now
            </v-btn>
            <v-btn color="#596377" dark class="pl-10 pr-10" v-if="room.is_paid && !room.reviewed_status"
              @click="review(room)">
              Review
            </v-btn>
            <v-btn color="#596377" disabled class="pl-10 pr-10" v-else-if="room.is_paid">
              Reviewed
            </v-btn>
            <v-btn color="#596377" dark class="pl-10 pr-10" @click="pay_additional(room)"
              v-if="room.get_additional != null && room.get_additional.amount_paid < room.get_additional.amount_due && room.is_paid">
              Pay
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-spacer />
            <v-btn v-if="room.is_done == 2" color="#596377" dark class="mt-3 mb-3"
              @click="housekeeping_model = true; chosen_room = room.id">
              Request Housekeeping
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="cancel_model" persistent max-width="250">
        <v-card>
          <v-card-title class="mb-5">
            Are you sure?
          </v-card-title>
          <v-card-subtitle>Any payments made are non-refundable</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#596377" dark @click="cancel_booking">
              Yes
            </v-btn>
            <v-btn color="#596377" dark @click="cancel_model = false; room_to_cancel = []">
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="housekeeping_model" persistent>
        <v-card>
          <v-card-title class="text-h5">
          </v-card-title>
          <v-card-text>
            <v-text-field placeholder="Request" v-model="request">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="housekeeping_model = false">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="send_housekeeping()">
              Send request
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="paymongo_model" persistent max-width="400">
        <v-card>
          <v-card-title class="mb-5">
            <small>Payable Amount: {{ get_payable_data.payable | currency('₱') }}</small>
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
            <v-row align="center" justify="center" class="mt-5 mb-5" style="height:200px">
              <img :src="require('../../assets/gcash_connector_hostel.png')" contain
                style="width: 175px; height: 175px;" justify="center" />
            </v-row>
            <strong>Or pay with credit/debit card</strong><br><br>
            <v-btn color="#596377" style="margin-left:28%" dark @click="paymongo_card_create_intent(get_payable_data)">
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
      <v-dialog v-model="additional_model" persistent max-width="400">
        <v-card>
          <v-card-title class="mb-5" v-if="get_payable_data.get_additional != null">
            <small>Payable Amount: {{ get_payable_data.get_additional.amount_due | currency('₱') }}</small><br>
            <small>Additional reason: {{ get_payable_data.get_additional.reason }}</small>
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
            <v-btn color="#596377" style="margin-left:28%" dark @click="paymongo_card_create_intent(get_payable_data)">
              Credit/Debit
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="additional_model = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="qr_code" persistent max-width="400">
        <v-card>
          <v-card-title class="mb-5">
            <small>Payable Amount: {{ get_payable_data.payable | currency('₱') }}</small>
          </v-card-title>
          <v-card-text>
            <strong>Scan QR Code using GCash App</strong>
            <v-row align="center" justify="center" class="mt-5">
              <img :src="require('../../assets/gcash_connector_hostel.png')" contain
                style="max-width: 175px; max-height: 175px;" justify="center" />
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="qr_code = false">
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
            <small>Payable Amount: {{ get_payable_data.payable | currency('₱') }}</small>
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

    <v-row justify="center">
      <v-dialog v-model="review_model" persistent max-width="320">
        <v-card>
          <v-card-title>
            <strong>Leave a review</strong>
          </v-card-title>
          <v-card-text>
            <v-textarea filled placeholder="Type your review here" v-model="review_text">
            </v-textarea>
            <star-rating v-model="rating" :increment=0.5 :rating="review.rating" :show-rating=false :star-size=25
              class="ml-3" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="cancel_review()">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="submit_review(get_payable_data)">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import StarRating from 'vue-star-rating'
import Vue2Filters from 'vue2-filters'
export default {
  mixins: [Vue2Filters.mixin],
  components: {
    StarRating
  },
  props: [
  ],
  data: () => ({
    //qr_code_model: false,
    paymongo_model: false,
    additional_model: false,
    redirect_model: false,
    check_in_id: false,
    card_details_model: false,
    review_model: false,
    review_text: null,
    rating: 0,
    housekeeping_model: false,
    chosen_room: null,
    request: null,
    qr_code: false,
    details: {
      card_number: null,
      exp_month: null,
      exp_year: null,
      cvc: null
    },
    cancel_model: false,
    room_to_cancel: []
  }),
  async mounted() {
    await this.$store.dispatch('user/set_my_rooms')
  },
  created() {
  },
  computed: {
    ...mapGetters({
      get_my_rooms: 'user/get_my_rooms',
      get_payable_data: 'user/get_payable_data',
      get_payment_details: 'user/get_payment_details'
    })
  },
  methods: {
    async cancel_booking() {
      let payload = {
        check_in_id: this.room_to_cancel.id,
        room_id: this.room_to_cancel.actual_room_id
      }
      await this.$axios.post('r/rooms/cancel_reservation', payload)
        .then(({ data }) => {
          console.log(data)
          if (data.response) {
            alert(data.message)
            this.room_to_cancel = []
            this.cancel_model = false
            this.$store.dispatch('user/set_my_rooms')
          }
        })
    },
    pay_additional(data) {
      this.$store.dispatch('user/set_payable_data', data)
      console.log(this.get_payable_data.get_additional.id)
      this.additional_model = true
    },
    async send_housekeeping() {
      console.log(this.chosen_room)
      await this.$axios.post('/user/auth_user/housekeeping', {
        message: this.request,
        room_id: this.chosen_room
      })
        .then(({ data }) => {
          console.log(data)
          this.housekeeping_model = false
          alert('Sent request!')
        })
    },
    paymongo(data) {
      this.$store.dispatch('user/set_payable_data', data)
      this.paymongo_model = true
    },
    async paymongo_gcash_create_source(data) { // PAY WITH GCASH, SEND USER TO CHECKOUT PAGE
      this.paymongo_model = false
      this.redirect_model = true
      await this.$axios.post('r/payment/paymongo_gcash_create_source', data)
        .then(({ data }) => {
          let payment_data = {
            source_id: data.data.id,
            amount: data.data.attributes.amount,
            check_in_id: this.get_payable_data.id
          }
          this.$store.dispatch('user/set_payment_details', payment_data)
          //this.paymongo_paynow_link = data.data.attributes.redirect.checkout_url
          window.location.href = data.data.attributes.redirect.checkout_url
        })
    },
    async paymongo_card_create_intent(data) { // PAY WITH CARD, CREATE PAYMENT
      if (this.additional_model == true) {
        data.payable = data.get_additional.amount_due
        this.additional_model = false
      }
      this.paymongo_model = false
      this.redirect_model = true
      await this.$axios.post('r/payment/paymongo_card_create_intent', data)
        .then(({ data }) => {
          let payment_data = {
            intent_id: data.data.attributes.client_key,
            amount: data.data.attributes.amount
          }
          this.$store.dispatch('user/set_payment_details', payment_data)
          this.redirect_model = false
          this.card_details_model = true
        })
    },
    async paymongo_card_create_method() { // PAY WITH CARD, SEND PAYMENT
      let payload = {
        card_number: this.details.card_number,
        exp_month: this.details.exp_month,
        exp_year: this.details.exp_year,
        cvc: this.details.cvc,
        client_key: this.get_payment_details.intent_id,
        check_in_id: this.get_payable_data.id,
        user_id: this.get_payable_data.user_id,
        amount: this.get_payment_details.amount,
        room_id: this.get_payable_data.actual_room_id
      }
      await this.$axios.post('r/payment/paymongo_card_create_method', payload)
        .then(({ data }) => {
          if (data.response) {
            if (this.get_payable_data.get_additional != null) {
              this.$axios.post('r/payment/pay_additional', this.get_payable_data.get_additional)
                .then(() => {
                  this.$router.push('/payment_successful')
                })
            }
            else {
              this.$router.push('/payment_successful')
            }
          }
          else {
            alert(data.message)
          }
        })
    },
    paymongo_card_cancel() {
      this.card_details_model = false
      this.details.card_number = null
      this.details.exp_month = null
      this.details.exp_year = null
      this.details.cvc = null
    },
    /*show_qr_code(data){
      this.$store.dispatch('user/set_payable_data', data)
      this.qr_code_model = true
    },*/
    review(data) {
      this.$store.dispatch('user/set_payable_data', data)
      this.review_model = true
    },
    cancel_review() {
      this.review_model = false
      this.review_text = null
      this.rating = 0
    },
    async submit_review(data) {
      let toSend = {
        check_in_id: data.id,
        actual_room_id: data.actual_room_id,
        user_id: data.user_id,
        rating: this.rating,
        review: this.review_text
      }
      await this.$axios.post('r/rooms/submit_review', toSend)
        .then(({ data }) => {
          if (data.response) {
            this.review_model = false
            this.review_text = null
            this.rating = 0
          }
          alert(data.message)
          this.$store.dispatch('user/set_my_rooms')
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">

</style>