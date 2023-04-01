<template>
  <v-container fill-height fluid class="pa-5 ma-0">
    <h2 class="pb-10 ml-5">Overview</h2>
    <v-row>
      <v-col cols="8">
        <v-card style="border-radius: 16px;padding:20px;" width="100%">
          <v-card-title>
            Bookings <v-spacer/><v-btn text style="font-size:12px;" class="mt-1" @click="$router.push('/admin_reservations')"><u>View all bookings</u></v-btn>
          </v-card-title>
          <v-card-text>
            <BarChart />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card style="border-radius: 16px;padding:20px;" width="100%">
          <v-card-title>
            Availablity
          </v-card-title>
          <v-card-text>
            test
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card style="border-radius: 16px;padding:20px;" width="100%">
          <v-card-title>
            User Analytics <v-spacer/><v-btn text style="font-size:12px;" class="mt-1" @click="$router.push('/manage_users')"><u>View all users</u></v-btn>
          </v-card-title>
          <v-card-text>
            <BarChartAnalytics />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card style="border-radius: 16px;padding:20px;" width="100%">
          <v-card-title>
            Availablity
          </v-card-title>
          <v-card-text>
            test
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
export default {
  components: {
    BarChart, BarChartAnalytics
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
  },
  watch: {
  }
}
</script>

<style scoped lang="scss"></style>