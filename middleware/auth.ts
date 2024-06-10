export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuth();
  
    if (!auth.user.value) {
      return navigateTo('/login');
    }
  });
  