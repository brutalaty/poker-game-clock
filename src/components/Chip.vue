<template>
  <div class="chip">
    <chip-svg
      class="chip-svg"
      :colorInside="chip.colorInside"
      :colorOutside="chip.colorOutside"
    >
    </chip-svg>
    <div class="chip-value">
      {{ chip.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chip: {
      required: true,
    },
  },
};
</script>

<style lang="scss">
.chips {
  .chip {
  }

  .chip-svg {
    display: flex;
    justify-content: center;
  }

  .chip-value {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 1px;
  }
}
</style>
