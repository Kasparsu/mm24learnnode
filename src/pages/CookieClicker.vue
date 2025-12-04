<script setup>
import { ref, computed } from 'vue';
import BuildingButton from '../components/BuildingButton.vue';

let cookies = ref(0);
let cps = ref(0);

// Click upgrade state
let clickLevel = ref(1);      // 1–5
let clickValue = ref(1);      // 1, 2, 4, 8, 16
const maxClickLevel = 5;
const clickBaseCost = 50;
const currentClickCost = computed(() => clickBaseCost * clickLevel.value);

// Gamble log
let gambleLog = ref([]);

// Click animation state
let isClicking = ref(false);

setInterval(() => {
    cookies.value += cps.value;
}, 1000);

let buildings = ref([
    {name: 'Cursor', icon: '👆🏻', cps: 0.1, price: 15, count: 0},
    {name: 'Grandma',icon: '👵🏻', cps: 1, price: 100, count: 0},
]);

function buyBuilding(building) {
    if (cookies.value >= building.price) {
        cookies.value -= building.price;
        cps.value += building.cps;
        building.count++;
    }
}

// Cookie click – kasutame clickValue't + animatsioon
function handleCookieClick() {
    cookies.value += clickValue.value;

    if (isClicking.value) return;
    isClicking.value = true;
    setTimeout(() => {
        isClicking.value = false;
    }, 100);
}

// Click Upgrader – kasvav hind (50 * level), max 5 levelit
function upgradeClick() {
    if (clickLevel.value >= maxClickLevel) return;

    const cost = currentClickCost.value;
    if (cookies.value < cost) return;

    cookies.value -= cost;
    clickLevel.value++;
    clickValue.value *= 2; // 1 → 2 → 4 → 8 → 16
}

// Helper gamble logi jaoks
function addGambleLogEntry(text, type) {
    gambleLog.value.unshift({
        id: Date.now() + Math.random(),
        text,
        type, // 'win' | 'lose'
    });

    if (gambleLog.value.length > 5) {
        gambleLog.value.pop();
    }
}

// GAMBLE! – 50% double, 50% kõik maha + log
function gamble() {
    if (cookies.value <= 0) return;

    const before = cookies.value;
    const win = Math.random() < 0.5;

    if (win) {
        cookies.value *= 2;
        addGambleLogEntry(
            `You WON! ${before.toFixed(1)} → ${cookies.value.toFixed(1)} cookies.`,
            'win'
        );
    } else {
        cookies.value = 0;
        addGambleLogEntry(
            `You LOST... ${before.toFixed(1)} → 0 cookies.`,
            'lose'
        );
    }
}
</script>

<template>
    <div class="columns">
        <div class="column has-background-primary has-text-centered">
            <h1>{{ parseFloat(cookies.toFixed(1)) }} cookies!</h1>
            <h3>per second {{ parseFloat(cps.toFixed(1)) }}</h3>
            <p class="mt-2">
                Click level: {{ clickLevel }} / {{ maxClickLevel }} |
                {{ clickValue }} cookies per click
            </p>

            <div class="mt-4 cookie-wrapper" @click="handleCookieClick">
                <img
                    class="cookie-image"
                    :class="{ 'cookie-clicked': isClicking }"
                    src="https://png.pngtree.com/png-vector/20250425/ourmid/pngtree-chocolate-chip-cookie-icon-white-background-png-image_16100260.png"
                >
            </div>

            <div class="buttons is-centered mt-5">
                <button
                    class="button is-success"
                    @click="upgradeClick"
                    :disabled="cookies < currentClickCost || clickLevel >= maxClickLevel"
                >
                    Click Upgrader (Lv. {{ clickLevel }}/{{ maxClickLevel }}) –
                    Cost: {{ currentClickCost }}
                </button>

                <button
                    class="button is-danger"
                    @click="gamble"
                    :disabled="cookies <= 0"
                >
                    GAMBLE!
                </button>
            </div>

            <div class="gamble-log mt-4">
                <h4 class="is-size-6 has-text-weight-semibold">Gamble log</h4>
                <p v-if="gambleLog.length === 0" class="is-size-7 has-text-grey">
                    No gambles yet.
                </p>
                <ul v-else>
                    <li
                        v-for="entry in gambleLog"
                        :key="entry.id"
                        :class="[
                            'is-size-7',
                            entry.type === 'win' ? 'has-text-success' : 'has-text-danger'
                        ]"
                    >
                        {{ entry.text }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="column has-background-warning">
            test
        </div>

        <div class="column has-background-info">
            <BuildingButton
                v-for="building in buildings"
                :key="building.name"
                :building="building"
                :disabled="cookies < building.price"
                @click="buyBuilding(building)"
            />
        </div>
    </div>
</template>

<style scoped>
.cookie-wrapper {
    display: inline-block;
    cursor: pointer;
}

.cookie-image {
    max-width: 220px;
    transition: transform 0.1s ease, filter 0.1s ease;
}

.cookie-image.cookie-clicked {
    transform: scale(1.05);
    filter: brightness(1.1);
}

.gamble-log {
    max-width: 320px;
    margin: 0 auto;
    text-align: left;
}
</style>
