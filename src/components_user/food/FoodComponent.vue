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
                                <small>{{food.price | currency('₱')}}</small>
                            </v-card-title>
                            <v-card-subtitle>
                                <label>{{food.desc}}</label>
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
                                    @click="order(food)"
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
                                <small>{{food.price | currency('₱')}}</small>
                            </v-card-title>
                            <v-card-subtitle>
                                <label>{{food.desc}}</label>
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
                                    @click="order(food)"
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
                                <small>{{food.price | currency('₱')}}</small>
                            </v-card-title>
                            <v-card-subtitle>
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
                                    @click="order(food)"
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
                <v-row>
                    <v-col
                        cols="3"
                        v-for="(food, foodindex) in transportation"
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
                                <small>{{food.price | currency('₱')}}</small>
                            </v-card-title>
                            <v-card-subtitle>
                                <label>{{food.desc}}</label>
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
                                    @click="order(food)"
                                >
                                    Request
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item
                value="tab-3"
            >
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
                                    @click="order(food)"
                                >
                                    Request
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>
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
            price:  '250',
            desc:   'Aromatic, Delicate, Drizzled, Encrusted.',
            image:  require('../../assets/sinigang.png')
        },
        {
            id:     2,
            name:   'Sizzling Sisig',
            price:  '250',
            desc:   'Aromatic, Delicate, Drizzled, Encrusted.',
            image:  require('../../assets/sisig.jpg')
        },
        {
            id:     3,
            name:   'Sizzling Hotdog',
            price:  '250',
            desc:   'Aromatic, Delicate, Drizzled, Encrusted.',
            image:  require('../../assets/hotdog.jpg')
        },
        {
            id:     4,
            name:   '1 Cup of Ice Tea',
            price:  '85',
            desc:   'Sweet.',
            image:  require('../../assets/iced tea.jpg')
        },
        {
            id:     5,
            name:   '1 Cup of Coffee',
            price:  '85',
            desc:   'Freshly Brewed Coffee.',
            image:  require('../../assets/coffee.jpg')
        },
        {
            id:     6,
            name:   'Coke in Can',
            price:  '85',
            desc:   'Sweet.',
            image:  require('../../assets/coke.jpg')
        },
        {
            id:     7,
            name:   'Sprite in Can',
            price:  '85',
            desc:   'Sweet.',
            image:  require('../../assets/sprite.jpg')
        },
        {
            id:     8,
            name:   'Root Beer in Can',
            price:  '85',
            desc:   'Sweet.',
            image:  require('../../assets/root beer.jpg')
        },
    ],
    dr_bread: [
        {
            id:     9,
            name:   'Croissant Beurre',
            price:  '85',
            desc:   '',
            image:  require('../../assets/bread1.jpg')
        },
        {
            id:     10,
            name:   'Pain Aux Raisins',
            price:  '105',
            desc:   '',
            image:  require('../../assets/bread2.jpg')
        },
        {
            id:     11,
            name:   'Pain Au Chocolat',
            price:  '95',
            desc:   '',
            image:  require('../../assets/bread3.jpg')
        },
        {
            id:     12,
            name:   'Torsade',
            price:  '105',
            desc:   '',
            image:  require('../../assets/bread4.jpg')
        },
        {
            id:     12,
            name:   'Small Baguette',
            price:  '40',
            desc:   '',
            image:  require('../../assets/bread5.jpg')
        },
        {
            id:     14,
            name:   'Regular Baguette',
            price:  '80',
            desc:   '',
            image:  require('../../assets/bread5.jpg')
        },
        {
            id:     15,
            name:   'Rye Bread',
            price:  '100',
            desc:   '',
            image:  require('../../assets/bread7.jpg')
        },
        {
            id:     16,
            name:   'Multigrain Bread',
            price:  '100',
            desc:   '',
            image:  require('../../assets/bread8.jpg')
        },
        {
            id:     17,
            name:   'Sourdough Bread',
            price:  '100',
            desc:   '',
            image:  require('../../assets/bread9.jpg')
        },
        {
            id:     18,
            name:   'Payes Bread',
            price:  '500',
            desc:   '',
            image:  require('../../assets/bread10.jpg')
        },
        {
            id:     19,
            name:   'Whole Wheat Bread',
            price:  '100',
            desc:   '',
            image:  require('../../assets/bread11.jpg')
        },
    ],
    dr_wine: [
        {
            id:     20,
            name:   'Salmon Rillettes',
            price:  '475',
            desc:   'Salmon confit with lemon and olive oil, topped with fresh herbs bavarois',
            image:  require('../../assets/Salmon Rilettes.jpg')
        },
        {
            id:     21,
            name:   'Cold Cuts Board',
            price:  '890',
            desc:   'Chefs selection of 4 Europeean cured meats served with pickles',
            image:  require('../../assets/Coldcuts on board.jpg')
        },
        {
            id:     22,
            name:   'Cheese Board',
            price:  '990',
            desc:   'Assortment of 4 cheeses served with pineapple mostarda',
            image:  require('../../assets/Cheeseboard.jpg')
        },
        {
            id:     23,
            name:   'Escargots (6 pcs)',
            price:  '590',
            desc:   'Traditional burgundy snails in shell, white wine almond powder & parsley garlic butter',
            image:  require('../../assets/Escargot.jpg')
        },
        {
            id:     24,
            name:   'French Oyster Fine De Claire',
            price:  '770',
            desc:   '3 oysters',
            image:  require('../../assets/French Oyster Fine De Claire.jpg')
        },
        {
            id:     25,
            name:   'French Oyster Fine De Claire',
            price:  '1400',
            desc:   '6 oysters',
            image:  require('../../assets/French Oyster Fine De Claire.jpg')
        },
        {
            id:     26,
            name:   'French Oyster Fine De Claire',
            price:  '2700',
            desc:   '12 oysters',
            image:  require('../../assets/French Oyster Fine De Claire.jpg')
        },
        {
            id:     27,
            name:   'La Soupe A Loignon Gratinee',
            price:  '550',
            desc:   '3 different kinds of onions, countryside bread crouton, gratinated with emmental cheese',
            image:  require('../../assets/La Soupe A Loignon Gratinee.jpg')
        },
        {
            id:     28,
            name:   'Osso Buco',
            price:  '1190',
            desc:   'Slow cooked beef shank (500 gr.) served with basil & garlic pasta',
            image:  require('../../assets/Osso Buco.jpg')
        },
        {
            id:     29,
            name:   'Penne Pasta',
            price:  '720',
            desc:   'Oyster and gemini mushrooms with penne in a truffle paste cream sauce, pecorino and parmigiano reggiano cheese',
            image:  require('../../assets/Pasta.jpg')
        },
        {
            id:     30,
            name:   'Poulet grand mere',
            price:  '880',
            desc:   'Yellow chicken breast on a rich tomato, mushrooms, potatoes and lardon sauce',
            image:  require('../../assets/Poulet grand mere.jpg')
        },
        {
            id:     31,
            name:   'Sausage platter',
            price:  '990',
            desc:   'A mix of 4 flavorful sausages',
            image:  require('../../assets/Sausage platter.jpg')
        },
        {
            id:     32,
            name:   'Seafood platter',
            price:  '1180',
            desc:   'Fresh tasmanian salmon fillet served with a rich seafood and vermouth sauce as basmati rice',
            image:  require('../../assets/Seafood platter.jpg')
        },
    ],
    transportation: [
        {
            id:     1,
            name:   'Request a car service',
            image:  require('../../assets/suv.jpg')
        }
    ],
    massage: [
        {
            id:     33,
            name:   'Swedish Massage',
            price:  '250',
            desc:   'It can help release muscle knots, and its also a good choice for when you want to fully relax during a massage.',
            image:  require('../../assets/massage1.jpg')
        },
        {
            id:     34,
            name:   'Hot stone massage',
            price:  '250',
            desc:   'This type of therapeutic massage is similar to a Swedish massage, only the massage therapist uses heated stones in lieu of or in addition to their hands.',
            image:  require('../../assets/massage2.jpg')
        },
        {
            id:     35,
            name:   'Aromatherapy massage',
            price:  '250',
            desc:   'Aromatherapy massages are best for people who enjoy scent and want to have an emotional healing component to their massage.',
            image:  require('../../assets/massage3.jpg')
        },
        {
            id:     36,
            name:   'Deep tissue massage',
            price:  '250',
            desc:   'Deep tissue massage uses more pressure than a Swedish massage. It’s a good option if you have muscle problems',
            image:  require('../../assets/massage4.jpg')
        }
    ]
  }),
  mounted () {
  },
  created () {
  },
  computed: {
  },
  methods: {
    async order(food){
        console.log(food)
        await this.$axios.post('/user/auth_user/order_food', food)
        .then(({data}) => {
            console.log(data)
            alert('Sent!')
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>