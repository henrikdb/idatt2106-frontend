<template>
    <div class="tab-pane active" id="security">
        <h6>SECURITY SETTINGS</h6>
        <hr>
        <form>
            <div class="form-group">
                <label class="d-block">Change Password</label>
                <input type="text" class="form-control" placeholder="Enter your old password">
                <input type="text" class="form-control mt-3" placeholder="New password">
                <input type="text" class="form-control mt-3 mb-2" placeholder="Confirm new password">
            </div>
            <button type="button" class="btn btn-primary">Update Password</button>
            <button type="reset" class="btn btn-light">Reset Changes</button>
        </form>
        <hr>
    </div>
</template>
<script setup lang="ts">
</script>

<style scoped>

</style>