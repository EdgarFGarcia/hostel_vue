<template>
    <v-container fluid class="pa-0 ma-0">
        <div style="height: auto;">
            <h1 style="text-align:center" class="mt-5">Metro's Hippest Neighborhood</h1>
            <h2 style="text-align:center" class="mb-10">At Connector Hostel</h2>
            <v-row>
                <v-col cols="4" v-if="!isMobile()">
                    <img :src="require('../../../../assets/f2.jpg')" style="max-width: 100%;padding:10px" />
                </v-col>
                <v-col cols="4" v-if="!isMobile()">
                    <img :src="require('../../../../assets/f1.jpg')" style="max-width: 100%;padding:10px" />
                </v-col>
                <v-col cols="4" v-if="!isMobile()">
                    <img :src="require('../../../../assets/f3.jpg')" style="max-width: 100%;padding:10px" />
                </v-col>
                <v-col cols="12" v-if="isMobile()">
                    <img :src="require('../../../../assets/f1.jpg')" style="max-width: 100%;padding:10px" />
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="isMobile() ? 12 : 6">
                    <div align="center"
                        :class="isMobile() ? 'pt-4 pb-4' : ''"
                        style="background-color:#fcf6dc;padding-top:25%;box-shadow: 0px 0px 3px 1px #888888;height:100%">
                        <strong><small>7:30AM to 10:00AM</small></strong>
                        <h2>Dr. Bread Manila</h2>
                        <h4>START YOUR DAY WITH A YUMMY BREAKFAST</h4>
                    </div>
                </v-col>
                <v-col :cols="isMobile() ? 12 : 6">
                    <img :src="require('../../../../assets/drbread.jpg')" style="max-width: 100%;" />
                </v-col>
            </v-row>
            <v-row v-if="!isMobile()">
                <v-col :cols="isMobile() ? 12 : 6">
                    <img :src="require('../../../../assets/drwine.jpg')" style="max-width: 100%;" />
                </v-col>
                <v-col :cols="isMobile() ? 12 : 6">
                    <div align="center"
                        style="background-color:#fcf6dc;padding-top:25%;box-shadow: 0px 0px 3px 1px #888888;height:100%">
                        <strong><small>12:00PM to 3:00PM</small></strong>
                        <h2>Dr. Wine Manila</h2>
                        <h4>LIVE A LUXURIOUS EXPERIENCE</h4>
                    </div>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col :cols="isMobile() ? 12 : 6">
                    <div align="center"
                        :class="isMobile() ? 'pt-4 pb-4' : ''"
                        style="background-color:#fcf6dc;padding-top:25%;box-shadow: 0px 0px 3px 1px #888888;height:100%">
                        <strong><small>12:00PM to 3:00PM</small></strong>
                        <h2>Dr. Wine Manila</h2>
                        <h4>LIVE A LUXURIOUS EXPERIENCE</h4>
                    </div>
                </v-col>
                <v-col :cols="isMobile() ? 12 : 6">
                    <img :src="require('../../../../assets/drwine.jpg')" style="max-width: 100%;" />
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="isMobile() ? 12 : 6">
                    <div align="center"
                        :class="isMobile() ? 'pt-4 pb-4' : ''"
                        style="background-color:#fcf6dc;padding-top:25%;box-shadow: 0px 0px 3px 1px #888888;height:100%">
                        <strong><small>6:00PM to 2:00AM</small></strong>
                        <h2>Buccaneers Rum & Cocktail</h2>
                        <h4>TAKE A DRINK AND HAVE FUN</h4>
                    </div>
                </v-col>
                <v-col :cols="isMobile() ? 12 : 6">
                    <img :src="require('../../../../assets/buccaneers.jpg')" style="max-width: 100%;" />
                </v-col>
            </v-row>
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
                location: require('../../../../assets/1.jpg')
            },
            {
                location: require('../../../../assets/2.jpg')
            },
            {
                location: require('../../../../assets/3.jpg')
            },
            {
                location: require('../../../../assets/4.jpg')
            }
        ]
    }),
    mounted() {
        
    },
    created() {
    },
    computed: {
    },
    methods: {
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                console.log("mobile")
                return true
            } else {
                console.log("desktop")
                return false
            }
        },
    },
    watch: {
    }
}
</script>

<style scoped lang="scss"></style>