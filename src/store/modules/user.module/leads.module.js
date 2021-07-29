import ApiService from "@/common/api.service";
import { act_user } from "../../types/actions.type";
import { mut_user, SET_ERROR } from "../../types/mutations.type";
import {URLS} from '@/common/config.js'

const state = {
  error: null,
  leads: [],
  lead: {
    info: {},
    tasks: [],
    histories: [],
  },
  editID: -1,
  keyword: ''
};

const getters = {
  urLeadsStates(state) {
    return state
  }
};
const actions = {
  [act_user.leads.search](context, keyword) {
    return new Promise((resolve, reject) => {
      ApiService.query(URLS.user.leads, 
        {key:'query', query: context.state.keyword})
        .then(res => {
          if (res.msg) context.commit(SET_ERROR, res.msg)
          else if (res.data){
            context.commit(mut_user.leads.getall, {data: res.data});
          }
          resolve()
        })
        .catch(err => {
          context.commit(SET_ERROR, err.data.errors);
          reject(err)
        })
    })
  },
  ////////////////////////////// group //////////////////////////////////////////////////////////
  // [act_admin.fields.group.create](context, formData) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.post(URLS.admin.fields.groups, formData)
  //       .then(res => {
  //         if (res.msg) {
  //           context.commit(SET_ERROR, res.msg)
  //           resolve()
  //         } else if (res.data) {
  //           ApiService.query(URLS.admin.fields.groups, 
  //             {key:'klass_name', query: context.state.selectCatename})
  //             .then(reget => {
  //               if (reget.msg) context.commit(SET_ERROR, res.msg)
  //               else if (reget.data) 
  //                 context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
  //               resolve()
  //             })
  //             .catch(err => {
  //               context.commit(SET_ERROR, err.data.errors);
  //               reject(err)
  //             })
  //         }
  //       })
  //       .catch(err => {
  //         context.commit(SET_ERROR, err.data.errors);
  //         reject(err)
  //       })
  //   })
  // },
  // [act_admin.fields.group.update](context, {id, formData}) { 
  //   return new Promise((resolve, reject) => {
  //     ApiService.post(`${URLS.admin.fields.groups}/${id}`, formData)
  //       .then(res => {
  //         if (res.msg) {
  //           context.commit(SET_ERROR, res.msg)
  //           resolve()
  //         } else if (res.data) {
  //           ApiService.query(URLS.admin.fields.groups, 
  //             {key:'klass_name', query: context.state.selectCatename})
  //             .then(reget => {
  //               if (reget.msg) context.commit(SET_ERROR, res.msg)
  //               else if (reget.data) 
  //                 context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
  //               resolve()
  //             })
  //             .catch(err => {
  //               context.commit(SET_ERROR, err.data.errors);
  //               reject(err)
  //             })
  //         }
  //       })
  //       .catch(err => {
  //         context.commit(SET_ERROR, err.data.errors);
  //         reject(err)
  //       })
  //   })
  // },
  // [act_admin.fields.group.delete](context, id) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.post(`${URLS.admin.fields.groups}/${id}/delete`)
  //       .then(res => {
  //         if (res.msg) {
  //           context.commit(SET_ERROR, res.msg)
  //           resolve()
  //         } else if (res.data) {
  //           ApiService.query(URLS.admin.fields.groups, 
  //             {key:'klass_name', query: context.state.selectCatename})
  //             .then(reget => {
  //               if (reget.msg) context.commit(SET_ERROR, res.msg)
  //               else if (reget.data) 
  //                 context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
  //               resolve()
  //             })
  //             .catch(err => {
  //               context.commit(SET_ERROR, err.data.errors);
  //               reject(err)
  //             })
  //         }
  //       })
  //       .catch(err => {
  //         context.commit(SET_ERROR, err.data.errors);
  //         reject(err)
  //       })
  //   })
  // },
  // //////////////////////////////////// field ///////////////////////////////////////////////////////////
  // [act_admin.fields.field.create](context, formData) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.post(URLS.admin.fields.field, formData)
  //       .then(res => {
  //         if (res.msg) {
  //           context.commit(SET_ERROR, res.msg)
  //           resolve()
  //         } else if (res.data) {
  //           ApiService.query(URLS.admin.fields.groups, 
  //             {key:'klass_name', query: context.state.selectCatename})
  //             .then(reget => {
  //               if (reget.msg) context.commit(SET_ERROR, res.msg)
  //               else if (reget.data) 
  //                 context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
  //               resolve()
  //             })
  //             .catch(err => {
  //               context.commit(SET_ERROR, err.data.errors);
  //               reject(err)
  //             })
  //         }
  //       })
  //       .catch(err => {
  //         context.commit(SET_ERROR, err.data.errors);
  //         reject(err)
  //       })
  //   })
  // },
  // [act_admin.fields.field.update](context, {id, formData}) { 
  //   return new Promise((resolve, reject) => {
  //     ApiService.post(`${URLS.admin.fields.field}/${id}`, formData)
  //       .then(res => {
  //         if (res.msg) {
  //           context.commit(SET_ERROR, res.msg)
  //           resolve()
  //         } else if (res.data) {
  //           ApiService.query(URLS.admin.fields.groups, 
  //             {key:'klass_name', query: context.state.selectCatename})
  //             .then(reget => {
  //               if (reget.msg) context.commit(SET_ERROR, res.msg)
  //               else if (reget.data) 
  //                 context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
  //               resolve()
  //             })
  //             .catch(err => {
  //               context.commit(SET_ERROR, err.data.errors);
  //               reject(err)
  //             })
  //         }
  //       })
  //       .catch(err => {
  //         context.commit(SET_ERROR, err.data.errors);
  //         reject(err)
  //       })
  //   })
  // },
  // [act_admin.fields.field.delete](context, id) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.post(`${URLS.admin.fields.field}/${id}/delete`)
  //       .then(res => {
  //         if (res.msg) {
  //           context.commit(SET_ERROR, res.msg)
  //           resolve()
  //         } else if (res.data) {
  //           ApiService.query(URLS.admin.fields.groups, 
  //             {key:'klass_name', query: context.state.selectCatename})
  //             .then(reget => {
  //               if (reget.msg) context.commit(SET_ERROR, res.msg)
  //               else if (reget.data) 
  //                 context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
  //               resolve()
  //             })
  //             .catch(err => {
  //               context.commit(SET_ERROR, err.data.errors);
  //               reject(err)
  //             })
  //         }
  //       })
  //       .catch(err => {
  //         context.commit(SET_ERROR, err.data.errors);
  //         reject(err)
  //       })
  //   })
  // },
  // /////////////////// none change state && only API //////////////////
  // [act_admin.fields.selectCatename](context, catename) {
  //   context.commit(mut_admin.fields.selectCatename, catename)
  // },
  // [act_admin.fields.setCEGroupID](context, id) {
  //   context.commit(mut_admin.fields.setCEGroupID, id)
  // },
  // [act_admin.fields.setCEFieldData](context, data) {
  //   context.commit(mut_admin.fields.setCEFieldData, data)
  // }
  // //////////////////////////////////////////////////////////////////////
};

const mutations = {
  [SET_ERROR](state, error) {
    state.error = error;
  },
  [mut_user.leads.getall](state, data) {
    state.users = data
  },
  // [mut_admin.fields.setCEGroupID](state, id) {
  //   state.ceGroupID = id
  // },
  // [mut_admin.fields.setCEFieldData](state, data) {
  //   if (data.add) {
  //     if (state.ceFieldData[data.gid]) {
  //       let key = Object.keys(data.add)
  //       state.ceFieldData[data.gid][key[0]] = Object.values(data.add[0])
  //     } else Object.assign(state.ceFieldData, {[data.gid]: data.add})
  //   } else if (data.del) {
  //     delete state.ceFieldData[data.gid][data.del]
  //     if (!Object.keys(state.ceFieldData[data.gid]).length) delete state.ceFieldData[data.gid]
  //   }
  //   console.log(data, state.ceFieldData)
  // },
  // [mut_admin.fields.setCategories](state, {catename, data}) {
  //   state.categories[catename] = data
  // },
};

export default {
  state,
  actions,
  mutations,
  getters
};