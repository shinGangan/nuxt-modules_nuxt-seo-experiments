import { addTemplate, useNuxt } from '@nuxt/kit'
import { resolve } from 'pathe'
import type { NuxtTemplate } from '@nuxt/schema'

export function extendTypes(module: string, template: (args?: unknown) => string | Promise<string>, options: Omit<NuxtTemplate, 'getContents'> = {}) {
  const nuxt = useNuxt()
  // paths.d.ts
  addTemplate({
    filename: `${module}.d.ts`,
    getContents: async (...args) => {
      const s = await template(...args)
      return `// Generated by ${module}
${s}
export {}
`
    },
    ...options,
  })

  nuxt.hooks.hook('prepare:types', ({ references }) => {
    references.push({ path: resolve(nuxt.options.buildDir, `${module}.d.ts`) })
  })
}
