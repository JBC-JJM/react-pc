// 封装token持久化 手撸

const key = 'pc-key'

const setToken = (token) => {
    return window.localStorage.setItem(key, token)
}

const getToken = (token) => {
    return window.localStorage.getItem(key, token)
}

const removeToken = (token) => {
    return window.localStorage.removeItem(key, token)
}

export{
    setToken,
    getToken,
    removeToken
}