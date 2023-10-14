import { verifyNumberIntegerAndFloat } from './validator'
/**
 * 判断是否为json
 * @param str 当前字符串
 * @returns 返回 true: 为json数据
 */
export const isJson = (str) => {
    if (typeof str === 'string') {
        try {
            if (typeof JSON.parse(str) === 'object') {
                return true
            }
        } catch (e) {
            return false
        }
    }
    return false
}

/**
 * 判断是否含某类型的空值
 * @param lintcontent 校验的内容
 * @param lintTypeArr 检验的类型
 * @returns 返回true 代表含控制
 */
const isNoValue = (lintcontent, lintTypeArr = ['string', 'null', 'undefined']) => {
    let type = Object.prototype.toString.call(lintcontent)
    type = type.replace(/(\[|\])/g, '').split(' ')[1].toLowerCase()
    switch (type) {
    case 'string':
        return lintTypeArr.includes('string') && !lintcontent.trim()
    case 'null':
    case 'undefined':
        return !lintcontent
    case 'array':
        return !lintcontent.length
    case 'object':
        return Object.keys(lintcontent).length === 0
    default:
        return false
    }
}

/**
 * 去掉中文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function clearCnAndSpace (val) {
    // 匹配中文与空格
    let v = val.replace(/[\u4e00-\u9fa5\s]+/g, '')
    // 匹配空格
    v = v.replace(/(^\s*)|(\s*$)/g, '')
    // 返回结果
    return v
}

/**
 * 去掉英文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function clearEnAndSpace (val) {
    // 匹配英文与空格
    let v = val.replace(/[a-zA-Z]+/g, '')
    // 匹配空格
    v = v.replace(/(^\s*)|(\s*$)/g, '')
    // 返回结果
    return v
}

/**
 * 禁止输入空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function clearAndSpace (val) {
    // 匹配空格
    const v = val.replace(/(^\s*)|(\s*$)/g, '')
    // 返回结果
    return v
}

/**
 * 金额用 `,` 区分开
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function tranNumber2Comma (val) {
    // 调用小数或整数(不可以负数)方法
    let v = verifyNumberIntegerAndFloat(val)
    // 字符串转成数组
    v = v.toString().split('.')
    // \B 匹配非单词边界，两边都是单词字符或者两边都是非单词字符
    v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // 数组转字符串
    v = v.join('.')
    // 返回结果
    return v
}

/**
 * 金额转成数字
 * @param str 当前值字符串
 * @param thousandsSep 金额分隔符，默认','
 * @returns 返回处理后的数字
 */
export function tranComma2Number (str, thousandsSep = ',') {
    return parseFloat(str.replace(thousandsSep, '')) - 0
}

/**
 * 匹配文字变色（搜索时）
 * @param val 当前值字符串
 * @param text 要处理的字符串值
 * @param color 搜索到时字体高亮颜色
 * @returns 返回处理后的字符串
 */
export function tranTextColor (val, text = '', color = 'red') {
    // 返回内容，添加颜色
    const v = text.replace(new RegExp(val, 'gi'), `<span style='color: ${color}'>${val}</span>`)
    // 返回结果
    return v
}

/**
 * 数字转中文大写
 * @param val 当前值字符串
 * @param unit 默认：仟佰拾亿仟佰拾万仟佰拾元角分
 * @returns 返回处理后的字符串
 */
export function tranNumber2CnUppercase (val, unit = '仟佰拾亿仟佰拾万仟佰拾元角分', v = '') {
    // 当前内容字符串添加 2个0，为什么??
    val += '00'
    // 返回某个指定的字符串值在字符串中首次出现的位置，没有出现，则该方法返回 -1
    const lookup = val.indexOf('.')
    // substring：不包含结束下标内容，substr：包含结束下标内容
    if (lookup >= 0) val = val.substring(0, lookup) + val.substr(lookup + 1, 2)
    // 根据内容 val 的长度，截取返回对应大写
    unit = unit.substr(unit.length - val.length)
    // 循环截取拼接大写
    for (let i = 0; i < val.length; i++) {
        v += '零壹贰叁肆伍陆柒捌玖'.substr(val.substr(i, 1), 1) + unit.substr(i, 1)
    }
    // 正则处理
    v = v
        .replace(/零角零分$/, '整')
        .replace(/零[仟佰拾]/g, '零')
        .replace(/零{2,}/g, '零')
        .replace(/零([亿|万])/g, '$1')
        .replace(/零+元/, '元')
        .replace(/亿零{0,3}万/, '亿')
        .replace(/^元/, '零元')
    // 返回结果
    return v
}

/**
 * 判断是否为emoji字符
 * @param substring 当前字符
 * @returns 返回 true 是emoji
 */
export function isEmojiCharacter (substring) {
    for (var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i)
        if (hs >= 0xd800 && hs <= 0xdbff) {
            if (substring.length > 1) {
                const ls = substring.charCodeAt(i + 1)
                const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
                if (uc >= 0x1d000 && uc <= 0x1f77f) {
                    return true
                }
            }
        } else if (substring.length > 1) {
            const ls = substring.charCodeAt(i + 1)
            if (ls === 0x20e3) {
                return true
            }
        } else {
            return (
                (hs >= 0x2100 && hs <= 0x27ff) ||
              (hs >= 0x2B05 && hs <= 0x2b07) ||
              (hs >= 0x2934 && hs <= 0x2935) ||
              (hs >= 0x3297 && hs <= 0x3299) ||
              (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 ||
                  hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b ||
                  hs === 0x2b50)
            )
        }
    }
}
/**
 * 将emoji转码, 一般用于保存字符到服务器
 * @param str emoji字符
 * @returns 返回处理后的字符串
 */
export const utf16toEntities = (str) => {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
    str = str.replace(patt, (char) => {
        var H, L, code
        if (char.length === 2) {
            H = char.charCodeAt(0)
            // 取出高位
            L = char.charCodeAt(1)
            // 取出低位
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00
            // 转换算法
            return '&#' + code + ';'
        } else {
            return char
        }
    })
    return str
}
/**
 * 字符串转成emoji
 * @param str 转码后的字符串，一般取与服务器
 * @returns 返回处理后的emoji
 */
export const entitiesToUtf16 = (str) => {
    if (!str) return ''
    return str.replace(/&#(\d+);/g, function (match, dec) {
        const H = Math.floor((dec - 0x10000) / 0x400) + 0xD800
        const L = Math.floor(dec - 0x10000) % 0x400 + 0xDC00
        return String.fromCharCode(H, L)
    })
}
/**
 * 路径参数返回对象
 * @param url 路径
 * @returns Object
 */
export function urlToObj (url) {
    const string = url.split('&')
    const res = {}
    for (let i = 0; i < string.length; i++) {
        const str = string[i].split('=')
        if (str[0] !== '') {
            res[str[0]] = str[1]
        }
    }
    return res
}
/**
 * 获取路径参数值里的某个key的value
 * @param str 路径字符串
 * @param key key值
 * @returns 返回的value
 */
export function getQueryString (str, key) {
    const search = str.split('?')[1]
    if (search) {
        const params = search.split('&')
        for (var i in params) {
            var param = params[i].split('=')
            if (param[0] === key) {
                return param[1]
            }
        }
    }
    return null
}

export function sleep (timer = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, timer)
    })
}
