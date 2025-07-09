<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside v-if="isAuth" class="w-64 bg-gray-800 text-white hidden sm:block">
      <div class="p-4 text-lg font-semibold border-b border-gray-700">Menu</div>
      <nav class="py-4">
        <NuxtLink to="/books" v-bind:class="`block py-2 px-3 bg-gray-600 border-b border-t hover:bg-gray-700`">📚 Books
        </NuxtLink>
        <!-- <NuxtLink to="/master-data/category" v-bind:class="`block py-2 px-3 bg-gray-600 border-b border-t hover:bg-gray-700`">📂 Category
        </NuxtLink> -->
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <header v-if="isAuth" class="bg-white shadow px-4 py-3 flex justify-between items-center">
        <h1 class="text-lg font-bold">BookVault</h1>
        <button @click="logout" class="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
      </header>

      <!-- Page Content -->
      <main class="flex-1">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isAuth = ref(false)
const router = useRouter()

onMounted(() => {
  isAuth.value = !!localStorage.getItem('token')
})


function logout() {
  localStorage.removeItem('token')
  isAuth.value = false
  router.push('/')
}
</script>