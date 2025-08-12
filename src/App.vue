<script setup>
import weatherHeader from './components/weatherHeader.vue'
import searchInput from './components/searchInput.vue'
</script>

<template>
  <header class="bg-dark text-gray-800">
    <div>
      <weatherHeader />
    </div>
  </header>

  <main>
    <searchInput />
  </main>
</template>
