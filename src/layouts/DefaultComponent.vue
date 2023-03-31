<template>
    <div>
        <v-app-bar
            color="white"
            height="auto"
        >
            <v-row>
                <v-col cols="12" align="right" class="mt-5 mr-5" style="margin-bottom:-50px">
                    <v-btn
                        v-if="Object.keys(get_user).length === 0"
                        class="pl-10 pr-10"
                        color="#6757F7"
                        dark
                        @click="show_login_dialog_fn"
                    >
                        Login
                    </v-btn>
                    <v-btn
                        v-else
                        outlined
                        class="pl-10 pr-10"
                        @click="go_to_board"
                    >
                        Dashboard
                    </v-btn>
                    <v-btn
                        class="ml-5"
                        icon
                        color="#6757F7"
                        href="https://web.facebook.com/whitebananamnl"
                        target='#'
                    >
                        <v-icon
                            small
                        >mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        color="#6757F7"
                        href="https://www.instagram.com/connectorhostel/"
                        target='#'
                    >
                        <v-icon
                            small
                        >mdi-instagram</v-icon>
                    </v-btn>
                    <LoginDialog
                        :value="show_login_dialog"
                        @close_dialog="close_dialog"
                    />
                </v-col>
                <v-col cols="12">
                    <img
                        :src="require('../assets/logo.png')"
                        class="mb-5"
                        style="max-width:150px;display:block;margin:0 auto;"
                    />
                </v-col>
            </v-row>
        </v-app-bar>
        <slot/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import LoginDialog from '../components/Auth/LoginComponent.vue'
export default{
    components: {
        LoginDialog
    },
    data: () => ({
        show_login_dialog: false
    }),
    methods: ({
        show_login_dialog_fn(){
            this.show_login_dialog = true
        },
        close_dialog(){
            this.show_login_dialog = false
        },
        go_to_home(){
            this.$router.push({name: '/'})
            this.$store.commit('room/clear_selected_states')
        },
        go_to_board(){
            switch(this.get_user.udata.role_id){
                case 1:
                    this.$router.push({name: '/user_dashboard'})
                    return
                case 2:
                    this.$router.push({ name: '/admin_dashboard'})
                    return
                case 3:
                    this.$router.push({ name: '/housekeeping_request'})
                    return
            }
        }
    }),
    computed: {
        ...mapGetters({
            get_user:               'auth/get_user'
        })
    }
}
</script>

<style scoped>
</style>