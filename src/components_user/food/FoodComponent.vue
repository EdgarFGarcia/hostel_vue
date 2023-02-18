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
                <h1 class="ml-5">Food and Drinks</h1>
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
                                    @click="open_order(food)"
                                >
                                    Order
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <h1 class="ml-5">Dr. Bread</h1>
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
                                    @click="open_order(food)"
                                >
                                    Order
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <h1 class="ml-5">Dr. Wine</h1>
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
                                    :src="food.image"
                                    contain
                                    style="width: 250px; height: 250px;"
                                />
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                    text
                                    outlined
                                    style="textTransform: none !important;"
                                    @click="open_order(food)"
                                >
                                    Order
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <h1 class="ml-5">Buccaneers</h1>
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
                                    :src="food.image"
                                    contain
                                    style="width: 250px; height: 250px;"
                                />
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                    text
                                    outlined
                                    style="textTransform: none !important;"
                                    @click="open_order(food)"
                                >
                                    Order
                                </v-btn>
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
                        <v-date-picker
                            v-model="transpo_pick_up_date"
                            color="#596377"
                            width="inherit"
                            style="max-width:300px;"
                            :min="new Date().toISOString().substr(0, 10)"
                        ></v-date-picker>
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
                <v-date-picker
                    v-model="massage_date"
                    color="#596377"
                    width="inherit"
                    style="max-width:300px;"
                    :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
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
export default {
  components: {
  },
  props: [
  ],
  data: () => ({
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
    foods: [
        {
            id:     1,
            name:   'Sinigang',
            type:   'Food',
            price:  '250',
            desc:   'Aromatic, Delicate, Drizzled, Encrusted.',
            image:  require('../../assets/sinigang.png')
        },
        {
            id:     2,
            name:   'Sizzling Sisig',
            type:   'Food',
            price:  '250',
            desc:   'Aromatic, Delicate, Drizzled, Encrusted.',
            image:  require('../../assets/sisig.jpg')
        },
        {
            id:     3,
            name:   'Sizzling Hotdog',
            type:   'Food',
            price:  '250',
            desc:   'Aromatic, Delicate, Drizzled, Encrusted.',
            image:  require('../../assets/hotdog.jpg')
        },
        {
            id:     4,
            name:   '1 Cup of Ice Tea',
            type:   'Food',
            price:  '85',
            desc:   'Sweet.',
            image:  require('../../assets/iced tea.jpg')
        },
        {
            id:     5,
            name:   '1 Cup of Coffee',
            type:   'Food',
            price:  '85',
            desc:   'Freshly Brewed Coffee.',
            image:  require('../../assets/coffee.jpg')
        },
        {
            id:     6,
            name:   'Coke in Can',
            type:   'Food',
            price:  '85',
            desc:   'Sweet.',
            image:  require('../../assets/coke.jpg')
        },
        {
            id:     7,
            name:   'Sprite in Can',
            type:   'Food',
            price:  '85',
            desc:   'Sweet.',
            image:  require('../../assets/sprite.jpg')
        },
        {
            id:     8,
            name:   'Root Beer in Can',
            type:   'Food',
            price:  '85',
            desc:   'Sweet.',
            image:  require('../../assets/root beer.jpg')
        },
    ],
    dr_bread: [
        {
            id:     9,
            name:   'Croissant Beurre',
            type:   'Dr. Bread',
            price:  '85',
            desc:   '',
            image:  require('../../assets/bread1.jpg')
        },
        {
            id:     10,
            name:   'Pain Aux Raisins',
            type:   'Dr. Bread',
            price:  '105',
            desc:   '',
            image:  require('../../assets/bread2.jpg')
        },
        {
            id:     11,
            name:   'Pain Au Chocolat',
            type:   'Dr. Bread',
            price:  '95',
            desc:   '',
            image:  require('../../assets/bread3.jpg')
        },
        {
            id:     12,
            name:   'Torsade',
            type:   'Dr. Bread',
            price:  '105',
            desc:   '',
            image:  require('../../assets/bread4.jpg')
        },
        {
            id:     12,
            name:   'Small Baguette',
            type:   'Dr. Bread',
            price:  '40',
            desc:   '',
            image:  require('../../assets/bread5.jpg')
        },
        {
            id:     14,
            name:   'Regular Baguette',
            type:   'Dr. Bread',
            price:  '80',
            desc:   '',
            image:  require('../../assets/bread5.jpg')
        },
        {
            id:     15,
            name:   'Rye Bread',
            type:   'Dr. Bread',
            price:  '100',
            desc:   '',
            image:  require('../../assets/bread7.jpg')
        },
        {
            id:     16,
            name:   'Multigrain Bread',
            type:   'Dr. Bread',
            price:  '100',
            desc:   '',
            image:  require('../../assets/bread8.jpg')
        },
        {
            id:     17,
            name:   'Sourdough Bread',
            type:   'Dr. Bread',
            price:  '100',
            desc:   '',
            image:  require('../../assets/bread9.jpg')
        },
        {
            id:     18,
            name:   'Payes Bread',
            type:   'Dr. Bread',
            price:  '500',
            desc:   '',
            image:  require('../../assets/bread10.jpg')
        },
        {
            id:     19,
            name:   'Whole Wheat Bread',
            type:   'Dr. Bread',
            price:  '100',
            desc:   '',
            image:  require('../../assets/bread11.jpg')
        },
    ],
    dr_wine: [
        {
            id:     20,
            name:   'Salmon Rillettes',
            type:   'Dr. Wine',
            price:  '475',
            desc:   'Salmon confit with lemon and olive oil, topped with fresh herbs bavarois',
            image:  require('../../assets/Salmon Rilettes.jpg')
        },
        {
            id:     21,
            name:   'Cold Cuts Board',
            type:   'Dr. Wine',
            price:  '890',
            desc:   'Chefs selection of 4 Europeean cured meats served with pickles',
            image:  require('../../assets/Coldcuts on board.jpg')
        },
        {
            id:     22,
            name:   'Cheese Board',
            type:   'Dr. Wine',
            price:  '990',
            desc:   'Assortment of 4 cheeses served with pineapple mostarda',
            image:  require('../../assets/Cheeseboard.jpg')
        },
        {
            id:     23,
            name:   'Escargots (6 pcs)',
            type:   'Dr. Wine',
            price:  '590',
            desc:   'Traditional burgundy snails in shell, white wine almond powder & parsley garlic butter',
            image:  require('../../assets/Escargot.jpg')
        },
        {
            id:     24,
            name:   'French Oyster Fine De Claire',
            type:   'Dr. Wine',
            price:  '770',
            desc:   '3 oysters',
            image:  require('../../assets/French Oyster Fine De Claire.jpg')
        },
        {
            id:     25,
            name:   'French Oyster Fine De Claire',
            type:   'Dr. Wine',
            price:  '1400',
            desc:   '6 oysters',
            image:  require('../../assets/French Oyster Fine De Claire.jpg')
        },
        {
            id:     26,
            name:   'French Oyster Fine De Claire',
            type:   'Dr. Wine',
            price:  '2700',
            desc:   '12 oysters',
            image:  require('../../assets/French Oyster Fine De Claire.jpg')
        },
        {
            id:     27,
            name:   'La Soupe A Loignon Gratinee',
            type:   'Dr. Wine',
            price:  '550',
            desc:   '3 different kinds of onions, countryside bread crouton, gratinated with emmental cheese',
            image:  require('../../assets/La Soupe A Loignon Gratinee.jpg')
        },
        {
            id:     28,
            name:   'Osso Buco',
            type:   'Dr. Wine',
            price:  '1190',
            desc:   'Slow cooked beef shank (500 gr.) served with basil & garlic pasta',
            image:  require('../../assets/Osso Buco.jpg')
        },
        {
            id:     29,
            name:   'Penne Pasta',
            type:   'Dr. Wine',
            price:  '720',
            desc:   'Oyster and gemini mushrooms with penne in a truffle paste cream sauce, pecorino and parmigiano reggiano cheese',
            image:  require('../../assets/Pasta.jpg')
        },
        {
            id:     30,
            name:   'Poulet grand mere',
            type:   'Dr. Wine',
            price:  '880',
            desc:   'Yellow chicken breast on a rich tomato, mushrooms, potatoes and lardon sauce',
            image:  require('../../assets/Poulet grand mere.jpg')
        },
        {
            id:     31,
            name:   'Sausage platter',
            type:   'Dr. Wine',
            price:  '990',
            desc:   'A mix of 4 flavorful sausages',
            image:  require('../../assets/Sausage platter.jpg')
        },
        {
            id:     32,
            name:   'Seafood platter',
            type:   'Dr. Wine',
            price:  '1180',
            desc:   'Fresh tasmanian salmon fillet served with a rich seafood and vermouth sauce as basmati rice',
            image:  require('../../assets/Seafood platter.jpg')
        },
    ],
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
    buccaneers: [
        {
            id:     40,
            name:   'Pina Colada Tiger Prawns',
            type:   'Buccaneers',
            price:  '500',
            desc:   'Tiger prawns tempura, pineapple salsa, pina colada sauce',
            image:  require('../../assets/b1.jpg')
        },
        {
            id:     41,
            name:   'Pineapple Rice',
            type:   'Buccaneers',
            price:  '450',
            desc:   'Chicken or shrimps',
            image:  require('../../assets/b2.jpg')
        },
        {
            id:     42,
            name:   'West Indies Fish & Chips',
            type:   'Buccaneers',
            price:  '450',
            desc:   'Fishermans white fish, black bean salsa, sweet potato wedges',
            image:  require('../../assets/b3.jpg')
        },
        {
            id:     43,
            name:   'Caribbean Curry',
            type:   'Buccaneers',
            price:  '450',
            desc:   'Braised chicken, caribbean curry, coconut milk',
            image:  require('../../assets/b4.jpg')
        },
        {
            id:     44,
            name:   'Jamaican Jerk',
            type:   'Buccaneers',
            price:  '350',
            desc:   'Chicken or pork, marinated for 24 hours in Jamaican spices and slow-cooked on BBQ for 3 hours, served wiht plain rice, johnny cake and jerk ketchup',
            image:  require('../../assets/b5.jpg')
        },
        {
            id:     44,
            name:   'Jamaican Jerk',
            type:   'Buccaneers',
            price:  '500',
            desc:   'Gambas, marinated for 24 hours in Jamaican spices and slow-cooked on BBQ for 3 hours, served wiht plain rice, johnny cake and jerk ketchup',
            image:  require('../../assets/b5.jpg')
        },
        {
            id:     45,
            name:   'Bacon Plantains',
            type:   'Buccaneers',
            price:  '300',
            desc:   ' ',
            image:  require('../../assets/b6.jpg')
        },
        {
            id:     46,
            name:   'Vegetarian Samosas',
            type:   'Buccaneers',
            price:  '300',
            desc:   ' ',
            image:  require('../../assets/b7.jpg')
        },
        {
            id:     47,
            name:   'Jerk Chicken Rolls',
            type:   'Buccaneers',
            price:  '300',
            desc:   ' ',
            image:  require('../../assets/b8.jpg')
        },
        {
            id:     48,
            name:   'Coffee Bean Tacos',
            type:   'Buccaneers',
            price:  '300',
            desc:   ' ',
            image:  require('../../assets/9.jpg')
        },
        {
            id:     49,
            name:   'Haittian Fish Cakes',
            type:   'Buccaneers',
            price:  '300',
            desc:   ' ',
            image:  require('../../assets/b10.jpg')
        },
        {
            id:     50,
            name:   'Coconut Shrimps',
            type:   'Buccaneers',
            price:  '300',
            desc:   ' ',
            image:  require('../../assets/b11.jpg')
        },
        {
            id:     51,
            name:   'Kapitan Chicken Burger',
            type:   'Buccaneers',
            price:  '400',
            desc:   ' ',
            image:  require('../../assets/b12.jpg')
        },
        {
            id:     52,
            name:   'Jamaican Poke Bowl',
            type:   'Buccaneers',
            price:  '350',
            desc:   ' ',
            image:  require('../../assets/b13.jpg')
        },
    ],
    selected_food: null
  }),
  mounted () {
  },
  created () {
  },
  computed: {
  },
    methods: {
    
    showSnackBar(message) {
        this.$store.commit("auth/setMessage",
            { show: true, message: message },
            { root: 1 })
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