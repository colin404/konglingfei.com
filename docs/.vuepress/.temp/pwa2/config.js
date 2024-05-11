import { defineClientConfig } from "vuepress/client";
import { setupPWA } from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-pwa2@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-plugin-pwa2/lib/client/composables/setup.js";
import SWUpdatePopup from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-pwa2@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-plugin-pwa2/lib/client/components/SWUpdatePopup.js";


export default defineClientConfig({
  setup: () => {
    setupPWA();
  },
  rootComponents: [
    SWUpdatePopup,
    
  ],
});
