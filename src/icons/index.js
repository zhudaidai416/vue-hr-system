import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon) // 全局注册组件

// require.context(目标目录, 是否扫描子目录, 正则表达式) 扫描目录中的文件
const req = require.context('./svg', false, /\.svg$/)
// console.log('🚀 ~ file: index.js:9 ~ req:', req.keys()) // 目录文件中所有的.svg文件

// req函数能够引用图片到项目中，将所有的svg都引用到项目中（map：有多少svg，引用多少次，遍历循环）
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// webpack中的loader（vue.config.js文件）：将svg打包到symbol标签上
