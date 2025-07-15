<template>
    <div class="p-4 sm:p-6 md:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 class="text-2xl font-bold text-gray-800">📚 Book List</h1>
            <div class="flex flex-wrap gap-3">
                <NuxtLink to="/books/insert" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow">
                    ➕ Add New Book
                </NuxtLink>
                <button @click="showImportModal = true"
                    class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow">
                    ⬆️ Import Books
                </button>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <input type="text" v-model="searchQuery" placeholder="Search by title or author..."
                class="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            <div class="flex items-center gap-2">
                <label for="categoryFilter" class="sr-only">Filter by Category</label>
                <select id="categoryFilter" v-model="categoryQuery"
                    class="block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option value="">All Categories</option>
                    <option v-for="(category, index) in categories" :key="index" :value="category.genre">
                        {{ category.genre }}
                    </option>
                </select>
            </div>
        </div>

        <div class="overflow-x-auto bg-white shadow ring-1 ring-black/5 sm:rounded-lg">
            <table class="min-w-full text-sm divide-y divide-gray-200">
                <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="px-4 py-2 text-left">Title</th>
                        <th class="px-4 py-2 text-left">Author</th>
                        <th class="px-4 py-2 text-left">Year</th>
                        <th class="px-4 py-2 text-left">Genre</th>
                        <th class="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="book in paginatedBooks" :key="book.id" class="hover:bg-gray-50">
                        <td class="px-4 py-2 whitespace-nowrap font-medium">{{ book.title }}</td>
                        <td class="px-4 py-2 whitespace-nowrap">{{ book.author }}</td>
                        <td class="px-4 py-2">{{ book.published_year }}</td>
                        <td class="px-4 py-2">{{ book.genre }}</td>
                        <td class="px-4 py-2 space-x-2">
                            <NuxtLink :to="`/books/detail/${book.id}`" class="text-blue-600 hover:underline">View
                            </NuxtLink>
                            <NuxtLink :to="`/books/update/${book.id}`" class="text-green-600 hover:underline">Edit
                            </NuxtLink>
                            <button @click="deleteBook(book.id)" class="text-red-600 hover:underline">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="text-sm text-gray-600">
                Showing {{ paginatedBooks.length }} of {{ filteredBooks.length }} books
            </div>
            <div class="flex items-center gap-2">
                <div class="flex items-center gap-2 w-16">
                    <label for="perPage" class="sr-only">Items per page:</label>
                    <select id="perPage" v-model="perPage"
                        class="block w-full rounded border py-1 text-center border-gray-500 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option :value="5">5</option>
                        <option :value="10">10</option>
                        <option :value="20">20</option>
                        <option :value="50">50</option>
                    </select>
                </div>
                <button :disabled="page === 1" @click="page--"
                    class="px-3 py-1 rounded border text-sm bg-white hover:bg-gray-100 disabled:opacity-50">Previous</button>
                <button :disabled="page === totalPages" @click="page++"
                    class="px-3 py-1 rounded border text-sm bg-white hover:bg-gray-100 disabled:opacity-50">Next</button>
                <span class="text-sm text-gray-700">Page {{ page }} of {{ totalPages }}</span>
            </div>
        </div>

        <div v-if="showImportModal" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg w-full max-w-3xl space-y-4">
                <h2 class="text-xl font-bold">📥 Import Books from Excel</h2>

                <div class="border-2 border-dashed border-gray-300 rounded p-6 text-center cursor-pointer hover:bg-gray-50"
                    @drop.prevent="handleDrop" @dragover.prevent>
                    <p class="text-gray-600">Drag & Drop your Excel file here or click to upload</p>
                    <input ref="fileInput" type="file" accept=".xlsx, .xls" class="hidden" @change="handleFileChange" />
                    <button @click="triggerFileInput" class="mt-2 text-blue-600 underline text-sm">Choose File</button>
                </div>

                <div v-if="previewData.length" class="overflow-auto max-h-64 border rounded">
                    <table class="min-w-full text-sm divide-y divide-gray-200">
                        <thead class="bg-gray-100 text-gray-700">
                            <tr>
                                <th class="px-4 py-2 text-left">Title</th>
                                <th class="px-4 py-2 text-left">Author</th>
                                <th class="px-4 py-2 text-left">Year</th>
                                <th class="px-4 py-2 text-left">Genre</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(row, idx) in previewData" :key="idx">
                                <td class="px-4 py-2">{{ row.title }}</td>
                                <td class="px-4 py-2">{{ row.author }}</td>
                                <td class="px-4 py-2">{{ row.published_year }}</td>
                                <td class="px-4 py-2">{{ row.genre }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-end gap-2">
                    <button @click="showImportModal = false"
                        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button @click="confirmImport" :disabled="!previewData.length || isImporting"
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        <span v-if="!isImporting">Confirm Import</span>
                        <span v-else>Importing...</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import * as XLSX from 'xlsx'

definePageMeta({
  middleware: 'auth'
});


const books = ref([])
const categories = ref([])
const searchQuery = ref('')
const categoryQuery = ref('') // เปลี่ยนจาก Object เป็น String เพื่อเก็บค่า genre ที่เลือกโดยตรง
const page = ref(1)
const perPage = ref(10)
const showImportModal = ref(false)
const fileInput = ref(null)
const previewData = ref([])
const isImporting = ref(false)

// Filtered books based on search query and category
const filteredBooks = computed(() => {
    let filtered = books.value

    // Apply search query filter
    if (searchQuery.value) {
        const lowerCaseQuery = searchQuery.value.toLowerCase()
        filtered = filtered.filter(book =>
            book.title.toLowerCase().includes(lowerCaseQuery) ||
            book.author.toLowerCase().includes(lowerCaseQuery)
        )
    }

    // Apply category filter
    if (categoryQuery.value) {
        const lowerCaseCategory = categoryQuery.value.toLowerCase()
        filtered = filtered.filter(book =>
            book.genre.toLowerCase().includes(lowerCaseCategory)
        )
    }

    return filtered
})


const paginatedBooks = computed(() =>
    filteredBooks.value.slice((page.value - 1) * perPage.value, page.value * perPage.value)
)

const totalPages = computed(() =>
    Math.ceil(filteredBooks.value.length / perPage.value)
)

// Watch for changes in perPage, searchQuery, or categoryQuery to reset the page
watch([perPage, searchQuery, categoryQuery], () => {
    page.value = 1
})

async function fetchBooks() {
    const res = await $fetch('http://localhost:3302/api/book-get-all', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            authentication: `Bearer ${localStorage.getItem('token')}`
        }
    })
    books.value = res.data.books || []

    // สร้างรายการ categories จากข้อมูลที่ได้มา โดยเพิ่ม "All Categories" เข้าไป
    const uniqueGenres = [...new Set(books.value.map(book => book.genre))];
    categories.value = uniqueGenres.map(genre => ({ genre })); // Keep it simple as just genre string
}

async function deleteBook(id) {
    if (process.client) {
        const Swal = (await import('sweetalert2')).default
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        })
        if (result.isConfirmed) {
            try {
                await $fetch(`http://localhost:3302/api/book-delete`, {
                    method: 'POST',
                    body: JSON.stringify({ id }),
                    headers: {
                        accept: 'application/json',
                        authentication: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                await fetchBooks()
                await Swal.fire({ title: 'Deleted!', text: 'Book has been deleted.', icon: 'success', timer: 1500, showConfirmButton: false })
            } catch (err) {
                await Swal.fire({ title: 'Error', text: 'Failed to delete book.', icon: 'error' })
            }
        }
    }
}

function triggerFileInput() {
    fileInput.value?.click()
}

function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) {
        readExcel(file)
    }
}

function handleDrop(e) {
    const file = e.dataTransfer.files[0]
    if (file) {
        readExcel(file)
    }
}

function readExcel(file) {
    const reader = new FileReader()
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(sheet)
        previewData.value = json.map(row => ({
            title: row.Title || '',
            author: row.Author || '',
            published_year: row.Published_year || '',
            genre: row.Genre || ''
        }))
    }
    reader.readAsArrayBuffer(file)
}

async function confirmImport() {
    isImporting.value = true // Set loading to true
    try {
        await $fetch('http://localhost:3302/api/book-insert', {
            method: 'POST',
            body: previewData.value,
            headers: {
                accept: 'application/json',
                authentication: `Bearer ${localStorage.getItem('token')}`
            }
        })
        previewData.value = []
        showImportModal.value = false
        await fetchBooks()
        const Swal = (await import('sweetalert2')).default
        await Swal.fire({
            title: 'Imported!',
            text: 'Books have been imported successfully.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        })
    } catch (e) {
        const Swal = (await import('sweetalert2')).default
        await Swal.fire({
            title: 'Error',
            text: 'Failed to import books.',
            icon: 'error'
        })
    } finally {
        isImporting.value = false // Reset loading to false
    }
}

onMounted(fetchBooks)
</script>