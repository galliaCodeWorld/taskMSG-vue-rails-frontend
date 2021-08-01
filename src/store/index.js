import Vue from "vue";
import Vuex from "vuex";

import setting from './modules/setting.module'
import auth from "./modules/auth.module";
//admin------------------------------------
import adminGlobal from './modules/admin.module/global.module'
import adminUsers from './modules/admin.module/users.module'
import adminGroups from './modules/admin.module/groups.module'
import adminFields from './modules/admin.module/fields.module'
import adminTags from './modules/admin.module/tags.module'
import userLeads from './modules/user.module/leads.module'
import userCampaigns from './modules/user.module/campaigns.module'
import userAccounts from './modules/user.module/accounts.module'
import userContacts from './modules/user.module/contacts.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    setting,
    auth,
    adminGlobal,
    adminUsers,
    adminGroups,
    adminFields,
    adminTags,
    userLeads,
    userCampaigns,
    userAccounts,
    userContacts
  }
});