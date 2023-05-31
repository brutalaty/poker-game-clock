<template>
  <div class="progress-bar">
    <div class="progress-bar-inner" :style="style"></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      default: 0,
    },
  },
  computed: {
    style: function () {
      return "width: " + this.progress + "%";
    },
  },
};
</script>
<style lang="scss">
.progress-bar {
  width: 90%;
  height: 15px;
  padding: 3px;
  border-radius: 3px;
  background: $dark;
  margin: auto;
}

.progress-bar-inner {
  height: 100%;
  border-radius: 3px;
  background-color: #990000;
  background-image: linear-gradient(115deg, #990000 0%, #ff0000 74%);
}
</style>
