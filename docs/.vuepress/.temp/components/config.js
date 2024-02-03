import { defineClientConfig } from "vuepress/client";
import { hasGlobalComponent } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-shared@2.0.0-rc.16_vuepress@2.0.0-rc.2/node_modules/vuepress-shared/lib/client/index.js";
import { h } from "vue";

import { useStyleTag } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/@vueuse+core@10.7.2_vue@3.4.15/node_modules/@vueuse/core/index.mjs";
import FontIcon from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.16_vuepress@2.0.0-rc.2/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import Badge from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.16_vuepress@2.0.0-rc.2/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.16_vuepress@2.0.0-rc.2/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";
import BackToTop from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.16_vuepress@2.0.0-rc.2/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";

import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.16_vuepress@2.0.0-rc.2/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    
  },
  setup: () => {
    useStyleTag(`\
@import url("//at.alicdn.com/t/c/font_4425847_289uo2fl8zp.css");
`);
  },
  rootComponents: [
    () => h(BackToTop, {}),
  ],
});
