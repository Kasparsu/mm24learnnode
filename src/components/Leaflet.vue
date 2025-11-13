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
            var marker = L.marker([59.436478605858575, 24.74987540485131]).addTo(map);
    var polygon = L.polygon([
        [59.43652190918893, 24.749894180313476],
        [59.43647144546002, 24.749714472318434],
        [59.43645439688594, 24.749968611609926],
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