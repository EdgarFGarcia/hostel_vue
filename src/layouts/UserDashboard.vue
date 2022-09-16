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
                >
                    <v-btn
                        v-if="get_user.udata.email_verified_at == null"
                        block
                    >
                        <v-icon
                            class="mr-3"
                        >mdi-account-alert-outline</v-icon>
                        Verify Account
                    </v-btn>
                </v-card-subtitle>
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
                            <v-img height="220" v-if="get_user.udata.image == null" src="https://pic.onlinewebfonts.com/svg/img_546302.png"></v-img>
                            <v-img height="220" v-else :src="`${img_src}/${get_user.udata.image}`"></v-img>
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
                        v-for="(item, itemindex) in navigation"
                        :key="itemindex"
                        link
                        @click="item.url == '' ? logout() : $router.push(item.url)"
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
            icon:       'mdi-home-outline',
            label:      'Home',
            style:      'color: white',
            url:        {
                name:   '/user_dashboard'
            }
        },
        
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
        .then(({data}) => {
            if(data.response){
                this.$store.commit('auth/clear_user_state')
                this.$router.push({name: '/'})
            }
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>