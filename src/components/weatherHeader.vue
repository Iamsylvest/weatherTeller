<template>
  <header>
    <div class="flex p-2 bg-custom-gray">
      <img :src="weatherLogo" alt="weatherLogo" class="w-12 sm:w-12 md:w-12 lg:w-12" />
      <h1
        class="sm:text-base md:text-lg lg:text-lg relative top-3 sm:top-3 md:top-3 lg:top-3 text-white italic font-medium"
      >
        WeatherTeller
      </h1>
    </div>
  </header>

  <div class="mt-10 flex align-items-center justify-center">
    <h2 class="text-custom-white italic font-medium sm:text-base md:text-lg lg:text-2xl">
      "Know the skies before you go"
    </h2>
  </div>
</template>

<script setup>
import weatherLogo from '@/assets/weatherLogo.png' // '@' is alias for 'src'
</script>
