<template>
    <div fluid>
        <v-tabs
            v-model="tab"
            background-color="#6757F7"
            dark
            grow
        >
            <v-tabs-slider></v-tabs-slider>

            <v-tab
                ripple
                href="#tab-1"
            >
                <h2>Home</h2>
            </v-tab>

            <v-tab
                ripple
                href="#tab-3"
                v-if="get_user_data == null"
            >
                <h2>Book Direct</h2>
            </v-tab>

            <v-tab
                ripple
                href="#tab-4"
                v-if="get_user_data != null && get_user_data.role_id != 3"
            >
                <h2>Rooms</h2>
            </v-tab>

        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item
                value="tab-1"
            >
                <Home/>
            </v-tab-item>
        </v-tabs-items>
        <v-tabs-items v-model="tab">
            <v-tab-item
                value="tab-2"
            >
                <strong
                    justify-center
                    align-center
                >
                    Page Under Construction
                </strong>
            </v-tab-item>
        </v-tabs-items>
        <v-tabs-items v-model="tab">
            <v-tab-item
                value="tab-3"
            >
                <Rooms/>
            </v-tab-item>
        </v-tabs-items>
        <v-tabs-items v-model="tab">
            <v-tab-item
                value="tab-4"
            >
                <Rooms/>
            </v-tab-item>
        </v-tabs-items>
        
    </div>
</template>

<script>
import Rooms from './components/RoomComponent.vue'
import Home from './components/pages/HomeComponent.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Rooms,
    Home
  },
  props: [
  ],
  data: () => ({
    tab: null
  }),
  mounted () {
  },
  created () {
  },
  computed: {
    ...mapGetters({
        get_user_data:              'auth/get_user_data'
    })
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>