import { defineClientConfig } from "vuepress/client";
import ChartJS from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/components/ChartJS.js";
import CodeTabs from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { hasGlobalComponent } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-shared@2.0.0-rc.16_vuepress@2.0.0-rc.2/node_modules/vuepress-shared/lib/client/index.js";
import { CodeGroup, CodeGroupItem } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import CodeDemo from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import ECharts from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/components/ECharts.js";
import { injectEchartsConfig } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client//index.js";
import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/styles/footnote.scss";
import { useHint } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/composables/hint.js";
import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/styles/hint/index.scss";
import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/styles/image-mark.scss"
import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/katex@0.16.9/node_modules/katex/dist/katex.min.css";
import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/styles/katex.scss";
import Mermaid from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid.js";
import { injectMermaidConfig } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client//index.js";
import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/reveal.js@5.0.4/node_modules/reveal.js/dist/reveal.css";
import RevealJs from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/components/RevealJs.js";
import { injectRevealJsConfig } from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/index.js";
import Tabs from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";
import "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.16_chart.js@4.4.1_echarts@5.4.3_katex@0.16.9_markdown-it@_t7c4wkiw3vh25a23ikwvrdacte/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tasklist.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ChartJS", ChartJS)
    app.component("CodeTabs", CodeTabs);
    if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);
    if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("ECharts", ECharts);
    injectEchartsConfig(app);
    injectMermaidConfig(app);
    app.component("Mermaid", Mermaid);
    injectRevealJsConfig(app);
    app.component("RevealJs", RevealJs);
    app.component("Tabs", Tabs);
  },
  setup: () => {
useHint();
  }
});
