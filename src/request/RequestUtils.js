import axios from 'axios'
import { isUndefined } from 'lodash'
import miniAdapter from 'axios-miniprogram-adapter'
import { getUniPlatform } from '@/utils/tool'
import RequsetConfig from '@/config/request'

const uniPlatform = getUniPlatform()

export function toFilterdDynamicParameter (data, url) {
    if (!(data instanceof Object)) return data
    const dynamicParameterList = url.match(/(?<={)(.*?)(?=})/g)
    if (!dynamicParameterList?.length) return data
    const newData = {}
    for (const key in data) {
        if (dynamicParameterList.includes(key)) {
            continue
        }
    }
    return newData
}

// 配置新建一个 axios 实例
const service = axios.create({
    baseURL: RequsetConfig.baseURL,
    timeout: 50000,
    headers: { 'Content-Type': 'application/json' },
    adapter: (uniPlatform === 'weixin' || uniPlatform === 'alipay') ? miniAdapter : undefined,
})

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 动态替换请求路径 {xxx} 形式，xxx动态替换参数中的内容
        const url = config.url || ''
        config.url = config.url?.replace(/{(.*?)}/g, ($1) => {
            const method = config.method?.toLowerCase()
            const requestParams = (method === 'delete' || method === 'get') ? config.params : config.data
            const key = $1.replace('{', '').replace('}', '')
            const value = requestParams[key]
            if (isUndefined(value)) {
                console.error(config.url, '请检查参数', key)
                return ''
            }
            return value
        })

        // 过滤动态路径参数
        if (config.params) {
            config.params = toFilterdDynamicParameter(config.params, url)
        }
        if (config.data) {
            config.data = toFilterdDynamicParameter(config.data, url)
        }

        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        return response.data
    },
    (error) => {
        console.log(error)
        // 对响应错误做点什么
        if (error.message.indexOf('timeout') !== -1) {
            uni.showToast({
                icon: 'error',
                title: '网络超时'
            })
        } else if (error.message === 'Network Error') {
            uni.showToast({
                icon: 'error',
                title: '网络连接错误'
            })
        } else {
            if (error.response.data) {
                uni.showToast({
                    icon: 'error',
                    title: error.response.statusText
                })
            } else {
                uni.showToast({
                    icon: 'error',
                    title: '接口路径找不到'
                })
            }
        }
        return Promise.reject(error)
    }
)

// 导出 axios 实例
export default service
