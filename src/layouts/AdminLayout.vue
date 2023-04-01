<template>
    <v-container fluid style="background-color: #F4F4F5 !important; height: 100%;" class="pa-0 ma-0">
        <!-- <Navigation/> -->
        <v-app-bar app clipped-left dark color="#447fa6">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Connector Hostel</v-toolbar-title>
        </v-app-bar>
        <v-card
            elevation="12"
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
                    <v-list-item two-line
                        style="cursor: pointer;"
                    >
                        <v-avatar
                            color="grey"
                            size="30"
                            class="mr-2"
                        >
                            {{get_user.udata.name[0]}}
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
                        @click="switch_tabs('/admin_reservations')"
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
                        @click="switch_tabs('/manage_users')"
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
                        @click="switch_tabs('/admin_rooms')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-bed-double-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Rooms</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/manage_food')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-food</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Manage Food</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/orders')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-food</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Manage Order(s)</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="switch_tabs('/report_component')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-chart-arc</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Reports</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 3"
                        @click="switch_tabs('/housekeeping_request')"
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
                        v-if="get_user.udata.role_id > 1"
                        @click="switch_tabs('/messages')"
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
    drawer: true,
  }),
  mounted () {
  },
  created () {
  },
  computed: {
    ...mapGetters({
        get_user:           'auth/get_user'
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
        window.scrollTo({ top: 0, left: 0 })
        this.$router.push(route)
      }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>