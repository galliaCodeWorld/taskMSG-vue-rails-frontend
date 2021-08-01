<template>
  <div class='lead-bar'>
    <md-card>
      <md-card-content class="user-pannels">
        <LeadPannel :pannels="pannels"/>
      </md-card-content>
    </md-card>
    <md-card>
      <md-card-header>
        <p class="category" style="float: left; color: blue; font-weight: 700;">Global lists</p>
      </md-card-header>
      <md-card-content class="user-pannels">
      </md-card-content>
    </md-card>
    <md-card>
      <md-card-header>
        <p class="category" style="float: left; color: blue; font-weight: 700;">My lists</p>
      </md-card-header>
      <md-card-content class="user-pannels">
      </md-card-content>
    </md-card>
    <md-card>
      <md-card-header>
        <p class="category" style="float: left; color: blue; font-weight: 700;">My lists</p>
      </md-card-header>
      <md-card-content class="user-pannels">
      </md-card-content>
    </md-card>
    <md-card>
      <md-card-header>
        <p class="category" style="float: left; color: blue; font-weight: 700;">Recent Items</p>
      </md-card-header>
      <md-card-content class="user-pannels">
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
  import LeadPannel from './pannel.vue'
  export default {
    name: "lead-bar",
    components: {
      LeadPannel
    },
    props: {
      pannels: {
        type: Object,
        default: () => {
          return {
            'Pending': {
              'Overdue': 0,
              'ASAP': 0,
              'Today': 0,
              'This week': 0,
              'Next week': 0,
              'Sometime Later': 0
            },
            'Assigned': {
              'Overdue': 8,
              'ASAP': 4,
              'Today': 0,
              'This Week': 0,
              'Next Week': 0,
              'Sometime Later': 0
            },
            'Completed': {
              'Today': 0,
              'Yesterday': 0,
              'Last week': 0,
              'This month': 0,
              'Last month': 0
            }
          }
        }
      }
    },
    data() {
      return {
      };
    }
  };
</script>
<style lang="scss">
  .md-card .md-card-header {
    padding: 0;
  }
  .md-card-header {
    padding: 0;
  }
  .md-card .md-card-content {
    padding: 0;
  }
  .md-card-content:last-of-type {
    padding-bottom: 5px;
  }
  .md-card-content {
    padding: 0;
  }
  .md-card-tabs .md-list .md-list-item .md-list-item-button {
    line-height: 8px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    color: #3c4858 !important;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    border-radius: 30px;
    padding: 0;
  }
  .lead-bar {
    .user-pannels {
      .md-card .md-card-header {
        padding: 0;
      }
      .md-card-header {
        padding: 0;
      }
      .md-card .md-card-content {
        padding: 0;
      }
      .md-card-content:last-of-type {
        padding-bottom: 5px;
      }
      .md-card-content {
        padding: 0;
      }
    }
    p {
      margin: 0;
    }
  }
</style>
