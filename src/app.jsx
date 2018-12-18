import React from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import ProgressBar from './components/progressBar'
import ErrorBoundary from './components/errorBoundary'

const mapState = state => ({
    isLogin: state.user.isLogin
})

@connect(mapState)
export default class App extends React.Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired, // eslint-disable-line
        isLogin: PropTypes.bool.isRequired
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // if (nextProps.location.pathname !== prevState.pathname) {
        //     return {
        //         pathName: nextProps.location.pathname
        //     }
        // }
        return null
    }

    render() {
        const { route, isLogin } = this.props

        return (
            <div>
                <Helmet>
                    <title>react-demo</title>
                    <meta name="description" content="react-demo" />
                </Helmet>
                <ProgressBar />
                {!isLogin && <div>login</div>}
                <ErrorBoundary>
                    {renderRoutes(route.routes)}
                </ErrorBoundary>
            </div>
        )
    }
}
