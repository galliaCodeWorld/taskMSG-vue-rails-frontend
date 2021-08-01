import ApiService from "@/common/api.service";
import { act_user } from "../../types/actions.type";
import { mut_user, SET_ERROR } from "../../types/mutations.type";
import {URLS} from '@/common/config.js'

const state = {
  error: null,
  contacts: [],
  editID: -1,
  keyword: ''
};

const getters = {
  urContactsStates(state) {
    return state
  }
};
const actions = {
  [act_user.contacts.search](context, keyword) {
    return new Promise((resolve, reject) => {
      ApiService.query(URLS.user.contacts, 
        {key:'query', query: context.state.keyword})
        .then(res => {
          if (res.msg) context.commit(SET_ERROR, res.msg)
          else if (res.data){
            context.commit(mut_user.contacts.getall,  res.data);
          }
          resolve()
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },

  [act_user.contacts.delete](context, id) {
    return new Promise((resolve, reject) => {
      ApiService.post(`${URLS.user.contacts}/${id}/delete`)
        .then(res => {
          if (res.msg) {
            context.commit(SET_ERROR, res.msg)
            resolve()
          } else if (res.data) {
            resolve(res.data)
          }
        })
        .catch(err => {
          context.commit(SET_ERROR, err.data.errors);
          reject(err)
        })
    })
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.error = error;
  },
  [mut_user.contacts.getall](state, data) {
    state.contacts = JSON.parse(data.data)
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};