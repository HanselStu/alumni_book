import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
// 按需引入element-ui
import { Container, Header, Main, Footer, Form, FormItem, Input, Select, Option, Button, Message, Dialog, Col, Alert, Upload, Divider, Menu, MenuItem, Submenu, MessageBox, PageHeader, Table, TableColumn, Collapse, CollapseItem, Descriptions, DescriptionsItem, Tag, Empty, Row } from 'element-ui'

import App from './App'

// 使用组件
Vue.use(VueRouter)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Col)
Vue.use(Alert)
Vue.use(Upload)
Vue.use(Divider)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(PageHeader)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Tag)
Vue.use(Empty)
Vue.use(Row)

// Vue.use(MessageBox) // bug: 会导致页面刷新产生弹窗
// 全局配置element-ui的消息提示
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.config.productionTip = false
// 设置element-ui的默认大小
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
