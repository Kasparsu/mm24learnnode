<template>
  <div class="snow-container">
    <div
      v-for="flake in flakes"
      :key="flake.id"
      class="snowflake"
      :style="{
        left: flake.left + '%',
        animationDuration: flake.duration + 's',
        fontSize: flake.size + 'px',
      }"
    >
      ❄️
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const flakes = ref([])

onMounted(() => {
  // Create random snowflakes
  for (let i = 0; i < 30; i++) {
    flakes.value.push({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      size: 10 + Math.random() * 10,
    })
  }
})
</script>

<style scoped>
.snow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* so you can still click the cookie */
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -10px;
  color: white;
  opacity: 0.8;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes fall {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
}
</style>
