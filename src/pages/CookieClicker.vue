<script setup>
import { ref } from 'vue';
import BuildingButton from '../components/BuildingButton.vue';

let cookies = ref(0);
let cps = ref(0);

setInterval(() => {
    cookies.value += cps.value;
}, 1000);

let buildings = ref([
    {name: 'Cursor', icon: '👆🏻', cps: 1, price: 15, count: 0},
    {name: 'Grandma',icon: '👵🏻', cps: 5, price: 100, count: 0},
]);

function buyBuilding(building) {
    if (cookies.value >= building.price) {
        cookies.value -= building.price;
        cps.value += building.cps;
        building.count++;

       
        building.price = Math.round(building.price * 1.15 + building.count * 0.5);
    }
}


let goldenCookieVisible = ref(false);
let goldenCookieX = ref(0);
let goldenCookieY = ref(0);


setInterval(() => {
    if (!goldenCookieVisible.value && Math.random() < 0.1) { 
        goldenCookieVisible.value = true;
        goldenCookieX.value = Math.random() * 300 + 50;
        goldenCookieY.value = Math.random() * 300 + 50;

     
        setTimeout(() => goldenCookieVisible.value = false, 4000);
    }
}, 2000);

function clickGoldenCookie() {
    cookies.value += 100 * (1 + cps.value);
    goldenCookieVisible.value = false;
}


let critChance = 0.1;


let floatTexts = ref([]);


function clickCookie() {
    let isCrit = Math.random() < critChance;
    let amount = isCrit ? 5 : 1;
    cookies.value += amount;

   
    floatTexts.value.push({
        id: Date.now(),
        text: isCrit ? `CRIT +${amount}!` : `+${amount}`,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
    });

   
    setTimeout(() => {
        floatTexts.value = floatTexts.value.filter(t => t.id !== Date.now());
    }, 800);
}

let upgrades = ref([
    {
        name: "Double Production",
        description: "All buildings produce 2× more cookies.",
        price: 500,
        bought: false,
        apply() {
            cps.value *= 2;
        }
    },
    {
        name: "Super Clicks",
        description: "Each click gives +5 extra cookies.",
        price: 300,
        bought: false,
        apply() {
            clickBonus.value += 5;
        }
    },
    {
        name: "Golden Cookie Booster",
        description: "Golden cookie rewards are 2× stronger.",
        price: 800,
        bought: false,
        apply() {
            goldenMultiplier.value *= 2;
        }
    }
]);


let clickBonus = ref(0);
let goldenMultiplier = ref(1);

function buyUpgrade(upg) {
    if (!upg.bought && cookies.value >= upg.price) {
        cookies.value -= upg.price;
        upg.apply();
        upg.bought = true;
    }
}



</script>
<template>
    <div class="columns">
        <div class="column has-background-primary has-text-centered">
            <h1>{{ parseFloat(cookies.toFixed(1)) }} cookies!</h1>
            <h3>per second {{ parseFloat(cps.toFixed(1)) }}</h3>
            <div @click="clickCookie">
                <img
                    src="https://png.pngtree.com/png-vector/20250425/ourmid/pngtree-chocolate-chip-cookie-icon-white-background-png-image_16100260.png">
            </div>
        </div>
        <div class="column has-background-warning">
            test
        </div>
        <div class="column has-background-info">
           <BuildingButton v-for="building in buildings" :building="building" :disabled="cookies<building.price" @click="buyBuilding(building)"></BuildingButton>
        </div>
    </div>
    
<div v-if="goldenCookieVisible"
    @click="clickGoldenCookie"
    :style="{
        position: 'absolute',
        left: goldenCookieX + 'px',
        top: goldenCookieY + 'px',
        cursor: 'pointer',
        fontSize: '48px',
        userSelect: 'none'
    }">
    ⭐
</div>
<div class="box">
    <h2 class="title is-4">Upgrades</h2>

    <div v-for="upg in upgrades" :key="upg.name"
         class="notification"
         :class="{'is-light': upg.bought}"
    >
        <strong>{{ upg.name }}</strong>
        <p>{{ upg.description }}</p>
        <p>Price: {{ upg.price }}</p>

        <button class="button is-link"
            :disabled="upg.bought || cookies < upg.price"
            @click="buyUpgrade(upg)">
            {{ upg.bought ? "Bought!" : "Buy" }}
        </button>
    </div>
</div>





</template>