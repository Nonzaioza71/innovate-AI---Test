export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log("isn't auth.");
    
    return navigateTo('/login');
  }
});
