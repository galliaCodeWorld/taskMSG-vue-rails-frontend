<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-40 md-xsmall-size-100 md-size-30">
      <!-- <UserLeftDock /> -->
    </div>
    <div class="md-layout-item md-medium-size-60 md-xsmall-size-100 md-size-70 tasks">
      <stats-card header-color="">
        <template slot="header" style="padding-top: 10px">
          <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Leads</p>
          <p class="category create-lead" style="float: right; color: blue; font-weight: 700; padding-top: 5px;" @click="createTask" >Create Lead</p>
        </template>
        <template slot="footer">
          <div v-for="(lead,n) in urLeadsStates.leads" :key="'tag'+n" class="lead-info">
            <DetailLead :user="lead"/>
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
import { act_admin } from "@/store/types/actions.type";
// import EditUser from "./edit.vue";
import { StatsCard } from "@/components";
// import LeftDock from "../LeftDock.vue";
import DetailLead from "./detail.vue";

export default {
  name: 'tasks',
  computed: {
    ...mapGetters(["urLeadsStates"])
  },
  components: {
    StatsCard,
    DetailLead
    // UserLeftDock,
  },
  data() {
    return {
    };
  },
  methods: {
    createTask() {
      alert('view create form...');
    },
    download(ext) {
      switch(ext) {
        case '.xls': {

        }
        case '.csv': {

        }
        case '.rss': {

        }
        case '.atom': {

        }
        case '.perm': {

        }
      }
      alert('download- *'+ext)
    }
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
