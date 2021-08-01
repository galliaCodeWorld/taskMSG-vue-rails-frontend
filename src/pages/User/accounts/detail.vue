<template>
  <div class="account-detail md-layout d-flex justify-content-between align-baseline pt-1 pb-1" @mouseover="btToggle = true" @mouseleave="btToggle = false">
    <div class="d-flex justify-content-between align-baselne">
      <div class="strip" style="width: 100px;"
        :style="getStyle(account.category)" >
        <strong>{{getStatus(account.category)}}</strong>
      </div>
      <div style="padding-left: 10px;">
        <span class="d-flex">
          <a class="break" :href="server_url+'entities/account/'+account.id" v-html="account.name" /><br>
          <small v-html="account.company" style="padding-left: 3px;" />
          <star-rating :star-size="12" :show-rating="false" :read-only="true" :raiting="account.rating" v-bind:increment="0.5"
             v-bind:max-rating="5"
             inactive-color="#000"
             active-color="#f00"></star-rating>
          <small v-html="account.website" style="padding-left: 3px;" />
          <small v-html="account.email" style="padding-left: 3px;" />
          <small v-html="account.phone" style="padding-left: 3px;" />
        </span>
      </div>
    </div>
    <div class="md-group h-75" :style="btToggle ? 'visibility: visible;' : 'visibility: hidden;'">
      <md-button class="md-primary" @click="loadForm">Edit</md-button>
      <md-button class="md-danger" @click="delaccount">Delete?</md-button>
    </div>
  </div>
  
</template>

<script>
import store from "@/store";
import { act_user } from "@/store/types/actions.type";
import { SERVER_URL } from "@/common/config";
import StarRating from 'vue-star-rating'
import Swal from "sweetalert2";
// import Convertaccount from "./convert.vue"
export default {
  name: "detail-account",
  props: {
    account: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    StarRating
    // Convertaccount,
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
    getStyle(category){
      switch (category){
        case 'competitor': return 'background: paleturquoise'
        case 'affiliate' : return 'background: lavender'
        case 'customer' : return 'background : pink'
        case 'vendor' : return 'background: skyblue'
        case 'reseller' : return 'background: thistle'
        case 'partner' : return 'background: bisque'
        case '' : return 'background: Turquoise'
      }
    },
    getStatus(category){
      if (!category){
        category = 'other'
      }
      return category.charAt(0).toUpperCase() + category.slice(1);
    },
    loadForm(){
      alert("loadForm ... ");
    },
    delaccount() {
      let name = JSON.stringify(this.$props.account.name)
      Swal.fire({
        title: 'Are you sure?',
        text: `Not be able to recover ${name}!`,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          Promise.all([ 
            store.dispatch(act_user.accounts.delete, this.$props.account.id),
          ]).then(() => {
            Promise.all([
              store.dispatch(act_user.accounts.search),
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
      let data = this.$props.account
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
  .account-detail:hover {
    background: #efefef;;
  }
  .account-detail {
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

