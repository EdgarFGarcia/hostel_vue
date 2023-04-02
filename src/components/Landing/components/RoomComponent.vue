<template>
    <v-container fill-height fluid>
      <v-row>
        <v-col
          cols="3"
          v-for="(room, roomindex) in get_rooms_list"
          :key="roomindex"
        >
          <v-card
            elevation="2"
          >
            <v-card-title class="text-h5">
              <strong>{{room.name}}</strong>
            </v-card-title>
            <v-card-subtitle>
              <strong>Price: {{room.price | currency('₱')}}</strong>
            </v-card-subtitle>
            <v-card-text>
              <v-img
                :src="`${img_url}/images/${room.image}`"
                class="my-3"
                max-height="450"
                max-width="fit"
              />
              <label style="display:block;height:120px">
                {{room.description}}
                <!--<label
                  style="color: blue; text-decoration: underline; cursor: pointer;"
                >
                  read more details...
                </label>-->
              </label>
              <v-row style="height:200px">
                <div
                  v-for="(facilities, facility_id) in room.facilities"
                  :key="facility_id"
                  class="mt-5 mx-5"
                >
                  <label>
                    <v-icon
                      color="#6757F7"
                    >
                      mdi-check-circle
                    </v-icon>
                    {{facilities}}
                  </label>
                </div>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="#6757F7"
                style="textTransform: none !important;width:50%"
                dark
                @click="select_room(room)"
              >
                <div v-if="get_user.udata != null"><div v-if="get_user.udata.role_id == 2">View room</div><div v-else>Book now</div></div>
                <div v-else>Book now</div>
              </v-btn>              
            </v-card-actions>
          </v-card>
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
    img_url: null
  }),
  async mounted () {
    await this.$store.dispatch('room/fetch_rooms')
  },
  created () {
    this.img_url = process.env.VUE_APP_URL
  },
  computed: {
    ...mapGetters({
      get_rooms_list: 'room/get_rooms_list',
        get_user: 'auth/get_user'
    })
  },
  methods: {
    select_room(data){
      this.$store.dispatch('room/set_selected_room', data)
      window.scrollTo({ top: 0, left: 0 })
      this.$router.push({name: '/view-room'})
    },
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log("mobile")
        return true
      } else {
        console.log("desktop")
        return false
      }
    },
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>