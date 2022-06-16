import { App } from 'vue'
import ToolBar from '@comp/ToolBar.vue'
import MTable from '@comp/m-table.vue'
import MSearch from '@comp/m-search.vue'

export function defineGlobalComponent(app: App) {
  app.component('ToolBar', ToolBar)
  app.component('MTable', MTable)
  app.component('MSearch', MSearch)
}
