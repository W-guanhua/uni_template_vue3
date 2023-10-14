import request from '@/request'

export async function getWeather () {
    return request({
        url: 'https://api.oioweb.cn/api/weather/GetWeather',
        method: 'get',
        _showLoading: true,
        _retryTimes: 0
    })
}
