import comp from "/data00/workspace/golang/src/github.com/colin404/konglingfei.com/docs/.vuepress/.temp/pages/demo/encrypt.html.vue"
const data = JSON.parse("{\"path\":\"/demo/encrypt.html\",\"title\":\"密码加密的文章\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2024-01-30T00:00:00.000Z\",\"icon\":\"lock\",\"category\":[\"使用指南\"],\"tag\":[\"加密\"],\"feed\":false,\"seo\":false,\"head\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.53,\"words\":158},\"filePathRelative\":\"demo/encrypt.md\",\"localizedDate\":\"2024年1月30日\",\"git\":{\"createdTime\":1706595777000,\"updatedTime\":1707024428000,\"contributors\":[{\"name\":\"孔令飞\",\"email\":\"konglingfei.nosbelm@bytedance.com\",\"commits\":2}]},\"excerpt\":\"\\n<p>实际的文章内容。</p>\\n<p>段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字。</p>\\n<p>段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字。</p>\\n\"}")
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
