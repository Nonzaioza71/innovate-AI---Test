<template>
    <div class="py-3">
        <NuxtLink :to="`/books`" class="text-blue-500 ms-3 rounded bg-gray-400 hover:bg-gray-500 text-white px-3 py-1">← Back to List</NuxtLink>
    </div>
    <div class="max-w-2xl mx-auto p-6 sm:p-8">
        <!-- Loading Spinner -->
        <div v-if="isLoading" class="text-center py-12 text-gray-500">
            <div class="animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent mx-auto mb-4">
            </div>
            Loading book data...
        </div>

        <!-- Form -->
        <div v-else class="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
            <h1 class="text-2xl font-bold text-gray-800 border-b pb-2">✏️ Edit Book</h1>

            <form @submit.prevent="updateBook" class="space-y-4">
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

                <div class="pt-4 flex gap-3">
                    <button type="submit"
                        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        💾 Update Book
                    </button>
                    <NuxtLink :to="`/books/detail/${book.id}`"
                        class="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
                        Cancel
                    </NuxtLink>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const book = ref({})
const isLoading = ref(true)
const id = route.params.id

try {
    const res = await $fetch("http://localhost:3302/api/book-get/", {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
            accept: "application/json",
            authentication: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (res.success) {
        book.value = { ...res.data, id } || {}
    } else {
        throw new Error("Book not found")
    }
} catch (e) {
    if (process.client) {
        const Swal = (await import('sweetalert2')).default
        await Swal.fire({
            title: 'Error',
            text: 'Book not found or server error.',
            icon: 'error'
        })
        router.push('/books')
    }
} finally {
    isLoading.value = false
}

async function updateBook() {
    try {
        await $fetch(`http://localhost:3302/api/book-update`, {
            method: 'POST',
            body: book.value,
            headers: {
                accept: "application/json",
                authentication: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (process.client) {
            const Swal = (await import('sweetalert2')).default
            await Swal.fire({
                title: 'Success',
                text: 'Book updated successfully.',
                icon: 'success'
            })
        }

        router.push(`/books/detail/${book.value.id}`)
    } catch (e) {
        if (process.client) {
            const Swal = (await import('sweetalert2')).default
            await Swal.fire({
                title: 'Error',
                text: 'Failed to update book.',
                icon: 'error'
            })
        }
    }
}
</script>
