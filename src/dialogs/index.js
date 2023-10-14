const dialogModules = import.meta.glob('./*.vue')

export default Object.keys(dialogModules).reduce((dialogNameList, key) => {
    const comName = key.match(/.*\/(.+).vue$/)?.[1] || 'default'
    dialogNameList.push(comName)
    return dialogNameList
}, [])
