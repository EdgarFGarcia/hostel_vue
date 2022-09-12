<template>
    <div>
        <v-dialog
            transition="dialog-top-transition"
            max-width="720"
            :value="value"
            persistent
        >
            <v-card>
                <v-card-title
                    class="text-small"
                >
                    <small>Add room for {{get_rooms[0].name}}</small>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        dense
                        outlined
                        label="Room Name"
                        hint="Room Name"
                        v-model="a.room_name"
                    >
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        text
                        outlined
                        @click="close_add_dialog"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="#588BAD"
                        class="pl-10 pr-10"
                        dark
                        @click="add_room_from_dialog"
                    >
                        Add
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex' 
export default {
  components: {
  },
  props: [
    'value'
  ],
  data: () => ({
    a: {
        room_name: null
    }
  }),
  mounted () {
  },
  created () {
  },
  computed: {
    ...mapGetters({
        get_rooms:                  'admin_room/get_rooms'
    })
  },
  methods: {
    close_add_dialog(){
        this.$emit('close_add_dialog')
    },
    add_room_from_dialog(){
        this.$emit('add_room_from_dialog', this.a.room_name)
        this.a = {}
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>