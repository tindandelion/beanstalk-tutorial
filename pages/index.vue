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
          <v-btn color="primary" :disabled="!fileToUpload" @click="upload"> Upload </v-btn>
        </v-card-actions>
      </v-card>
      <v-alert v-if="uploadSucceeded" type="success">
        The file was uploaded successfully
      </v-alert>
      <v-alert v-if="uploadError" type="error">
        {{ uploadError }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      fileToUpload: null,
      uploadSucceeded: false,
      uploadError: null,
    }
  },
  methods: {
    upload() {
      const form = new FormData()
      form.append('content', this.fileToUpload)

      this.$axios
        .$post('/api/upload', form)
        .then(() => this.showSuccessfulUpload())
        .catch((e) => this.showFailedUpload(e))
    },

    showSuccessfulUpload() {
      this.uploadSucceeded = true
    },

    showFailedUpload(error) {
      this.uploadError = error.message
    },
  },
}
</script>
