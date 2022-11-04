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
            id:     9,
            name:   'Mussels & French Fries All You Can Eat',
            price:  '850',
            desc:   '',
            image:  require('../../assets/wine1.jpg')
        },
        {
            id:     10,
            name:   'Free Flow Wine, Beer & Cocktail',
            price:  '850',
            desc:   '',
            image:  require('../../assets/wine2.jpg')
        },
    ],
    transportation: [
        {
            id:     1,
            name:   'Grab Car',
            price:  'Depends on Grab App',
            desc:   'Sedan. SUV',
            image:  require('../../assets/suv.jpg')
        },
        {
            id:     2,
            name:   'Taxi',
            price:  'Depends on Driver',
            desc:   'Street Taxis',
            image:  require('../../assets/taxi.jpg')
        },
        {
            id:     2,
            name:   'Angkas',
            price:  'Depends on Driver',
            desc:   'Angkas Motorcycle',
            image:  require('../../assets/motorcycle.jpg')
        }
    ],
    massage: [
        {
            id:     1,
            name:   'Swedish Massage',
            price:  '250',
            desc:   'It can help release muscle knots, and it’s also a good choice for when you want to fully relax during a massage.',
            //image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     2,
            name:   'Hot stone massage',
            price:  '250',
            desc:   'This type of therapeutic massage is similar to a Swedish massage, only the massage therapist uses heated stones in lieu of or in addition to their hands.',
            //image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     3,
            name:   'Aromatherapy massage',
            price:  '250',
            desc:   'Aromatherapy massages are best for people who enjoy scent and want to have an emotional healing component to their massage.',
            //image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     4,
            name:   'Deep tissue massage',
            price:  '250',
            desc:   'Deep tissue massage uses more pressure than a Swedish massage. It’s a good option if you have muscle problems',
            //image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
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
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>