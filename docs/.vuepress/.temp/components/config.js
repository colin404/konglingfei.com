import { defineClientConfig } from "vuepress/client";
import { hasGlobalComponent } from "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/node_modules/vuepress-shared/lib/client/index.js";

import { useStyleTag } from "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/node_modules/@vueuse/core/index.mjs";
import FontIcon from "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import Badge from "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";
import BiliBili from "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/node_modules/vuepress-plugin-components/lib/client/components/BiliBili.js";

import "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    if(!hasGlobalComponent("BiliBili")) app.component("BiliBili", BiliBili);
    
  },
  setup: () => {
    useStyleTag(`\
@import url("//at.alicdn.com/t/c/font_4425847_jy76tkfbgg.css");
`);
  },
  rootComponents: [

  ],
});
