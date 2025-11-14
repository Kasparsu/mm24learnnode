<script setup>
import { ref } from 'vue';
import BuildingButton from '../components/BuildingButton.vue';

let cookies = ref(0);
let cps = ref(0);

setInterval(() => {
    cookies.value += cps.value;
}, 1000);

let buildings = ref([
    { name: 'Cursor', icon: '👆🏻', cps: 0.1, price: 15, count: 0 },
    { name: 'Grandma', icon: '👵', cps: 1, price: 100, count: 0 },
    { name: 'Farm', icon: '🧑‍🌾', cps: 8, price: 250, count: 0 },
    { name: 'Mine', icon: '⛏️', cps: 15, price: 500, count: 0 },
]);

function buyBuilding(building) {
    if (cookies.value >= building.price) {
        cookies.value -= building.price;
        cps.value += building.cps;
        building.count++;
        building.price = Math.floor(building.price * 1.5);
    }
}

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

</script>
<template>
    <div class="columns">
        <div class="column has-background-primary has-text-centered">
            <h1>{{ parseFloat(cookies.toFixed(1)) }} cookies!</h1>
            <h3>per second {{ parseFloat(cps.toFixed(1)) }}</h3>
            <div id="cat" @click="cookies++">
                <img
                    src="https://png.pngtree.com/png-vector/20250425/ourmid/pngtree-chocolate-chip-cookie-icon-white-background-png-image_16100260.png">
            </div>
        </div>
        <div class="column has-background-warning">
            <iframe src="https://www.youtube.com/embed/vTfD20dbxho?autoplay=1&mute=1&loop=1&playlist=vTfD20dbxho"
                width="560" height="970px" frameborder="0"></iframe>
        </div>
        <div class="column has-background-info">
            <BuildingButton v-for="building in buildings" :building="building" :disabled="cookies < building.price"
                @click="buyBuilding(building)"></BuildingButton>
        </div>
        <div>
            <button class="button is-primary mx-3" @click="darkMode">Dark mode</button>
        </div>
    </div>
</template>

<style>
#cat:active {
    transform: scale(0.9);
}

.dark-mode {
    background-color: black;
    color: white;
}
</style>