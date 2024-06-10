<template>
  <div class="cert-group-container">
    <label for="cert-group" class="cert-group-label">Certification Group:</label>
    <select
      id="cert-group"
      v-model="selectedGroup"
      @change="handleChange"
      class="cert-group-select"
    >
      <option v-for="group in groups" :key="group.id" :value="group.id">
        {{ group.forceEmail }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Group {
  id: string;
  forceEmail: string;
}


const groups = ref<Group[]>([]);
const selectedGroup = ref<string | null>(null);
const config = useRuntimeConfig();
const auth = useAuth();
const emit = defineEmits(["change"]);

const fetchGroups = async () => {

    console.log(auth.token.value)
  try {
    const { data, error } = await useFetch(
      `${config.public.apiBase}/certification-group/user-groups`,
      {
        headers: {
          Authorization: `${auth.token.value}`,
        },
      }
    );

    if (error.value) {
      console.error("Error fetching groups:", error.value);
    } else if (data.value) {
      console.log(JSON.stringify(data.value));
      groups.value = data.value.map((group: any) => ({
        id: group.id,
        forceEmail: group.forceEmail,
      }));
      console.log(groups.value+"그룹")
    } else {
      console.warn("No groups data available");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const handleChange = () => {
  emit("change", selectedGroup.value);
};


onMounted(() => {
  fetchGroups();
});




</script>

<style scoped>
.cert-group-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.cert-group-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.cert-group-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
