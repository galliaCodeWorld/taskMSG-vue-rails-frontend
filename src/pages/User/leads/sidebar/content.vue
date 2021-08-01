<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" 
      v-for="(key, i) in Object.keys(contents)" :key="'ct-'+i"
    >
      <div class="d-flex justify-content-between align-baseline">
         <md-checkbox v-model="checks[i]" slot="check" style="margin: 5px 0;" @change="viewContent(key)">{{key}}</md-checkbox>
         <div class="pt-1">
           <md-badge 
            :md-content="contents[key]" 
            md-position="bottom"
            style="left: 90%; color: white; font-size: large; font-weight: 700;"
            :style="Number(contents[key]) ? 'background: orangred;' : 'background: gray;'"
          ></md-badge>
         </div>
      </div>
      <md-divider class="md-hr"></md-divider>
    </div>
  </div>
</template>

<script>

export default {
  name: 'lead-content',
  components: {
  },
  props: {
    pkey: {
      type: String,
      default: null
    },
    contents: {
      type: Object,
      default: () => {
        return {}
      }
    },
    checks: {
      type: Array,
      default: () => {
        return [false, false, false, false, false, false, false, false, false, false]
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    viewContent(key) {
      alert('view content '+key)
    }
  },
};
</script>
<style lang="scss">
  // .user-left-pannel-content {
    
  // }
</style>
