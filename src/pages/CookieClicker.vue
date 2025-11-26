<script setup>
import { ref } from 'vue';
import BuildingButton from '../components/BuildingButton.vue';
import UpgradeButton from '../components/UpgradeButton.vue';

let cookies = ref(0);
let cps = ref(0);

setInterval(() => {
    cookies.value += cps.value;
}, 1000);

let buildings = ref([
    { name: 'Cursor', icon: '👆🏻', cps: 0.1, price: 15, count: 0 },
    { name: 'Grandma', icon: '👵🏻', cps: 1, price: 100, count: 0 },
    {name: 'Farm', icon: '🌾', cps: 8, price: 1100, basePrice: 1100, count: 0},
    {name: 'Mine', icon: '⛏️', cps: 47, price: 12000, basePrice: 12000, count: 0},
    {name: 'Factory', icon: '🏭', cps: 260, price: 130000, basePrice: 130000, count: 0},
    {name: 'Bank', icon: '🏦', cps: 1400, price: 1400000, basePrice: 1400000, count: 0},
]);

function buyBuilding(building) {
    if (cookies.value >= building.price) {
        cookies.value -= building.price;
        cps.value += building.cps;
        building.count++;
    }
}

let upgrades = ref([
    { name: 'Double CPS 1', icon: '🌧️', price: 1000, bought: false },
    { name: 'Double CPS 2', icon: '⛈️', price: 10000, bought: false },
    { name: 'Double CPS 3', icon: '⚡', price: 100000, bought: false },
    { name: 'Double CPS 4', icon: '☀️', price: 1000000, bought: false },
    { name: 'Double CPS 4', icon: '🌕', price: 10000000, bought: false },
    { name: 'Double CPS 4', icon: '🌈', price: 100000000, bought: false },
]);

function buyUpgrade(upgrade) {
    if (cookies.value >= upgrade.price && !upgrade.bought) {
        cookies.value -= upgrade.price;
        cps.value *= 2;
        upgrade.bought = true;
    }
}
</script>
<template>
    <div class="columns">
        <div class="column has-background-primary has-text-centered">
            <h1>{{ parseFloat(cookies.toFixed(1)) }} cookies!</h1>
            <h3>per second {{ parseFloat(cps.toFixed(1)) }}</h3>
            <div @click="cookies++">
                <img
                    src="https://png.pngtree.com/png-vector/20250425/ourmid/pngtree-chocolate-chip-cookie-icon-white-background-png-image_16100260.png">
            </div>
        </div>
        <div class="column has-background-warning">
            test
        </div>
        <div class="column has-background-info">
            <div class="upgradecontainer">
                <UpgradeButton v-for="u in upgrades.filter(up => !up.bought)" :key="u.name" :upgrade="u"
                    :disabled="cookies < u.price" @click="buyUpgrade(u)" />
            </div>
            <BuildingButton v-for="building in buildings" :building="building" :disabled="cookies < building.price"
                @click="buyBuilding(building)"></BuildingButton>
        </div>
    </div>
</template>

<style>
.column{
    width: calc(100vw/3);
}

.upgradecontainer{
    overflow-x: auto;
    display: flex;
    gap: 12px;
}

.upgradecontainer::-webkit-scrollbar {
  display: none;
}
</style>