<script setup>
defineProps(['disabled', 'upgrade'])
</script>

<template>
    <div class="upgrade box has-background-primary-invert mr-3 is-clickable is-unselectable"
        :class="{ 'is-disabled': disabled }">
        <h1 class="is-size-1">{{ upgrade.icon }}</h1>
        <a class="level-item has-text-info" aria-label="reply">🍪 {{ upgrade.price }}</a>
    </div>
</template>

<style>
.upgrade {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 10rem;
    flex-direction: column;
}

.is-disabled {
    cursor: not-allowed !important;
    opacity: 50%;
}
</style>
