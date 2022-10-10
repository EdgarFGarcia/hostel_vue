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
            <v-tab-item
                value="tab-4"
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
            <v-tab-item
                value="tab-5"
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
        },
        {
            id:     4,
            name:   'Dr. Wine'
        },
        {
            id:     5,
            name:   'Dr. Bread'
        }
    ],
    foods: [
        {
            id:     1,
            name:   'Sinigang',
            price:  '250',
            desc:   'Aromatic, Delicate, Drizzled, Encrusted.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     2,
            name:   'Sizzling Sisig',
            price:  '250',
            desc:   'Aromatic, Delicate, Drizzled, Encrusted.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     3,
            name:   'Sizzling Hotdog',
            price:  '250',
            desc:   'Aromatic, Delicate, Drizzled, Encrusted.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     4,
            name:   '1 Cup of Ice Tea',
            price:  '85',
            desc:   'Sweet.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     5,
            name:   '1 Cup of Coffee',
            price:  '85',
            desc:   'Freshly Brewed Coffee.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     6,
            name:   'Coke in Can',
            price:  '85',
            desc:   'Sweet.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     7,
            name:   'Sprite in Can',
            price:  '85',
            desc:   'Sweet.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     9,
            name:   'Root Beer in Can',
            price:  '85',
            desc:   'Sweet.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        }
    ],
    transportation: [
        {
            id:     1,
            name:   'Grab Car',
            price:  'Depends on Grab App',
            desc:   'Sendan. SUV',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     2,
            name:   'Taxi',
            price:  'Depends on Driver',
            desc:   'Street Taxis',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     2,
            name:   'Angkas',
            price:  'Depends on Driver',
            desc:   'Gnkas Motorcycle',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        }
    ],
    massage: [
        {
            id:     1,
            name:   'Swedish Massage',
            price:  '250',
            desc:   'It can help release muscle knots, and it’s also a good choice for when you want to fully relax during a massage.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     2,
            name:   'Hot stone massage',
            price:  '250',
            desc:   'This type of therapeutic massage is similar to a Swedish massage, only the massage therapist uses heated stones in lieu of or in addition to their hands.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     3,
            name:   'Aromatherapy massage',
            price:  '250',
            desc:   'Aromatherapy massages are best for people who enjoy scent and want to have an emotional healing component to their massage.',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        },
        {
            id:     4,
            name:   'Deep tissue massage',
            price:  '250',
            desc:   'Deep tissue massage uses more pressure than a Swedish massage. It’s a good option if you have muscle problems',
            image:  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
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