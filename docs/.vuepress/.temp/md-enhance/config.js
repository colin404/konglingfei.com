import { defineClientConfig } from "vuepress/client";
import ChartJS from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/ChartJS.js";
import CodeTabs from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { hasGlobalComponent } from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-shared@2.0.0-rc.23_vuepress@2.0.0-rc.7/node_modules/vuepress-shared/lib/client/index.js";
import { CodeGroup, CodeGroupItem } from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import CodeDemo from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import ECharts from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/ECharts.js";
import { injectEchartsConfig } from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client//index.js";
import "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import FlowChart from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart.js";
import "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/styles/footnote.scss";
import { useHint } from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/composables/hint.js";
import "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/styles/hint/index.scss";
import "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/styles/image-mark.scss"
import "/home/colin/konglingfei.com/node_modules/.pnpm/katex@0.16.9/node_modules/katex/dist/katex.min.css";
import "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/styles/katex.scss";
import Mermaid from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid.js";
import { injectMermaidConfig } from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client//index.js";
import Playground from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/Playground.js";
import "/home/colin/konglingfei.com/node_modules/.pnpm/reveal.js@5.0.4/node_modules/reveal.js/dist/reveal.css";
import RevealJs from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/RevealJs.js";
import { injectRevealJsConfig } from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/index.js";
import Tabs from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";
import "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tasklist.scss";
import VuePlayground from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/components/VuePlayground.js";
import { injectVuePlaygroundConfig } from "/home/colin/konglingfei.com/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.23_@vue+repl@3.4.0_chart.js@4.4.1_echarts@5.4.3_flowchart_7p6ertlhltx3vzjfakz2mgz65u/node_modules/vuepress-plugin-md-enhance/lib/client/index.js";

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
    app.component("FlowChart", FlowChart);
    injectMermaidConfig(app);
    app.component("Mermaid", Mermaid);
    app.component("Playground", Playground);
    injectRevealJsConfig(app);
    app.component("RevealJs", RevealJs);
    app.component("Tabs", Tabs);
    injectVuePlaygroundConfig(app);
    app.component("VuePlayground", VuePlayground);
  },
  setup: () => {
useHint();
  }
});
