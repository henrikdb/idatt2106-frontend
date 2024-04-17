<template>
    <div>
        <Button1 :buttonText="hallo"></Button1>
    </div>
</template>

<script setup lang="ts">
    import Button1 from '@/components/Buttons/Button1.vue'

    const hallo = 'Hallo'
</script>