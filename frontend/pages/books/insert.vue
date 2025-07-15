<template>
    <div class="py-3">
        <NuxtLink to="/books" class="text-blue-500 ms-3 rounded bg-gray-400 hover:bg-gray-500 text-white px-3 py-1">
            ← Back to List
        </NuxtLink>
    </div>

    <div class="max-w-2xl mx-auto p-6 sm:p-8">
        <div class="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
            <h1 class="text-2xl font-bold text-gray-800 border-b pb-2">📚 Add New Book</h1>

            <form @submit.prevent="addBook" class="space-y-4">
                <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Title</label>
                    <input v-model="book.title" placeholder="e.g. The Great Gatsby"
                        class="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Author</label>
                    <input v-model="book.author" placeholder="e.g. F. Scott Fitzgerald"
                        class="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Published Year</label>
                        <input v-model="book.published_year" type="number" placeholder="e.g. 1925"
                            class="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>

                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Genre</label>
                        <input v-model="book.genre" placeholder="e.g. Classic Fiction"
                            class="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                </div>

                <div class="pt-4">
                    <button type="submit"
                        class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Save Book
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth'
});


const router = useRouter()

const book = ref({
    title: '',
    author: '',
    published_year: '',
    genre: ''
})

async function addBook() {
    try {
        const res = await $fetch('http://localhost:3302/api/book-insert', {
            method: 'POST',
            body: book.value,
            headers: {
                accept: 'application/json',
                authentication: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (process.client) {
            const Swal = (await import('sweetalert2')).default
            await Swal.fire({
                title: 'Success',
                text: 'Book added successfully!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            })
        }

        router.push('/books')
    } catch (err) {
        if (process.client) {
            const Swal = (await import('sweetalert2')).default
            await Swal.fire({
                title: 'Error',
                text: 'Failed to add book. Please try again.',
                icon: 'error'
            })
        }
    }
}
</script>
