<template>
    <v-container fill-height fluid>
      <v-row>
        <v-col
            col="2"
        >
            <v-avatar
                color="grey"
                size="150"
            >
                <v-img
                    src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80"
                    :apsect-ratio="1"
                />
            </v-avatar>
        </v-col>
        <v-col
            cols="10"
        >
            <v-card>
                <v-card-title class="text-small">
                    <strong><small>{{get_user_data.name}}</small></strong>
                    <v-spacer/>
                    <small style="fontSize: 14px;">{{get_user_data.created_at}}</small>
                </v-card-title>
                <v-card-subtitle>
                    {{get_user_data.email}}
                    <v-spacer/>
                    <strong><small style="fontSize: 14px;">{{get_user_data.mobile}}</small></strong>
                </v-card-subtitle>
            </v-card>
        </v-col>
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
  }),
  mounted () {

  },
  created () {
  },
  computed: {
    ...mapGetters({
        get_user_data:              'auth/get_user_data'
    })
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>