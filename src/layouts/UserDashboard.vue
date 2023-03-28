<template>
    <v-container fluid style="background-color: #F4F4F5 !important; height: 100%;" class="pa-0 ma-0">
        <!-- <Navigation/> -->
        <v-card
            elevation="12"
            width="256"
        >
        <v-app-bar app clipped-left dark color="#447fa6">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Connector Hostel</v-toolbar-title>
        </v-app-bar>
            <v-navigation-drawer
                v-model="drawer"
                clipped
                app
                color="#588BAD"
                class="no-border shadow"
            >
                <v-card-title
                    style="color: white;"
                >
                    Connector Hostel
                </v-card-title>
                <v-card-text
                    style="color: white !important;"
                >
                    <v-list-item two-line
                        style="cursor: pointer;"
                        @click="$router.push({name: '/profile'})"
                    >
                        <v-avatar
                            color="grey"
                            size="30"
                            class="mr-2"
                        >
                            <v-img height="220" v-if="get_user.udata.image == null" contain src="../assets/avatar.png"></v-img>
                            <v-img height="220" v-else contain :src="`${img_src}/${get_user.udata.image}`"></v-img>
                        </v-avatar>
                        <v-list-item-content>
                        <v-list-item-title
                            style="fontSize: 14px; color: white;"
                        >
                            {{get_user.udata.name}}
                        </v-list-item-title>
                        <v-list-item-subtitle
                            style="fontSize: 12px; color: white;"
                        >
                            {{get_user.udata.email}}
                        </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-text>
                <v-divider></v-divider>
                <v-list
                    dense
                    rounded
                >
                    <v-list-item
                        link
                        @click="$router.push('/')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-home-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        @click="$router.push('/user_dashboard')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-bed-double-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >My Bookings</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        v-if="!get_user.udata.is_guest"
                        link
                        @click="$router.push('/user_fnb_order')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-face-agent</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Request for services</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <small style="color:white;" v-if="get_user.udata.is_guest">Please go to your profile and enter your email to access services</small>
                    <!--<v-list-item
                        v-if="!get_user.udata.is_guest"
                        link
                        @click="$router.push('/orders_user')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-food</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >My Orders</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>-->
                    <v-list-item
                        v-if="!get_user.udata.is_guest"
                        link
                        @click="$router.push('/checkout')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-cart</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Checkout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <template v-slot:append>
                    <div>
                        <v-list
                            dense
                            rounded
                        >
                            <v-list-item
                                v-for="(item, itemindex) in navigation2"
                                :key="itemindex"
                                link
                                @click="item.url.name == '' ?  logout_fn() : $router.push(item.url)"
                            >
                                <v-list-item-icon>
                                    <v-icon
                                        :style="item.style"
                                    >{{ item.icon }}</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title
                                        :style="item.style"
                                    >{{ item.label }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </template>
            </v-navigation-drawer>
        </v-card>
        <main class="main">
            <slot/>
        </main>
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
    drawer: false,
    navigation: [
        {
            icon:       'mdi-home-outline',
            label:      'Home',
            style:      'color: white',
            url:        {
                name:   '/'
            }
        },
        {
            icon:       'mdi-bed-double-outline',
            label:      'My Bookings',
            style:      'color: white',
            url:        {
                name:   '/user_dashboard'
            }
        },
        {
            icon:       'mdi-face-agent',
            label:      'Request for services',
            style:      'color: white',
            url:        {
                name:   '/user_fnb_order'
            }
        },
        {
            icon:       'mdi-food',
            label:      'My Orders',
            style:      'color: white',
            url:        {
                name:   '/orders_user'
            }
        }
    ],
    navigation2: [
        {
            icon:       'mdi-account',
            label:      'Profile',
            style:      'color: white',
            url:        {
                name:   '/profile'
            }
        },
        {
            icon:       'mdi-logout',
            label:      'Logout',
            style:      'color: white',
            url:        {
                name:   ''
            }
        }
    ],
    img_src: null
  }),
  mounted () {
  },
  created () {
    this.img_src = process.env.VUE_APP_URL
  },
  computed: {
    ...mapGetters({
        get_user:           'auth/get_user'
    })
  },
  methods: {
    async logout_fn(){
        await this.$axios.post('user/auth_user/logout')
        .then(() => {
            this.$store.commit('auth/clear_user_state')
            this.$router.push({name: '/'})
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>