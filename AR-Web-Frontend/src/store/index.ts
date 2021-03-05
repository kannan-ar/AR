import Vue from 'vue'
import Vuex, {StoreOptions, GetterTree, MutationTree} from 'vuex'
import RootState from './types'

Vue.use(Vuex)

const mutations: MutationTree<RootState> = {
    changeState: (state) => (state.isEditMode = !state.isEditMode)
}

const getters: GetterTree<RootState, RootState> = {
    isEditMode: state => state.isEditMode
}

const storeOptions: StoreOptions<RootState> = {
    state: {
        isEditMode: false
    },
    getters,
    mutations
}

const store = new Vuex.Store(storeOptions)

export default store