<template>
  <div>
    <Navbar />
    <CreateCertificationGroup />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
</script>
