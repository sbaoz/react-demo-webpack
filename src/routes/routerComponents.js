import loadable from '../components/loadable'
// import { deferredAsyncConnect } from '../utils/deferredAsyncConnect'
import NotMatch from '../containers/notMatch'

const Home = loadable(() => import(/* webpackChunkName: 'page-home' */ '../containers/home'))
const About = loadable(() => import(/* webpackChunkName: 'page-about' */ '../containers/about'))

export default {
    Home,
    About,
    NotMatch
}
