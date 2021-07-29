<template>
  <tabs
    :tab-name="Object.keys(pannels)"
    color-button="defult"
    class='user-left-tabs'
    style="box-shadow: none; margin: 0;"
  >
    <template v-for="n in Number(Object.keys(pannels).length)" :slot="'tab-pane-'+n">
      <div :key="'pane-'+n">
        <UserLpContent 
          :pkey="Object.keys(pannels)[n-1]"
          :contents="pannels[Object.keys(pannels)[n-1]]" 
        />
      </div>
    </template>
  </tabs>
</template>

<script>
import { Tabs } from "@/components";
import UserLpContent from './content.vue'

export default {
  name: 'user-left-pannel',
  components: {
    Tabs,
    UserLpContent,
  },
  props: {
    pannels: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">
  .user-left-tabs {
    .tab-content {
      display: inline;
    }
  }
  .md-card-tabs .md-list .md-list-item .md-list-item-button {
    line-height: 0;
  }
  .md-card-tabs .md-list {
    padding: 0;
  }
</style>
