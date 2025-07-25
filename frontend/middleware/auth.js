export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("isn't auth.");
      return navigateTo('/login');
    }
  }
});
