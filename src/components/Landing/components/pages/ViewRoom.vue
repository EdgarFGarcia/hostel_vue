<template>
    <v-container fluid class="pa-0 ma-0" fill-height>
      <v-row
      >
        <v-col
            :cols="isMobile() ? 12 : 8"
        >
            <v-btn
                text
                class="mt-5 ml-5"
                @click="back_to_rooms"
            >
                <v-icon>mdi-chevron-left</v-icon>
                back
            </v-btn>
            <h2 class="ma-5">{{ get_selected_room.name}}</h2>
            <v-card
                class="ma-5"
            >
                <v-card-title>
                    <v-img :src="`${img_url}/images/${get_selected_room.image}`" class="my-3" min="200" max="500"
                        :aspect-ratio="16/9" />
                    <v-row class="ml-1">
                        <v-col cols="12">
                            <div style="display: block;">
                                <v-icon color="#958de3">mdi-account</v-icon>
                                <small style="word-break: normal;">Sleeps {{get_selected_room.capacity}}</small>
                
                                <br v-if="isMobile()"/>
                                <v-icon color="#958de3" class="ml-2">mdi-bed-king</v-icon>
                                <small style="word-break: normal;">1 King-size Bed</small>
                                
                                <br v-if="isMobile()"/>
                                <v-icon color="#958de3" class="ml-2">mdi-bathtub</v-icon>
                                <small style="word-break: normal;">1 Bathroom</small>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <small style="word-break: normal;" v-for="(facilities, facility_id) in get_selected_room.facilities" :key="facility_id"
                                class="mt-5 mx-3">
                                <br v-if="isMobile()"/>
                                <v-icon color="#958de3">
                                    mdi-check-circle
                                </v-icon>
                                {{facilities}}
                            </small>
                        </v-col>
                        <v-col cols="12">
                            <small style="word-break: normal;">{{get_selected_room.full_details}}</small>
                        </v-col>
                    </v-row>
                </v-card-title>
            </v-card>
            <h2 class="ma-5">Rooms</h2>
            <v-card
                v-for="(room, roomindex) in get_selected_room.actual_rooms"
                :key="roomindex"
                class="ma-5"
                fluid
                style="display:inline-block"
            >
                <h3 class="pa-3">{{room.room_name}}</h3>
                <p class="pa-3">Floor: {{ room.room_floor }}</p>
                <v-card-actions>
                    <div v-if="get_user.udata != null">
                        <v-btn
                            v-if="get_user.udata.role_id == 2"
                            disabled
                            block
                            color="#6757F7"
                        >
                            Select room
                        </v-btn>
                        <v-btn
                            v-else
                            block
                            dark
                            color="#6757F7"
                            @click="select_room_for_reservation(room, get_selected_room)"
                        >
                            Select room
                        </v-btn>
                    </div>
                    <v-btn
                        v-else
                        block
                        dark
                        color="#6757F7"
                        @click="select_room_for_reservation(room, get_selected_room)"
                    >
                        Select room
                    </v-btn>
                </v-card-actions>
            </v-card>
            <h5 class="ma-5" v-if="get_selected_room.actual_rooms.length == 0">
                No rooms available
            </h5>
            <h2 class="ma-5">Reviews</h2>
            <v-card class="ma-5" elevation="0">
                <v-card-title>
                    <v-row class="ml-2 mb-5" v-if="get_selected_room.reviews.length > 0">
                        <v-col
                            cols="12"
                            class="mb-5"
                        >
                        </v-col>
                        <div
                            v-for="(review, reviewindex) in orderBy(get_selected_room.reviews, 'created_at', -1)"
                            :key="reviewindex"
                            class="ml-5 pt-5 pb-5 mb-5"
                            style="box-shadow:0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);width:95%"
                        >
                            <v-col cols="12" style="padding:0!important; display:flex;">
                                <strong style="word-break: normal;font-size:18px;">{{review.get_user.name}}</strong>
                                
                                <br v-if="isMobile()"/>
                                <star-rating
                                    read-only
                                    :increment=0.5
                                    :rating="review.rating"
                                    :show-rating=false
                                    :star-size=15
                                    class="ml-3"
                                />
                            </v-col>
                            <v-col cols="12" style="padding:0!important">
                                <v-icon>mdi-calendar</v-icon> <small>{{ moment(review.created_at).format("MMM DD, YYYY")}}</small>
                            </v-col>
                            <v-col cols="12" style="padding:0!important" class="mb-2">
                                
                            </v-col>
                            <v-col cols="12" style="padding:0!important">
                                <small>"{{review.review}}"</small>
                            </v-col>
                        </div>
                    </v-row>
                    <v-row class="ml-2 mb-5" v-else>
                        <v-col
                            cols="12"
                        >
                            <strong>Reviews</strong><br>
                            <small>No reviews yet</small>
                        </v-col>
                    </v-row>
                </v-card-title>
            </v-card>
        </v-col>
        
        <v-col
            cols="4"
            style="position: sticky;top: 0;height: 620px;overflow-y: scroll;"
            class="mt-15"
            v-if="!isMobile()"
        >
            <v-card
                class="ma-5"
            >
                <v-card-title class="text-small">
                    <small>Reservation Details</small>
                </v-card-title>
                <v-card-subtitle
                    v-if="Object.keys(get_reserve_this_room_selected).length > 0">
                    <h3>{{ get_reserve_this_room.room_name }}</h3>
                </v-card-subtitle>
                <v-card-text v-if="get_reserve_this_room.room_name != null">
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <label>Reservation Date</label>
                            <DatePicker
                                v-model="dates"
                                is-range
                                width="inherit"
                                :disabled-dates="disabled_days"
                                :min-date="new Date().toISOString().substr(0, 10)"
                            />
                            <div v-if="dates">
                                <label>{{ format(dates) }}</label>
                                <label
                                    style="display: block;"
                                    v-if="total != null"
                                >total nights of stay: {{ total }}</label>
                            </div>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <h5>Check in</h5>
                            <vuetify-time-select v-model="check_in"></vuetify-time-select>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <h5>Check out</h5>
                            <vuetify-time-select v-model="check_out"></vuetify-time-select>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <v-text-field
                                v-model="b.adult"
                                dense
                                type="number"
                                min="0"
                                oninput="validity.valid||(value='');"
                                outlined
                                label="# of Adult"
                                class="input_count"
                                @change="check_head_count"
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
                                min="0"
                                outlined
                                label="# of Child"
                                class="input_count"
                                @change="check_head_count"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select @change="check_discount" v-model="senior_pwd" filled dense label="Included senior or PWD?" :items="[{ text: 'Yes', value: true }, { text: 'No', value: false }]">
                            </v-select>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <!-- {{get_reserve_this_room_selected.capacity}} guests -->
                            {{ parseInt(b.adult) + parseInt(b.child) }} guest(s)
                            <label v-if="total > 0"> - {{total + 1}} day(s) & {{ total }} night(s)</label>
                        </v-col>
                        <v-col
                            cols="6"
                            v-if="total > 0"
                        >
                            {{ room_price * total + additional_price | currency('₱') }}
                        </v-col>
                        <v-col
                            cols="12"
                            v-if="total > 0"
                        >
                            Total {{ room_price * total + additional_price | currency('₱') }}
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text v-else>
                    <div v-if="get_user.udata != null">
                        <div v-if="get_user.udata.role_id == 2">
                            Admins may only view rooms
                        </div>
                    </div>
                    <div v-else>
                        Please select a room...
                    </div>
                </v-card-text>
                <v-card-actions v-if="get_reserve_this_room.room_name != null">
                    <v-btn
                        v-if="!booked"
                        block
                        color="#6757F7"
                        dark
                        @click="book_now"
                    >
                        Book
                    </v-btn>
                    <v-btn
                        v-else
                        block
                        color="#6757F7"
                        disabled
                    >
                        Please Wait
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="isMobile()">
        <v-dialog v-model="show_booking_details" persistent max-width="560">
            <v-card>
                <v-card-title class="text-small">
                    <small>Reservation Details</small>
                    <v-spacer/>
                    <v-btn text @click="show_booking_details = false">X</v-btn>
                </v-card-title>
                <v-card-subtitle
                    v-if="Object.keys(get_reserve_this_room_selected).length > 0">
                    <h3>{{ get_reserve_this_room.room_name }}</h3>
                </v-card-subtitle>
                <v-card-text v-if="get_reserve_this_room.room_name != null">
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <label>Reservation Date</label>
                            <DatePicker
                                v-model="dates"
                                is-range
                                width="inherit"
                                :disabled-dates="disabled_days"
                                :min-date="new Date().toISOString().substr(0, 10)"
                            />
                            <div v-if="dates">
                                <label>{{ format(dates) }}</label>
                                <label
                                    style="display: block;"
                                    v-if="total != null"
                                >total nights of stay: {{ total }}</label>
                            </div>
                        </v-col>
                        <v-col
                            :cols="isMobile() ? 12 : 6"
                        >
                            <h5>Check in</h5>
                            <vuetify-time-select v-model="check_in"></vuetify-time-select>
                        </v-col>
                        <v-col
                            :cols="isMobile() ? 12 : 6"
                        >
                            <h5>Check out</h5>
                            <vuetify-time-select v-model="check_out"></vuetify-time-select>
                        </v-col>
                        <v-col
                            :cols="isMobile() ? 12 : 6"
                        >
                            <v-text-field
                                v-model="b.adult"
                                dense
                                type="number"
                                min="0"
                                oninput="validity.valid||(value='');"
                                outlined
                                label="# of Adult"
                                class="input_count"
                                @change="check_head_count"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            :cols="isMobile() ? 12 : 6"
                        >
                            <v-text-field
                                v-model="b.child"
                                dense
                                type="number"
                                min="0"
                                outlined
                                label="# of Child"
                                class="input_count"
                                @change="check_head_count"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select @change="check_discount" v-model="senior_pwd" filled dense label="Included senior or PWD?" :items="[{ text: 'Yes', value: true }, { text: 'No', value: false }]">
                            </v-select>
                        </v-col>
                        <v-col
                            :cols="isMobile() ? 12 : 6"
                        >
                            <!-- {{get_reserve_this_room_selected.capacity}} guests -->
                            {{ parseInt(b.adult) + parseInt(b.child) }} guest(s)
                            <label v-if="total > 0"> - {{total + 1}} day(s) & {{ total }} night(s)</label>
                        </v-col>
                        <v-col
                            :cols="isMobile() ? 12 : 6"
                            v-if="total > 0"
                        >
                            {{ room_price * total + additional_price | currency('₱') }}
                        </v-col>
                        <v-col
                            cols="12"
                            v-if="total > 0"
                        >
                            Total {{ room_price * total + additional_price | currency('₱') }}
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text v-else>
                    <div v-if="get_user.udata != null">
                        <div v-if="get_user.udata.role_id == 2">
                            Admins may only view rooms
                        </div>
                    </div>
                    <div v-else>
                        Please select a room...
                    </div>
                </v-card-text>
                <v-card-actions v-if="get_reserve_this_room.room_name != null">
                    <v-btn
                        v-if="!booked"
                        block
                        color="#6757F7"
                        dark
                        @click="book_now"
                    >
                        Book
                    </v-btn>
                    <v-btn
                        v-else
                        block
                        color="#6757F7"
                        disabled
                    >
                        Please Wait
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import StarRating from 'vue-star-rating'
import Vue2Filters from 'vue2-filters'
import { DatePicker } from 'v-calendar';
export default {
  mixins: [Vue2Filters.mixin],
  components: {
      StarRating, DatePicker
  },
  props: [
  ],
  data: () => ({
    img_url: null,
    dates: [],
    result: null,
    total: null,
    disabled_days: [],
    additional_price: 0,
    b: {
        adult: 0,
        child: 0
    },
    check_in: null,
    check_out: null,
    menuin: false,
    menuout: false,
    booked: false,
    disable_booking: false,
    show_booking_details: false,
    senior_pwd: false,
    discount: 0,
    room_price: 0
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
        get_reserve_this_room_selected: 'room/get_reserve_this_room_selected',
        get_user:                       'auth/get_user'
    })
  },
  methods: {
    showSnackBar(message){
      this.$store.commit("auth/setMessage", 
      {show: true, message: message}, 
      {root: 1})
    },
    moment: function (time) {
        return moment(time);
    },
    select_room_for_reservation(room_data, selected_room_data){
        console.log(selected_room_data)
        this.show_booking_details = true
        this.dates = []
        this.$store.dispatch('room/set_reserve_this_room', room_data)
        this.$store.dispatch('room/set_selected_room_for_reservation', selected_room_data)
        this.room_price = this.get_reserve_this_room_selected.price
        this.discount = this.get_reserve_this_room_selected.price / 10
        this.$axios.post('/r/rooms/checked_in_dates', this.get_reserve_this_room.id)
            .then(({ data }) => {
                this.disabled_days = []
                data.data.forEach((check_in) => {

                    let dates = check_in.check_in_date_time.split(' ')
                    let newdate = parseInt(dates[1].slice(0, -1)) + check_in.duration
                    //let finaldate = dates[0] + ' ' + newdate.toString() + ', ' + dates[2]
                    //let finaldate = new Date(dates[2], '2', newdate.toString())
                    let finaldate = {
                        start: new Date(dates[2], moment().month(dates[0]).format("M") - 1, dates[1].slice(0, -1).toString()),
                        end: new Date(dates[2], moment().month(dates[0]).format("M") - 1, newdate.toString())
                    }
                    this.disabled_days.push(finaldate)
                })
            })
    },
    back_home(){
        this.$router.push({name: '/'})
        this.$store.commit('room/clear_reserve_this_room')
    },
    back_to_rooms(){
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
        first = new Date(data.start).toLocaleDateString(
            'en-us',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        )
        last = new Date(data.end).toLocaleDateString(
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
        this.total = difference_in_time / (1000 * 3600 * 24)
        return first + ' to ' + last;
    },
    check_discount(){
        if (this.senior_pwd) {
            this.room_price -= this.discount.toFixed(0)
        }
        else {
            this.room_price += this.discount.toFixed(0)
        }
        console.log(this.total)
    },
    check_head_count(){
        console.log(this.get_reserve_this_room_selected)
        const adult = this.b.adult
        const child = this.b.child
        const capacity = this.get_reserve_this_room_selected.max_capacity
        if(parseInt(adult) + parseInt(child) > capacity){
            this.showSnackBar('This room only has ' + capacity + ' max capacity / head count.')
            return
        }
        if(parseInt(adult) + parseInt(child) > this.get_reserve_this_room_selected.capacity){
            const additional_capacity = parseInt(adult) + parseInt(child) - this.get_reserve_this_room_selected.capacity
            this.additional_price = 200 * additional_capacity
            this.showSnackBar('This room charges an additional 200 per head above ' + this.get_reserve_this_room_selected.capacity + ' guests.')
            return
        }
        else{
            this.additional_price = 0
        }
    },
      async book_now() {

        
        this.booked = true
        const adult = this.b.adult
        const child = this.b.child
        // if(parseInt(adult) + parseInt(child) > this.get_reserve_this_room_selected.capacity){
        //     this.showSnackBar('This room only has 4 max capacity / head count')
        //     return
        // }
        let newdates = []
        newdates.push(moment(this.dates.start).format('YYYY-MM-DD'))
        newdates.push(moment(this.dates.end).format('YYYY-MM-DD'))
        console.log(this.get_user.udata)
        if (Object.keys(this.get_user).length === 0 || this.get_user.udata == null) {
            console.log('guest')
            this.$axios.post('/r/rooms/guest_book_room_now', {
                actual_room_data: this.get_reserve_this_room,
                capacity: parseInt(adult) + parseInt(child),
                date: newdates,
                payable: this.room_price * this.total + this.additional_price,
                check_in: this.check_in,
                check_out: this.check_out,
                adult_count: this.b.adult,
                child_count: this.b.child
            })
                .then(({ data }) => {
                    console.log(data)
                    if (data.response) {
                        this.$store.dispatch('auth/set_user', data)
                        alert('Booking successful! Your email is: ' + data.udata.email + ', and your password is: ' + data.udata.name + ', you can change this later.')
                        this.$router.push({ name: '/user_dashboard' })
                        return
                    }
                    this.booked = false
                    this.showSnackBar(data.message)
                    return
                })
        }
        else {
            console.log('user')
            await this.$axios.get('/r/rooms/get_single_room', { user_id: this.get_user.udata.id })
                .then(({ data }) => {
                    console.log(data.data.length)
                    if (data.data.length >= 1) {
                        this.showSnackBar('You may only book one room at a time')
                            this.booked = false
                        return
                    }
                    else {
                            this.$axios.post('/r/rooms/book_room_now', {
                                actual_room_data: this.get_reserve_this_room,
                                capacity: parseInt(adult) + parseInt(child),
                                date: newdates,
                                payable: this.room_price * this.total + this.additional_price,
                                check_in: this.check_in,
                                check_out: this.check_out,
                                adult_count: this.b.adult,
                                child_count: this.b.child
                            })
                                .then(({ data }) => {
                                    console.log(data)
                                    if (data.response) {
                                        this.showSnackBar('Booking successful!')
                                        this.$router.push({ name: '/user_dashboard' })
                                        return
                                    }
                                    this.booked = false
                                    this.showSnackBar(data.message)
                                    return
                                })
                    }
                })
        }
    },
    isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
        }
    },
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