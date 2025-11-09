<script setup>
import { ref } from 'vue';
import BuildingButton from '../components/BuildingButton.vue';
import Snow from '../components/Snow.vue'

let cookies = ref(0);
let cps = ref(0);

setInterval(() => {
    cookies.value += cps.value;
}, 1000);

let buildings = ref([
    {name: 'Milk', icon: '🥛', cps: 0.1, price: 15, count: 0},
    {name: 'Christmas tree',icon: '🎄', cps: 1, price: 100, count: 0},
    {name: 'Santa',icon: '🎅🏻', cps: 10, price: 1000, count: 0},
]);

function buyBuilding(building) {
    if(cookies.value >= building.price) {
        cookies.value -= building.price;
        cps.value += building.cps;
        building.count++;
    }
}


</script>

<template>
    <div class="columns">
        <div class="column has-background-success-dark has-text-centered">
            <h1>{{ parseFloat(cookies.toFixed(1)) }} cookies!</h1>
            <h3>per second {{ parseFloat(cps.toFixed(1)) }}</h3>
            <div @click="cookies++">
                <img
                    src="https://png.pngtree.com/png-vector/20250425/ourmid/pngtree-chocolate-chip-cookie-icon-white-background-png-image_16100260.png">
            </div>
        </div>
        <div class="column has-background-warning-dark has-text-centered">
          <Snow />
          <div class="lights">
      <span v-for="n in 15" :key="n" class="bulb"></span>
    </div>
        </div>

        <div class="column has-background-danger-dark">
           <BuildingButton v-for="building in buildings" :building="building" :disabled="cookies<building.price" @click="buyBuilding(building)"></BuildingButton>
        </div>
    </div>
</template>
