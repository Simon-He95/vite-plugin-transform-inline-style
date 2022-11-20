## Vite Plugin Transform Inline Style
将class转换为style的vite插件，WIP

## 用法
```js
import vitePluginTransformInlineStyle from 'vite-plugin-transform-inline-style'
// vite.config.ts
export default defineConfig({
  plugins: [
    vitePluginTransformInlineStyle()
  ]
})
```

## 说明
- 仅支持vue文件
- 目前仅支持单层的class转换，如`.a {}`, 不支持`.a .b {}`


## :coffee: 
[请我喝一杯咖啡](https://github.com/Simon-He95/sponsor)

## GitHub地址
[欢迎PR](https://github.com/Simon-He95/vite-plugin-transform-inline-style)
