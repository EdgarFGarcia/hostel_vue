<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h2 class="pb-10 ml-5 mr-4">Rooms</h2>
        <v-btn class="mb-9" color="#447FA6" dark @click="add_room_model = true">Add Room Type</v-btn>
        <v-row>
            <v-col cols="12">
                <v-card style="border-radius: 16px;padding:20px;" width="100%">
                    <v-data-table :headers="room_header" :items="get_room_types">
                        <template v-slot:item="{ item }">
                            <tr @click="open_room_type(item)" style="cursor: pointer;height:90px;">
                                <td>
                                    #<small>{{ item.id }}</small>
                                </td>
                                <td>
                                    <v-img style="border-radius:5px;" max-width="120"
                                        :src="`${img_src}/images/${item.image}`" />
                                </td>
                                <td>
                                    {{ item.name }}
                                </td>
                                <td>
                                    {{ item.description }}
                                </td>
                                <td>
                                    <small
                                        style="background-color:#447FA6;color:white;border-radius:10px;padding:5px;margin:2px;line-height:2.5;"
                                        v-for="(facilities, index) in item.facilities" :key="index">
                                        {{ facilities }}
                                    </small>
                                </td>
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
            <v-dialog v-model="show_room_type" persistent max-width="650">
                <v-card v-if="selected_room_type">
                    <v-card-title class="text-h5">
                        {{ selected_room_type.name }}
                        <v-spacer />
                        <v-btn @click="delete_room_open(selected_room_type)" text outlined color="red">Delete</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Room Type" v-model="selected_room_type.name"></v-text-field>
                                <v-combobox label="Facilities" v-model="selected_room_type.facilities" filled multiple chips
                                    dense hide-selected style="line-height:3.5;" :items="selected_room_type.facilities">
                                    <template v-slot:selection="{ attrs, item, parent, selected }">
                                        <v-chip v-bind="attrs" :input-value="selected" small color="#447FA6"
                                            style="color:white;">
                                            <span class="pr-2">
                                                {{ item }}
                                            </span>
                                            <v-icon color="white" small @click="parent.selectItem(item)">
                                                $delete
                                            </v-icon>
                                        </v-chip>
                                    </template>
                                    <template v-slot:no-data>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Press <kbd>enter</kbd> to create a new facility
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </v-combobox>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Price per night" type="number"
                                    v-model="selected_room_type.price"></v-text-field>
                                <v-text-field label="Capacity (charge additional over this amount)" type="number"
                                    v-model="selected_room_type.capacity"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Price per additional person" type="number"
                                    v-model="selected_room_type.additional_price"></v-text-field>
                                <v-text-field label="Max capacity (can't book over this amount)" type="number"
                                    v-model="selected_room_type.max_capacity"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea label="Short Description" v-model="selected_room_type.description"></v-textarea>
                                <v-textarea label="Full Description" v-model="selected_room_type.full_details"></v-textarea>
                            </v-col>
                            <v-col cols="3">
                                <h3>Actual Rooms</h3>
                            </v-col>
                            <v-col cols="9">
                                <v-btn style="margin-top:-5px;" color="#447FA6" dark @click="add_actual_room_modal = true">Add Actual Room</v-btn>
                            </v-col>
                            <v-col v-for="(actual_room, index) in selected_room_type.actual_rooms" :key="index" cols="4">
                                <v-card elevation="2">
                                    <v-card-title class="text-small">
                                        <small style="font-size:14px;" class="mr-1">#{{ actual_room.id }}</small>
                                        <small style="font-size:14px;">{{ actual_room.room_name }}</small>
                                        <v-text-field label="Room Floor" v-model="actual_room.room_floor"></v-text-field>
                                        <v-btn class="mb-2" block text outlined @click="edit_floor(actual_room)">
                                            Save
                                        </v-btn>
                                        <v-btn block text color="red" outlined @click="delete_room(actual_room)">
                                            Delete
                                        </v-btn>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                            <v-col v-if="selected_room_type.actual_rooms[0] == null" cols="12">
                                N/A
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="close_room_type()">
                            Close
                        </v-btn>
                        <v-btn style="background-color:#447FA6;color:white;" @click="submit_edit_room()">Confirm</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="add_room_model" persistent max-width="650">
                <v-card>
                    <v-card-title class="mb-5">
                        <small>Add Room Type</small>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Room Type" v-model="room_to_add.name"></v-text-field>
                                <v-combobox label="Facilities" v-model="room_to_add.facilities" filled multiple chips dense
                                    hide-selected style="line-height:3.5;" :items="room_to_add.facilities">
                                    <template v-slot:selection="{ attrs, item, parent, selected }">
                                        <v-chip v-bind="attrs" :input-value="selected" small color="#447FA6"
                                            style="color:white;">
                                            <span class="pr-2">
                                                {{ item }}
                                            </span>
                                            <v-icon color="white" small @click="parent.selectItem(item)">
                                                $delete
                                            </v-icon>
                                        </v-chip>
                                    </template>
                                    <template v-slot:no-data>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Press <kbd>enter</kbd> to create a new facility
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </v-combobox>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Price per night" type="number"
                                    v-model="room_to_add.price"></v-text-field>
                                <v-text-field label="Capacity (charge additional over this amount)" type="number"
                                    v-model="room_to_add.capacity"></v-text-field>

                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Price per additional person" type="number"
                                    v-model="room_to_add.additional_price"></v-text-field>
                                <v-text-field label="Max capacity (can't book over this amount)" type="number"
                                    v-model="room_to_add.max_capacity"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea label="Short description" v-model="room_to_add.description"></v-textarea>
                                <v-textarea label="Full description" v-model="room_to_add.full_details"></v-textarea>
                                <v-file-input label="Image" v-model="room_to_add.image" chips></v-file-input>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn outlined text @click="add_room_model = false;">Cancel</v-btn>
                        <v-btn dark color="#447FA6" @click="submit_new_room()">Confirm</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <v-row justify="center">
            <v-dialog v-model="delete_model" persistent max-width="400">
                <v-card>
                    <v-card-title class="mb-5">
                        <small>Are you sure you want to delete this room?</small>
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn outlined text @click="delete_model = false">Cancel</v-btn>
                        <v-btn text outlined color="red" @click="delete_room_type(room_to_delete)"
                            class="ml-2">Confirm</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        
        <v-row justify="center">
            <v-dialog v-model="add_actual_room_modal" persistent max-width="650">
                <v-card v-if="selected_room_type != null">
                    <v-card-title
                        class="text-small"
                    >
                        <small>Add room for {{ selected_room_type.name }}</small>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            dense
                            outlined
                            label="Room Name"
                            hint="Room Name"
                            v-model="new_actual_room"
                        >
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            text
                            outlined
                            @click="add_actual_room_modal = false"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            color="#588BAD"
                            class="pl-10 pr-10"
                            dark
                            @click="add_actual_room"
                        >
                            Add
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
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
        tab: null,
        img_src: null,
        show_room_type: false,
        selected_room_type: null,
        add_actual_room_modal: false,
        new_actual_room: null,
        add_room_state: false,
        edit_room_model: false,
        add_room_model: false,
        delete_model: false,
        room_to_delete: null,
        room_to_edit: null,
        room_header: [
            {
                text: 'ID', value: 'id', sortable: true, width: '1%'
            },
            {
                text: '', sortable: false, width: '10%'
            },
            {
                text: 'Room Type', sortable: false, width: '15%'
            },
            {
                text: 'Description', sortable: false
            },
            {
                text: 'Facilities', sortable: false, width: '300px'
            },
            {
                text: '', sortable: false
            },
        ],
        room_to_add: {
            name: null,
            room_count: null,
            room_floor: null,
            image: null,
            description: null,
            full_details: null,
            facilities: [],
            price: null,
            additional_price: null,
            capacity: null,
            max_capacity: null,
        },
        facility_to_add: null,
        facility_to_add_create: null
    }),
    async mounted() {
        this.$store.dispatch('admin_room/fetch_room_types')
    },
    created() {
        this.img_src = process.env.VUE_APP_URL
    },
    computed: {
        ...mapGetters({
            get_room_types: 'admin_room/get_room_types',
        })
    },
    methods: {
        showSnackBar(message) {
            this.$store.commit("auth/setMessage",
                { show: true, message: message },
                { root: 1 })
        },
        open_room_type(room) {
            this.selected_room_type = room
            this.show_room_type = true
        },
        close_room_type() {
            this.show_room_type = false
        },
        edit_room(room) {
            this.edit_room_model = true
            this.room_to_edit = room
        },
        async edit_floor(rooms) {
            console.log(rooms)
            await this.$axios.post('admin/rooms/update_floor', rooms)
                .then(({ data }) => {
                    console.log(data)
                    this.$router.go(0)
                })
        },
        async add_actual_room() {
            console.log(this.selected_room_type)
            await this.$axios.post('admin/rooms/add_room', {
                room_name: this.new_actual_room,
                room_id: this.selected_room_type.id
            })
                .then(({ data }) => {
                    if (data.response) {
                        this.$router.go(0)
                    }
                })
        },
        async submit_edit_room() {
            console.log(this.selected_room_type)
            await this.$axios.post('admin/rooms/update_room', this.selected_room_type)
                .then(({ data }) => {
                    console.log(data)
                    this.$router.go(0)
                })
        },
        async submit_new_room() {
            const formData = new FormData()
            formData.append('name', this.room_to_add.name)
            formData.append('facilities', this.room_to_add.facilities)
            formData.append('price', this.room_to_add.price)
            formData.append('additional_price', this.room_to_add.additional_price)
            formData.append('capacity', this.room_to_add.capacity)
            formData.append('max_capacity', this.room_to_add.max_capacity)
            formData.append('description', this.room_to_add.description)
            formData.append('full_details', this.room_to_add.full_details)
            formData.append('image', this.room_to_add.image)
            console.log(this.room_to_add.facilities)
            await this.$axios.post('admin/rooms/add_room_type', formData)
                .then(({ data }) => {
                    console.log(data)
                    this.showSnackBar(data.message)
                    if (data.response) {
                        this.$router.go(0)
                    }
                })
        },
        async delete_room_open(room) {
            this.room_to_delete = room
            this.delete_model = true
        },
        async delete_room(room) {
            this.showSnackBar("Please wait...")
            await this.$axios.post('admin/rooms/delete_room', { room_id: room.id })
                .then(({ data }) => {
                    console.log(data)
                    this.$router.go(0)
                })
        },
        async delete_room_type(room) {
            this.showSnackBar("Please wait...")
            await this.$axios.post('admin/rooms/delete_room_type', { room_id: room.id })
                .then(({ data }) => {
                    console.log(data)
                    this.$router.go(0)
                })
        },
        add_facility_create() {
            this.room_to_add.facilities.push(this.facility_to_add_create)
            this.facility_to_add_create = null
        },
        delete_facility_create(facility) {
            this.room_to_add.facilities.splice(facility, 1)
        },
        add_facility() {
            this.room_to_edit.facilities.push(this.facility_to_add)
            this.facility_to_add = null
        },
        delete_facility(facility) {
            this.room_to_edit.facilities.splice(facility, 1)
        },
    },
    watch: {
    }
}
</script>

<style scoped lang="scss"></style>