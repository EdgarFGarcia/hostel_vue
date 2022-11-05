<template>
    <v-container fill-height fluid>
      <v-row>
        <v-col
            col="3"
        >
            <v-card
                width="300"
            >
                <v-avatar
                    color="grey"
                    size="150"
                    v-if="get_user_data.image == null"
                >
                    <v-img
                        src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80"
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
                <v-card-title class="text-small">
                    <strong><small>{{get_user_data.name}}</small></strong>
                    <v-spacer/>
                    <v-btn
                        icon
                        @click="edit_profile"
                    >
                        <v-icon>mdi-pen</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-subtitle>
                    <small style="fontSize: 14px;">{{get_user_data.created_at}}</small>
                    <v-spacer/>
                    {{get_user_data.email}}
                    <v-spacer/>
                    <strong><small style="fontSize: 14px;">{{get_user_data.mobile}}</small></strong>
                </v-card-subtitle>
            </v-card>
        </v-col>
        <v-col
            cols="8"
        >
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
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <v-hover>
                                <template v-slot:default="{ hover }">
                                    <v-card
                                        class="mx-auto"
                                        max-width="344"
                                    >
                                        <v-img height="220" v-if="get_user_data.image == null" src="https://pic.onlinewebfonts.com/svg/img_546302.png"></v-img>
                                        <v-img height="220" v-else :src="`${img_src}/${get_user_data.image}`"></v-img>
                                        <v-fade-transition>
                                        <v-overlay
                                            v-if="hover"
                                            absolute
                                            color="#111"
                                        >
                                        <v-file-input
                                            v-model="e.image"
                                            label="Update Image"
                                            chips
                                        ></v-file-input>
                                        </v-overlay>
                                        </v-fade-transition>
                                    </v-card>
                                </template>
                            </v-hover>
                            <v-text-field
                                outlined
                                dense
                                label="Full Name"
                                v-model="e.name"
                                :hint="get_user_data.name"
                                class="mt-5"
                            >
                                <template v-slot:prepend-inner>        
                                    <v-icon small style="position: relative; top:4px;"> mdi-account </v-icon> 
                                </template>
                            </v-text-field>
                            <v-text-field
                                type="email"
                                outlined
                                dense
                                label="Email Address"
                                v-model="e.email"
                                :hint="get_user_data.email"
                            >
                                <template v-slot:prepend-inner>        
                                    <v-icon small style="position: relative; top:4px;"> mdi-at </v-icon> 
                                </template>
                            </v-text-field>
                            <v-text-field
                                type="number"
                                dense
                                outlined
                                label="Mobile #"
                                v-model="e.mobile"
                                :hint="get_user_data.mobile"
                            >
                                <template v-slot:prepend-inner>        
                                    <v-icon small style="position: relative; top:4px;"> mdi-phone </v-icon> 
                                </template>
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
    e: {
        name: null,
        email: null,
        mobile: null,
        image: []
    },
    overlay: false,
    img_src: null
  }),
  mounted () {

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
        formData.append('id',       this.get_user_data.id)
        formData.append('name',     this.e.name)
        formData.append('email',    this.e.email)
        formData.append('mobile',   this.e.mobile)
        formData.append('file',     this.e.image)
        await this.$axios.post('user/auth_user/edit_profile', formData)
        .then(({data}) => {
            this.$store.dispatch('auth/update_user_information', data.data)
            this.close_profile_edit()
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>