<template>
    <v-container fluid>
        <v-row
            no-gutters
            class="mt-3"
        >
            <div id="chatbox" class="overflow-y-auto" style="overflow-x:hidden;height:420px;width: 100%">
                <v-row
                    v-for="(message, messageIndex) in messages"
                    :key="messageIndex"
                    class="p-0"
                >
                    <v-col cols="12" v-if="message.user_id == get_user.udata.id">
                        <v-container>
                            <v-card
                                color="blue darken-3"
                                style="float: right;min-width:20%;max-width:70%"
                                class="d-flex"
                            >
                                <v-card-text>
                                    <h3 class="white--text" v-if="message.get_user">{{ message.get_user.name }}</h3>
                                    <h4 class="white--text">{{ message.message }}</h4>
                                    <small class="white--text">{{ message.created_at }}</small>
                                </v-card-text>
                            </v-card>
                        </v-container>
                    </v-col>
                    <v-col cols="12" v-else>
                        <v-container>
                            <v-card
                                color="blue darken-2"
                                style="float: left;min-width:20%;max-width:70%"
                                class="d-flex"
                            >
                                <v-card-text>
                                    <h3 class="white--text" v-if="message.get_user">{{ message.get_user.name }}</h3>
                                    <h4 class="white--text">{{ message.message }}</h4>
                                    <small class="white--text">{{ message.created_at }}</small>
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
export default {
    components: {
    },
    computed: {
        ...mapGetters({
            get_user: 'auth/get_user'
        })
    },
    async mounted() {
    },
    async created() {
        this.get_messages()
    },
    data() {
        return {
            messages: [],
            new_message: null,
            disable_input: false
        }
    },
    methods: {
        async get_messages() {
            await this.$axios.get('/admin/messages/get_messages')
                .then(({ data }) => {
                    console.log(data)
                    if (data.response) {
                        this.messages = data.data
                        this.scroll_to_bottom()
                    }
                })
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
                    console.log(data)
                    this.disable_input = false
                    this.new_message = null
                    if (data.response) {
                        this.messages = data.data
                        this.scroll_to_bottom()
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