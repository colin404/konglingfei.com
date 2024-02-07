import { defineClientConfig } from "vuepress/client";
import { hasGlobalComponent } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-shared@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-shared/lib/client/index.js";
import { h } from "vue";

import { useStyleTag } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/@vueuse+core@10.7.2_vue@3.4.15/node_modules/@vueuse/core/index.mjs";
import FontIcon from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import Badge from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";
import BiliBili from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-plugin-components/lib/client/components/BiliBili.js";
import Notice from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-plugin-components/lib/client/components/Notice.js";

import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    if(!hasGlobalComponent("BiliBili")) app.component("BiliBili", BiliBili);
    
  },
  setup: () => {
    useStyleTag(`\
@import url("//at.alicdn.com/t/c/font_4425847_49mnzsdr50k.css");
`);
  },
  rootComponents: [
    () => h(Notice, { config: [{"noticeKey":"2024.1.1","path":"/en","title":"Coming in <b>2024.1.1</b>","content":"<ul><li>Custom toolbar</li></ul><div class=\"addthis_inline_follow_toolbox\"></div>","actions":[{"text":"Learn more→","link":"/en/guide/history.html#_2024-1-2","type":"primary"}],"showOnce":true},{"noticeKey":"2024.1.2","path":"/","title":"将在2024.1.2推出","content":"<ul><li>自定义工具栏</li></ul><div class=\"addthis_inline_follow_toolbox_qssu\"></div>","actions":[{"text":"了解详情→","link":"/cloudnative/intro/intro","type":"primary"},{"text":"了解详情2→","link":"https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210"}],"showOnce":false}] }),
  ],
});
