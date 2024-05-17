import comp from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/docs/.vuepress/.temp/pages/posts/index.html.vue"
const data = JSON.parse("{\"path\":\"/posts/\",\"title\":\"技术分享\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2024-02-04T00:00:00.000Z\",\"title\":\"技术分享\",\"icon\":\"fenxiang\",\"index\":false,\"dir\":{\"collapsible\":false,\"order\":1},\"description\":\"\"},\"headers\":[],\"readingTime\":{\"minutes\":0.07,\"words\":20},\"filePathRelative\":\"posts/README.md\",\"localizedDate\":\"2024年2月4日\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")
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
