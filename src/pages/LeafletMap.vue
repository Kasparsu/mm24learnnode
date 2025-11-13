<script setup>
import { ref } from 'vue';
import Leaflet from '../components/Leaflet.vue';

let zoom = ref(19);
let coords = ref({
    lat: 59.42690,
    lng: 24.74344,
});
</script>

<template>
 <div>
    <input v-model="zoom" type="range" max="19" min="1" step="1" />
    {{ zoom }}
    <button
      class="button is-primary"
      @click="coords = { lat: 59.41641, lng: 24.79871 }"
    >
      Go to Airport
    </button>
    <button
      class="button is-primary"
      @click="coords = { lat: 59.43684, lng: 24.75198 }"
    >
      Go to Viru McDonald's
    </button>
  </div>
  <Leaflet :lat="coords.lat" :lng="coords.lng" :zoom="zoom"></Leaflet>
  <Leaflet :lat="59.43648031071515" :lng="24.74987808706019" :zoom="5"></Leaflet>
    

</template>
