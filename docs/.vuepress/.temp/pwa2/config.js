import { defineClientConfig } from "vuepress/client";
import { setupPWA } from "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/node_modules/vuepress-plugin-pwa2/lib/client/composables/setup.js";
import SWUpdatePopup from "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/node_modules/vuepress-plugin-pwa2/lib/client/components/SWUpdatePopup.js";


export default defineClientConfig({
  setup: () => {
    setupPWA();
  },
  rootComponents: [
    SWUpdatePopup,
    
  ],
});
