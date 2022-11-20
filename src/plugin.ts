import fs from 'fs'
export function vitePluginTransformInlineStyle() {
  const getClasses = /<style .*>[\n]{0,}([.#][\w\-_ ]+){[\n]{0,}([ :;\w\-\n]{0,})+}[\n]{0,}/gm
  return {
    name: 'vite-plugin-transform-inline-style',
    enforce: 'pre',
    apply: 'build',
    transform(code: string, id: string) {
      if (!id.endsWith('.vue'))
        return
      let data = fs.readFileSync(id, 'utf-8')
      const classMap: Record<string, string> = {}
      data = data.replace(getClasses, (match, p1, p2) => {
        classMap[p1.trim()] = p2
        const reg = new RegExp(`${p1}{[ \n]{0,}${p2}}`, 'm')
        return match.replace(reg, '')
      })
      let result
      for (const key in classMap) {
        const hasStyle = new RegExp('<.*class="[ \\w]{0,}red[ \\w]{0,}"\\s{0,}style="(.*)"', 'm')
        const replaceClass = new RegExp(`(class="[ \\w]{0,}${key.slice(1)}[ \\w]{0,}")`, 'gm')
        let styles = ''
        result = data.replace(hasStyle, (match, p1) => {
          const r = p1.trim()
          styles = r.endsWith(';') ? r : `${r};`
          return match.replace(/style=".*"/, '')
        })
        const value = classMap[key].trim()
        result = result.replace(replaceClass, match => `${match} style="${styles + value}"`)
      }
      return result || code
    },
  }
}
