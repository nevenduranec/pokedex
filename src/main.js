// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
    Button,
    Row,
    Col,
    Card,
    Loading,
    Tooltip,
    Input,
    Form,
    FormItem,
    Select,
    Option,
    Pagination,
    Checkbox,
    Tag,
    Progress,
    Table,
    TableColumn
} from 'element-ui'

Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Loading);
Vue.use(Tooltip);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Checkbox);
Vue.use(Tag);
Vue.use(Progress);
Vue.use(Table);
Vue.use(TableColumn);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#pokeapp',
    router,
    template: '<App/>',
    components: { App }
})
