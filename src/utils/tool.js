// 'alipay' | 'weixin' | 'h5' | 'others'
export const getUniPlatform = () => {
    const res = uni.getSystemInfoSync()
    const uniPlatform = res.uniPlatform
    if (uniPlatform === 'mp-alipay') return 'alipay'
    if (uniPlatform === 'mp-weixin') return 'weixin'
    if (uniPlatform === 'web') return 'h5'
    return 'others'
}

export const getAuthCode = () => {
    return new Promise((resolve, reject) => {
        uni.login({
            scopes: 'auth_base',
            onlyAuthorize: true,
            success: function (res) {
                resolve(res.code)
            },
            fail: function (err) {
                console.error('获取授权码失败，失败原因：', err)
                reject(err)
            }
        })
    })
}
