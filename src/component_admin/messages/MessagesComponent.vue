<template>
    <v-container fluid>
        <v-row
            no-gutters
            class="mt-3"
        >
            <v-container
            color="blue darken-5"
            >
                <v-row>
                    <v-col cols="6">
                        <v-select
                            :disabled="disable_input"
                            :items="models"
                            v-model="selected_model"
                            item-text="text"
                            item-value="value"
                            return-object
                            label="Select GPT-3 Model"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="6" class="d-flex align-center">
                        <h5>
                            {{ selected_model.description }}
                        </h5>
                    </v-col>
                </v-row>
            </v-container>
            <hr style="border:1px solid gray; width: 100%;"/>

            <div id="chatbox" class="overflow-y-auto" style="overflow-x:hidden;height:420px;width: 100%">
                <v-row
                    v-for="(message, messageIndex) in messages"
                    :key="messageIndex"
                    class="p-0"
                >
                    <v-col cols="12">
                    <v-container>
                        <v-card
                            color="blue darken-3"
                            style="float: right;min-width:20%;max-width:70%"
                            class="d-flex"
                        >
                            <v-card-text>
                                <h4 class="white--text">{{ message.new_message }}</h4>
                                <small class="white--text">{{ message.created_at }}</small>
                            </v-card-text>
                        </v-card>
                    </v-container>
                    </v-col>
                    <v-col cols="12">
                    <v-container>
                        <v-card
                            color="blue darken-1"
                            style="float: left;min-width:20%;max-width:70%"
                            class="d-flex"
                        >
                            <v-card-text>
                                <h3 class="white--text mb-2">
                                    {{ message.model_name }}
                                </h3>
                                <h4 class="white--text ml-5">
                                    <span 
                                        v-if="message.response != null"
                                        style="white-space:pre-wrap"
                                    >{{ message.response }}
                                    </span>
                                    <span v-else>
                                        <i>Failed response</i>
                                    </span>
                                </h4>
                                <small class="white--text ml-5">{{ message.updated_at }}</small>
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
export default {
    components: {
    },
    computed: {
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
            await this.$axios.get('/openai/get_messages')
                .then(({ data }) => {
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
                new_message: this.new_message,
                model: this.selected_model.value,
                model_name: this.selected_model.text
            }
            await this.$axios.post('/openai/send_message', payload)
                .then(({ data }) => {
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