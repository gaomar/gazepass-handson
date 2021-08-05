<template>
  <v-layout row justify-center>
    <v-dialog v-model="loadingInfo.loading" persistent content content-class="centered-dialog">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <v-progress-circular indeterminate :size="70" :width="7"></v-progress-circular>
          <h1 v-if="loadingInfo.message != null">{{loadingInfo.message}}</h1>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "Loading",
  data: function () {
    return {}
  },
  props: {
    loadingInfo: Object
  }
}
</script>

<style>
  .dialog.centered-dialog,
  .v-dialog.centered-dialog
 {
    background: #282c2dad;
    box-shadow: none;
    border-radius: 6px;
    width: auto;
    color: whitesmoke;
  }
</style>