<script setup lang="ts">
</script>

<template>
  <v-container class="text-center">
    <v-row justify="center">
      <v-col cols="12" md="3" sm="6" class="d-flex justify-center align-center">
        <v-btn variant="outlined" prepend-icon="mdi-home" rounded="xl" size="x-large" color="primary">
          Home
        </v-btn>
      </v-col>

      <v-col cols="12" md="3" sm="6" class="d-flex justify-center align-center">
        <v-btn variant="outlined" prepend-icon="mdi-check-circle" rounded="xl" size="x-large" color="success">
          Accept
        </v-btn>
      </v-col>

      <v-col cols="12" md="3" sm="6" class="d-flex justify-center align-center">
        <v-btn variant="outlined" prepend-icon="mdi-close" rounded="xl" size="x-large" color="error">
          Close
        </v-btn>
      </v-col>

      <v-col cols="12" md="3" sm="6" class="d-flex justify-center align-center">
        <v-btn variant="outlined" prepend-icon="mdi-account" rounded="xl" size="x-large" color="info">
          Account
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
