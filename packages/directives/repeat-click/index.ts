import { on, once } from '@element-plus/utils'

import type { DirectiveBinding, ObjectDirective } from 'vue'

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    let interval = null
    let startTime: number
    const handler = () => binding.value && binding.value()
    const clear = () => {
      if (Date.now() - startTime < 100) {
        handler()
      }
      clearTimeout(interval)
      interval = null
    }

    on(el, 'mousedown', (e: MouseEvent) => {
      if ((e as any).button !== 0) return
      startTime = Date.now()
      once(document as any, 'mouseup', clear)
      clearTimeout(interval)
      // 使用setInterver可能会导致多次重复执行
      interval = setTimeout(handler, 100)
    })
  },
} as ObjectDirective
