<template>
  <div>
    <Navbar/>
    <CertificationGroupSelector @change="fetchProductUsers"/>
    <div v-if="selectedGroupId != null" class="send-email-container">
      <label for="email">Email:</label>
      <input type="email" v-model="email" id="email" placeholder="Enter email" />
      <button @click="sendEmail">Send Email</button>
    </div>
    <ProductUserTable :users="productUsers"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
const productUsers = ref([]);
const selectedGroupId = ref(null)
const config = useRuntimeConfig();
const auth = useAuth();

const fetchProductUsers = async (groupId: string) => {
  selectedGroupId.value = groupId

  try {
    const { data, error } = await useFetch(
      `${config.public.apiBase}/certification-group/${groupId}/product-users`,
      {
        headers: {
          Authorization: `${auth.token.value}`,
        },
      }
    );

    if (error.value) {
      console.error("Error fetching product users:", error.value);
    } else if (data.value) {
      console.log("Product Users Data:", data.value);
      productUsers.value = data.value;
    } else {
      console.warn('No product users data available');
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const sendEmail = async () => {
  if (!selectedGroupId.value) {
    console.warn('No group selected');
    return;
  }

  try {
    const { data, error } = await useFetch(
      `${config.public.apiBase}/certification-group/${selectedGroupId.value}/product-user`,
      {
        method: 'POST',
        headers: {
          Authorization: `${auth.token.value}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.value })
      }
    );

    if (error.value) {
      console.error("Error sending email:", error.value);
    } else if (data.value) {
      console.log("Email sent successfully:", data.value);
      await fetchProductUsers(selectedGroupId.value);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
</script>

<style scoped>
.send-email-container {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.send-email-container label {
  margin-bottom: 0.5rem;
}

.send-email-container input {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.send-email-container button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.send-email-container button:hover {
  background-color: #0056b3;
}
</style>