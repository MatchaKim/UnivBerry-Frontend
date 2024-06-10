<template>
  <div class="nav-container">
    <nuxt-link to="/" class="nav-link">Home</nuxt-link>
    <nuxt-link v-if="user" to="/dash-board" class="nav-link">DashBoard</nuxt-link>
    <nuxt-link v-if="!user" to="/login" class="nav-link">Login</nuxt-link>
    <nuxt-link v-if="!user" to="/signup" class="nav-link">Sign Up</nuxt-link>
    <nuxt-link v-if="user" to="/create-certi" class="nav-link">Create Group</nuxt-link>
    <nuxt-link v-if="user" @click="logout" class="nav-link">Logout</nuxt-link>
  </div>
</template>

<script setup>
const { user, logout } = useAuth();
</script>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  padding: 1rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #555;
}
</style>
