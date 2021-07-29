<template>
  <div class='user-left-dock'>
    <stats-card header-color="" class="user-pannels">
      <template slot="footer">
        <UserLeftPannel :pannels="pannels"/>
        <!-- <UserLeftPannel /> -->
      </template>
    </stats-card>
    <stats-card header-color="">
      <template slot="header">
        <p class="category" style="float: left; color: blue; font-weight: 700;">Global lists</p>
      </template>
      <template slot="footer">
        <p>No saved lists</p>
      </template>
    </stats-card>
    <stats-card header-color="">
      <template slot="header">
        <p class="category" style="float: left; color: blue; font-weight: 700;">My lists</p>
      </template>
      <template slot="footer">
        <p>No saved lists</p>
      </template>
    </stats-card>
    <stats-card header-color="">
      <template slot="header">
        <p class="category" style="float: left; color: blue; font-weight: 700;">Recent Items</p>
      </template>
      <template slot="footer">
        <p>map.((item, i)=> {iterature...})</p>
      </template>
    </stats-card>
  </div>
</template>
<script>
  import { StatsCard } from "@/components";
  import UserLeftPannel from './pannel.vue'
  export default {
    name: "user-left-dock",
    components: {
      StatsCard,
      UserLeftPannel
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
  .user-left-dock {
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
      .md-card-content {
        padding: 0;
      }
    }
    // .md-card-stats .md-card-header + .md-card-actions {
    //   margin-top: 0;
    //   display: inline;
    // }
    p {
      margin: 0;
    }
  }
</style>
