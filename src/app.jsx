import React from 'react'
// import { renderRoutes } from 'react-router-config'
import renderRoutes from '@utils/renderRoutes'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import ProgressBar from '@components/progressBar'
import ErrorBoundary from '@components/errorBoundary'

export default class App extends React.Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired // eslint-disable-line
    }

    render() {
        const { route } = this.props

        return (
            <div>
                <Helmet>
                    <title>react-demo</title>
                    <meta name="description" content="react-demo" />
                </Helmet>
                <ProgressBar />
                <ErrorBoundary>
                    {renderRoutes(route.routes)}
                </ErrorBoundary>
            </div>
        )
    }
}
