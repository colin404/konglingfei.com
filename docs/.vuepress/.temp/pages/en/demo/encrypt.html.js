import comp from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/docs/.vuepress/.temp/pages/en/demo/encrypt.html.vue"
const data = JSON.parse("{\"path\":\"/en/demo/encrypt.html\",\"title\":\"Encryption Article\",\"lang\":\"en-US\",\"frontmatter\":{\"date\":\"2024-01-30T00:00:00.000Z\",\"icon\":\"lock\",\"category\":[\"Guide\"],\"tag\":[\"encryption\"],\"feed\":false,\"seo\":false,\"head\":[[\"link\",{\"rel\":\"alternate\",\"hreflang\":\"zh-cn\",\"href\":\"http://konglingfei.com/demo/encrypt.html\"}]]},\"headers\":[],\"readingTime\":{\"minutes\":0.31,\"words\":94},\"filePathRelative\":\"en/demo/encrypt.md\",\"localizedDate\":\"January 30, 2024\",\"git\":{\"createdTime\":1706595777000,\"updatedTime\":1707024428000,\"contributors\":[{\"name\":\"孔令飞\",\"email\":\"konglingfei.nosbelm@bytedance.com\",\"commits\":2}]},\"excerpt\":\"\\n<p>The actual article content.</p>\\n<p>Paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text.</p>\\n<p>Paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text paragraph 2 text.</p>\"}")
export { comp, data }

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
