<template>
    <v-container fill-height fluid class="pa-5 ma-0">
        <h2 class="pb-10">Calendar</h2>
        <v-row>
            <v-col>
                test
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    components: {
        
    },
    computed: {
        ...mapGetters({
            get_user: 'auth/get_user'
        })
    },
    async mounted() {
    },
    async created() {
    },
    data: () => ({
        
    }),
    methods: {
        showSnackBar(message) {
            this.$store.commit("auth/setMessage",
                { show: true, message: message },
                { root: 1 })
        },
        
    }

}
</script>

<style lang="scss" scoped>
</style>