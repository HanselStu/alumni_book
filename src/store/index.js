//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用插件
Vue.use(Vuex)

//准备actions对象--响应组件中用户的动作
//actions 相当于服务员 你告诉他 你要干什么
const actions = {}

//准备mutations对象--修改state中的数据
//mutations 相当于后厨 去实现行为的
const mutations = {
}

//准备state对象--保存具体的数据
//state 相当于仓库 存放数据
const state = {
    avatarUrl:""
}

//准备getters对象--对数据进行加工
const getters = {}
//创建并暴露store
export default new Vuex.Store({
    actions, mutations, state, getters
})
