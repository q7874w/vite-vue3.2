import { App } from 'vue'
import ToolBar from '@com/ToolBar.vue'
import MTable from '@com/m-table.vue'
import MSearch from '@com/m-search.vue'

export function defineGlobalComponent(app: App) {
  app.component('ToolBar', ToolBar)
  app.component('MTable', MTable)
  app.component('MSearch', MSearch)
}
