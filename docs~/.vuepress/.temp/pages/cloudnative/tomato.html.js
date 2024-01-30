export const data = JSON.parse("{\"key\":\"v-caaa0e1a\",\"path\":\"/cloudnative/tomato.html\",\"title\":\"番茄\",\"lang\":\"zh-CN\",\"frontmatter\":{\"icon\":\"pen-to-square\",\"date\":\"2022-01-12T00:00:00.000Z\",\"category\":[\"蔬菜\"],\"tag\":[\"红\",\"圆\"],\"star\":true,\"sticky\":true,\"description\":\"番茄 标题 2 这里是内容。 标题 3 这里是内容。\"},\"headers\":[{\"level\":2,\"title\":\"标题 2\",\"slug\":\"标题-2\",\"link\":\"#标题-2\",\"children\":[{\"level\":3,\"title\":\"标题 3\",\"slug\":\"标题-3\",\"link\":\"#标题-3\",\"children\":[]}]}],\"readingTime\":{\"minutes\":0.12,\"words\":36},\"filePathRelative\":\"cloudnative/tomato.md\",\"localizedDate\":\"2022年1月12日\",\"excerpt\":\"<h1>番茄</h1>\\n<h2>标题 2</h2>\\n<p>这里是内容。</p>\\n<h3>标题 3</h3>\\n<p>这里是内容。</p>\\n\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
