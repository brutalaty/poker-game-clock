import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ChipSvg from "./components/ChipSvg.vue";
import Chip from "./components/Chip.vue";
import TimeFormatted from "./components/TimeFormatted.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faVolumeHigh,
  faVolumeXmark,
  faPlay,
  faForward,
  faBackward,
  faForwardFast,
  faBackwardFast,
  faPause,
  faExpand,
  faCoins,
  faArrowDown,
  faArrowUp,
  faBullhorn,
  faCommentDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add([
  faVolumeHigh,
  faVolumeXmark,
  faPlay,
  faForward,
  faBackward,
  faForwardFast,
  faBackwardFast,
  faPause,
  faExpand,
  faCoins,
  faArrowDown,
  faArrowUp,
  faBullhorn,
  faCommentDollar,
]);

/* add font awesome icon component */
Vue.component("fa-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.component("chip-svg", ChipSvg);
Vue.component("chip", Chip);
Vue.component("time-formatted", TimeFormatted);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
