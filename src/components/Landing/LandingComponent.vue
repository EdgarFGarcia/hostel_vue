<template>
    <div fluid>
        <v-tabs
            v-model="tab"
            background-color="#A69C88"
            dark
            grow
        >
            <v-tabs-slider></v-tabs-slider>

            <v-tab
                v-for="(nav, navindex) in navigation"
                :key="navindex"
                :href="nav.href"
                ripple
            >
                <h2
                    style="textTransform: none !important;"
                >{{nav.label}}</h2>
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item
                value="tab-1"
            >
                Home with iamge carousel
            </v-tab-item>
        </v-tabs-items>
        <v-tabs-items v-model="tab">
            <v-tab-item
                value="tab-2"
            >
                <label>Offers tab</label>
            </v-tab-item>
        </v-tabs-items>
        <v-tabs-items v-model="tab">
            <v-tab-item
                value="tab-3"
            >
                Book Direct
            </v-tab-item>
        </v-tabs-items>
        <v-tabs-items v-model="tab">
            <v-tab-item
                value="tab-4"
            >
                <Rooms/>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import Rooms from './components/RoomComponent.vue'
export default {
  components: {
    Rooms
  },
  props: [
  ],
  data: () => ({
    tab: null,
    navigation: [
        {
            label:      'Home',
            href:       '#tab-1'
        },
        {
            label:      'Special Offers',
            href:       '#tab-2'
        },
        {
            label:      'Book Direct',
            href:       '#tab-3'
        },
        {
            label:      'Rooms',
            href:       '#tab-4'
        }
    ]
  }),
  mounted () {
  },
  created () {
  },
  computed: {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>