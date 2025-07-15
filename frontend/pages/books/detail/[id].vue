<template>
    <div class="py-3">
        <NuxtLink :to="`/books`" class="text-blue-500 ms-3 rounded bg-gray-400 hover:bg-gray-500 text-white px-3 py-1">← Back to List</NuxtLink>
    </div>
    <div class="max-w-2xl mx-auto p-6 sm:p-8">
        <!-- Back Button -->

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12 text-gray-500">
            <div class="animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent mx-auto mb-4">
            </div>
            Loading book details...
        </div>

        <!-- Book Detail Card -->
        <div v-else class="bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6">
            <h1 class="text-2xl font-bold text-gray-800 border-b pb-2">📖 Book Details</h1>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                    <p class="font-medium text-gray-600">Title</p>
                    <p class="text-base font-semibold">{{ book.title }}</p>
                </div>
                <div>
                    <p class="font-medium text-gray-600">Author</p>
                    <p class="text-base font-semibold">{{ book.author }}</p>
                </div>
                <div>
                    <p class="font-medium text-gray-600">Published Year</p>
                    <p class="text-base font-semibold">{{ book.published_year }}</p>
                </div>
                <div>
                    <p class="font-medium text-gray-600">Genre</p>
                    <p class="text-base font-semibold">{{ book.genre }}</p>
                </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 flex flex-col sm:flex-row gap-3">
                <NuxtLink :to="`/books/update/${book.id}`"
                    class="inline-block px-5 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition">
                    ✏️ Edit Book
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref } from 'vue'

definePageMeta({
  middleware: 'auth'
});


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
        book.value = res.data || {}
    } else {
        throw new Error("Book not found")
    }
} catch (e) {
    if (process.client) {
        const Swal = (await import('sweetalert2')).default
        await Swal.fire({
            title: 'Alert',
            text: 'Not found this book in database.',
            icon: 'error'
        })
        router.push('/books')
    }
} finally {
    isLoading.value = false
}

</script>
