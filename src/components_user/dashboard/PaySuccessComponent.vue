<template>
    <v-container fill-height fluid>
      <v-row>
        <v-col
          cols="12"
        >
            Payment successful!
        </v-col>
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
  }),
  async mounted () {
    if (this.get_payment_details.source_id != null){
        this.paymongo_gcash_charge_source()
    }
  },
  created () {
  },
  computed: {
    ...mapGetters({
      get_payment_details:    'user/get_payment_details',
      get_payable_data:       'user/get_payable_data'
    })
  },
  methods: {
      async paymongo_gcash_charge_source() {
        let data = {
            source_id: this.get_payment_details.source_id,
            amount: this.get_payment_details.amount,
            check_in_id: this.get_payment_details.check_in_id,
            user_id: this.get_payable_data.user_id
        }
        this.$axios.post('r/payment/paymongo_gcash_charge_source', data)
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>