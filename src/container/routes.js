import Asynccomponent from "../component/asynccomponent.js"

export default {
    "/":{
        exact: true,
        component: Asynccomponent(() =>
            import ('./index/index.js'))
    },
    "/desktop":{
        component: Asynccomponent(() =>
            import ('./desktop/index.js'))
    },
    "/user":{
        component: Asynccomponent(() =>
            import ('./user/index.js'))
    },
    "not":{
        component: Asynccomponent(() =>
            import ('./notfound/index.js'))
    }
}
