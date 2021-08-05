<template>
  <v-app>
    <header>
      <v-app-bar app>
        <v-toolbar-title>ログイン画面</v-toolbar-title>
      </v-app-bar>
    </header>
    <v-main>
      <v-card width="650px" class="mx-auto mt-5">
        <v-container>
          <v-card-title>ログイン</v-card-title>
          <v-btn block color="success" @click="signIn" :loading="loading">ログイン</v-btn>
        </v-container>
      </v-card>
      <!-- loading -->
      <div>
        <loading-message
          :loadingInfo="loadingInfo"
        ></loading-message>
      </div>
      <!-- Snackbar -->
      <div>
        <v-snackbar
          v-model="snackbarFlag"
          :color="snackbarColor"
          :timeout="snackbarTimeout"
          :multi-line="true"
          top
        >
          {{ snackbarText }}
          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="snackbarFlag = false"
            >
              <v-icon
              right
              >
              mdi-close-circle-outline
            </v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import LoadingMessage from '@/components/LoadingMessage'
var gazepassjs = require("gazepassjs")
var gp = new gazepassjs.default(process.env.VUE_APP_GAZEPASS_API_KEY)

export default {
  components: {
    LoadingMessage
  },
  data() {
    return {
      snackbarFlag: false,
      snackbarTimeout: 30000,
      snackbarColor: 'success',
      snackbarText: '',
      loading: false,
      loadingInfo: {
        loading: false,
        message: '処理中...'
      },
    }
  },
  computed: {
    APP_TITLE: {
      get: function() {
        return process.env.VUE_APP_TITLE
      }
    }
  },
  methods: {
    async signIn() {
      var me = this

      var access_token = await gp.getAccessToken()

      if (access_token.length > 0) {
        this.loading = true
        this.loadingInfo.loading = true

        const headerName = process.env.VUE_APP_HEADER_NAME

        axios.post(`${process.env.VUE_APP_API_URL}/signIn`, {
            'access_token': access_token
        }, {
          headers: {
            'x-api-key': headerName,
          }
        })
        .then(response => {
          me.loading = false
          me.loadingInfo.loading = false
          me.showSnackbar(`こんにちは！${response.data.user.email}さん ID:${response.data.user.id}`, 'success')
        }).catch(error => {
          console.log(error);
          me.loading = false
          me.loadingInfo.loading = false
          me.showSnackbar('ログインに失敗しました', 'error')
        });

      }
    },
    showSnackbar(text, color) {
      this.snackbarFlag = true
      this.snackbarColor = color
      this.snackbarText = text
    },
  }
}
</script>