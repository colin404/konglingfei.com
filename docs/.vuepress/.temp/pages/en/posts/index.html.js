import comp from "/home/colin/konglingfei.com/docs/.vuepress/.temp/pages/en/posts/index.html.vue"
const data = JSON.parse("{\"path\":\"/en/posts/\",\"title\":\"Posts\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Posts\",\"article\":false,\"feed\":false,\"sitemap\":false,\"description\":\"\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://konglingfei.com/en/posts/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"云原生实战星球\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Posts\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"孔令飞\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Posts\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null,\"autoDesc\":true,\"git\":{},\"excerpt\":\"\"}")
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
