<template>
    <v-container fluid class="pa-0 ma-0">
        <div
            style="height: 550px;"
        >
            <v-carousel
                cycle
                hide-delimiter-background
                show-arrows-on-hover
                height="inherit"
            >
                <v-carousel-item
                    v-for="(slide, i) in images"
                    :key="i"
                >
                    <v-img
                        :src="slide.location"
                        :lazy-src="slide.location"
                        aspect-ratio="1/16"
                    />
                </v-carousel-item>
            </v-carousel>
        </div>
    </v-container>
</template>

<script>
export default {
  components: {
  },
  props: [
  ],
  data: () => ({
    // colors: [
    //     'indigo',
    //     'warning',
    //     'pink darken-2',
    //     'red lighten-1',
    //     'deep-purple accent-4',
    // ],
    // slides: [
    //     'First',
    //     'Second',
    //     'Third',
    //     'Fourth',
    //     'Fifth',
    //     'Sixth'
    // ],
    images: [
        {
            location:       require('../../../../assets/1.jpg')
        },
        {
            location:       require('../../../../assets/2.jpg')
        },
        {
            location:       require('../../../../assets/3.jpg')
        },
        {
            location:       require('../../../../assets/4.jpg')
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