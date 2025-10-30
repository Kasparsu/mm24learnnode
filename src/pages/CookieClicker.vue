<script setup>
import { ref } from 'vue';
import BuildingButton from '../components/BuildingButton.vue';

let cookies = ref(0);
let cps = ref(0.4);

setInterval(() => {
    cookies.value += cps.value;
}, 1000);

let buildings = ref([
    {name: 'Cursor', icon: '👆🏻', cps: 0.4, price: 10, count: 0,
        building: null
    },
    {name: 'Grandma',icon: '👵🏻', cps: 2, price: 100, count: 0,
        building: {
            backgroundURL: "https://cdn.dashnet.org/cookieclicker/img/grandmaBackground.png",
            imageURL: "https://cdn.dashnet.org/cookieclicker/img/grandma.png"
        }
    },
    {name: 'Farm',icon: '🌱', cps: 8, price: 4000, count: 0,
        building: {
            backgroundURL: "https://cdn.dashnet.org/cookieclicker/img/farmBackground.png",
            imageURL: "https://cdn.dashnet.org/cookieclicker/img/farm.png"
        }
    },
    {name: 'Mine',icon: '⛏️', cps: 47, price: 2000, count: 0,
        building: {
            backgroundURL: "https://cdn.dashnet.org/cookieclicker/img/mineBackground.png",
            imageURL: "https://cdn.dashnet.org/cookieclicker/img/mine.png"
        }
    },
    {name: 'Lab',icon: '🔬', cps: 260, price: 12000, count: 0,
        building: {
            backgroundURL: "https://cdn.dashnet.org/cookieclicker/img/factoryBackground.png",
            imageURL: "https://cdn.dashnet.org/cookieclicker/img/factory.png"
        }
    },
    {name: 'Portal',icon: '🌌', cps: 1200, price: 14000000, count: 0,
        building: {
            backgroundURL: "https://cdn.dashnet.org/cookieclicker/img/portalBackground.png",
            imageURL: "https://cdn.dashnet.org/cookieclicker/img/portal.png"
        }
    },
]);

function buyBuilding(building) {
    if(cookies.value >= building.price) {
        cookies.value -= building.price;
        cps.value += building.cps;
        building.count++;
        console.log("bought building:", building.name, "new count:", building.count);
        building.price = Math.floor(building.price * 1.15);
    }
}



</script>
<template>
    <div class="columns">
        <div class="column has-background-primary has-text-centered is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <h1>{{ parseFloat(cookies.toFixed(1)).toLocaleString() }} cookies!</h1>
            <h3>{{ parseFloat(cps.toFixed(1)).toLocaleString() }}🍪 per second</h3>
            <div @click="cookies++">
                <img
                    src="https://png.pngtree.com/png-vector/20250425/ourmid/pngtree-chocolate-chip-cookie-icon-white-background-png-image_16100260.png">
            </div>
        </div>
        <div class="column has-background-warning">
            <h1 class="has-text-centered has-text-dark">Buildings</h1>
            <div v-for="building in buildings.filter(b => b.count > 0 && b.building)" :key="building.name" class="block mb-5">
                <div :style="{ background: `url(${building.building?.backgroundURL})` }">
                    <img :src="building.building?.imageURL" alt="" v-for="i in building.count" :key="i" />
                </div>
            </div>
        </div>
        <div class="column has-background-info">
            <h1 class="has-text-centered has-text-dark">Store🏪</h1>
           <BuildingButton v-for="building in buildings" :building="building" :disabled="cookies < building.price" @click="buyBuilding(building)"></BuildingButton>
        </div>
    </div>
</template>
