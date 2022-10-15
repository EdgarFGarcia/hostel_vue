<template>
    <v-container fluid class="pa-0 ma-0">
      <v-row
        v-if="get_selected_room.actual_rooms.length === 0"
        class="mt-15"
        justify="center"
      >
        <strong>
            <v-btn
                text
                @click="back_home"
            >
                <v-icon>mdi-chevron-left</v-icon>
                back
            </v-btn>
        Page Under Construction</strong>
      </v-row>
      <v-row
        v-else
      >
        <v-col
            cols="8"
        >
            <v-btn
                text
                class="mt-5 ml-5"
                @click="back_home"
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
                    <!-- <v-list
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
                    </v-list> -->
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        block
                        dark
                        color="#596377"
                        @click="select_room_for_reservation(room, get_selected_room)"
                    >
                        Select room
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col
            cols="4"
            style="
                position: sticky;
                top: 0;
                height: 620px;
                overflow-y: scroll;
            "
            class="mt-15"
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
                    {{ get_reserve_this_room.room_name }}
                </v-card-subtitle>
                <v-card-text>
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <label>Reservation Date</label>
                            <v-date-picker
                                v-model="dates"
                                range
                                color="#596377"
                                width="inherit"
                                :min="new Date().toISOString().substr(0, 10)"
                            ></v-date-picker>
                            <label>{{ format(dates) }}</label>
                            <label
                                style="display: block;"
                                v-if="total != null"
                            >total days of stay: {{ total }}</label>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <v-menu
                                ref="menu2"
                                v-model="menuin"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time_in"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="time_in"
                                    label="Check in"
                                    prepend-inner-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menuin"
                                    v-model="time_in"
                                    full-width
                                    @click:minute="$refs.menu2.save(time_in)"
                                    ampm-in-title
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <v-menu
                                ref="menu"
                                v-model="menuout"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time_out"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="time_out"
                                    label="Check out"
                                    prepend-inner-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menuout"
                                    v-model="time_out"
                                    full-width
                                    @click:minute="$refs.menu.save(time_out)"
                                    ampm-in-title
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <v-text-field
                                v-model="b.adult"
                                dense
                                type="number"
                                outlined
                                label="# of Adult"
                                class="input_count"
                                @click="check_head_count"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <v-text-field
                                v-model="b.child"
                                dense
                                type="number"
                                outlined
                                label="# of Child"
                                class="input_count"
                                @change="check_head_count"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <!-- {{get_reserve_this_room_selected.capacity}} guests -->
                            {{ parseInt(b.adult) + parseInt(b.child) }} guest(s) - 
                            <label>{{total}} day(s) & {{ total - 1 }} night(s)</label>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            {{ get_reserve_this_room_selected.price * total | currency('₱') }}
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            Total {{ get_reserve_this_room_selected.price * total | currency('₱') }}
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        block
                        color="#596377"
                        dark
                        @click="book_now"
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
    img_url: null,
    dates: [],
    result: null,
    total: null,
    b: {
        adult: null,
        child: null
    },
    time_in: null,
    time_out: null,
    menuin: false,
    menuout: false,
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
    },
    back_home(){
        this.$router.push({name: '/'})
        this.$store.commit('room/clear_reserve_this_room')
    },
    dates_fn(){
        this.first = this.dates[0]
        this.last = this.dates.pop()
    },
    format(data){
        let first;
        let last;
        if(data.length > 0){
            first = new Date(data[0]).toLocaleDateString(
                'en-us',
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }
            )
            last = new Date(data[1]).toLocaleDateString(
                'en-us',
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }
            )
            const ff = Number(new Date(first))
            const ll = Number(new Date(last))
            const difference_in_time = parseInt(ll) - parseInt(ff)
            this.total = difference_in_time / (1000 * 3600 * 24) + 1
        }
        return first + ' to ' + last;
    },
    check_head_count(){
        const adult = this.b.adult
        const child = this.b.child
        if(parseInt(adult) + parseInt(child) > this.get_reserve_this_room_selected.capacity){
            alert('This room only has 4 max capacity / head count. Any additional head count will be charged.')
            return
        }
    },
    async book_now(){
        const adult = this.b.adult
        const child = this.b.child
        // if(parseInt(adult) + parseInt(child) > this.get_reserve_this_room_selected.capacity){
        //     alert('This room only has 4 max capacity / head count')
        //     return
        // }
        await this.$axios.post('/r/rooms/book_room_now', {
            actual_room_data:           this.get_reserve_this_room,
            capacity:                   parseInt(adult) + parseInt(child),
            date:                       this.dates,
            payable:                    this.get_reserve_this_room_selected.price * this.total,
            time_in:                    this.time_in,
            time_out:                   this.time_out,
            adult_count:                this.b.adult,
            child_count:                this.b.child
        })
        .then(({data}) => {
            if(data.response){
                alert('booking successful')
                this.$router.push({name: '/'})
                return
            }
            alert(data.message)
            return
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
/* Chrome, Safari, Edge, Opera */
.input_count >>> input[type="number"] {
  -moz-appearance: textfield;
}
.input_count >>> input::-webkit-outer-spin-button,
.input_count >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>