/**
 * 手机号码
 * @param val 当前值字符串
 * @returns 返回 true: 手机号码正确
 */
export function verifyPhone (val) {
    // false: 手机号码不正确
    if (!/^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(val)) return false
    // true: 手机号码正确
    else return true
}

/**
 * 国内电话号码
 * @param val 当前值字符串
 * @returns 返回 true: 国内电话号码正确
 */
export function verifyTelPhone (val) {
    // false: 国内电话号码不正确
    if (!/\d{3}-\d{8}|\d{4}-\d{7}/.test(val)) return false
    // true: 国内电话号码正确
    else return true
}

/**
 * 邮箱
 * @param val 当前值字符串
 * @returns 返回 true: 邮箱正确
 */
export function verifyEmail (val) {
    // false: 邮箱不正确
    if (
        // eslint-disable-next-line no-useless-escape
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            val
        )
    // eslint-disable-next-line brace-style
    ) { return false }
    // true: 邮箱正确
    else return true
}

/**
 * 身份证
 * @param val 当前值字符串
 * @returns 返回 true: 身份证正确
 */
export function verifyIdCard (val) {
    // false: 身份证不正确
    if (!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val)) return false
    // true: 身份证正确
    else return true
}

/**
 * 姓名
 * @param val 当前值字符串
 * @returns 返回 true: 姓名正确
 */
export function verifyFullName (val) {
    // false: 姓名不正确
    if (!/^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/.test(val)) return false
    // true: 姓名正确
    else return true
}

/**
 * 邮政编码
 * @param val 当前值字符串
 * @returns 返回 true: 邮政编码正确
 */
export function verifyPostalCode (val) {
    // false: 邮政编码不正确
    if (!/^[1-9][0-9]{5}$/.test(val)) return false
    // true: 邮政编码正确
    else return true
}

/**
 * url 处理
 * @param val 当前值字符串
 * @returns 返回 true: url 正确
 */
export function verifyUrl (val) {
    // false: url不正确
    if (
        !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
            val
        )
    // eslint-disable-next-line brace-style
    ) { return false }
    // true: url正确
    else return true
}

/**
 * 小数或整数(不可以负数)
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyNumberIntegerAndFloat (val) {
    // 匹配空格
    let v = val.replace(/(^\s*)|(\s*$)/g, '')
    // 只能是数字和小数点，不能是其他输入
    v = v.replace(/[^\d.]/g, '')
    // 以0开始只能输入一个
    v = v.replace(/^0{2}$/g, '0')
    // 保证第一位只能是数字，不能是点
    v = v.replace(/^\./g, '')
    // 小数只能出现1位
    v = v.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    // 小数点后面保留2位
    // eslint-disable-next-line no-useless-escape
    v = v.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
    // 返回结果
    return v
}
