<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
            <h2 class="text-center text-3xl font-bold text-gray-900 dark:text-white">Create an Account</h2>
            <form @submit.prevent="register" class="space-y-6">
                <div>
                    <label for="username"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                    <input v-model="username" type="text" id="username"
                        class="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input v-model="email" type="email" id="email"
                        class="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>

                <div>
                    <label for="password"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input v-model="password" type="password" id="password"
                        class="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>

                <div>
                    <label for="confirm" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm
                        Password</label>
                    <input v-model="confirmPassword" type="password" id="confirm"
                        class="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>

                <div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                        Register
                    </button>
                </div>
            </form>
            <p class="text-xs text-center pt-2 text-gray-500 dark:text-gray-400">
                Already have an account?
                <NuxtLink to="/login" class="text-blue-400 hover:underline">Sign in</NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

async function register() {
    if (password.value !== confirmPassword.value) {
        return alert("Passwords do not match")
    }

    try {
        const response = await $fetch('http://localhost:3302/api/register-user', {
            method: 'POST',
            body: {
                username: username.value,
                password: password.value,
                email: email.value
            }
        })

        if (response.success) {
            alert('Registration successful!')
            router.push('/login')
        } else {
            alert(response.message || 'Registration failed.')
        }
    } catch (error) {
        console.error('Register error:', error.message)
    }
}
</script>