<template>
    <NContainer class="py-10">
      <NCard>
        <NCardHeader>
          <h1 class="text-xl font-semibold">Product Verification</h1>
        </NCardHeader>
        <NCardBody>
          <NLoading v-if="loading" class="text-center py-5">Checking verification status...</NLoading>
          <div v-else-if="isVerified" class="text-center text-green-600 font-bold py-5">인증이 완료되었습니다</div>
          <div v-else class="text-center text-red-600 font-bold py-5">인증이 실패하였습니다</div>
        </NCardBody>
      </NCard>
    </NContainer>
  </template>

<script setup>
const isVerified = ref(false);
const loading = ref(true);
const route = useRoute();

onMounted(async () => {
  // URL 파라미터에서 ID를 받아옴
  const productId = route.params.id;
  const url = `http://localhost:8080/product-user/verify/product/${productId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.verified) {
      isVerified.value = true;
    } else {
      isVerified.value = false;
    }
  } catch (error) {
    console.error("Error fetching verification status:", error);
    isVerified.value = false;
  } finally {
    loading.value = false;
  }
});
</script>
