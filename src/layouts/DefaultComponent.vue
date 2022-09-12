<template>
    <div>
        <v-app-bar
            color="#A69C88"
            class="white--text"
            height="120"
        >
            <v-toolbar-title
                style="cursor: pointer;"
                @click="go_to_home()"
            >Connector Hostel</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                icon
                style="color: white;"
            >
                <v-icon
                    small
                >mdi-facebook</v-icon>
            </v-btn>
            <v-btn
                icon
                style="color: white;"
            >
                <v-icon
                    small
                >mdi-instagram</v-icon>
            </v-btn>
            <v-btn
                v-if="Object.keys(get_user).length === 0"
                dark
                outlined
                class="pl-10 pr-10"
                @click="show_login_dialog_fn"
            >
                Login
            </v-btn>
            <v-btn
                v-else
                dark
                outlined
                class="pl-10 pr-10"
                @click="go_to_board"
            >
                Dashboard
            </v-btn>
            <LoginDialog
                :value="show_login_dialog"
                @close_dialog="close_dialog"
            />
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
                    this.$router.push({name: '/admin_dashboard'})
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