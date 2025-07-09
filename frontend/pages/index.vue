<template>
    <div class="bg-cover min-h-screen flex items-center justify-center bg-purple-pattern">
        <div class="text-center space-y-6 text-white px-6 bg-gray-50 rounded px-3 py-5 shadow-xl">
            <h1 class="text-4xl font-bold drop-shadow-xl text-gray-600">Welcome to BookVault</h1>
            <p class="text-lg text-gray-500">Your personal library manager(Books CRUD system)</p>
            <div class="flex gap-3 justify-center">
                <NuxtLink v-if="!isAuth" to="/login"
                    class="px-6 py-3 bg-yellow-300 text-indigo-900 rounded-full hover:bg-yellow-400 transition;">Login
                </NuxtLink>
                <NuxtLink v-if="!isAuth" to="/register"
                    class="px-6 py-3 bg-yellow-300 text-indigo-900 rounded-full hover:bg-yellow-400 transition;">
                    Register</NuxtLink>
                <NuxtLink to="/books"
                    class="px-6 py-3 bg-yellow-300 text-indigo-900 rounded-full hover:bg-yellow-400 transition;">Browse
                    Books</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isAuth = ref(false)

onMounted(() => {
    isAuth.value = !!localStorage.getItem('token')
})

</script>

<style scoped>
.bg-purple-pattern {
    background-color: #8f61d3;
    background-image: url('/images/books-bg.png');
    background-repeat: repeat;
    background-size: auto;
}
</style>