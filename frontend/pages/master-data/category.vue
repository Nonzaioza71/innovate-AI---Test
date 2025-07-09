<template>
    <div class="mx-auto p-6 sm:p-8 space-y-6">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-800">📂 Manage Categories</h1>
            <button @click="openAddModal = true" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add Category
            </button>
        </div>

        <!-- Category Table -->
        <div class="overflow-x-auto bg-white shadow rounded-lg">
            <table class="min-w-full text-sm divide-y divide-gray-200">
                <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="px-4 py-2 text-left">#</th>
                        <th class="px-4 py-2 text-left">Category Name</th>
                        <th class="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="(category, index) in categories" :key="category.id" class="hover:bg-gray-50">
                        <td class="px-4 py-2">{{ index + 1 }}</td>
                        <td class="px-4 py-2">{{ category.name }}</td>
                        <td class="px-4 py-2 space-x-2">
                            <button @click="editCategory(category)" class="text-green-600 hover:underline">Edit</button>
                            <button @click="deleteCategory(category.id)"
                                class="text-red-600 hover:underline">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add/Edit Modal -->
        <div v-if="openAddModal || editMode" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
                <h2 class="text-xl font-bold text-gray-800">
                    {{ editMode ? '✏️ Edit Category' : 'Add Category' }}
                </h2>
                <form @submit.prevent="editMode ? updateCategory() : createCategory()" class="space-y-4">
                    <input v-model="form.name" placeholder="Category Name"
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                    <div class="flex justify-end gap-2">
                        <button type="button" @click="closeModal"
                            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            {{ editMode ? 'Update' : 'Save' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const categories = ref([])
const openAddModal = ref(false)
const editMode = ref(false)
const form = ref({ id: null, name: '' })

async function fetchCategories() {
    const res = await $fetch('/api/categories')
    categories.value = res.categories || []
}

function closeModal() {
    openAddModal.value = false
    editMode.value = false
    form.value = { id: null, name: '' }
}

function editCategory(category) {
    editMode.value = true
    form.value = { ...category }
}

async function createCategory() {
    await $fetch('/api/categories', {
        method: 'POST',
        body: { name: form.value.name }
    })
    await fetchCategories()
    closeModal()
}

async function updateCategory() {
    await $fetch(`/api/categories/${form.value.id}`, {
        method: 'PUT',
        body: { name: form.value.name }
    })
    await fetchCategories()
    closeModal()
}

async function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this category?')) {
        await $fetch(`/api/categories/${id}`, { method: 'DELETE' })
        await fetchCategories()
    }
}

onMounted(fetchCategories)
</script>