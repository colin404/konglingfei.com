import comp from "/home/colin/workspace/golang/src/github.com/superproj/konglingfei.com/docs/.vuepress/.temp/pages/onex/index.html.vue"
const data = JSON.parse("{\"path\":\"/onex/\",\"title\":\"Onex\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Onex\",\"article\":false,\"feed\":false,\"sitemap\":false,\"description\":\"\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"http://konglingfei.com/onex/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"孔令飞的云原生实战营\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Onex\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"孔令飞\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Onex\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null,\"autoDesc\":true,\"git\":{},\"excerpt\":\"\"}")
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
