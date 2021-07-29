<template>
  <div class="d-flex fields-field" >
    <h6 style="margin-bottom: 0; padding-top: 3px; color: black" v-html="field.label" />
    <strong style="padding: 0 3px;" v-html="checkAs(field.as)" />
    <small v-html="createTime(field.created_at)" />
  </div>
</template>

<script>
  import {ADMIN_FIELD_AS} from '@/common/config.js'
  import store from "@/store";
  import { mapState, mapGetters} from "vuex"
  import { act_admin } from "@/store/types/actions.type";

  export default {
    name: 'fields-field',
    props: {
      field: {
        type: Object,
        default: () => {
          return {fields: []}
        }
      }
    },
    data() {
      return {
      };
    },
    methods: {
      checkTime(gap, str) {
        let reStr = gap > 1 ? `${str}s` : str
        return gap > 0 ? `added about ${gap} ${reStr} ago` : null
      },
      checkAs(as) {
        let inx = Object.values(ADMIN_FIELD_AS).indexOf(as)
        return inx > -1 ? `( ${Object.keys(ADMIN_FIELD_AS)[inx]} )` : null
      },
      createTime(time) {
        let create = new Date(time)
        let now  = new Date()
        let str = this.checkTime(now.getFullYear() - create.getFullYear(), 'year')
        if (str) return str
        else {
          str = this.checkTime(now.getMonth() - create.getMonth(), 'month')
          if (str) return str
          else {
            str = this.checkTime(now.getDate() - create.getDate(), 'day')
            if (str) return str
            else {
              str = this.checkTime(now.getHours() - create.getHours(), 'hour')
              if (str) return str
              else {
                str = this.checkTime(now.getMinutes() - create.getMinutes(), 'min')
                return str ? str : `added about secs ago`
              }
            }
          }
        }
      }
    },
  };
</script>
<style lang="scss">
</style>
