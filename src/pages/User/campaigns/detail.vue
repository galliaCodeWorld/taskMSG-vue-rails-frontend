<template>
  <div class="campaign-detail md-layout d-flex justify-content-between align-baseline pt-1 pb-1" @mouseover="btToggle = true" @mouseleave="btToggle = false">
    <div class="d-flex justify-content-between align-baselne">
      <div class="strip" style="width: 100px;"
        :style="getStyle(campaign.status)" >
        <strong>{{getStatus(campaign.status)}}</strong>
      </div>
      <div style="padding-left: 10px;">
        <span class="d-flex">
          <a :href="server_url+'entities/campaign/'+campaign.id" v-html="campaign.name" />
          <small v-html="campaign.company" style="padding-left: 3px;" />
        </span>
      </div>
    </div>
    <div class="md-group h-75" :style="btToggle ? 'visibility: visible;' : 'visibility: hidden;'">
      <md-button class="md-primary" @click="loadForm">Edit</md-button>
      <md-button class="md-danger" @click="delcampaign">Delete?</md-button>
    </div>
  </div>
  
</template>

<script>
import store from "@/store";
import { act_user } from "@/store/types/actions.type";
import { SERVER_URL } from "@/common/config";
import Swal from "sweetalert2";
// import Convertcampaign from "./convert.vue"
export default {
  name: "detail-campaign",
  props: {
    campaign: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    // Convertcampaign,
  },
  data() {
    return {
      server_url: SERVER_URL,
      btToggle: false,
      convertToggle: false
    };
  },
  methods: {
    notifyVue({t, m, i, v, h, c}) {
      this.$notify({
        timeout: t || 2000,
        message: m || '',
        icon: i || "add_alert",
        horizontalAlign: h || 'center',
        verticalAlign: v || 'bottom',
        type: c
      });
    },
    getStyle(status){
      switch (status){
        case 'called_off': return 'background: OrangeRed'
        case 'completed' : return 'background: Lime'
        case 'planned' : return 'background : Gold'
        case 'on_hold' : return 'background: Orchid'
        case 'started' : return 'background: Turquoise'
      }
    },
    getStatus(status){
      switch (status){
        case 'called_off': return 'Call Off'
        case 'completed' : return 'Completed'
        case 'planned' : return 'Planed'
        case 'on_hold' : return 'On Hold'
        case 'started' : return 'Started'
      }
    },
    loadForm(){
      alert("loadForm ... ");
    },
    delcampaign() {
      let name = JSON.stringify(this.$props.campaign.name)
      Swal.fire({
        title: 'Are you sure?',
        text: `Not be able to recover ${name}!`,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          Promise.all([ 
            store.dispatch(act_user.campaigns.delete, this.$props.campaign.id),
          ]).then(() => {
            Promise.all([
              store.dispatch(act_user.campaigns.search),
            ]).then(() => {
              this.notifyVue({m: `Deleted ${name}!`, c: 'success'})
            }).catch(err => {
              this.notifyVue({t: 2500, m: `Failed to Delete ${name}...`, c: 'warning', v: 'top', h: 'left'})
            })
          }).catch(err=> {
            this.notifyVue({t: 2500, m: `Failed to Delete ${name}...`, c: 'warning', v: 'top', h: 'left'})
          })
        }
      })
    },
  },
  computed: {
    fullUserName() {
      let data = this.$props.campaign
      let temp = ''
      if (data.first_name && data.last_name) {
        if (data.first_name) temp += data.first_name
        if (data.last_name) temp.length ? temp += ` ${data.last_name}` : temp = data.last_name
      } else temp = data.email
      return temp
    }
  }
};
</script>
<style lang="scss">
  .campaign-detail:hover {
    background: #efefef;;
  }
  .campaign-detail {
    .strip {
      height: 20px;
      width: auto;
      background: #dcdcdc;
      color: black;
      float: left;
      font-size: 11px;
      margin: 0px 6px 0px 0px;
      padding: 1px 4px 1px 3px;
      text-align: right;
      width: 75px;
      -moz-border-radius-topleft: 7px;
      -moz-border-radius-bottomleft: 7px;
      -webkit-border-top-left-radius: 7px;
      -webkit-border-bottom-left-radius: 7px;
    }
  }
  // a:hover, a:focus {
  //     color: blue;
  //   }
</style>

