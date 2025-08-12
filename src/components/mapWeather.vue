<template>
  <div class="mt-[-200px]">
    <div
      id="map"
      class="border rounded-lg w-5/6 h-[600px] min-h-[600px] max-w-[1000px] mx-auto"
    ></div>
    <div
      v-show="selectedLayer === 'clouds'"
      class="flex flex-wrap items-center justify-center gap-4 p-4"
    >
      <div class="flex items-center gap-1">
        <span class="w-3 h-3 bg-white border border-gray-400"></span>
        <span class="italic"> Clear skies</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="w-3 h-3 bg-gray-300 border border-gray-400"></span>
        <span class="italic"> Partly cloudy</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="w-3 h-3 bg-gray-500 border border-gray-400"></span>

        <span class="italic"> Mostly cloudy</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="w-3 h-3 bg-gray-700 border border-gray-400"></span>

        <span class="italic">Overcast</span>
      </div>
    </div>

    <div
      v-show="selectedLayer === 'wind'"
      class="flex flex-wrap items-center justify-center gap-4 p-4"
    >
      <div class="flex items-center gap-1">
        <span class="w-3 h-3 bg-white border border-gray-400" style="background-color: #d0e8ff">
        </span>
        <span class="italic"> Light wind</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-300 border border-gray-400"
          style="background-color: #80c1ff"
        ></span>
        <span class="italic"> Moderate wind</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-500 border border-gray-400"
          style="background-color: #3399ff"
        ></span>

        <span class="italic"> Strong wind</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-700 border border-gray-400"
          style="background-color: #0066cc"
        ></span>

        <span class="italic"> Very strong wind</span>
      </div>
    </div>

    <div
      v-show="selectedLayer === 'precipitation'"
      class="flex flex-wrap items-center justify-center gap-4 p-4"
    >
      <div class="flex items-center gap-1">
        <span class="w-3 h-3 bg-white border border-gray-400" style="background-color: #d0e8ff">
        </span>
        <span class="italic"> Light drizzle</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-300 border border-gray-400"
          style="background-color: #80c1ff"
        ></span>
        <span class="italic"> Light rain </span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-500 border border-gray-400"
          style="background-color: #3399ff"
        ></span>

        <span class="italic"> Moderate rain</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-700 border border-gray-400"
          style="background-color: #0066cc"
        ></span>

        <span class="italic"> Heavy rain</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-700 border border-gray-400"
          style="background-color: #003366"
        ></span>

        <span class="italic">Torrential rain</span>
      </div>
    </div>

    <div
      v-show="selectedLayer === 'temp'"
      class="flex flex-wrap items-center justify-center gap-4 p-4"
    >
      <div class="flex items-center gap-1">
        <span class="w-3 h-3 bg-white border border-gray-400" style="background-color: #0000ff">
        </span>
        <span class="italic"> Freezing</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-300 border border-gray-400"
          style="background-color: #3399ff"
        ></span>
        <span class="italic"> Cold </span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-500 border border-gray-400"
          style="background-color: #66cc66"
        ></span>

        <span class="italic"> Mild</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-700 border border-gray-400"
          style="background-color: #ffff00"
        ></span>

        <span class="italic"> Warm</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-700 border border-gray-400"
          style="background-color: #ff8000"
        ></span>

        <span class="italic"> Hot</span>
      </div>
      <div class="flex items-center gap-1">
        <span
          class="w-3 h-3 bg-gray-700 border border-gray-400"
          style="background-color: #ff0000"
        ></span>

        <span class="italic">Very Hot</span>
      </div>
    </div>

    <div class="pb-20">
      <div class="flex flex-wrap items-center justify-center gap-4">
        <div>
          <button
            @click="setWeatherLayer('clouds')"
            :class="[
              'rounded-lg bg-custom-gray p-2 px-8 italic font-medium text-custom-white border',
              selectedLayer === 'clouds' ? 'border-custom-white' : 'border-transparent',
              'hover:border-custom-white',
            ]"
          >
            Cloud map
          </button>
        </div>
        <div>
          <button
            :class="[
              'rounded-lg bg-custom-gray p-2 px-8 italic font-medium text-custom-white border',
              selectedLayer === 'wind' ? 'border-custom-white' : 'border-transparent',
              'hover:border-custom-white',
            ]"
            @click="setWeatherLayer('wind')"
          >
            Wind map
          </button>
        </div>
        <div>
          <button
            :class="[
              'rounded-lg bg-custom-gray p-2 px-8 italic font-medium text-custom-white border',
              selectedLayer === 'precipitation' ? 'border-custom-white' : 'border-transparent',
              'hover:border-custom-white',
            ]"
            @click="setWeatherLayer('precipitation')"
          >
            Rain map
          </button>
        </div>
        <div>
          <button
            :class="[
              'rounded-lg bg-custom-gray p-2  italic font-medium text-custom-white border',
              selectedLayer === 'temp' ? 'border-custom-white' : 'border-transparent',
              'hover:border-custom-white',
            ]"
            @click="setWeatherLayer('temp')"
          >
            Temperature map
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet default icon path for production
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})
export default {
  props: {
    data: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      map: null,
      marker: null,
      weatherLayer: null,
      API_KEY: import.meta.env.VITE_WEATHER_API_KEY, // Replace with your real key
      selectedLayer: 'clouds', // default selected map
    }
  },

  methods: {
    async initMap(city) {
      const coords = await this.getCoordinates(city)
      if (!coords) {
        console.error('City not found', city)
        return
      }

      this.map = L.map('map').setView([coords.lat, coords.lon], 10)
      // add openstreetmap tiles

      // add openstreetmap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map)

      this.markermarker = L.marker([coords.lat, coords.lon]).addTo(this.map)
      this.markermarker.bindPopup(`${city}`).openPopup()
      // add default weather layer
      this.setWeatherLayer('clouds')
    },
    setWeatherLayer(layerName) {
      // default
      this.selectedLayer = layerName
      // remove previous weather layer if exists
      if (this.weatherLayer) {
        this.map.removeLayer(this.weatherLayer)
      }
      // add a new weather tile later
      this.weatherLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${this.API_KEY}`,
        {
          attribution: 'Satellite Imagery',
          maxZoom: 19,
          opacity: 0.9, //optional: make it semi transparent
        },
      )
      this.weatherLayer.addTo(this.map)
    },
    async getCoordinates(city) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'WeatherTeller/1.0', // Required by Nominatim
          },
        })
        const data = await response.json()
        if (data.length > 0) {
          return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          }
        }
        return null
      } catch (error) {
        console.error('Geoc  oding error', error)
        return null
      }
    },
  },

  watch: {
    data: {
      handler(newCity) {
        if (newCity) {
          console.log('City is now available', newCity)
          this.initMap(newCity)
        } else {
          console.warn('City is still undefined')
        }
      },
    },
  },
  mounted() {
    if (this.data) {
      this.initMap(this.data)
    }
  },
}
</script>
