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
@import url("//at.alicdn.com/t/c/font_4425847_lax8v5sprh.css");
`);
  },
  rootComponents: [
    () => h(Notice, { config: [{"noticeKey":"2024.1.1","path":"/en","title":"Coming in <b>2024.1.1</b>","content":"<ul><li>Custom toolbar</li></ul><div class=\"addthis_inline_follow_toolbox\"></div>","actions":[{"text":"Learn more→","link":"/en/guide/history.html#_2024-1-2","type":"primary"}],"showOnce":true},{"noticeKey":"2024.1.4","path":"/","title":"🔥 限时优惠","content":"知识星球上新 85 折优惠中，早买早学习 👉 <a href=https://t.zsxq.com/19UzGVCs9>点击加入</a> ","showOnce":false},{"type":"text","content":"👇公众号👇---👇 微信群 👇"}] }),
  ],
});
