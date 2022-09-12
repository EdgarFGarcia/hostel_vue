<template>
    <div>
        <v-dialog
            transition="dialog-top-transition"
            max-width="720"
            :value="value"
            persistent
        >
            <v-card
                v-if="login_state"
            >
                <v-card-title class="text-h5">
                    <small>Login to get started</small>
                    <v-spacer></v-spacer>
                    <v-icon
                        @click="close_dialog"
                        style="cursor: pointer;"
                    >mdi-cancel</v-icon>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col
                            cols="12"
                            class="mt-5"
                        >
                            <v-text-field
                                v-model="v.username"
                                type="text"
                                dense
                                outlined
                                label="email"
                                prepend-inner-icon="mdi-at"
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="v.password"
                                :type="show_password ? 'text' : 'password'"
                                dense
                                outlined
                                label="password"
                                prepend-inner-icon="mdi-lock-outline"
                                :append-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="show_password = !show_password"
                                @keyup.enter="login"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="8"
                        >
                            Don't have an account yet? <label style="color: blue; cursor: pointer; text-decoration: underline;" @click="login_state = false">register here</label>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="pl-15 pr-15"
                        color="#596377"
                        dark
                        @click="login"
                    >
                        Login
                    </v-btn>                    
                </v-card-actions>
            </v-card>
            <v-card
                v-else
            >
                <v-card-title class="text-small">
                    <small>Register an account</small>
                    <v-spacer></v-spacer>
                    <v-icon
                        @click="close_dialog"
                        style="cursor: pointer;"
                    >mdi-cancel</v-icon>
                </v-card-title>
                <v-card-text>
                    <v-row
                        class="mt-5"
                    >
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                dense
                                outlined
                                label="Email"
                                v-model="r.email"
                                type="email"
                                prepend-inner-icon="mdi-at"
                            >
                            </v-text-field>
                            <v-text-field
                                dense
                                outlined
                                label="Name"
                                v-model="r.name"
                                type="text"
                                prepend-inner-icon="mdi-card-text-outline"
                            >

                            </v-text-field>
                            <v-text-field
                                dense
                                outlined
                                label="Password"
                                v-model="r.password"
                                :type="show_r_password ? 'text' : 'password'"
                                prepend-inner-icon="mdi-lock-outline"
                                :append-icon="show_r_password ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="show_r_password = ! show_r_password"
                            >
                            </v-text-field>
                            <v-text-field
                                dense
                                outlined
                                label="Password"
                                v-model="r.r_password"
                                :type="show_r_password2 ? 'text' : 'password'"
                                prepend-inner-icon="mdi-lock-outline"
                                :append-icon="show_r_password2 ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="show_r_password2 = ! show_r_password2"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="8"
                        >
                            go back to login page? <label @click="login_state = true" style="cursor: pointer; color: blue; text-decoration: underline;">click here</label>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="pl-15 pr-15"
                        color="#596377"
                        dark
                        @click="register"
                    >
                        Register
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
  components: {
  },
  props: [
    'value'
  ],
  data: () => ({
    show_password: false,
    login_state: true,
    v: {
        username: null,
        password: null
    },
    show_r_password: false,
    show_r_password2: false,
    r: {
        email: null,
        name: null,
        password: null,
        r_password: null
    }
  }),
  mounted () {
  },
  created () {
  },
  computed: {
  },
  methods: {
    close_dialog(){
        this.$emit('close_dialog')
        this.v = {}
        this.r = {}
        this.login_state = true
    },
    async login(){
        await this.$axios.post('user/login', {
            username:           this.v.username,
            password:           this.v.password
        })
        .then(({data}) => {
            if(data.response){
                this.$store.dispatch('auth/set_user', data)
                switch(data.udata.role_id){
                    case 1:
                        this.close_dialog()
                        this.$router.push({name: '/user_dashboard'})
                        return
                    case 2:
                        this.close_dialog()
                        this.$router.push({name: '/admin_dashboard'})
                        return
                }
            }
        })
    },
    async register(){
        await this.$axios.post('/user/register', {
            uname:              this.r.email,
            name:               this.r.name,
            password:           this.r.password,
            repeat_password:    this.r.r_password
        })
        .then(({data}) => {
            if(data.response){
                this.close_dialog()
                alert(data.message)
                return
            }
            alert(data.message)
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>