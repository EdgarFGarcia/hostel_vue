<template>
    <v-container fluid class="pa-0 ma-0">
        <v-alert
            color="deep-purple accent-4"
            dark
        >
            Reservation Details
        </v-alert>
        <v-data-table
            :headers="reservation_header"
            :items="get_reservation_list"
            class="elevation-1"
        >
            <template v-slot:item="{ item, expand, isExpanded }">
                <tr
                    style="cursor: pointer;"
                    class="mx-5"
                    @click="expand(!isExpanded)"
                >
                    <td>
                        {{item.name}}
                    </td>
                    <td>
                        {{item.email}}
                    </td>
                    <td>
                        {{item.created_at}}
                    </td>
                </tr>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-data-table
                        :items="item.get_reservations"
                        class="elevation-1"
                        :headers="inner_table_headers"
                    >
                        <template v-slot:item="{item}">
                            <tr>
                                <td>
                                    {{item.check_in_date_time}}
                                </td>
                                <td>
                                    {{item.will_be_available_at}}
                                </td>
                                <td>
                                    {{item.duration}} Day(s)
                                </td>
                                <td>
                                    {{item.total_checked_in}}
                                </td>
                                <td>
                                    {{item.adult_count}}
                                </td>
                                <td>
                                    {{item.child_count}}
                                </td>
                                <td>
                                    {{item.payable | currency('₱')}}
                                </td>
                                <td>
                                    <label
                                        v-if="item.is_paid"
                                    >
                                        Paid
                                    </label>
                                    <label v-else></label>
                                </td>
                                <td>
                                    <label
                                        v-if="item.is_verified"
                                    >
                                        Verified
                                    </label>
                                    <label v-else></label>
                                </td>
                                <td>
                                    <v-btn
                                        dark
                                        @click="check_details(item)"
                                    >
                                        Check  room details
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </td>
            </template>
        </v-data-table>
        <v-row justify="center">
            <v-dialog
                v-model="dialog_room_information"
                persistent
                max-width="560"
            >
            <v-card
                v-if="Object.keys(get_room_information).length > 0"
            >
                <v-card-title class="text-h5">
                    Room Information of: {{get_room_information.room_name}}
                </v-card-title>
                <v-card-subtitle>
                    {{get_room_information.get_room_parent_information.description}}
                </v-card-subtitle>
                <v-card-text>
                    <v-img
                        :src="`${img_src}/images/${get_room_information.get_room_parent_information.image}`"
                    />
                </v-card-text>
                <v-card-text>
                    <v-row>
                        <v-col
                            cols="4"
                            v-for="(item, itemindex) in get_room_information.get_room_parent_information.facilities"
                            :key="itemindex"
                        >
                            <v-icon>mdi-check</v-icon>
                            {{item}}
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog_room_information = false"
                >
                    Done
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
    reservation_header: [
        {
            text: 'Name'
        },
        {
            text: 'Email'
        },
        {
            text: 'Registered at'
        }
    ],
    inner_table_headers:[
        {
            text: 'Check-in Date'
        },
        {
            text: 'Check-out Date'
        },
        {
            text: 'Duration'
        },
        {
            text: 'Total check-ins'
        },
        {
            text: 'Adult Count'
        },
        {
            text: 'Child Count'
        },
        {
            text: 'Payable'
        },
        {
            text: 'Paid'
        },
        {
            text: 'Verified'
        },
        {
            text: ''
        }
    ],
    dialog_room_information: false,
    img_src: null
  }),
  async mounted () {
    await this.$store.dispatch('admin_reservation/fetch_reservations')
  },
  created () {
    this.img_src = process.env.VUE_APP_URL
  },
  computed: {
    ...mapGetters({
        get_reservation_list:           'admin_reservation/get_reservation_list',
        get_room_information:           'admin_reservation/get_room_information'
    })
  },
  methods: {
    async check_details(data){
        await this.$axios.get('/admin/reservation/g_reservation_details', {
            room_id:            data.actual_room_id
        })
        .then(({data}) => {
            if(data.response){
                this.dialog_room_information = true
            }
            this.$store.dispatch('admin_reservation/set_room_information', data.data)
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
.v-data-table.row-height-50 td{
  height: 76px !important;
}
.v-data-table::v-deep th {
  font-size: 16px !important;
  font-weight: bold;
}
</style>