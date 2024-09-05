<script setup>
defineProps({
  isFavorite: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <svg
    class="icon-star"
    :class="{ 'icon-star-favorite': isFavorite, 'icon-star-not-favorite': !isFavorite }"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.16398 9.17758C0.845199 8.88373 1.01836 8.35249 1.44953 8.30153L7.55901 7.57918C7.73474 7.55841 7.88738 7.44841 7.96149 7.28823L10.5384 1.71936C10.7203 1.32634 11.2808 1.32627 11.4626 1.71929L14.0395 7.28811C14.1136 7.44829 14.2653 7.55859 14.441 7.57936L20.5508 8.30153C20.982 8.35249 21.1547 8.88388 20.8359 9.17774L16.3195 13.3419C16.1896 13.4616 16.1317 13.6399 16.1662 13.8129L17.3649 19.828C17.4495 20.2525 16.9962 20.5814 16.6174 20.37L11.249 17.3738C11.0946 17.2877 10.907 17.2881 10.7526 17.3742L5.3836 20.3693C5.00472 20.5807 4.55066 20.2525 4.63528 19.828L5.83411 13.8133C5.8686 13.6403 5.8109 13.4616 5.68098 13.3418L1.16398 9.17758Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
.icon-star {
  fill: none;
  stroke: white;
  transition: fill 0.3s ease, stroke 0.3s ease;
}

.icon-star-favorite {
  fill: #FFB23D;
  stroke: #FFB23D;
}

.icon-star-not-favorite {
  fill: none;
  stroke: white;
}
</style>
