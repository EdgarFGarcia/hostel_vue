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
                        <!-- <v-col
                            cols="8"
                        >
                            Don't have an account yet? <label style="color: blue; cursor: pointer; text-decoration: underline;" @click="login_state = false">register here</label>
                        </v-col>
                        <v-col
                            cols="4"
                        >
                            Forgot Password
                        </v-col> -->
                    </v-row>
                </v-card-text>
                <v-card-title>
                    <small style="word-break: normal;">Don't have an account yet?<br v-if="isMobile()"/> <label style="color: blue; cursor: pointer; text-decoration: underline;" @click="login_state = false">register here</label></small>
                    <v-spacer/>
                    <small 
                        style="text-decoration: underline; cursor:pointer;"
                        @click="reset_password_fn"
                        :class="isMobile() ? 'mt-5' : ''"
                    >
                        Reset Password
                    </small>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="pl-15 pr-15"
                        color="#6757F7"
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
        <v-dialog
            v-model="reset_password_model"
            persistent
            width="500px"
        >
            <v-card>
                <v-card-title>
                    <small>Forgot your password? No worries we got your back</small>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        label="enter your email here..."
                        filled
                        dense
                        v-model="reset_password_email"
                        @keyup.enter="resend_password_fn"
                    >
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        text
                        class="pl-10 pr-10"
                        @click="cancel_forgot_password"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        class="pl-10 pr-10"
                        @click="resend_password_fn"
                    >
                        Resend New Password
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
    },
    reset_password_model: false,
    reset_password_email: null
  }),
  mounted () {
  },
  created () {
  },
  computed: {
  },
  methods: {
    showSnackBar(message){
      this.$store.commit("auth/setMessage", 
      {show: true, message: message}, 
      {root: 1})
    },
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
            this.showSnackBar(data.message)
            if(data.response){
                this.$store.dispatch('auth/set_user', data)
                switch(data.udata.role_id){
                    case 1:
                        this.close_dialog()
                        this.$router.push({name: '/'})
                        return
                    case 2:
                        this.close_dialog()
                        this.$router.push({name: '/admin_dashboard'})
                        return
                    case 3:
                        this.close_dialog()
                        this.$router.push({name: '/'})
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
                this.showSnackBar(data.message)
                return
            }
            this.showSnackBar(data.message)
        })
    },
    reset_password_fn(){
        this.reset_password_model = true
    },
    cancel_forgot_password(){
        this.reset_password_model = false
        this.reset_password_email = null
    },
    async resend_password_fn(){
        // console.log(this.reset_password_email)
        let tp = {
            email:  this.reset_password_email
        }
        await this.$axios.post('user/forgot_password', tp)
        .then(({data}) => {
            console.log(data)
            if(data.response){
                this.showSnackBar(data.message)
                this.cancel_forgot_password()
                return
            }else{
                this.showSnackBar(data.message)
                return
            }
        })
    },
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>