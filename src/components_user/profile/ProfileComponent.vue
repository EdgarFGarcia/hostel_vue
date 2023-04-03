<template>
    <v-container fill-height fluid>
      <v-row>
        <v-col :cols="isMobile() ? 12 : 4">
            <v-card class="pt-5 pl-5 pr-5">
                <v-card-title class="justify-center">
                    <v-avatar
                        color="grey"
                        size="150"
                        v-if="get_user_data.image == null"
                    >
                        <v-img
                            src="../../assets/avatar.png"
                            :aspect-ratio="1"
                        />
                    </v-avatar>
                    <v-avatar
                        v-else
                        color="grey"
                        size="150"
                    >
                        <v-img
                            :src="`${img_src}/${get_user_data.image}`"
                            :aspect-ratio="1"
                        />
                    </v-avatar>
                </v-card-title>
                <v-card-subtitle style="text-align:center;">
                    <strong><h2 class="mt-3">{{ get_user_data.name }}</h2></strong>
                    <v-spacer/>
                    <h6 class="mt-2" style="fontSize: 14px;">User since: {{get_user_data.created_at}}</h6>
                    <v-spacer/>
                </v-card-subtitle>
            </v-card>
            <br>
            <v-btn class="primary" style="width:100%;" @click="new_password = true">Change Password</v-btn>
            <v-btn
                color="primary"
                class="pl-15 pr-15 mt-5"
                style="width:100%;"
                dark
                @click="edit_profile_fn"
            >
                Save changes to profile
            </v-btn>
        </v-col>
        <v-col :cols="isMobile() ? 12 : 8">
            <v-card class="pt-5 pl-5 pr-5">
                <v-row>
                    <v-col
                        :cols="isMobile() ? 12 : 6"
                    >
                        Status
                        <v-text-field
                            outlined
                            dense
                            disabled
                            value="Guest"
                            v-if="get_user_data.is_guest"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-account-alert </v-icon> 
                            </template>
                        </v-text-field>
                        <v-text-field
                            outlined
                            dense
                            disabled
                            value="Verified"
                            v-else
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-account-alert </v-icon> 
                            </template>
                        </v-text-field>
                        Profile Picture
                        <v-file-input
                            v-model="e.image"
                            label="Browse..."
                            prepend-icon=""
                            outlined
                            dense
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-attachment </v-icon> 
                            </template>
                        </v-file-input>
                        Full Name
                        <v-text-field
                            outlined
                            dense
                            v-model="e.name"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-account </v-icon> 
                            </template>
                        </v-text-field>
                        Email
                        <v-text-field
                            type="email"
                            outlined
                            dense
                            v-model="e.email"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-at </v-icon> 
                            </template>
                        </v-text-field>
                        Mobile Number
                        <v-text-field
                            type="number"
                            dense
                            outlined
                            v-model="get_user_data.mobile"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-phone </v-icon> 
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col
                        :cols="isMobile() ? 12 : 6"
                    >
                        Age
                        <v-text-field
                            outlined
                            dense
                            v-model="get_user_data.age"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-calendar-account </v-icon> 
                            </template>
                        </v-text-field>
                        Gender
                        <v-select
                            outlined
                            dense
                            v-model="get_user_data.gender"
                            :items="['Male', 'Female', 'Non-binary']"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-gender-male-female </v-icon> 
                            </template>
                        </v-select>
                        Student
                        <v-select
                            outlined
                            dense
                            v-model="get_user_data.student"
                            :items="[{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }]"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-account-school </v-icon> 
                            </template>
                        </v-select>
                        Vacationer
                        <v-select
                            outlined
                            dense
                            v-model="get_user_data.vacationer"
                            :items="[{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }]"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-palm-tree </v-icon> 
                            </template>
                        </v-select>
                        Foreigner
                        <v-select
                            outlined
                            dense
                            v-model="get_user_data.foreigner"
                            :items="[{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }]"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon small style="position: relative; top:4px;"> mdi-passport </v-icon> 
                            </template>
                        </v-select>
                    </v-col>
                </v-row>
            </v-card>
            <v-btn
                v-if="isMobile()"
                color="primary"
                class="pl-15 pr-15 mt-5"
                style="width:100%;"
                dark
                @click="edit_profile_fn"
            >
                Save changes to profile
            </v-btn>
        </v-col>
      </v-row>
        <v-dialog
            transition="dialog-top-transition"
            max-width="720"
            v-model="profile_edit_state"
            persistent
        >
            <v-card>
                <v-card-title
                    class="text-small"
                >
                    <small>Profile Edit</small>
                    <v-spacer/>
                    <v-btn
                        icon
                        @click="close_profile_edit"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="primary"
                        class="pl-15 pr-15"
                        dark
                        @click="edit_profile_fn"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-dialog
            transition="dialog-top-transition"
            max-width="720"
            v-model="new_password"
            persistent
        >
            <v-card>
                <v-card-title
                    class="text-small"
                >
                    <small>Password Edit</small>
                    <v-spacer/>
                    <v-btn
                        icon
                        @click="new_password = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col
                            cols="12"
                        >
                                <v-text-field
                                    dense
                                    outlined
                                    label="New Password"
                                    v-model="r.password"
                                    :type="show_r_password ? 'text' : 'password'"
                                    prepend-inner-icon="mdi-lock-outline"
                                    :append-icon="show_r_password ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append="show_r_password = !show_r_password"
                                >
                                </v-text-field>
                                <v-text-field
                                    dense
                                    outlined
                                    label="Retype New Password"
                                    v-model="r.r_password"
                                    :type="show_r_password2 ? 'text' : 'password'"
                                    prepend-inner-icon="mdi-lock-outline"
                                    :append-icon="show_r_password2 ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append="show_r_password2 = !show_r_password2"
                                >
                                </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="primary"
                        class="pl-15 pr-15"
                        dark
                        @click="edit_profile_fn"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
    profile_edit_state: false,
    new_password: false,
    e: {
        name: null,
        email: null,
        mobile: null,
        image: []
    },
    overlay: false,
    img_src: null,
    show_r_password: false,
    show_r_password2: false,
    r: {
        email: null,
        name: null,
        password: null,
        r_password: null
    },
  }),
  mounted () {
    this.e.name = this.get_user_data.name
    this.e.email = this.get_user_data.email
  },
  created () {
    this.img_src = process.env.VUE_APP_URL
  },
  computed: {
    ...mapGetters({
        get_user_data:              'auth/get_user_data'
    })
  },
  methods: {
    showSnackBar(message) {
        this.$store.commit("auth/setMessage",
            { show: true, message: message },
            { root: 1 })
    },
    async create_bookkeeping(){
        await this.$axios.post('user/create_bookkeeping')
        .then(({data}) => {
            console.log(data)
        })
    },
    set_status_booked(){
        this.$axios.post('user/set_status_booked')
    },
    edit_profile(){
        this.profile_edit_state = true
    },
    close_profile_edit(){
        this.profile_edit_state = false
        this.e = {}
    },
    async edit_profile_fn(){
        const formData = new FormData()
        formData.append('id', this.get_user_data.id)
        formData.append('name', this.e.name)
        formData.append('email', this.e.email)
        formData.append('mobile', this.get_user_data.mobile)
        formData.append('age', this.get_user_data.age)
        formData.append('gender', this.get_user_data.gender)
        formData.append('student', this.get_user_data.student)
        formData.append('vacationer', this.get_user_data.vacationer)
        formData.append('foreigner', this.get_user_data.foreigner)
        console.log(this.get_user_data.student)
        if(this.e.image != null){
            formData.append('image',     this.e.image)
            console.log(this.e.image)
        }
        if(this.r.password != null){
            formData.append('password',     this.r.password)
            console.log(this.r.password)
        }
        if(this.r.r_password != null){
            formData.append('repeat_password',     this.r.r_password)
            console.log(this.r.r_password)
        }
        await this.$axios.post('user/auth_user/edit_profile', formData)
        .then(({data}) => {
            console.log(data)
            if (!data.response) {
                this.showSnackBar(data.message)
            }
            else {
                this.$store.dispatch('auth/update_user_information', data.data)
                this.e.name = data.data.name
                this.e.email = data.data.email
                this.new_password = false
                this.showSnackBar('Profile updated successfully!')
            }
        })
    },
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log("mobile")
        return true
      } else {
        console.log("desktop")
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