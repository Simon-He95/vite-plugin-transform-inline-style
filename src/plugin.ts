import fs from 'fs'
export function vitePluginTransformInlineStyle(apply: 'build' | 'serve' = 'serve') {
  const getClasses = /<style .*>[\n]*([.#][\w\-_ ]+){[\n]*([ :;\w\-\n]*)+}[\n]*/gm
  return {
    name: 'vite-plugin-transform-inline-style',
    enforce: 'pre',
    apply,
    transform(code: string, id: string) {
      if (!id.endsWith('.vue'))
        return
      let data = fs.readFileSync(id, 'utf-8')
      const classMap: Record<string, string> = {}
      data = data.replace(getClasses, (match, p1, p2) => {
        classMap[p1.trim()] = p2
        const reg = new RegExp(`${p1}{[ \n]*${p2}}[\n]*`, 'm')
        return match.replace(reg, '')
      })
      let result
      for (const key in classMap) {
        const hasStyle = new RegExp('<.*class="[ \\w]*red[ \\w]*"\\s*style="(.*)"[\\s]{0,1}', 'm')
        const replaceClass = new RegExp(`(class="[ \\w]*${key.slice(1)}[ \\w]*")`, 'gm')
        let styles = ''
        result = data.replace(hasStyle, (match, p1) => {
          const r = p1.trim()
          styles = r.endsWith(';') ? r : `${r};`
          return match.replace(/style=".*"[\s]{0,1}/, '')
        })
        const value = classMap[key].trim()
        result = result.replace(replaceClass, match => `${match} style="${styles + value}"`)
      }
      return result || code
    },
  }
}
