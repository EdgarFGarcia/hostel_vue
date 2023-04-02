<template>
  <v-container fill-height fluid class="pa-5 ma-0">
    <h2 class="pb-10 ml-5">Overview</h2>
    <v-row>
      <v-col cols="7">
        <v-card style="border-radius: 16px;padding:20px;" width="100%">
          <v-card-title>
            Bookings <v-spacer/><v-btn text style="font-size:12px;" class="mt-1" @click="switch_tabs('/admin_reservations')"><u>View all bookings</u></v-btn>
          </v-card-title>
          <v-card-text>
            <BarChart />
          </v-card-text>
        </v-card>
        
        <v-card style="border-radius: 16px;padding:20px;margin-top:20px;" width="100%">
          <v-card-title>
            User Analytics <v-spacer/><v-btn text style="font-size:12px;" class="mt-1" @click="switch_tabs('/manage_users')"><u>View all users</u></v-btn>
          </v-card-title>
          <v-card-text>
            <BarChartAnalytics />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card style="border-radius: 16px;" width="100%">
          <v-card-title style="padding-left:20px;padding-top:40px;padding-bottom:0px;">
            Messages
          </v-card-title>
          <v-card-text>
            <Messages />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import { mapGetters } from 'vuex'
import BarChart from '../reports/BarChart'
import BarChartAnalytics from '../reports/BarChartAnalytics'
import Messages from '../messages/MessagesComponent'
export default {
  components: {
    BarChart, BarChartAnalytics, Messages
  },
  props: [
  ],
  data: () => ({
  }),
  mounted() {
  },
  created() {
  },
  computed: {
  },
  methods: {
    switch_tabs(route) {
      window.scrollTo({ top: 0, left: 0 })
      this.$router.push(route)
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss"></style>