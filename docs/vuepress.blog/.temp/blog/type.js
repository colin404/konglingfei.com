export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-df8b6e0c","v-6e19edb7","v-f0ec4556","v-24b7c48d","v-2bc6566a","v-7f25ca3a","v-7d70f19b","v-7bbc18fc","v-7a07405d","v-6cd750ef","v-6b227850","v-696d9fb1","v-67b8c712","v-184f4da6","v-1473bf53","v-4e65ec78","v-c151bf32","v-33d62ebc","v-438ffe52"]}},"star":{"/":{"path":"/star/","keys":["v-7bbc18fc","v-df8b6e0c","v-696d9fb1","v-6e19edb7"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-df8b6e0c","v-f0ec4556","v-24b7c48d","v-2bc6566a","v-7f25ca3a","v-7d70f19b","v-7bbc18fc","v-7a07405d","v-6cd750ef","v-6b227850","v-696d9fb1","v-67b8c712","v-6e19edb7"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

