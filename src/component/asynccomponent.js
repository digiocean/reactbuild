import React from 'react'

export const Asynccomponent = (getModule) => {

    return class LazyComponent extends React.Component {

        state = {
            Module: undefined
        }

        componentWillMount() {
            this.load()
        }

        componentDidMount() {
            this._isMounted = true
        }

        componentWillReceiveProps() {
            this.load()
        }

        componentWillUnmount() {
            this._isMounted = false
        }

        load() {
            getModule().then((result) => {
                if (!this._isMounted) return null

                result = result.default || result

                if (this.state.Module != result) {
                    this.setState({
                        Module: result
                    })
                }
            }).catch((e)=>console.warn(e))
        }

        render() {
            const {
                Module
            } = this.state
            if (!Module) return <div><p>模块加载失败……</p></div>
            return <Module { ...this.props} />
        }
    }
}

export default Asynccomponent
