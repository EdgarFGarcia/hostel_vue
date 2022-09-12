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
            @click="select_room(room)"
          >
            <label
                style="color: white;"
            >
                {{ room.name }}
            </label>
          </v-tab>
        </v-tabs>
        <v-tabs-items 
            v-model="tab"
            class="mt-5 justify-center"
        >
            <v-tab-item
                v-for="room in get_room_categories"
                :key="room.id"
                :value="`tab-${room.id}`"
            >
                <v-card
                    flat
                >
                    <v-card-title class="text-small">
                        {{room.name}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ room.full_details }}
                    </v-card-subtitle>
                    <v-card-text>
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <v-btn
                                    class="float-right pl-10 pr-10"
                                    color="secondary"
                                    dark
                                    @click="add_room"
                                >
                                    <v-icon
                                        class="mr-3"
                                    >mdi-plus</v-icon>
                                    Add Room
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row
                            v-if="get_rooms.length > 0"
                        >
                            <v-col
                                cols="3"
                                v-for="(rooms, roomsindex) in get_rooms[0].actual_rooms"
                                :key="roomsindex"
                            >
                                <v-card
                                    elevation="2"
                                >
                                    <v-card-title class="text-small">
                                        <small>{{rooms.room_name}}</small>
                                        <v-spacer/>
                                        <small>ID: {{rooms.id}}</small>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row
                                            v-for="(room_facitilities, room_facilities_index) in room.facilities"
                                            :key="room_facilities_index"
                                        >
                                            <v-icon>mdi-check-circle</v-icon>
                                            {{room_facitilities}}
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                        Max Capacity: {{room.capacity}}
                                    </v-card-actions>
                                    <v-card-actions>
                                        <v-btn
                                            block
                                            text
                                            outlined
                                        >
                                            Delete
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
        <AddRoomDialog
            :value="this.add_room_state"
            @close_add_dialog="close_add_dialog"
            @add_room_from_dialog="add_room_from_dialog"
        />
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AddRoomDialog from './components/DialogAddRoom.vue'
export default {
  components: {
    AddRoomDialog
  },
  props: [
  ],
  data: () => ({
    tab: null,
    add_room_state: false
  }),
  async mounted () {
    await this.$store.dispatch('admin_room/set_room_categories')
  },
  created () {
  },
  computed: {
    ...mapGetters({
        get_room_categories:        'admin_room/get_room_categories',
        get_rooms:                  'admin_room/get_rooms'
    })
  },
  methods: {
    async select_room(data){
        // console.log(data, this.tab)
        await this.$axios.get(`admin/rooms/actual_rooms/${data.id}`)
        .then(({data}) => {
            this.$store.dispatch('admin_room/set_rooms', data.data)
        })
    },
    add_room(){
        this.add_room_state = true
    },
    close_add_dialog(){
        this.add_room_state = false
    },
    async add_room_from_dialog(data){
        await this.$axios.post('admin/rooms/add_room', {
            room_name:          data,
            room_id:            this.get_rooms[0].id
        })
        .then(({data}) => {
            if(data.response){
                alert(data.message)
                this.close_add_dialog()
                this.select_room(this.get_rooms[0])
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