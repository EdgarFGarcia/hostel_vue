<template>
  <v-app>
    <v-main>
      <component :is="layout">
        <router-view />
        <div class="mt-10 mb-10 pl-10">
          Check us out
          <v-btn
              class="ml-5"
              icon
              color="#6757F7"
              href="https://web.facebook.com/whitebananamanila"
              target='#'
          >
              <v-icon
                  small
              >mdi-facebook</v-icon>
          </v-btn>
          <v-btn
              icon
              color="#6757F7"
              href="https://www.instagram.com/whitebanana.mnl"
              target='#'
          >
              <v-icon
                  small
              >mdi-instagram</v-icon>
          </v-btn>
        </div>
      </component>
    </v-main>
    <v-snackbar 
      v-model="mSnackbar.show" 
      bottom="bottom" 
      multi-line="multi-line" 
      :timeout="4000" 
      :vertical="true">
      {{ mSnackbar.message }}<br/>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',

  components: {
  },

  computed: {
    layout(){
      return this.$route.meta.layout + '-layout';
    },
    ...mapGetters({
      mSnackbar: 'auth/mSnackbar'
    })
  },

  data: () => ({
    chat_bot_model: false,
    label: null 
  }),
  methods: {
    open_chat_bot(){
      this.chat_bot_model = true
    },
    location(){
      this.label = "<strong>8459 Kalayaan Avenue, Corner Don Pedro, St, Makati, 1210 Metro Manila</strong>"
    },
    rooms(){
      this.label = "<ul><li>Bunk Bed (good for groups stay)</li><li>One Bedroom Suites (good for 3pax)</li><li>Standard Double Room (good for 2pax)</li><li>Deluxe Double Room (good for 2pax)</li></ul>";
    },
    rates(){
      this.label = "<ul style='diplay: block;'><li>Bunk Bed (Php801.00)</li><li>One Bedroom Suites (Php2,306.00)</li><li>Standard Double Room (Php1,337.00)</li><li>Deluxe Double Room (Php2,037.00)</li></ul>"
    },
    reservation(){
      this.label = "<strong>Yes, just click the book direct on this website.</strong>";
    },
    requirement(){
      this.label = "<ul><li>Fully vaccinated individuals of all ages are allowed to check in for staycation. Proof of complete vaccination must be presented.</li><li>Children and guests below 17 years of age will be accommodated as long as they are accompanied by fully vaccinated adults. Negative RT-PCR test results are not required for guests below 17 years of age.</li><li>Unvaccinated guests 18 years of age and above are required to present a negative swab/saliva RT-PCR test result issued not more than 48 hours before check-in.</li></ul>";
    }
  }
};
</script>
