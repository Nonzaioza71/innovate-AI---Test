<template>
    <div v-if="visible" class="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white" :class="colorClass">
        <div class="flex items-center space-x-2">
            <span>{{ message }}</span>
            <button @click="hide" class="text-white hover:text-gray-200 font-bold">&times;</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    message: String,
    set_show_alert: Function,
    type: {
        type: String,
        default: 'info' // 'success', 'error', 'warning'
    },
    duration: {
        type: Number,
        default: 3000
    }
})

const visible = defineModel('visible')

const colorMap = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
}
const colorClass = colorMap[props.type] || colorMap.info

function hide() {
    props.set_show_alert(false)
}


setTimeout(hide, props.duration)
</script>