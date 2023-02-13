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
              href="https://web.facebook.com/whitebananamnl"
              target='#'
          >
              <v-icon
                  small
              >mdi-facebook</v-icon>
          </v-btn>
          <v-btn
              icon
              color="#6757F7"
              href="https://www.instagram.com/whitebanana.mnl/"
              target='#'
          >
              <v-icon
                  small
              >mdi-instagram</v-icon>
          </v-btn>
        </div>
        <!--<v-btn
          elevation="2"
          fab
          icon
          style="position: fixed; bottom: 30px; right: 30px; background-color:white;"
          color="primary"
          @click="open_chat_bot"
        >
          <v-icon>mdi-chat</v-icon>
        </v-btn>-->
      </component>
    </v-main>
    <!--<v-dialog
      v-model="chat_bot_model"
      persistent
      width="720"
    >
      <v-card>
        <v-card-title>
          <small>What's your question?</small>
        </v-card-title>
        <v-card-text>
          <v-row
            class="mt-5"
          >
            <v-btn
              color="primary"
              rounded
              class="mr-5 mb-3"
              @click="location"
            >
              Where are you located?
            </v-btn>
            <v-btn
              color="primary"
              rounded
              class="mr-5 mb-3"
              @click="rooms"
            >
              Can I see available rooms?
            </v-btn>
            <v-btn
              color="primary"
              rounded
              class="mr-5 mb-3"
              @click="rates"
            >
              Rates?
            </v-btn>
            <v-btn
              color="primary"
              rounded
              class="mr-5 mb-3"
              @click="reservation"
            >
              Can I make a reservation?
            </v-btn>
            <v-btn
              color="primary"
              rounded
              class="mr-5 mb-3"
              @click="requirement"
            >
              What are your requirements for check-in?
            </v-btn>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-textarea
            v-html="label"
            disabled
            filled
          >
          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            text
            outline
            @click="chat_bot_model = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  computed: {
    layout(){
      return this.$route.meta.layout + '-layout';
    },
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
