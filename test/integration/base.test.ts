import { describe, expect, it } from 'vitest'
import { createResolver } from '@nuxt/kit'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

const { resolve } = createResolver(import.meta.url)

process.env.NODE_ENV = 'production'

await setup({
  rootDir: resolve('../fixtures/basic'),
  build: true,
  server: true,
  nuxtConfig: {
    app: {
      baseURL: '/base',
    },
  },
})

describe('app baseURL', () => {
  it('basic', async () => {
    // extract the <head>
    const html = await $fetch('/base')
    const head = html.match(/<head>([\s\S]*)<\/head>/)?.[1]
    // check the favicon link
    expect(head).toContain('<link rel="icon" href="/base/favicon.ico" sizes="any">')
  })
})
