<template>
  <div class="game-body">
    <div class="game-body-left">
      <div class="chips">
        <chip
          v-for="chip in currentVisibleChips"
          :key="chip.id"
          :chip="chip"
        ></chip>
      </div>
    </div>

    <div class="game-body-center">
      <div class="blinds-current">
        <h5 class="blinds-current-heading">Blinds</h5>
        {{ currentBlind.isBreak ? "BREAK" : formatBlind(currentBlind) }}
      </div>
      <div class="time-remaining-group" v-if="!remainingBlinds.length == 0">
        <progress-bar
          :progress="percentageProgressionThroughCurrentBlind"
        ></progress-bar>
        <div class="time-remaining">
          <time-formatted :time="timeRemainingThisBlind"></time-formatted>
        </div>
        <progress-bar
          :progress="percentageProgressionThroughCurrentBlind"
        ></progress-bar>
      </div>

      <h2 class="game-head">{{ name }}</h2>
    </div>

    <div class="game-body-right">
      <div class="blinds-remaining">
        <div class="blinds-remaining-heading">
          {{ remainingBlinds.length > 0 ? "Next " : "" }}
        </div>
        <div class="blinds-next">
          {{
            remainingBlinds.length > 0 ? formatBlind(remainingBlinds[0]) : ""
          }}
        </div>
        <div
          class="blinds-remaining-item"
          v-for="(blind, index) in remainingBlindsWithoutNextBlind"
          :key="blind.id"
        >
          {{ formatBlind(remainingBlindsWithoutNextBlind[index]) }}
        </div>
        <div
          class="blinds-remaining-item"
          v-if="
            remainingBlindsWithoutNextBlind.length + 1 < remainingBlinds.length
          "
        >
          ...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import ProgressBar from "./ProgressBar.vue";
import TimeFormatted from "./TimeFormatted.vue";

export default {
  components: { ProgressBar, TimeFormatted },
  name: "Clock",
  methods: {
    formatBlind: function (blind) {
      if (blind.isBreak) return "BREAK " + blind.startTime;
      const small = blind.small + " / ";
      const big = blind.big;
      const ante = parseInt(blind.ante) > 0 ? " : " + blind.ante : "";

      return small + big + ante;
    },
  },
  computed: {
    ...mapState(["blinds", "chips", "name", "currentTime"]),
    ...mapGetters([
      "currentBlind",
      "timeRemainingThisBlind",
      "remainingBlinds",
      "chipIndex",
    ]),
    currentVisibleChips: function () {
      return this.chips.slice(this.chipIndex, this.chipIndex + 5);
    },
    remainingBlindsWithoutNextBlind: function () {
      return this.remainingBlinds.slice(1, 7); //this.remainingBlinds.length);
    },
    percentageProgressionThroughCurrentBlind: function () {
      const totalTime = this.currentBlind.startTime * 60;
      const currentTime = totalTime - this.timeRemainingThisBlind;

      return Math.round((currentTime / totalTime) * 100);
    },
  },
};
</script>

<style lang="scss">
.game-head {
  font-family: $heading-font;
  font-size: 30px;
  text-align: center;
  margin-bottom: 50px;
}

.time-remaining-group {
  margin-top: 50px;
  margin-bottom: 90px;
}

.blinds {
  &-current {
    font-family: $blind-font;
    font-size: 100px;
    text-align: center;

    margin-bottom: 100px;

    &-heading {
      font-family: $label-font;
      font-weight: normal;
      font-size: 50px;
      margin-top: 0;
      margin-bottom: -10px;
    }
  }

  &-next {
    font-family: $blind-font;
    font-size: 40px;
    margin-bottom: 50px;
    text-align: center;
    font-weight: bold;
  }

  &-remaining {
    &-heading {
      font-family: $label-font;
      font-weight: normal;
      font-size: 40px;
      text-align: center;
    }

    &-item {
      font-family: $blind-font;
      font-size: 25px;
      text-align: center;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}

.game-body {
  min-width: 80%;
  display: grid;
  grid-template-areas: "left center right";
  grid-template-columns: [left] 1fr [center] 3fr [right] 1fr;

  padding-top: 10px;

  .game-body-left {
    grid-area: left;
  }
  .game-body-center {
    grid-area: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .game-body-right {
    grid-area: right;
  }

  .time-remaining {
    font-family: $timer-font;
    font-size: 80px;
    margin-bottom: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    text-align: center;
  }
}

.chips {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  font-family: $chip-font;

  .chip {
    margin-top: 10px;
    margin-bottom: 5px;
  }
}
</style>
