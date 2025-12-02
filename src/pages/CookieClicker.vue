<script setup>
import { ref, onMounted } from 'vue';
import BuildingButton from '../components/BuildingButton.vue';

let cookies = ref(0);

let cps = ref(0);

let showGolden = ref(false);
let goldenBoost = ref(false);
let goldenTimeout = null;

let buildings = ref([
  { name: 'Cursor', icon: '👆🏻', cps: 0.1, price: 15, count: 0 },
  { name: 'Grandma', icon: '👵🏻', cps: 1, price: 100, count: 0 },
  { name: 'Oven', icon: '🔥', cps: 5, price: 500, count: 0 },
  { name: 'Cookie Farm', icon: '🌾', cps: 15, price: 1500, count: 0 },
]);

function buyBuilding(building) {
  if (cookies.value < building.price) return;

  cookies.value -= building.price;
  building.count++;

  building.price = Math.round(building.price * 1.25);

  cps.value = buildings.value.reduce((total, b) => total + b.count * b.cps, 0);
}

function clickCookie() {
  cookies.value += goldenBoost.value ? 10 : 1;
}

function spawnGoldenCookie() {
  const delay = Math.random() * 20000 + 10000;

  setTimeout(() => {
    showGolden.value = true;

    setTimeout(() => {
      showGolden.value = false;
    }, 5000);

    spawnGoldenCookie();
  }, delay);
}

function clickGolden() {
  showGolden.value = false;
  goldenBoost.value = true;

  cookies.value += 50;

  clearTimeout(goldenTimeout);
  goldenTimeout = setTimeout(() => {
    goldenBoost.value = false;
  }, 5000);
}

onMounted(() => {
  spawnGoldenCookie();

  setInterval(() => {
    cookies.value += cps.value;
  }, 1000);
});
</script>

<template>
  <div class="columns">
    <!-- LEFT SIDE -->
    <div class="column has-background-success p-4">
      <h1 class="is-size-2 mb-4">🍪 {{ Math.floor(cookies) }}</h1>
      <h2 class="is-size-5">CPS: {{ cps.toFixed(1) }}</h2>

      <div class="cookie" @click="clickCookie">🍪</div>

      <div v-if="showGolden" @click="clickGolden" class="golden-cookie">⭐️</div>

      <div v-if="goldenBoost" class="boost">Golden Boost ×10 (5s)</div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="column has-background-info p-4">
      <h2 class="is-size-4 mb-3">Buildings</h2>

      <BuildingButton
        v-for="b in buildings"
        :key="b.name"
        :building="b"
        :disabled="cookies < b.price"
        @click="buyBuilding(b)"
      />
    </div>
  </div>
</template>

<style>
.cookie {
  font-size: 80px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.1s;
}
.cookie:active {
  transform: scale(0.9);
}

.golden-cookie {
  font-size: 60px;
  position: absolute;
  top: 180px;
  left: 200px;
  cursor: pointer;
  animation: pulse 0.8s infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.25);
  }
}

.boost {
  background: gold;
  padding: 8px 12px;
  margin-top: 15px;
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
}
</style>
