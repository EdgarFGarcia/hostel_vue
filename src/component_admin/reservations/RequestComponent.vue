<template>
    <v-container fluid class="pa-0 ma-0">
        <v-alert
            color="deep-purple accent-4"
            dark
        >
            Requests
        </v-alert>
        <v-data-table
            :headers="reservation_header"
            :items="get_requests"
            class="elevation-1"
        >
            <template v-slot:item="{ item }">
                <tr
                    class="mx-5"
                >
                    <td>
                        {{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}}
                    </td>
                    <td>
                        {{item.get_user.name}}
                    </td>
                    <td>
                        {{item.request}}
                    </td>
                    <td>
                        <v-btn
                            v-if="!item.done"
                            dark
                            @click="done(item.id)"
                        >
                            Mark as done
                        </v-btn>
                        <v-btn
                            v-else
                            disabled
                        >
                            Done
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
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
    reservation_header: [
        {
            text: 'Created at'
        },
        {
            text: 'Name'
        },
        {
            text: 'Request'
        },
        {
            text: 'Done'
        }
    ],
    dialog_room_information: false,
    dialog_additional: false,
    reason: null,
    amount_due: null,
    additional_check_in_id: null,
    img_src: null
  }),
  async mounted () {
    await this.$store.dispatch('admin_reservation/fetch_requests')
  },
  created () {
    this.img_src = process.env.VUE_APP_URL
  },
  computed: {
    ...mapGetters({
        get_requests:                 'admin_reservation/get_requests'
    })
  },
  methods: {
    moment: function (time) {
        return moment(time);
    },
    async done(data){
        await this.$axios.post('/admin/reservation/mark_request_done', {id: data})
        .then(({data}) => {
            console.log(data)
            this.$store.dispatch('admin_reservation/set_requests', data.data)
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