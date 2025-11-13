<script setup>
const props = defineProps({
  disabled: Boolean,
  building: Object,
  evil: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['click'])
function onClick() {
  if (props.disabled) return
  emit('click')
}
</script>
<template>
  <div
    @click="onClick"
    class="box has-background-primary-invert mr-3 is-clickable is-unselectable"
    :class="{ 'is-disabled': props.disabled, 'evil-hover': props.evil }"
  >
    <article class="media">
      <div class="media-left">
        <h1 class="is-size-1">{{ building.icon }}</h1>
      </div>
      <div class="media-content">
        <div class="content is-flex is-justify-content-space-between m-0">
          <div>
            <h1 class="has-text-primary">{{ building.name }}</h1>
          </div>
          <div>
            <h1 class="has-text-info">{{ building.count }}</h1>
          </div>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item has-text-info" aria-label="reply">
              🍪 {{ building.price }}
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<style>
  .is-disabled {
    cursor: not-allowed !important;
    opacity: 50%;
  }
 
  .evil-hover:hover {
    background: #b30d0d !important;
    color: #fff !important;
    border-color: #000 !important;
  }
  .is-clickable { cursor: pointer; }
</style>
