import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";

export default enableResetStore({
    namespaced: true,
    state() {
        return {
            stateDefault: {
                formNotification: formNotification,
                queryNotification: queryNotification
            },
            formNotification: formNotification,
            queryNotification: queryNotification
        }
    },

    getters: {
        getField,
    },
    mutations: {
        updateField,
    },

    actions: {
    },
});


const queryNotification = _.cloneDeep({
    data: "",
});


const formNotification =
    _.cloneDeep([
        {
            title: "",
            type: "content-editer",
            value: 'data',
            cols: 12,
            sm: 12,
            md: 12,
            lg: 12
        },
    ]);