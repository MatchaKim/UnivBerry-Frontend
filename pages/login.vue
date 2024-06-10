<template>
  <Navbar/>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script setup>

const auth = useAuth()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  await auth.login(username.value, password.value)
  useRouter().push("/")
}
</script>

<style scoped>
.login-container {
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

.login-form {
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

.login-button {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #555;
}
</style>
