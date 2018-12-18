import loadableComponent from '@loadable/component'

/**
 * 使用时需要保证使用`loadable`这个名字
 * 如：loadable(() => import(path/to/*.js))
 * 不能使用自定义名字，如：asyncComponent(() => import(path/to/*.js))
 * @loadable/babel-plugin应该是依赖这个名字去做相应处理
 */
export default function loadable(loader) {
    const Component = loadableComponent(loader)

    Component.preload = () => loader.requireAsync()
    return Component
}
