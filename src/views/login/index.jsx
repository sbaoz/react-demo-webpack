import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import ProgressBar from '@components/progressBar'

const mapDispatch = ({ user: { loginByUserName } }) => {
    loginByUserName
}

@connect(mapDispatch)
export default class Login extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>react-demo</title>
                    <meta name="description" content="react-demo-login" />
                </Helmet>
                <ProgressBar />
                <div>login</div>
            </div>
        )
    }
}
