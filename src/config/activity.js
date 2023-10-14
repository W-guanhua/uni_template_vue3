export const ActivityStatus = {
    NORMAL: 'NORMAL',
    UPGRADE: 'UPGRADE',
    END: 'END',
    ERROR: 'ERROR'
}

export const ActivityStatusEnum2Img = {
    [ActivityStatus.NORMAL]: '',
    [ActivityStatus.END]: '',
    [ActivityStatus.UPGRADE]: '',
    [ActivityStatus.ERROR]: '',
}

export const ActivityStatusEnum2Str = {
    [ActivityStatus.NORMAL]: '活动进行中',
    [ActivityStatus.END]: '活动已结束~客官下次请早',
    [ActivityStatus.UPGRADE]: '活动正在升级中，客官稍后再来吧～~',
    [ActivityStatus.ERROR]: '网络异常，请稍后再试~',
}
