<template>
    <v-container fluid>
        <v-row
            no-gutters
            class="mt-3"
        >
            <div id="chatbox" class="overflow-y-auto" style="overflow-x:hidden;height:350px;width: 100%">
                <v-row
                    v-for="(message, messageIndex) in get_messages"
                    :key="messageIndex"
                    class="p-0 pb-1"
                >
                    <v-col style="padding-top:0px;padding-bottom:0px;" cols="12" v-if="message.user_id == get_user.udata.id">
                        <v-container>
                            <v-card
                                color="blue darken-3"
                                style="float: right;min-width:70%;max-width:70%"
                                class="d-flex"
                            >
                                <v-card-text>
                                    <h3 style="font-size:14px;" class="white--text" v-if="message.get_user">{{ message.get_user.name }}</h3>
                                    <h4 style="font-size:12px;font-weight:400;" class="white--text">{{ message.message }}</h4>
                                    <small class="white--text">{{ moment(message.created_at).format('MMMM D, YYYY h:mm a') }}</small>
                                </v-card-text>
                            </v-card>
                        </v-container>
                    </v-col>
                    <v-col style="padding-top:0px;padding-bottom:0px;" cols="12" v-else>
                        <v-container>
                            <v-card
                                color="blue darken-2"
                                style="float: left;min-width:70%;max-width:70%"
                                class="d-flex"
                            >
                                <v-card-text>
                                    <h3 style="font-size:14px;" class="white--text" v-if="message.get_user">{{ message.get_user.name }}</h3>
                                    <h4 style="font-size:12px;font-weight:400;" class="white--text">{{ message.message }}</h4>
                                    <small class="white--text">{{ moment(message.created_at).format('MMMM D, YYYY h:mm a') }}</small>
                                </v-card-text>
                            </v-card>
                        </v-container>
                    </v-col>
                </v-row>
                <v-row v-if="disable_input" class="p-0">
                    <v-col cols="12">
                    <v-container>
                        <v-card
                            color="blue darken-3"
                            style="float: right;min-width:20%;max-width:70%"
                            class="d-flex"
                        >
                            <v-card-text>
                                <h4 class="white--text">{{ new_message }}</h4>
                            </v-card-text>
                        </v-card>
                    </v-container>
                    </v-col>
                </v-row>
            </div>
            <v-container fluid class="mb-5">
                <v-row
                    class="pa-2"
                >
                    <v-text-field
                        placeholder="Write your message here"
                        v-model="new_message"
                        maxlength="200"
                        :disabled="disable_input"
                        append-outer-icon="mdi-send"
                        @click:append-outer="generate"
                        v-on:keyup.enter="generate"
                    >
                    </v-text-field>
                </v-row>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    components: {
    },
    computed: {
        ...mapGetters({
            get_user: 'auth/get_user',
            get_messages: 'admin_messages/get_messages'
        })
    },
    async mounted() {
        this.$store.dispatch('admin_messages/fetch_messages')
        this.scroll_to_bottom()
    },
    async created() {
        
    },
    data() {
        return {
            messages: [],
            new_message: null,
            disable_input: false
        }
    },
    methods: {
        moment: function (time) {
            return moment(time);
        },
        async generate() {
            if (this.new_message != null && this.new_message.trim().length == 0)
                return
            this.disable_input = true
            this.scroll_to_bottom()
            let payload = {
                new_message: this.new_message
            }
            await this.$axios.post('/admin/messages/send_message', payload)
                .then(({ data }) => {
                    if (data.response) {
                        this.$store.dispatch('admin_messages/fetch_messages')
                            .then(() => {
                                this.new_message = null
                                this.disable_input = false
                                this.scroll_to_bottom()
                        })
                    }
                    
                })
        },
        scroll_to_bottom() {
            this.$nextTick(() => {
                var element = document.getElementById('chatbox').scrollHeight
                document.getElementById('chatbox').scrollTop = element
            });
        }
    }

}
</script>

<style lang="scss" scoped>
</style>