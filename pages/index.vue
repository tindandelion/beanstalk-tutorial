<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Upload playdata files to S3
        </v-card-title>
        <v-card-text>
          <v-file-input
            v-model="fileToUpload"
            :label="'File to upload'"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="upload"> Upload </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      fileToUpload: null,
    }
  },
  methods: {
    upload() {
      this.$axios.$post('/api/upload').catch((e) => {
        console.log('Error: ' + e)
      })
    },
  },
}
</script>
