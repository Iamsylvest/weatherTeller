<template>
  <div class="flex items-center justify-center p-4">
    <div class="relative w-full min-w-[150px] max-w-[800px]">
      <input
        type="search"
        v-model="search"
        placeholder="Search city..."
        class="w-full p-2 px-4 py-2 pr-10 italic border border-gray-300 shadow-lg bg-custom-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-white text-custom-white"
      />
      <ul
        v-if="suggestions.length"
        class="absolute z-10 w-full overflow-auto border bg-custom-gray text-custom-white max-h-40"
      >
        <li
          v-for="(city, index) in suggestions"
          :key="city"
          @click="selectSuggestion(city)"
          class="px-3 py-2 hover:bg-custom-white hover:text-custom-gray"
        >
          {{ city }}
        </li>
      </ul>
      <span class="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-search"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      </span>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 p-4 md:p-8 md:grid-cols-2">
    <!-- Card 1: Location Info -->
    <div class="flex items-center justify-center w-full p-4 rounded-lg text-custom-white">
      <span v-if="!showDetails" class="text-base italic font-medium md:text-lg"> </span>
      <span v-else class="text-base italic font-medium break-words md:text-2xl">
        <span class="text-[24px] lg:text-[52px] font-medium mb-4 block lg:mb-8"> {{ city }} </span>
        <span class="text-[42px] lg:text-[74px] font-medium mb-2 block">
          {{ temperature }}°C
          <span class="text-[14px] lg:text-[18px] font-medium">
            {{ getWeatherIcons() }} {{ weatherCondition }}
          </span>
        </span>
        <span class="text-[16px] lg:text-[18] font-medium block"> {{ dateAndTime }}</span> <br />
        <div class="grid grid-cols-3 gap-4 md:grid-cols-3">
          <div>
            <span class="text-[14px] lg:text-[18px] font-medium"
              >Humidity <br />{{ humidity }}%
            </span>
          </div>
          <div>
            <span class="text-[14px] lg:text-[18px] font-medium">
              Air pressure <br />
              {{ pressure }} hPa
            </span>
          </div>
          <div>
            <span class="text-[14px] lg:text-[18px] font-medium">
              Temperature <br />
              {{ tempMax }}°C / {{ tempMin }}°C
            </span>
          </div>
        </div>
      </span>
    </div>

    <!-- Card 2: Weather Visual -->
    <!-- Parent div must have fixed width and height -->
    <div class="flex items-center justify-center w-full p-4 rounded-lg h-fit text-custom-white">
      <span v-if="!showDetails" class="text-base italic font-medium md:text-lg"> </span>
      <span v-else>
        <img
          :src="getWeatherGif()"
          alt="Weather gif"
          class="object-cover w-full h-full rounded-md"
        />
      </span>
    </div>
  </div>

  <forecastToday :data="hourlyForecast" :weather-icons="weatherIcons" />
  <dayForecast :data="perDayForecast" :weather-icons="weatherIcons" />
  <div class="relative z-0">
    <mapWeather v-if="city" :data="city || 'Manila'" :class="showDetails ? 'mt-[20px]' : ''" />
  </div>
</template>

<script>
import axios from 'axios'
import { debounce } from 'lodash'
import forecastToday from './forecastToday.vue'
import dayForecast from './dayForecast.vue'
import mapWeather from './mapWeather.vue'

import clearSky from '@/assets/clearSky.gif'
import fewClouds from '@/assets/fewClouds.gif'
import scatteredClouds from '@/assets/scatteredClouds.gif'
import brokenClouds from '@/assets/brokenClouds.gif'
import overcastClouds from '@/assets/overcastClouds.jpg'
import lightRain from '@/assets/lightRain.gif'
import moderateRain from '@/assets/moderateRain.gif'
import heavyRain from '@/assets/heavyRain.gif'
import showerRain from '@/assets/showerRain.gif'
import thunderstorm from '@/assets/thunderstorm.gif'
import snow from '@/assets/snow.gif'
import mist from '@/assets/mist.gif'
import smoke from '@/assets/smoke.gif'
import haze from '@/assets/haze.gif'
import fog from '@/assets/fog.gif'
import sand from '@/assets/sand.gif'
import squalls from '@/assets/squalls.jpg'
import tornado from '@/assets/tornado.gif'

export default {
  components: {
    forecastToday,
    dayForecast,
    mapWeather,
  },
  data() {
    return {
      skipWatcher: false,
      search: '',
      city: '',
      dateAndTime: '',
      weatherCondition: '',
      temperature: '',
      humidity: '',
      pressure: '',
      tempMax: '',
      tempMin: '',
      showDetails: false,
      suggestions: [],
      hourlyForecast: [],
      perDayForecast: [],
      weatherIcons: {
        'clear sky': '☀️',
        'few clouds': '🌤️',
        'scattered clouds': '☁️',
        'broken clouds': '☁️☁️',
        'overcast clouds': '☁️',
        'light rain': '🌦️',
        'moderate rain': '🌧️',
        'heavy intensity rain': '🌧️🌧️',
        'shower rain': '🌦️',
        thunderstorm: '⛈️',
        snow: '❄️',
        mist: '🌫️',
        smoke: '🌫️',
        haze: '🌫️',
        fog: '🌁',
        'sand/dust': '🌪️',
        squalls: '🌬️',
        tornado: '🌪️',
      },
      weatherGifs: {
        'clear sky': clearSky,
        'few clouds': fewClouds,
        'scattered clouds': scatteredClouds,
        'broken clouds': brokenClouds,
        'overcast clouds': overcastClouds,
        'light rain': lightRain,
        'moderate rain': moderateRain,
        'heavy intensity rain': heavyRain,
        'shower rain': showerRain,
        thunderstorm: thunderstorm,
        snow: snow,
        mist: mist,
        smoke: smoke,
        haze: haze,
        fog: fog,
        'sand/dust': sand,
        squalls: squalls,
        tornado: tornado,
      },
    }
  },
  watch: {
    search: debounce(async function (newVal) {
      if (this.skipWatcher) return // 🚫 skip if triggered by click
      if (newVal.length >= 3) {
        try {
          const apiKey = import.meta.env.VITE_WEATHER_API_KEY
          const url = `https://api.openweathermap.org/geo/1.0/direct?q=${newVal}&limit=5&appid=${apiKey}`
          const response = await axios.get(url)
          // response.data is an array of city objects
          this.suggestions = response.data.map((c) => `${c.name}, ${c.country}, ${c.state}`)
        } catch (error) {
          console.error('Error fetching city suggestions:', error)
          this.suggestions = []
        }
      } else {
        this.suggestions = []
        this.city = ''
        this.weatherCondition = ''
        this.temperature = ''
        this.dateAndTime = ''
        this.humidity = ''
        this.pressure = ''
        this.tempMax = ''
        this.tempMin = ''
        this.showDetails = false
        this.hourlyForecast = []
        this.perDayForecast = []
      }
    }, 300),
  },
  methods: {
    async getWeatherData() {
      if (!this.search) {
        alert('Please enter a city name.')
        return
      }
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY // just the key, not the URL
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.search}&appid=${apiKey}&units=metric`
        const response = await axios.get(url)
        const data = response.data

        this.city = data.name
        this.showDetails = true // set to true once data is received
        this.dateAndTime = new Date().toLocaleString()
        this.weatherCondition = data.weather[0].description
        this.temperature = data.main.temp
        this.humidity = data.main.humidity
        this.pressure = data.main.pressure
        this.tempMax = data.main.temp_max
        this.tempMin = data.main.temp_min
        console.log('City fetched successfully.', data)
      } catch (error) {
        console.error('Error fetching City', error.message)
        // only show alert if full cuty likely typed
        if (this.search.length > 5) {
          alert('City not found or API error')
        }
      }
    },
    selectSuggestion(city) {
      this.skipWatcher = true
      this.search = city
      this.suggestions = []
      this.getWeatherData()
      this.getForecastToday() // fetch forecast for selected city
      this.getForecastPerDay() // fetch forecast for selected city
      // Allow watcher again
      this.$nextTick(() => {
        this.skipWatcher = false
      })
    },
    getWeatherIcons() {
      // return icon for the current weather condition or fallback if not found
      return this.weatherIcons[this.weatherCondition.toLowerCase()] || '❓'
    },
    getWeatherGif() {
      // return icon for the current weather condition or fallback if not found
      return this.weatherGifs[this.weatherCondition.toLowerCase()] || '❓'
    },

    async getForecastToday() {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.search}&appid=${apiKey}&units=metric`

      try {
        const response = await fetch(url)
        const data = await response.json()

        if (!data.list || data.list.length === 0) {
          console.error('No forecast data found')
          this.hourlyForecast = []
          return
        }

        // get today's data in yyyy-mm-dd format
        const todayDate = new Date().toISOString().slice(0, 10)
        //filter forecast for today only
        this.hourlyForecast = data.list
          .filter((item) => item.dt_txt.startsWith(todayDate))
          .map((item) => {
            const condition = item.weather[0].description.toLowerCase()
            const icon = this.weatherIcons[condition] || '❓'
            return { ...item, icon }
          })

        console.log('Hourly Forecast for today:', this.hourlyForecast)
      } catch (error) {
        console.error('Error fetching forecast:', error)
        this.hourlyForecast = []
      }
    },

    async getForecastPerDay() {
      if (!this.search || this.search.trim() === '') {
        console.warn('City search is empty. Aborting fetch.')
        return
      }

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.search}&appid=${apiKey}&units=metric`

      try {
        const response = await fetch(url)
        const data = await response.json()
        console.log('Today forecast raw data:', data)
        if (!data.list || data.list.length === 0) {
          console.error('No forecast data found')
          return
        }
        const dailyMap = new Map()

        for (const item of data.list) {
          const date = item.dt_txt.split(' ')[0]
          const time = item.dt_txt.split(' ')[1]
          const currentHour = parseInt(time.split(':')[0])
          const currentDiff = Math.abs(currentHour - 12)

          if (!dailyMap.has(date)) {
            dailyMap.set(date, { item, diff: currentDiff })
          } else if (currentDiff < dailyMap.get(date).diff) {
            dailyMap.set(date, { item, diff: currentDiff })
          }
        }

        this.perDayForecast = Array.from(dailyMap.values()).map((obj) => obj.item)
        console.log('perDayForecast:', this.perDayForecast)
      } catch (error) {
        console.error('Error fetching forecast per Day', error)
        this.perDayForecast = []
      }
    },
  },
}
</script>
