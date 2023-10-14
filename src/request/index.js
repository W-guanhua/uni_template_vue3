import request from './RequestUtils'
import axios from 'axios'

export default async function (params) {
    let retryTimes = params._retryTimes || 0
    params._showLoading && uni.showLoading({})
    const requestHandler = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await request(params)
                params._showLoading && uni.hideLoading()
                resolve(res)
            } catch (error) {
                if (retryTimes > 0) {
                    retryTimes--
                    return requestHandler()
                } else {
                    params._showLoading && uni.hideLoading()
                    if (axios.isAxiosError(error)) {
                        reject(error)
                    } else if (params.onError) {
                        await params.onError(error, resolve)
                    } else {
                        reject('请求异常', error)
                    }
                }
            }
        })
    }

    return requestHandler()
}
