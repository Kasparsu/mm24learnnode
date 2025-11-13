<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import { onMounted, useId, watch } from 'vue';
let {lat, lng, zoom} = defineProps(['lat', 'lng', 'zoom']);

let id='map-' + useId();
let map = null;
onMounted(() => {
    map = L.map(id).setView([lat, lng], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([59.42690, 24.74344]).addTo(map);
        var marker = L.marker([59.43684, 24.75198]).addTo(map);
    var polygon = L.polygon([
        [59.43681379366632, 24.751941495425086],
        [59.43683357078348, 24.7517645887377],
        [59.436946770884326, 24.75230102579657],
    ]).addTo(map);
});

watch(() => zoom, (zoom, oldZoom) => {
    console.log(zoom, oldZoom);
    map.setZoom(zoom);
});
watch(() => lat, lat => {
    map.panTo([lat, lng]);
});
watch(() => lng, lng => {
    map.panTo([lat, lng]);
});

</script>

<template>
    <div :id="id"></div>
</template>

<style scoped>
div { height: 40vh; }
</style>