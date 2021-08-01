<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-40 md-xsmall-size-100 md-size-30">
      <!-- <UserLeftDock /> -->
    </div>
    <div class="md-layout-item md-medium-size-60 md-xsmall-size-100 md-size-70 tasks">
      <stats-card header-color="">
        <template slot="header" style="padding-top: 10px">
          <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Contacts</p>
          <p class="category create-contact" style="float: right; color: blue; font-weight: 700; padding-top: 5px;" @click="createcontact" >Create contact</p>
        </template>
        
        <template slot="footer">
          <div v-for="(contact,n) in urContactsStates.contacts" :key="'tag'+n" class="contact-info">
            <DetailContact :contact="contact"/>
            <md-divider class="md-hr md-theme-demo-light" />
          </div>
        </template>
      </stats-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { act_user } from "@/store/types/actions.type";
// import EditUser from "./edit.vue";
import { StatsCard } from "@/components";
// import LeftDock from "../LeftDock.vue";
import DetailContact from "./detail.vue";

export default {
  name: 'contacts',
  computed: {
    ...mapGetters(["urContactsStates"])
  },
  components: {
    StatsCard,
    DetailContact
    // UserLeftDock,
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(act_user.contacts.search),
    ]).then(() => {
      next();
    });
  },
  data() {
    return {
    };
  },
  methods: {
    createcontact() {
      alert('view create form...');
    },
  }
};
</script>
<style lang="scss">
  .tasks {
    .md-card-header {
      padding: 0;
    }
    .md-card-tabs .md-list .md-list-item .md-list-item-button .md-list-item-content {
      padding: 0;
    }
    .tab-content {
      display: inline;
    }
    .create-task:hover {
      cursor: pointer;
    }
  }
</style>
