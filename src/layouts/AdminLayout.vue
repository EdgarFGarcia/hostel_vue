<template>
    <v-container fluid style="background-color: #F4F4F5 !important; height: 100%;" class="pa-0 ma-0">
        <!-- <Navigation/> -->
        <v-app-bar app clipped-left dark color="#447fa6" elevation="0">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Connector Hostel</v-toolbar-title>
        </v-app-bar>
        <v-card
            elevation="12"
            style="border-radius:0px;"
        >
            <v-navigation-drawer
                v-model="drawer"
                app
                clipped
                color="#588BAD"
                class="no-border shadow"
            >
                <v-card-text
                    style="color: white !important;"
                >
                    <h2>Admin</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-list
                    dense
                    rounded
                >
                    <v-list-item
                        link
                        @click="switch_tabs('/')"
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
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/admin_dashboard')"
                        :class="{ active: tab == '/admin_dashboard'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-view-grid</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Dashboard</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/calendar')"
                        :class="{ active: tab == '/calendar'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-calendar</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Calendar</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/manage_users')"
                        :class="{ active: tab == '/manage_users'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-account-group-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Users</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/admin_reservations')"
                        :class="{ active: tab == '/admin_reservations'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-view-list-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Bookings</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/admin_rooms')"
                        :class="{ active: tab == '/admin_rooms'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-bed-double-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Manage Rooms</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/orders')"
                        :class="{ active: tab == '/orders'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-account-credit-card</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Orders</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/manage_food')"
                        :class="{ active: tab == '/manage_food'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-food</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Manage Menu</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 3"
                        @click="switch_tabs('/housekeeping_request')"
                        :class="{ active: tab == '/housekeeping_request'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-account-group-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Housekeeping Requests</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 3"
                        @click="switch_tabs('/housekeeping')"
                        :class="{ active: tab == '/housekeeping'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-account-group-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Rooms to check</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    
                    <!-- Messages -->
                    
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 3"
                        @click="switch_tabs('/messages')"
                        :class="{ active: tab == '/messages'}"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-chat</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Messages</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    
                    <v-list-item
                        link
                        style="margin-top:25%;"
                        @click="logout"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-logout</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
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
    tab: '/admin_dashboard'
  }),
  mounted () {
      this.tab = this.get_tab
    this.isMobile()
  },
  created () {
  },
  computed: {
    ...mapGetters({
        get_user: 'auth/get_user',
        get_tab: 'admin_layout/get_tab'
    })
  },
  methods: {
    async logout(){
        await this.$axios.post('user/auth_user/logout')
        .then(() => {
            this.$store.commit('auth/clear_user_state')
            this.$router.push({name: '/'})
        })
      },
      switch_tabs(route) {
        this.tab = route
        this.$store.dispatch('admin_layout/set_tab', route)
        window.scrollTo({ top: 0, left: 0 })
        this.$router.push(route)
      },
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                console.log("mobile")
                return true
            } else {
                console.log("desktop")
                this.drawer = true
                return false
            }
        },
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
.active {
    background-color:#4A718B;
}
</style>