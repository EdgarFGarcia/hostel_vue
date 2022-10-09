<template>
    <v-container fill-height fluid>
      <v-row>
        <v-col
          cols="4"
          v-for="(room, roomindex) in get_my_rooms"
          :key="roomindex"
        >
          <v-card>
            <v-card-title class="text-small">
              <small>{{room.get_room_info.room_name}}</small>
              <v-spacer/>
              <small>Paid</small>
              <small
                v-if="!room.is_paid"
              >
                <v-icon small>mdi-cancel</v-icon>
              </small>
              <small
                v-else
              >
                <v-icon small>mdi-check-underline-circle-outline</v-icon>
              </small>
            </v-card-title>
            <v-card-subtitle>
              <label>Check-in Date: {{room.check_in_date_time}},  {{ room.time_in }}</label>
              <label
                style="display: block;"
              >Check-out Date: {{room.will_be_available_at}},  {{ room.time_out }}</label>
            </v-card-subtitle>
            <v-card-text>
              <label>Adult Count: {{room.adult_count}}</label>
              <label
                style="display: block;"
              >Child Count: {{room.child_count}}</label>
              <label>Total Payable: <strong style="text-decoration: underline;" >{{room.payable | currency('₱')}}</strong></label>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                text
                outlined
                @click="cancel_booking(room)"
              >
                cancel
              </v-btn>
              <v-btn
                color="#596377"
                dark
                class="pl-10 pr-10"
                @click="show_qr_code(room)"
              >
                Pay now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-dialog
          v-model="qr_code_model"
          persistent
          max-width="320"
        >
          <v-card>
            <v-card-title>
              <small>Account Payable Amount:</small>
            </v-card-title>
            <v-card-subtitle>
              {{get_payable_data.payable | currency('₱')}}
            </v-card-subtitle>
            <v-card-text>
              <strong>Scan QR Code using GCash App</strong>
              <v-row
                align="center"
                justify="center"
                class="mt-5"
              >
                <img
                  :src="require('../../assets/gcash_connector_hostel.png')"
                  contain
                  style="max-width: 175px; max-height: 175px;"
                  justify="center"
                />
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="qr_code_model = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="qr_code_model = false"
              >
                Send
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
    qr_code_model: false
  }),
  async mounted () {
    await this.$store.dispatch('user/set_my_rooms')
  },
  created () {
  },
  computed: {
    ...mapGetters({
      get_my_rooms:           'user/get_my_rooms',
      get_payable_data:       'user/get_payable_data'
    })
  },
  methods: {
    async cancel_booking(data){
      await this.$axios.delete(`r/rooms/cancel_reservation/${data.id}`)
      .then(({data}) => {
        if(data.response){
          alert(data.message)
          this.$store.dispatch('user/set_my_rooms')
        }
      })
    },
    show_qr_code(data){
      this.$store.dispatch('user/set_payable_data', data)
      this.qr_code_model = true
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>