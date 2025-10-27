<script setup>
import { ref } from 'vue';

let cookies = ref(0);

</script>
<template>
    <div class="columns">
        <div class="column has-background-primary has-text-centered">
            <h1>{{ cookies }} cookies!</h1>
            <div @click="cookies++">
                <img src="https://png.pngtree.com/png-vector/20250425/ourmid/pngtree-chocolate-chip-cookie-icon-white-background-png-image_16100260.png">
            </div>
        </div>
        <div class="column has-background-warning">
            test
        </div>
        <div class="column has-background-info">
            test
        </div>
    </div>
</template>