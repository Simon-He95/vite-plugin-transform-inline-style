## Vite Plugin Transform Inline Style
将class转换为style的vite插件，WIP

## 用法
```js
import vitePluginTransformInlineStyle from 'vite-plugin-transform-inline-style'
// vite.config.ts
const apply: 'build' | 'serve' = 'serve' // 运行时转换还是构建时转换，默认为运行时
export default defineConfig({
  plugins: [
    vitePluginTransformInlineStyle(apply)
  ]
})
```

## 说明
- 仅支持vue文件
- 目前仅支持单层的class转换，如`.a {}`, 不支持`.a .b {}`


## 运行前
```
<template>
  <div class="red" style="background: yellow" />
</template>

<style scoped>
.red {
  color: red;
  font-size: 14px;
}
.red .a {
  color: yellow;
}
</style>
```

## 运行后
```
<template>
  <div class="red" style="background: yellow;color: red;
  font-size: 14px;" />
</template>

<style scoped>
.red .a {
  color: yellow;
}
</style>
```


## :coffee: 
[请我喝一杯咖啡](https://github.com/Simon-He95/sponsor)

## GitHub地址
[欢迎PR](https://github.com/Simon-He95/vite-plugin-transform-inline-style)
