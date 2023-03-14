<template>
    <v-container fill-height fluid class="pa-0 ma-0">
        <v-tabs
          v-model="tab"
          grow
          dark
          color="basil"
          background-color="deep-purple accent-4"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="service in services"
            :key="service.id"
            :href="`#tab-${service.id}`"
          >
            <label
                style="color: white;"
            >
                {{ service.name }}
            </label>
          </v-tab>
        </v-tabs>
        <v-tabs-items 
            v-model="tab"
            class="mt-5 justify-center align-center"
            style="width: 100%;"
        >
            <v-tab-item
                value="tab-1"
            >
                <h1 class="ml-5" v-if="foods != null">Food and Drinks</h1>
                <v-row>
                    <v-col
                        cols="3"
                        v-for="(food, foodindex) in foods"
                        :key="foodindex"
                    >
                        <v-card
                            width="300"
                            elevation="0"
                            class="ma-5"
                        >
                            <v-card-title>
                                <strong>{{food.name}}</strong>
                                <v-spacer/>
                            </v-card-title>
                            <v-card-subtitle>
                                {{food.price | currency('₱')}}
                                <div><label>{{food.desc}}</label></div>
                            </v-card-subtitle>
                            <v-card-text>
                                <img
                                    :src="require('../../assets/' + food.image)"
                                    contain
                                    style="max-width: 250px; max-height: 250px;"
                                />
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                    v-if="food.available"
                                    text
                                    outlined
                                    style="textTransform: none !important;"
                                    @click="open_order(food)"
                                >
                                    Order
                                </v-btn>
                                <v-btn v-else disabled>Not available</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <h1 class="ml-5" v-if="dr_bread != null">Dr. Bread</h1>
                <v-row>
                    <v-col
                        cols="3"
                        v-for="(food, foodindex) in dr_bread"
                        :key="foodindex"
                    >
                        <v-card
                            width="300"
                            elevation="0"
                            class="ma-5"
                        >
                            <v-card-title>
                                <strong>{{food.name}}</strong>
                                <v-spacer/>
                            </v-card-title>
                            <v-card-subtitle>
                                {{food.price | currency('₱')}}
                                <div><label>{{food.desc}}</label></div>
                            </v-card-subtitle>
                            <v-card-text>
                                <img
                                    :src="require('../../assets/' + food.image)"
                                    contain
                                    style="max-width: 250px; max-height: 250px;"
                                />
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                    v-if="food.available"
                                    text
                                    outlined
                                    style="textTransform: none !important;"
                                    @click="open_order(food)"
                                >
                                    Order
                                </v-btn>
                                <v-btn v-else disabled>Not available</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <h1 class="ml-5" v-if="dr_wine != null">Dr. Wine</h1>
                <v-row>
                    <v-col
                        cols="3"
                        v-for="(food, foodindex) in dr_wine"
                        :key="foodindex"
                    >
                        <v-card
                            width="300"
                            elevation="0"
                            class="ma-5"
                        >
                            <v-card-title>
                                <strong>{{food.name}}</strong>
                                <v-spacer/>
                            </v-card-title>
                            <v-card-subtitle>
                                {{food.price | currency('₱')}}
                                <div style="height:50px"><label>{{food.desc}}</label></div>
                            </v-card-subtitle>
                            <v-card-text>
                                <img
                                    :src="require('../../assets/' + food.image)"
                                    contain
                                    style="width: 250px; height: 250px;"
                                />
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                    v-if="food.available"
                                    text
                                    outlined
                                    style="textTransform: none !important;"
                                    @click="open_order(food)"
                                >
                                    Order
                                </v-btn>
                                <v-btn v-else disabled>Not available</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <h1 class="ml-5" v-if="buccaneers != null">Buccaneers</h1>
                <v-row>
                    <v-col
                        cols="3"
                        v-for="(food, foodindex) in buccaneers"
                        :key="foodindex"
                    >
                        <v-card
                            width="300"
                            elevation="0"
                            class="ma-5"
                        >
                            <v-card-title>
                                <strong>{{food.name}}</strong>
                                <v-spacer/>
                            </v-card-title>
                            <v-card-subtitle>
                                {{food.price | currency('₱')}}
                                <div style="height:50px"><label>{{food.desc}}</label></div>
                            </v-card-subtitle>
                            <v-card-text>
                                <img
                                    :src="require('../../assets/' + food.image)"
                                    contain
                                    style="width: 250px; height: 250px;"
                                />
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                    v-if="food.available"
                                    text
                                    outlined
                                    style="textTransform: none !important;"
                                    @click="open_order(food)"
                                >
                                    Order
                                </v-btn>
                                <v-btn v-else disabled>Not available</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item
                value="tab-2"
            >
                <h1 class="ml-5">Request a Car Service</h1>
                <v-row
                    style="padding:50px;"
                >
                    <v-col
                        cols="6"
                    >
                        <v-text-field style="width:48%;display:inline-block;margin-right:5px;" v-model="transpo_pick_up" label="Pick up location"></v-text-field>
                        <v-text-field style="width:48%;display:inline-block;" v-model="transpo_drop_off" label="Drop off location"></v-text-field>
                        <v-textarea v-model="transpo_message" label="Message"></v-textarea>
                        <h2 style="margin-bottom:20px;margin-top:70px;">Transportation Type</h2>
                        <div style="width:300px;">
                            <h3 style="width:100px;display:inline-block;margin-right:20px;">Car</h3>
                            <h3 style="width:100px;display:inline-block;">Van</h3>
                        </div>
                        <div style="width:300px;">
                            <v-btn @click="transpo_car = true; transpo_van = false;" style="width:100px;height:100px;margin-right:20px;" :disabled="(transpo_car)?true:false">
                                <v-img style="width:100px;height:100px;" src="../../assets/car.png"></v-img>
                            </v-btn>
                            <v-btn @click="transpo_van = true; transpo_car = false;" style="width:100px;height:100px;" :disabled="(transpo_van)?true:false">
                                <v-img style="width:100px;height:100px;" src="../../assets/van.png" ></v-img>
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col
                        cols="4"
                    >
                        <h2 style="margin-bottom:20px;">Pick up date</h2>
                        <DatePicker
                            v-model="transpo_pick_up_date"
                            color="#596377"
                            width="inherit"
                            :available-dates="available_dates"
                        />
                        <h2 style="margin-bottom:20px;">Pick up time</h2>
                        <vuetify-time-select style="max-width:300px;" v-model="transpo_pick_up_time"></vuetify-time-select>
                        <br>
                    </v-col>
                    <v-col cols="2"></v-col>
                    <v-col cols="12">
                        <v-btn color="primary" @click="book_transpo">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item
                value="tab-3"
            >
                <h1 class="ml-5">Spa and Massage</h1>
                <v-row>
                    <v-col
                        cols="3"
                        v-for="(food, foodindex) in massage"
                        :key="foodindex"
                    >
                        <v-card
                            width="300"
                            elevation="0"
                            class="ma-5"
                        >
                            <v-card-title>
                                <strong>{{food.name}}</strong>
                            </v-card-title>
                            <v-card-subtitle>
                                {{food.price | currency('₱')}}
                                <div style="height:100px"><label>{{food.desc}}</label></div>
                            </v-card-subtitle>
                            <v-card-text>
                                <img
                                    :src="food.image"
                                    contain
                                    style="max-width: 250px; max-height: 250px;"
                                />
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                    text
                                    outlined
                                    style="textTransform: none !important;"
                                    @click="open_massage_model(food)"
                                >
                                    Request
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>

        <v-row justify="center">
        <v-dialog v-model="massage_model" persistent max-width="400">
            <v-card>
            <v-card-title class="mb-5">
                <small>Please select your schedule</small>
            </v-card-title>
            <v-card-text>
                <DatePicker
                    v-model="massage_date"
                    color="#596377"
                    width="inherit"
                    :available-dates="available_dates"
                />
                <vuetify-time-select style="max-width:300px;" v-model="massage_time"></vuetify-time-select>
            </v-card-text>
            <v-card-actions>
                <v-btn dark @click="submit_massage">Submit</v-btn>
                <v-btn dark @click="massage_model = false">Cancel</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        </v-row>

        <v-row justify="center">
        <v-dialog v-model="order_quantity" persistent max-width="400">
            <v-card>
            <v-card-title class="mb-5">
                <small>Please select your quantity</small>
            </v-card-title>
            <v-card-text>
                <div class="wrapper">
                    <button class="btn btn--minus" @click="changeQuantity('-1')" type="button" name="button">
                    -
                    </button>
                    <input class="quantity" type="text" name="name" :value="quantity">
                    <button class="btn btn--plus" @click="changeQuantity('1')" type="button" name="button">
                        +
                    </button>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    text
                    outlined
                    style="textTransform: none !important;"
                    @click="order()"
                >
                    Order
                </v-btn>
                <v-btn dark @click="close_order">Cancel</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { DatePicker } from 'v-calendar';
export default {
  components: {
    DatePicker
  },
  props: [
  ],
  data: () => ({
    available_dates: [],
    tab: null,
    quantity: 1,
    transpo_pick_up: "Connector Hostel",
    transpo_drop_off: null,
    transpo_pick_up_date: null,
    transpo_pick_up_time: null,
    transpo_message: null,
    transpo_car: false,
    order_quantity: false,
    transpo_van: false,
    massage_model: false,
    massage_order: null,
    massage_date: null,
    massage_time: null,
    services: [
        {
            id:     1,
            name:   'Food'
        },
        {
            id:     2,
            name:   'Transportation'
        },
        {
            id:     3,
            name:   'Spa & Massage'
        }
    ],
    foods: null,
    dr_bread: null,
    dr_wine: null,
    buccaneers: null,
    massage: [
        {
            id:     33,
            name:   'Swedish Massage',
            type:   'Massage and Spa',
            price:  '250',
            desc:   'It can help release muscle knots, and its also a good choice for when you want to fully relax during a massage.',
            image:  require('../../assets/massage1.jpg')
        },
        {
            id:     34,
            name:   'Hot stone massage',
            type:   'Massage and Spa',
            price:  '250',
            desc:   'This type of therapeutic massage is similar to a Swedish massage, only the massage therapist uses heated stones in lieu of or in addition to their hands.',
            image:  require('../../assets/massage2.jpg')
        },
        {
            id:     35,
            name:   'Aromatherapy',
            type:   'Massage and Spa',
            price:  '250',
            desc:   'Aromatherapy massages are best for people who enjoy scent and want to have an emotional healing component to their massage.',
            image:  require('../../assets/massage3.jpg')
        },
        {
            id:     36,
            name:   'Deep tissue massage',
            type:   'Massage and Spa',
            price:  '250',
            desc:   'Deep tissue massage uses more pressure than a Swedish massage. Its a good option if you have muscle problems',
            image:  require('../../assets/massage4.jpg')
        }
    ],
    transportation: [
        {
            id:     37,
            name:   'Car',
            type:   'Transportation',
            price:  'Price varies',
            image:  require('../../assets/car.jpg')
        },
        {
            id:     38,
            name:   'Sedan',
            type:   'Transportation',
            price:  'Price varies',
            image:  require('../../assets/suv.jpg')
        },
        {
            id:     39,
            name:   'SUV',
            type:   'Transportation',
            price:  'Price varies',
            image:  require('../../assets/sedan.jpg')
        }
    ],
    selected_food: null
  }),
  mounted () {
    this.get_available_dates()
    this.get_all_food()
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
    showSnackBar(message) {
        this.$store.commit("auth/setMessage",
            { show: true, message: message },
            { root: 1 })
    },
    moment: function (time) {
        return moment(time);
    },
    async get_all_food(){
        await this.$axios.get('/user/auth_user/get_all_food')
            .then(({ data }) => {
                console.log(data.dr_wine)
                this.foods = data.Food
                this.dr_bread = data.dr_bread
                this.dr_wine = data.dr_wine
                this.buccaneers = data.Buccaneers
            })
    },
    async get_available_dates(){
        await this.$axios.get('/r/rooms/get_single_room_checked_in', { user_id: this.get_user.udata.id })
            .then(({ data }) => {
                console.log(data)
                if (data.data != null) {
                    
                    let dates = data.data.check_in_date_time.split(' ')
                    console.log(dates)
                    let newdate = parseInt(dates[1].slice(0, -1)) + data.data.duration
                    console.log(newdate)
                    //let finaldate = dates[0] + ' ' + newdate.toString() + ', ' + dates[2]
                    //let finaldate = new Date(dates[2], '2', newdate.toString())
                    let finaldate = {
                        start: new Date(dates[2], moment().month(dates[0]).format("M") - 1, dates[1].slice(0, -1).toString()),
                        end: new Date(dates[2], moment().month(dates[0]).format("M") - 1, newdate.toString())
                    }
                    console.log(finaldate)
                    this.available_dates.push(finaldate)
                }
                else {
                    this.available_dates = null
                }
            })  
    },
    open_order(food){
        this.selected_food = food
        this.order_quantity = true
    },
    close_order(){
        this.selected_food = null
        this.order_quantity = false
        this.quantity = 1
    },
    async order(){
        console.log(this.selected_food, this.quantity)
        await this.$axios.post('/user/auth_user/order_food', { food: this.selected_food, quantity: this.quantity })
        .then(({data}) => {
            console.log(data)
            this.close_order()
            this.showSnackBar('Sent!')
        })
      },
    changeQuantity: function (num) {
            this.quantity += +num
            console.log(this.quantity)
            !isNaN(this.quantity) && this.quantity > 0 ? this.quantity : this.quantity = 0;

        },
    open_massage_model(order){
        this.massage_order = order
        console.log(this.massage_order)
        this.massage_model = true
    },
    async submit_massage(){
        this.massage_date = moment(this.massage_date).format('YYYY-MM-DD')
        console.log(this.massage_date)
        let payload = {
            order: this.massage_order,
            date: this.massage_date,
            datetime: this.massage_date + ' ' + this.massage_time,
            time: this.massage_time
        }
        console.log(payload)
        await this.$axios.post('/user/auth_user/book_massage', payload)
        .then(({data}) => {
            console.log(data)
            if (data.response == false) {
                this.showSnackBar(data.message)
            }
            else{
                this.showSnackBar('Request sent!')
                this.massage_model = false
            }
        })
    },
    async book_transpo(){
        let ttype = null
        if (this.transpo_car || this.transpo_van){
            if (this.transpo_car) {
                ttype = "Car"
            }
            else {
                ttype = "Van"
            }
        }
        this.transpo_pick_up_date = moment(this.transpo_pick_up_date).format('YYYY-MM-DD')
        console.log(this.transpo_pick_up_date)
        let payload = {
            transpo_pick_up: this.transpo_pick_up,
            transpo_drop_off: this.transpo_drop_off,
            transpo_pick_up_date: this.transpo_pick_up_date + ' ' + this.transpo_pick_up_time,
            transpo_pick_up_time: this.transpo_pick_up_time,
            transpo_message: this.transpo_message,
            transpo_type: ttype,
        }
        console.log(payload)
        await this.$axios.post('/user/auth_user/book_transpo', payload)
        .then(({data}) => {
            if(data.response == false){
                this.showSnackBar(data.message)
                return
            }
            console.log(data)
            this.showSnackBar('Sent!')
            this.transpo_pick_up = null
            this.transpo_drop_off = null
            this.transpo_pick_up_date = null
            this.transpo_pick_up_time = null
            this.transpo_message = null
            this.transpo_car = false
            this.transpo_van = false
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
/* Product Quantity */
.wrapper {
	height: 30px;
	display: flex;
}
.quantity {
  border: none;
  text-align: center;
    width: 30px;
 
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
	border: 1px solid #E1E8EE;
}

.btn {
	border: 1px solid #E1E8EE;
  width: 30px;
  background-color: #E1E8EE;
/*   border-radius: 6px; */
  cursor: pointer;
}
button:focus,
input:focus {
  outline:0;
}
</style>