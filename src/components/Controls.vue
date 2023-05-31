<template>
  <div class="controls">
    <div class="controls-chips">
      <button type="button" class="button" @click="$emit('chipsUp')">
        <fa-icon icon="fa-solid fa-arrow-up" />
        <fa-icon icon="fa-solid fa-coins" />
      </button>

      <button
        type="button"
        class="button other-buttons button-margin-right"
        @click="$emit('chipsDown')"
      >
        <fa-icon icon="fa-solid fa-coins" />
        <fa-icon icon="fa-solid fa-arrow-down" />
      </button>
    </div>

    <div class="controls-time">
      <button type="button" @click="$emit('backward', 300)" class="button">
        <fa-icon icon="fa-solid fa-backward" /> 5
      </button>
      <button type="button" @click="$emit('backward', 60)" class="button">
        <fa-icon icon="fa-solid fa-backward" /> 1
      </button>

      <button type="button" @click="$emit('pause')" class="button play-button">
        <fa-icon v-if="paused" icon="fa-solid fa-play"></fa-icon>
        <fa-icon v-else icon="fa-solid fa-pause" />
      </button>

      <button type="button" @click="$emit('forward', 60)" class="button">
        1
        <fa-icon icon="fa-solid fa-forward" class="forward-icon" />
      </button>
      <button type="button" @click="$emit('forward', 300)" class="button">
        5
        <fa-icon icon="fa-solid fa-forward" class="forward-icon" />
      </button>
    </div>

    <div class="controls-blinds">
      <button type="button" class="button" @click="$emit('previousBlind')">
        <fa-icon icon="fa-solid fa-arrow-down" />
        B
      </button>
      <button type="button" @click="$emit('nextBlind')" class="button">
        B
        <fa-icon icon="fa-solid fa-arrow-up" />
      </button>
    </div>

    <div class="controls-extra">
      <button type="button" @click="$emit('mute')" class="button">
        <fa-icon v-if="muted" icon="fa-solid fa-volume-xmark" />
        <fa-icon v-else icon="fa-solid fa-volume-high" />
      </button>
      <button
        type="button"
        @click="$emit('horn')"
        class="button other-buttons horn-button"
      >
        <fa-icon icon="fa-solid fa-bullhorn"></fa-icon>
      </button>
      <button
        type="button"
        @click="$emit('fullscreen')"
        class="button other-buttons"
      >
        <fa-icon icon="fa-solid fa-expand"></fa-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Controls",
  props: {
    paused: {
      required: true,
      type: Boolean,
    },
    muted: {
      required: true,
      type: Boolean,
    },
  },
};
</script>

<style lang="scss">
.controls {
  min-width: 90%;
  display: grid;
  grid-template-areas:
    "chips time blinds"
    "nothingleft extra nothingright";
  grid-template-columns: [left] 1fr [center] 3fr [right] 1fr;

  &-chips,
  &-time,
  &-blinds,
  &-extra {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &-chips {
    grid-area: chips;
  }
  &-time {
    grid-area: time;
  }
  &-blinds {
    grid-area: blinds;
  }
  &-extra {
    grid-area: extra;
    margin-top: 10px;

    .button {
      color: #d17070;
      border: 3px solid #3b2020;
      background: #300;
      min-width: 70px;
    }
  }

  &-chips,
  &-blinds {
    .button {
      color: #c00;
      border: 3px solid #600;
      background: #190000;
      min-width: 60px;
    }
  }
}

.button {
  min-width: 70px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  color: #000;
  text-transform: uppercase;
  font-family: $button-font;
  font-weight: 600;
  margin-left: 10px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;

  color: #b00;
  border: 2px solid #500;
  background: #100;
}

.button:hover {
  border-color: #fff;
  color: #fff;
  background: #000;
}

.play-button {
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: -4px;
  margin-bottom: -4px;
}
.horn-button {
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 6px;
}
.next-button {
  margin-right: 30px;
}

.button-margin-right {
  margin-right: 30px;
}

.forward-icon {
  margin-left: 5px;
}

.arrow-icon {
  margin-bottom: -1px;
}
</style>
