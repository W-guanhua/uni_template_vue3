export default function ReplaceStr (params) {
    return {
        name: 'vite:replacestr',
        transform: (code, id) => {
            if (/\.(acss|wcss|css)$/.test(id)) {
                params.forEach(({ pattern, urlPrefix }) => {
                    code = code.replace(pattern, urlPrefix)
                })
            }
            return code
        },
    }
}
