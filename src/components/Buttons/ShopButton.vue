<template>
    <button type="button" class="btn btn-primary" id="buttonStyle"><img src="@/assets/items/pigcoin.png" style="width: 2rem"> +{{ buttonText }}</button>
</template>

<script>
export default {
    props: ['buttonText']
}
</script>

<style scoped>
    #buttonStyle {
        border-radius: 3rem;
    }
</style>