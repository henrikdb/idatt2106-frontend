<template>
    <button type="button" class="btn btn-primary" id="buttonStyle">{{ buttonText }}</button>
</template>

<script setup lang="ts">
defineProps<{ buttonText: string }>();
</script>

<style scoped>
    #buttonStyle {
        padding: 0.5rem 4rem;
        font-size: 1.5rem;
        font-weight: 600;
    }
</style>
