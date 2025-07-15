export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('token');
  console.log("middleware!!");
  
  if (!token) {
    console.log("isn't auth.");
    console.log(to.name);
    
    return navigateTo('/login');
  }
});
