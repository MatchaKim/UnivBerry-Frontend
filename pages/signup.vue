<template>
    <Navbar/>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignup" class="signup-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="signup-button">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
const auth = useAuth();
const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");

const handleSignup = async () => {
    await auth.signup(username.value, email.value, password.value);
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: calc(100% - 20px);
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.signup-button {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background-color: #555;
}
</style>
