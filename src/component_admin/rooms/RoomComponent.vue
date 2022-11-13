<template>
    <v-container fill-height fluid class="pa-0 ma-0">
        <v-tabs
          v-model="tab"
          grow
          dark
          color="basil"
          background-color="deep-purple accent-4"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            v-for="room in get_room_categories"
            :key="room.id"
            :href="`#tab-${room.id}`"
          >
            <label
                style="color: white;"
            >
                {{ room.name }}
            </label>
          </v-tab>
        </v-tabs>
        <br>
        <v-btn dark class="mt-5 ml-5" @click="add_room_model = true">Add Room Type</v-btn>
        <v-tabs-items 
            v-model="tab"
            class="mt-5 justify-center"
                    style="width:100%;"
        >
            <v-tab-item
                v-for="room in get_room_categories"
                :key="room.id"
                :value="`tab-${room.id}`"
            >
                <v-card
                    flat
                >
                    <v-card-title class="text-small mb-2">
                        Room Type: {{room.name}} <v-btn dark class="ml-3" @click="edit_room(room)">Edit</v-btn><v-btn dark class="ml-3" @click="delete_room_open(room)">Delete</v-btn>
                    </v-card-title>
                    <v-card-subtitle>
                        <div>
                            {{ room.full_details }}
                        </div>
                        <br>
                        <div>
                            <small style="margin-top:20px;" v-for="(facilities, room_facilities_index) in room.facilities" :key="room_facilities_index">
                                <v-icon>mdi-check-circle</v-icon>
                                {{facilities}}
                            </small>
                        </div>
                        <br>
                        <div>Price: {{room.price}}</div>
                        <br>
                        <div>Capacity: {{room.capacity}}</div>
                        <br>
                        <div>Max Capacity: {{room.max_capacity}}</div>
                        <br>
                        <div>Additional Price: {{room.additional_price}}</div>
                        <br>
                        <div>Total number of rooms: {{room.room_count}}</div>
                        <br>
                        <div>Booked rooms: {{room.rooms_booked}}</div>
                    </v-card-subtitle>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
        <v-row justify="center">
            <v-dialog v-model="edit_room_model" persistent max-width="400">
                <v-card>
                    <v-card-title class="mb-5">
                        <small></small>
                    </v-card-title>
                    <v-card-text v-if="room_to_edit != null">
                        Room Type
                        <v-text-field v-model="room_to_edit.name"></v-text-field>
                        Total number of rooms
                        <v-text-field type="number" v-model="room_to_edit.room_count"></v-text-field>
                        Short Description
                        <v-textarea v-model="room_to_edit.description"></v-textarea>
                        Full Description
                        <v-textarea v-model="room_to_edit.full_details"></v-textarea>
                        Facilities
                        <v-text-field v-model="facility_to_add"></v-text-field>
                        <v-btn @click="add_facility">Add</v-btn>
                        <br>
                        <br>
                        <small v-for="(facility, index) in room_to_edit.facilities" :key="index">
                            {{facility}} <v-btn style="width:10px;height:20px;" @click="delete_facility(index)">x</v-btn>
                            , 
                        </small>
                        <br>
                        Price
                        <v-text-field type="number" v-model="room_to_edit.price"></v-text-field>
                        Additional Price
                        <v-text-field type="number" v-model="room_to_edit.additional_price"></v-text-field>
                        Capacity (charge additional over this amount)
                        <v-text-field type="number" v-model="room_to_edit.capacity"></v-text-field>
                        Max Capacity (can't accept booking over this amount)
                        <v-text-field type="number" v-model="room_to_edit.max_capacity"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark @click="submit_edit_room">Confirm</v-btn>
                        <v-btn dark @click="edit_room_model = false;">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        
        <v-row justify="center">
            <v-dialog v-model="add_room_model" persistent max-width="400">
                <v-card>
                    <v-card-title class="mb-5">
                        <small>Add Room Type</small>
                    </v-card-title>
                    <v-card-text>
                        Room Type
                        <v-text-field v-model="room_to_add.name"></v-text-field>
                        Total number of rooms
                        <v-text-field type="number" v-model="room_to_add.room_count"></v-text-field>
                        Short Description
                        <v-textarea v-model="room_to_add.description"></v-textarea>
                        Full Description
                        <v-textarea v-model="room_to_add.full_details"></v-textarea>
                        Facilities
                        <v-text-field v-model="facility_to_add_create"></v-text-field>
                        <v-btn @click="add_facility_create">Add</v-btn>
                        <br>
                        <br>
                        <small v-for="(facility, index) in room_to_add.facilities" :key="index">
                            {{facility}} <v-btn style="width:10px;height:20px;" @click="delete_facility_create(index)">x</v-btn>
                            , 
                        </small>
                        <br>
                        Price
                        <v-text-field type="number" v-model="room_to_add.price"></v-text-field>
                        Additional Price
                        <v-text-field type="number" v-model="room_to_add.additional_price"></v-text-field>
                        Capacity (charge additional over this amount)
                        <v-text-field type="number" v-model="room_to_add.capacity"></v-text-field>
                        Max Capacity (can't accept booking over this amount)
                        <v-text-field type="number" v-model="room_to_add.max_capacity"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark @click="submit_new_room">Confirm</v-btn>
                        <v-btn dark @click="add_room_model = false;">Cancel</v-btn>
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
                <v-spacer>
                </v-spacer><v-btn dark @click="delete_room(room_to_delete)" class="ml-2">Confirm</v-btn>
                <v-btn dark @click="delete_model = false">Cancel</v-btn>
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
    add_room_state: false,
    edit_room_model: false,
    add_room_model: false,
    delete_model: false,
    room_to_delete: null,
    room_to_edit: null,
    room_to_add: {
        name: null,
        room_count: null,
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
  async mounted () {
    await this.$store.dispatch('admin_room/set_room_categories')
  },
  created () {
  },
  computed: {
    ...mapGetters({
        get_room_categories:        'admin_room/get_room_categories'
    })
  },
  methods: {
    edit_room(room){
        this.edit_room_model = true
        this.room_to_edit = room
    },
    async submit_edit_room(){
        console.log(this.room_to_edit)
        await this.$axios.post('admin/rooms/update_room', this.room_to_edit)
        .then(({data}) => {
            console.log(data)
            this.$router.go(0)
        })
    },
    async submit_new_room(){
        console.log(this.room_to_add)
        await this.$axios.post('admin/rooms/add_room', this.room_to_add)
        .then(({data}) => {
            console.log(data)
            this.$router.go(0)
        })
    },
    async delete_room_open(room) {
        this.room_to_delete = room
        this.delete_model = true
    },
    async delete_room(room) {
          await this.$axios.post('admin/rooms/delete_room', { room_id: room.id })
              .then(({ data }) => {
                console.log(data)
                this.$router.go(0)
              })
    },
    add_facility_create(){
        this.room_to_add.facilities.push(this.facility_to_add_create)
        this.facility_to_add_create = null
    },
    delete_facility_create(facility){
        this.room_to_add.facilities.splice(facility, 1)
    },
    add_facility(){
        this.room_to_edit.facilities.push(this.facility_to_add)
        this.facility_to_add = null
    },
    delete_facility(facility){
        this.room_to_edit.facilities.splice(facility, 1)
    },
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>