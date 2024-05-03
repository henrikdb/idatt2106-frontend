<!-- ConfirmationModal.vue -->
<template>
    <div class="modal" :id="modalId" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true"
         data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{ message }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ cancelButtonText }}</button>
            <button type="button" class="btn btn-primary" @click="confirmAction">{{ confirmButtonText }}</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const modalId = ref(null);
  
  const title = 'Confirm Action';
  const message = 'Are you sure you want to proceed?';
  const confirmButtonText = 'Confirm';
  const cancelButtonText = 'Cancel';
  
  // Methods
  function confirmAction() {
    emit('confirm');
  }
  </script>
  