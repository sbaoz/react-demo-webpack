import { hostConfig } from './config'

export default {
    getUserInfo(userName, password) {
        return this.post(`${hostConfig.user}/getUserInfo`, {
            userName,
            password
        })
    }
}
