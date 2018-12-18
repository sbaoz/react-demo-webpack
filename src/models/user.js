import Cookies from 'js-cookie'

export const user = {
    state: {
        isLogin: false,
        userInfo: {}
    },
    reducers: {
        setUserInfo(state, payload) {
            return {
                ...state,
                ...payload,
                isLogin: true
            }
        }
    },
    effects: {
        async loginByUserName({ userName, password } = {}, { api }) {
            try {
                const { data } = await new Promise((resolve, reject) => setTimeout(() => resolve({ data: { id: '0001', userName: 'lalala' } })))
                Cookies.set('userInfo', data, { expires: 7, path: '/' })
                this.setUserInfo({
                    userInfo: data
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
