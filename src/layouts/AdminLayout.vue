<template>
    <v-container fluid style="background-color: #F4F4F5 !important; height: 100%;" class="pa-0 ma-0">
        <!-- <Navigation/> -->
        <v-card
            elevation="12"
            width="256"
        >
            <v-navigation-drawer
                floating
                app
                color="#588BAD"
                class="no-border shadow"
            >
                <v-card-title
                    style="color: white;"
                >
                    Connector Hostel
                </v-card-title>
                <v-card-subtitle
                    style="color: white;"
                    v-if="get_user.udata.role_id == 2"
                >
                    Admin Connector Hostel
                </v-card-subtitle>
                <v-card-subtitle
                    style="color: white;"
                    v-else-if="get_user.udata.role_id == 3"
                >
                    Housekeeping Connector Hostel
                </v-card-subtitle>
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
                        @click="$router.push('/')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-chevron-left</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Back</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="$router.push('/admin_rooms')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-bed-double-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Room(s)</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        @click="$router.push('/admin_reservations')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-account-group-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Reservations</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        link
                        v-if="get_user.udata.role_id == 2"
                        @click="$router.push('/report_component')"
                    >
                        <v-list-item-icon>
                            <v-icon
                                style="color: white"
                            >mdi-chart-arc</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                style="color: white"
                            >Report</v-list-item-title>
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
    navigation: [
        {
            icon:       'mdi-chevron-left',
            label:      'Back',
            style:      'color: white',
            url:        {
                name:   '/'
            }
        },
        {
            icon:       'mdi-bed-double-outline',
            label:      'Room(s)',
            style:      'color: white',
            url:        {
                name:   '/admin_rooms'
            }
        },
        {
            icon:       'mdi-account-group-outline',
            label:      'Reservations',
            style:      'color: white',
            url:        {
                name:   '/admin_reservations'
            }
        },
        {
            icon:       'mdi-chart-arc',
            label:      'Report',
            style:      'color: white',
            url:        {
                name:   '/report_component'
            }
        },
        {
            icon:       'mdi-logout',
            label:      'Logout',
            style:      'color: white',
            url:        ''
        }
    ],
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
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>