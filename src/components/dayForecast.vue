<template>
  <div class="p-9">
    <div class="overflow-x-auto">
      <table class="w-full min-w-max border-y-custom-gray border-b-[0.5px]">
        <thead>
          <tr>
            <th
              v-for="(day, index) in data"
              :key="'day-' + index"
              class="text-center p-2 text-custom-white italic font-medium"
            >
              {{
                new Date(day.dt_txt).toLocaleDateString('en-US', {
                  weekday: 'long',
                })
              }}
            </th>
          </tr>
          <tr>
            <td
              v-for="(day, index) in data"
              :key="'desc-' + index"
              class="text-center p-2 text-custom-white italic font-medium"
            >
              {{ weatherIcons[day.weather[0].description.toLowerCase()] || '❓' }}
              {{ day.weather[0].description }}
            </td>
          </tr>
          <tr>
            <td
              v-for="(day, index) in data"
              :key="'temp-' + index"
              class="text-center p-2 text-custom-white italic font-medium"
            >
              {{ day.main.temp }}°C
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
