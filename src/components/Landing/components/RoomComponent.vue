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
              <label>
                {{room.description}}
                <label
                  style="color: blue; text-decoration: underline; cursor: pointer;"
                >
                  read more details...
                </label>   
              </label>
              <v-row>
                <div
                  v-for="(facilities, facility_id) in room.facilities"
                  :key="facility_id"
                  class="mt-5 mx-5"
                >
                  <label>
                    <v-icon>
                      mdi-check-circle
                    </v-icon>
                    {{facilities}}
                  </label>
                </div>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#596377"
                style="textTransform: none !important;"
                dark
                class="pl-15 pr-15"
                @click="select_room(room)"
              >
                Book now
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
      get_rooms_list:       'room/get_rooms_list'
    })
  },
  methods: {
    select_room(data){
      this.$store.dispatch('room/set_selected_room', data)
      this.$router.push({name: '/view-room'})
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>