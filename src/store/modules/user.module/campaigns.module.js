import ApiService from "@/common/api.service";
import { act_user } from "../../types/actions.type";
import { mut_user, SET_ERROR } from "../../types/mutations.type";
import {URLS} from '@/common/config.js'

const state = {
  error: null,
  campaigns: [],
  editID: -1,
  keyword: ''
};

const getters = {
  urCampaignsStates(state) {
    return state
  }
};
const actions = {
  [act_user.campaigns.search](context, keyword) {
    
    return new Promise((resolve, reject) => {
      ApiService.query(URLS.user.campaigns, 
        {key:'query', query: context.state.keyword})
        .then(res => {
          if (res.msg) context.commit(SET_ERROR, res.msg)
          else if (res.data){
            context.commit(mut_user.campaigns.getall,  res.data);
          }
          resolve()
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },

  [act_user.campaigns.delete](context, id) {
    return new Promise((resolve, reject) => {
      ApiService.post(`${URLS.user.campaigns}/${id}/delete`)
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
  [mut_user.campaigns.getall](state, data) {
    state.campaigns = JSON.parse(data.data)
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};