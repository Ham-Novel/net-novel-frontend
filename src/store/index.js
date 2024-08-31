import { createStore } from "vuex";
import navi from "./modules/navi";
import devToolBan from "./modules/devToolBan";

const setup = (store) => {
    window.addEventListener('devtoolschange', event => {
        console.log("ddd")
    });
}

export default createStore({
    modules: {
        navi,
        devToolBan
    },
    plugins: [setup]
})