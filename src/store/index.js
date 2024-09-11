import { createStore } from "vuex";
import navi from "./modules/navi";
import devToolBan from "./modules/devToolBan";

//개발자 도구 감지
const setup = (store) => {
    window.addEventListener('devtoolschange', event => {
        console.log("ddd")
    });
}

const myPlugin = store => {
    store.subscribe((mutation, state) => {
        console.log('Mutation applied:', mutation.type);
        console.log('Current state:', state);
    });
};

export default createStore({
    modules: {
        navi,
        devToolBan
    },
    plugins: [setup]
})