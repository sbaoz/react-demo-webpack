import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000
})

instance.interceptors.request.use(config => config, err => Promise.reject(err))
instance.interceptors.response.use(res => res, err => Promise.reject(err))

class Service {
    get(url, config = {}) {
        return instance.get(url, { ...config })
    }

    post(url, data, config = {}) {
        return instance.post(url, data, config)
    }
}

export default new Service()
