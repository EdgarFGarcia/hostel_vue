<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h2 class="pb-10 ml-5 mr-4">Menu</h2>
        <v-btn class="mb-9" color="#447FA6" dark @click="show_add_food_dialog = true">Add Food</v-btn>
        <v-row>
            <v-col cols="12">
                <v-card style="border-radius: 16px;padding:20px;" width="100%">
                    <v-data-table :headers="menu_header" :items="get_menu">
                        <template v-slot:item="{ item }">
                            <tr v-if="item != null" @click="open_food_dialog(item)" style="cursor: pointer;height:100px;">
                                <td>
                                    <small>#{{ item.id }}</small>
                                </td>
                                <td v-if="item.id < 47">
                                    <v-img style="border-radius:5px;" max-width="120"
                                        :src="require('../../assets/' + item.image)" />
                                </td>
                                <td v-else>
                                    <v-img style="border-radius:5px;" max-width="120"
                                        :src="`${img_src}/images/${item.image}`" />
                                </td>
                                <td v-if="item.type == 'dr_bread'">
                                    Dr. Bread
                                </td>
                                <td v-else-if="item.type == 'dr_wine'">
                                    Dr. Wine
                                </td>
                                <td v-else>
                                    {{ item.type }}
                                </td>
                                <td>
                                    {{ item.name }}
                                </td>
                                <td v-if="item.desc">
                                    {{ item.desc }}
                                </td>
                                <td v-else>
                                    N/A
                                </td>
                                <td>
                                    {{ item.price }}
                                </td>
                                <td v-if="item.available">Yes</td>
                                <td v-else>No</td>
                                <td>
                                    <v-btn text>
                                        <small>View ></small>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="show_add_food_dialog" persistent max-width="650">
                <v-card>
                    <v-card-title class="text-h5">
                        Add Food
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field label="Name" v-model="new_food.name"></v-text-field>
                                <v-text-field label="Price" v-model="new_food.price"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select label="Type" v-model="new_food.type"
                                    :items="[{ text: 'Food', value: 'Food' }, { text: 'Dr. Bread', value: 'dr_bread' }, { text: 'Dr. Wine', value: 'dr_wine' }, { text: 'Buccaneers', value: 'Buccaneers' }]"></v-select>
                                <v-select label="Available" v-model="new_food.available"
                                    :items="[{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }]"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea label="Description" v-model="new_food.desc"></v-textarea>
                                <v-file-input label="Image" v-model="new_food.image" chips></v-file-input>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn outlined text @click="show_add_food_dialog = false;">Cancel</v-btn>
                        <v-btn dark color="#447FA6" @click="add_food()">Add</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="show_food_dialog" persistent max-width="650">
                <v-card v-if="selected_food != null">
                    <v-card-title class="text-h5">
                        Edit Food
                        <v-spacer />
                        <v-btn @click="delete_food()" text outlined color="red">Delete</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field label="Name" v-model="selected_food.name"></v-text-field>
                                <v-text-field label="Price" v-model="selected_food.price"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select label="Type" v-model="selected_food.type"
                                    :items="[{ text: 'Food', value: 'Food' }, { text: 'Dr. Bread', value: 'dr_bread' }, { text: 'Dr. Wine', value: 'dr_wine' }, { text: 'Buccaneers', value: 'Buccaneers' }]"></v-select>
                                <v-select label="Available" v-model="selected_food.available"
                                    :items="[{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }]"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea label="Description" v-model="selected_food.desc"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn outlined text @click="show_food_dialog = false;">Cancel</v-btn>
                        <v-btn dark color="#447FA6" @click="edit_food()">Confirm</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    components: {
    },
    props: [
    ],
    data: () => ({
        menu_header: [
            {
                text: 'ID', value: 'id', sortable: true, width: '1%'
            },
            {
                text: '', sortable: false, width: '10%'
            },
            {
                text: 'Type', value: 'type', sortable: true, width: '10%'
            },
            {
                text: 'Food', sortable: false, width: '10%'
            },
            {
                text: 'Description', sortable: false, width: '60%'
            },
            {
                text: 'Price', sortable: false, width: '10%'
            },
            {
                text: 'Available', sortable: false, width: '10%'
            },
            {
                text: '', sortable: false
            },
        ],
        img_src: null,
        selected_food: null,
        show_food_dialog: false,
        new_food: {
            name: null,
            type: null,
            desc: null,
            price: null,
            image: null,
            available: null
        },
        show_add_food_dialog: false,
    }),
    mounted() {
        this.$store.dispatch('admin_menu/fetch_menu')
    },
    created() {
        this.img_src = process.env.VUE_APP_URL
    },
    computed: {
        ...mapGetters({
            get_menu: 'admin_menu/get_menu',
        })
    },
    methods: {
        showSnackBar(message) {
            this.$store.commit("auth/setMessage",
                { show: true, message: message },
                { root: 1 })
        },
        moment: function (time) {
            return moment(time);
        },
        open_add_food_dialog() {
            this.show_add_food_dialog = true
        },
        open_food_dialog(food) {
            this.selected_food = food
            this.show_food_dialog = true
        },
        async add_food() {
            const formData = new FormData()
            formData.append('name', this.new_food.name)
            formData.append('type', this.new_food.type)
            formData.append('price', this.new_food.price)
            formData.append('desc', this.new_food.desc)
            formData.append('image', this.new_food.image)
            formData.append('available', this.new_food.available)
            await this.$axios.post('user/auth_user/add_food', formData)
                .then(({ data }) => {
                    console.log(data)
                    this.showSnackBar("Success!")
                    this.show_add_food_dialog = false
                    this.$store.dispatch('admin_menu/fetch_menu')
                })
        },
        async edit_food() {
            const formData = new FormData()
            formData.append('id', this.selected_food.id)
            formData.append('name', this.selected_food.name)
            formData.append('type', this.selected_food.type)
            formData.append('price', this.selected_food.price)
            formData.append('desc', this.selected_food.desc)
            formData.append('available', this.selected_food.available)
            await this.$axios.post('user/auth_user/edit_food', formData)
                .then(({ data }) => {
                    console.log(data)
                    this.showSnackBar("Success!")
                    this.show_food_dialog = false
                    this.$store.dispatch('admin_menu/fetch_menu')
                })
        },
        async delete_food() {
            await this.$axios.post('user/auth_user/delete_food', { id: this.selected_food.id })
                .then(({ data }) => {
                    console.log(data)
                    this.showSnackBar("Success!")
                    this.show_food_dialog = false
                    this.$store.dispatch('admin_menu/fetch_menu')
                })
        }
    },
    watch: {
    }
}
</script>

<style scoped lang="scss"></style>