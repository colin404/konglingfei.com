import { defineClientConfig } from "vuepress/client";


import { HopeIcon, Layout, NotFound, useScrollPromise, injectDarkmode, setupDarkmode, setupSidebarItems } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.23_@vue+repl@3.4.0_@waline+client@3.0.0-alpha.11_artalk@2.8.2_ch_vu37xkyjmir6k4si7z453vk4bm/node_modules/vuepress-theme-hope/lib/bundle/export.js";

import { defineCatalogInfoGetter } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.12_vuepress@2.0.0-rc.7/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"
import { GlobalEncrypt, LocalEncrypt } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.23_@vue+repl@3.4.0_@waline+client@3.0.0-alpha.11_artalk@2.8.2_ch_vu37xkyjmir6k4si7z453vk4bm/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/export.js";
import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.23_@vue+repl@3.4.0_@waline+client@3.0.0-alpha.11_artalk@2.8.2_ch_vu37xkyjmir6k4si7z453vk4bm/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/styles/all.scss"
import Slide from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/SlidePage.js";

import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.23_@vue+repl@3.4.0_@waline+client@3.0.0-alpha.11_artalk@2.8.2_ch_vu37xkyjmir6k4si7z453vk4bm/node_modules/vuepress-theme-hope/lib/bundle/styles/all.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.t;
  const shouldIndex = meta.I !== false;
  const icon = meta.i;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(HopeIcon, { icon }), title] : null,
    order: meta.O,
    index: meta.I,
  } : null;
});

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // provide HopeIcon as global component
    app.component("HopeIcon", HopeIcon);

    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();

  },
  layouts: {
    Layout,
    NotFound,
    Slide,
  }
});