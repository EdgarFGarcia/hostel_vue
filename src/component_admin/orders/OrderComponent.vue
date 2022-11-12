<template>
    <v-container fill-height fluid class="pa-0 ma-0">
        <v-data-table
            :headers="orders_header"
            :items="orders"
            style="width:100%"
            class="elevation-1"
        >
            <template v-slot:item="{item}">
                <tr>
                    <td>
                        {{item.get_user.name}}
                    </td>
                    <td>
                        {{item.name}}
                    </td>
                    <td>
                        {{moment(item.created_at).format("h:mm:ss a, MMM DD, YYYY")}}
                    </td>
                    <td>
                        {{item.price}}
                    </td>
                    <td v-if="item.paid">
                        Yes
                    </td>
                    <td v-else>
                        No
                    </td>
                    <td>
                        <v-btn
                            dark
                            v-if="!item.paid"
                            @click="order_paid(item.id)"
                        >
                            Paid
                        </v-btn>
                        <v-btn
                            disabled
                            v-else
                        >
                            Paid
                        </v-btn>
                    </td>
                </tr>
            </template>
        
        </v-data-table>
    </v-container>
</template>

<script>
import moment from 'moment'
export default {
  components: {
  },
  props: [
  ],
  data: () => ({
    orders_header: [
        {
            text: 'User',
            sortable: false
        },
        {
            text: 'Order',
            sortable: false
        },
        {
            text: 'Time',
            sortable: false
        },
        {
            text: 'Price',
            sortable: false
        },
        {
            text: 'Paid',
            sortable: false
        },
        {
            text: 'Mark as paid',
            sortable: false
        }
    ],
    orders: []
  }),
  async mounted () {
    this.get_orders()
  },
  created () {
  },
  computed: {
  },
  methods: {
    moment: function (time) {
        return moment(time);
    },
    async get_orders(){
        await this.$axios.get('/user/auth_user/get_orders')
        .then(({data}) => {
            this.orders = data
            console.log(this.orders)
        })
    },
    async order_paid(order){
        await this.$axios.post('/user/auth_user/pay_order', order)
        .then(({data}) => {
            this.orders = data
            console.log(this.orders)
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>