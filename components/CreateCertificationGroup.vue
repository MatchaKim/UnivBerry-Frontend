<template>
  <div class="cert-group-container">
    <label for="university-search" class="university-label">University Search:</label>
    <input
      type="text"
      id="university-search"
      v-model="searchQuery"
      @input="fetchUniversities"
      class="university-input"
      placeholder="Search for a university"
    />
    <div v-if="universities.length > 0" class="university-list">
      <div
        v-for="university in universities"
        :key="university.id"
        @click="selectUniversity(university)"
        class="university-item"
      >
        {{ university.name }}
      </div>
    </div>

    <div v-if="selectedUniversity" class="create-group-container">
      <form @submit.prevent="handleSubmit">
        <label for="forceEmail">Force Email:</label>
        <input v-model="forceEmail" id="forceEmail" required />

        <button type="submit">Create Group</button>
      </form>

      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface University {
  id: string;
  name: string;
  email: string;
}

const searchQuery = ref("");
const universities = ref<University[]>([]);
const selectedUniversity = ref<University | null>(null);
const forceEmail = ref("");
const message = ref("");
const config = useRuntimeConfig();
const auth = useAuth();
const emit = defineEmits(["change"]);
const router = useRouter();

const fetchUniversities = async () => {
  if (searchQuery.value.trim() === "") {
    universities.value = [];
    return;
  }

  try {
    const { data, error } = await useFetch(
      `${config.public.apiBase}/universities/search?name=${searchQuery.value}`,
      {
        headers: {
          Authorization: `${auth.token.value}`,
        },
      }
    );

    if (error.value) {
      console.error("Error fetching universities:", error.value);
    } else if (data.value) {
      universities.value = data.value;
    } else {
      console.warn("No university data available");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const selectUniversity = (university: University) => {
  selectedUniversity.value = university;
  forceEmail.value = university.email;
  universities.value = [];
  searchQuery.value = university.name;
};

const handleSubmit = async () => {
  try {
    const { data, error } = await useFetch(
      `${config.public.apiBase}/certification-group`,
      {
        method: "POST",
        headers: {
          Authorization: `${auth.token.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ forceEmail: "@" + forceEmail.value }),
      }
    );

    if (error.value) {
      message.value = `Error: ${error.value.message}`;
    } else {
      message.value = "Certification group created successfully!";
      forceEmail.value = ""; // Clear the input
      router.push("/"); // 리디렉션
    }
  } catch (error) {
    message.value = `Fetch error: ${error.message}`;
  }
};
</script>

<style scoped>
.cert-group-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.university-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.university-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.university-list {
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.university-item {
  padding: 0.5rem;
  cursor: pointer;
}

.university-item:hover {
  background-color: #f0f0f0;
}

.create-group-container {
  max-width: 400px;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 1rem;
  color: green;
}
</style>
