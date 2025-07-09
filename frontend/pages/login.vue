<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div
            class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300">
            <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h2>
            <p class="text-center text-sm text-gray-500 dark:text-gray-400">Please sign in to your account</p>

            <form @submit.prevent="login" class="space-y-6">
                <div>
                    <label for="username"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                    <input v-model="username" type="text" id="username" autocomplete="username"
                        class="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>

                <div>
                    <label for="password"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input v-model="password" type="password" id="password" autocomplete="current-password"
                        class="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>

                <div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                        Login
                    </button>
                </div>
            </form>

            <div class="text-center text-xs text-gray-500 dark:text-gray-400 pt-4">
                Forgot your password? <a href="#" class="text-blue-400 hover:underline">Reset it here</a>
                {{ show_alert }}
            </div>
        </div>
    </div>
    <AlertBox v-bind:set_show_alert="set_show_alert" v-bind:visible="show_alert" v-bind:message="message_alert"
        v-bind:type="type_alert" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const show_alert = ref(false)
const set_show_alert = ref((e) => show_alert.value = e)
const message_alert = ref('')
const type_alert = ref('error')

async function login() {
    try {
        const response = await $fetch('http://localhost:3302/api/user-login', {
            method: 'POST',
            body: { username: username.value, password: password.value }
        })
        console.log(response);
        if (!response.success) {
            show_alert.value = true
            message_alert.value = response.message
            type_alert.value = 'error'
        } else if (response.success) {
            localStorage.setItem('token', response.data)
            router.push('/')
        }
    } catch (error) {
        console.error('Login error:', error.message)
    }
}
</script>