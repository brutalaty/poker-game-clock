<template>
  <div id="app">
    <button class="clock-wrapper" @click="showControls = !showControls">
      <Clock></Clock>
    </button>
    <Controls
      :paused="paused"
      :muted="muted"
      v-if="showControls"
      @nextBlind="nextBlind"
      @previousBlind="previousBlind"
      @forward="forward"
      @backward="backward"
      @pause="togglePaused"
      @mute="mute"
      @fullscreen="fullscreen"
      @chipsUp="increaseChipIndex"
      @chipsDown="reduceChipIndex"
      @horn="horn"
    ></Controls>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations, mapGetters } from "vuex";
import Controls from "@/components/Controls.vue";
import Clock from "@/components/Clock.vue";
const sfx = require("@/assets/sfx/air-horn.wav");

export default {
  name: "App",
  data: function () {
    return {
      showControls: false,
      startTimeStamp: 0, //time when app was opened
      timePaused: 0, //total time game has been paused for
      previousTimeStamp: 0, //previous loop cycles time stamp
      timePlayed: 0,
      sfx,
      temporaryMutedTimer: 2000, //skipping a blind mutes the temporarily mutes the sfx to stop sfx spam.
    };
  },
  components: {
    Controls,
    Clock,
  },
  methods: {
    ...mapMutations([
      "setCurrentTime",
      "togglePaused",
      "toggleMuted",
      "increaseChipIndex",
      "reduceChipIndex",
    ]),
    nextBlind: function () {
      this.temporarilyMute();
      this.timePlayed = this.timeOfNextBlind * 1000;
      this.setCurrentTime(this.timeOfNextBlind);
    },
    previousBlind: function () {
      this.temporarilyMute();
      this.timePlayed = this.timeOfPreviousBlind * 1000;
      this.setCurrentTime(this.timeOfPreviousBlind);
    },
    backward: function (event) {
      this.temporarilyMute();
      this.timePlayed = Math.max(this.timePlayed - event * 1000, 0);
      this.updateStateTime();
    },
    forward: function (event) {
      this.temporarilyMute();
      this.timePlayed += event * 1000;
      this.updateStateTime();
    },
    mute: function () {
      this.toggleMuted();
    },
    playSFX: function () {
      let sfx = new Audio(this.sfx);
      sfx.addEventListener("canplaythrough", () => {
        sfx.play();
      });
    },
    temporarilyMute: function () {
      this.temporaryMutedTimer = 2000; //2 seconds
    },
    fullscreen: function () {
      const isInFullScreen =
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

      const docElm = document.documentElement;
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },

    loop: function () {
      if (this.paused) {
        this.addPausedTime();
      } else {
        this.addPlayTime();
      }
    },
    addPausedTime: function () {
      const nowTimeStamp = new Date().getTime();
      const delta = nowTimeStamp - this.previousTimeStamp;
      this.timePaused += delta;
      this.adjustTemporaryMutedTimer(delta);
      this.previousTimeStamp = nowTimeStamp;
      this.updateStateTime();
    },
    addPlayTime: function () {
      const nowTimeStamp = new Date().getTime();
      const delta = nowTimeStamp - this.previousTimeStamp;
      this.adjustTemporaryMutedTimer(delta);
      const timePlayedNow = this.timePlayed + delta;
      const lastTimeInSeconds = Math.floor(this.timePlayed / 1000);
      const nowTimeInSeconds = Math.floor(timePlayedNow / 1000);

      this.timePlayed = timePlayedNow;
      this.previousTimeStamp = nowTimeStamp;

      if (nowTimeInSeconds > lastTimeInSeconds) this.updateStateTime();
    },
    updateStateTime: function () {
      this.setCurrentTime(Math.floor(this.timePlayed / 1000));
    },
    adjustTemporaryMutedTimer: function (delta) {
      this.temporaryMutedTimer = Math.max(0, this.temporaryMutedTimer - delta);
    },
    horn: function () {
      if (!this.muted) this.playSFX();
    },
  },

  computed: {
    ...mapState([
      "blinds",
      "paused",
      "muted",
      "currentBlindIndex",
      "currentTime",
    ]),
    ...mapGetters(["timeOfPreviousBlind", "timeOfNextBlind", "currentBlind"]),
  },

  watch: {
    currentBlind(newBlind, oldBlind) {
      if (newBlind.id < oldBlind.id) return;
      if (newBlind.id == oldBlind.id) return;
      if (this.muted) return;
      if (this.temporaryMutedTimer > 0) return;
      this.playSFX();
    },
  },

  mounted: function () {
    const date = new Date().getTime();
    this.startTimeStamp = date;
    this.previousTime = date;
    this.timePlayed = 1000;
    this.setCurrentTime(1);
    setInterval(this.loop, 100);
  },
};
</script>

<style lang="scss">
.clock-wrapper {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  min-width: 90%;
}
</style>
