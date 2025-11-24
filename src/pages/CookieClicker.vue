<script setup>
import { ref } from 'vue';
import BuildingButton from '../components/BuildingButton.vue';

let cookies = ref(0);
let cps = ref(0);

setInterval(() => {
    cookies.value += cps.value;
}, 1000);

let buildings = ref([
    {name: 'Cursor', icon: '👆🏻', cps: 0.1, price: 15, count: 0},
    {name: 'Grandma',icon: '👵🏻', cps: 1, price: 100, count: 0},
    {name: 'Wizard tower',icon: '🪄', cps: 1, price: 1000000, count: 0},
]);

function buyBuilding(building) {
    if(cookies.value >= building.price) {
        cookies.value -= building.price;
        cps.value += building.cps;
        building.count++;
    }
}

//
// ⭐ DAILY BONUS / DAILY SPIN
//

const dailyReward = ref(null);
const claimedToday = ref(false);

// kontrollime, kas täna juba spin tehtud
const today = new Date().toDateString();
if (localStorage.getItem("dailySpinDate") === today) {
    claimedToday.value = true;
}

function spinDaily() {
    if (claimedToday.value) return;

    // lihtsad võimalikud boonused
    const rewards = [100, 200, 300, 500];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    dailyReward.value = reward;
    cookies.value += reward;

    claimedToday.value = true;
    localStorage.setItem("dailySpinDate", today);
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
             <h2>Daily Spin</h2>

    <button 
        @click="spinDaily" 
        :disabled="claimedToday"
        class="button is-warning"
    >
        {{ claimedToday ? "Already claimed" : "Spin!" }}
    </button>

    <p v-if="dailyReward">You won {{ dailyReward }} cookies! 🎉</p>
        </div>
        <div class="column has-background-info">
           <BuildingButton v-for="building in buildings" :building="building" :disabled="cookies<building.price" @click="buyBuilding(building)"></BuildingButton>
        </div>
    </div>
</template>
