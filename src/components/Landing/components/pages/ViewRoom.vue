<template>
    <v-container fluid class="pa-0 ma-0">
      <v-row>
        <v-col
            cols="8"
        >
            <v-btn
                text
                class="mt-5 ml-5"
                @click="$router.push({name: '/'})"
            >
                <v-icon>mdi-chevron-left</v-icon>
                back
            </v-btn>
            <v-card
                v-for="(room, roomindex) in get_selected_room.actual_rooms"
                :key="roomindex"
                class="ma-5"
            >
                <v-card-title>
                    <v-img
                        :src="`${img_url}/images/${get_selected_room.image}`"
                        class="my-3"
                        min="200"
                        max="500"
                        :aspect-ratio="16/9"
                    />
                    <v-row
                        class="ml-1"
                    >
                        <v-col
                            cols="12"
                        >
                            <strong>{{room.room_name}}</strong>
                            <div
                                style="display: block;"
                            >
                                <v-icon>mdi-account</v-icon>
                                <small>Sleeps {{get_selected_room.capacity}}</small>

                                <v-icon
                                    class="ml-2"
                                >mdi-bed-king</v-icon>
                                <small>1 King-size Bed</small>

                                <v-icon
                                    class="ml-2"
                                >mdi-bathtub</v-icon>
                                <small>1 Bathroom</small>
                            </div>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <small
                                v-for="(facilities, facility_id) in get_selected_room.facilities"
                                :key="facility_id"
                                class="mt-5 mx-5"
                            >
                                <v-icon>
                                    mdi-check-circle
                                </v-icon>
                                {{facilities}}
                            </small>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <small>{{get_selected_room.full_details}}</small>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-list
                        subheader
                        two-line
                    >
                        <v-list-item
                            elevation="2"
                        >
                            <v-list-item-content>
                                <v-list-item-title style="text-decoration: underline;">10% Discount</v-list-item-title>

                                <v-list-item-subtitle>
                                <v-icon>
                                    mdi-information
                                </v-icon>
                                    Resort Fee
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                <v-icon>
                                    mdi-information
                                </v-icon>
                                    One-night deposit required
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <div>
                                    <strong>
                                        PHP {{get_selected_room.price}} / day
                                    </strong>
                                </div>
                            </v-list-item-action>
                            <v-list-item-action>
                                <v-btn
                                    dark
                                    color="#596377"
                                    class="pl-10 pr-10"
                                    @click="select_room_for_reservation(room, get_selected_room)"
                                >
                                    Select
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col
            cols="3"
            style="
                position: sticky;
                top: 0;
                height: 650px;
            "
        >
            <v-card
                class="ma-5"
            >
                <v-card-title class="text-small">
                    <small>Reservation Details</small>
                </v-card-title>
                <v-card-subtitle
                    v-if="Object.keys(get_reserve_this_room_selected).length > 0"
                >
                    Total {{ get_reserve_this_room_selected.price | currency('₱') }}
                </v-card-subtitle>
                <v-card-subtitle
                    v-if="Object.keys(get_reserve_this_room_selected).length > 0"
                >
                    {{ get_reserve_this_room.room_name }}
                </v-card-subtitle>
                <v-card-text>
                    <v-row>
                        <v-col
                            cols="6"
                        >
                            {{get_reserve_this_room_selected.capacity}} guests
                            <label>1 night</label>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            {{ get_reserve_this_room_selected.price | currency('₱') }}
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            Total {{ get_reserve_this_room_selected.price | currency('₱') }}
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        block
                        color="#596377"
                        dark
                    >
                        Book
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
  mounted () {
    this.img_url = process.env.VUE_APP_URL
  },
  created () {
  },
  computed: {
    ...mapGetters({
        get_selected_room:              'room/get_selected_room',
        get_reserve_this_room:          'room/get_reserve_this_room',
        get_reserve_this_room_selected: 'room/get_reserve_this_room_selected'
    })
  },
  methods: {
    select_room_for_reservation(room_data, selected_room_data){
        this.$store.dispatch('room/set_reserve_this_room', room_data)
        this.$store.dispatch('room/set_selected_room_for_reservation', selected_room_data)
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>