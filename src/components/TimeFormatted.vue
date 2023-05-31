<template>
  <div class="time">{{ timeFormatted }}</div>
</template>

<script>
export default {
  props: {
    time: {
      required: true,
    },
  },
  computed: {
    timeFormatted: function () {
      let totalSeconds = this.time;
      let hours = Math.floor(totalSeconds / 3600).toString();
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60).toString();
      let seconds = (totalSeconds % 60).toString();

      hours = hours.length < 2 ? "0" + hours : hours;
      minutes = minutes.length < 2 ? "0" + minutes : minutes;
      seconds = seconds.length < 2 ? "0" + seconds : seconds;

      return (
        (parseInt(hours) == 0 ? "" : hours + ":") + minutes + ":" + seconds
      );
    },
  },
};
</script>
