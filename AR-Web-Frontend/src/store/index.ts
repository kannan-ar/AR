import Vue from 'vue'
import Vuex, {StoreOptions, GetterTree, MutationTree} from 'vuex'
import RootState from './types'

Vue.use(Vuex)

const mutations: MutationTree<RootState> = {
    changeState: (state) => (state.isEditMode = !state.isEditMode),
    setCurrentPageId: (state, {currentPageId}) => (state.currentPageId = currentPageId)
}

const getters: GetterTree<RootState, RootState> = {
    isEditMode: state => state.isEditMode,
    currentPageId: state => state.currentPageId
}

const storeOptions: StoreOptions<RootState> = {
    state: {
        isEditMode: false,
        currentPageId: -1
    },
    getters,
    mutations
}

const store = new Vuex.Store(storeOptions)

export default store