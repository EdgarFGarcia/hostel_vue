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
            <template v-slot:item="{ item }">
                <tr
                    style="cursor: pointer;"
                    class="mx-5"
                >
                    <td>
                        {{item.get_user.name}}
                    </td>
                    <td>
                        {{item.get_user.email}}
                    </td>
                    <td>
                        {{item.get_room_info.room_name}}
                    </td>
                    <td>
                        {{item.payable | currency('₱')}}
                    </td>
                    <td>
                        {{item.is_paid}}
                    </td>
                    <td>
                        {{item.is_verified}}
                    </td>
                </tr>
            </template>
        </v-data-table>
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
            text: 'Room'
        },
        {
            text: 'Payable'
        },
        {
            text: 'Paid'
        },
        {
            text: 'Verified'
        }
    ]
  }),
  async mounted () {
    await this.$store.dispatch('admin_reservation/fetch_reservations')
  },
  created () {
  },
  computed: {
    ...mapGetters({
        get_reservation_list:           'admin_reservation/get_reservation_list'
    })
  },
  methods: {
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