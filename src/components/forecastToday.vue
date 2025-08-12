<template>
  <div class="p-9">
    <div class="overflow-x-auto">
      <table class="w-full min-w-max border-y-custom-gray border-b-[0.5px]">
        <thead>
          <tr>
            <th
              v-for="(hour, index) in data"
              :key="index"
              class="text-center p-2 text-custom-white italic font-medium"
            >
              {{
                new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}
            </th>
          </tr>
          <tr>
            <td
              v-for="(hour, index) in data"
              :key="index"
              class="text-center p-2 text-custom-white italic font-medium"
            >
              {{ weatherIcons[hour.weather[0].description.toLowerCase()] || '❓' }}
              {{ hour.weather[0].description }}
            </td>
          </tr>
          <tr>
            <td
              v-for="(hour, index) in data"
              :key="index"
              class="text-center p-2 text-custom-white italic font-medium"
            >
              {{ hour.main.temp }}°C
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    weatherIcons: {
      type: Object,
      required: true,
    },
  },
}
</script>
