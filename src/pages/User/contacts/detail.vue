<template>
  <div class="contact-detail md-layout d-flex justify-content-between align-baseline pt-1 pb-1" @mouseover="btToggle = true" @mouseleave="btToggle = false">
    <div class="d-flex justify-content-between align-baselne">
      <div class="d-flex justify-content-between align-baselne">
        <img src="/img/default-avatar.png" style="width:50px; height:50px" />
      </div>
      <div class="d-flex justify-content-left align-baselne">
        <div class="row d-flex strip">
          <a :href="server_url+'/users/'+contact.id" v-html="fullUserName" style="float:left" />
          <small v-html="contact.title" style="padding-left: 3px;" />
          <small v-html="contact.email" style="padding-left: 3px;" />
          <small v-html="contact.mobile" style="padding-left: 3px;" />
          <small v-html="contact.phone" style="padding-left: 3px;"  />
          <!-- <strong>{{getStatus(contact.status)}}</strong> -->
        </div>
        <div class= "row detail" style="padding-left: 10px;">
          <span class="d-flex justify-content-left"> 
            <a :href="server_url+'entities/contact/'+contact.id" v-html="contact.name" />
            <small v-html="contact.company" style="padding-left: 3px;" />
          </span>
        </div>
      </div>
    </div>
    <div class="md-group h-75" :style="btToggle ? 'visibility: visible;' : 'visibility: hidden;'">
      <md-button class="md-primary" @click="loadForm">Edit</md-button>
      <md-button class="md-danger" @click="delcontact">Delete?</md-button>
    </div>
  </div>
  
</template>

<script>
import store from "@/store";
import { act_user } from "@/store/types/actions.type";
import { SERVER_URL } from "@/common/config";
import Swal from "sweetalert2";
// import Convertcontact from "./convert.vue"
export default {
  name: "detail-contact",
  props: {
    contact: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    // Convertcontact,
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
    loadForm(){
      alert("loadForm ... ");
    },
    delcontact() {
      let name = JSON.stringify(this.$props.contact.first_name)
      Swal.fire({
        title: 'Are you sure?',
        text: `Not be able to recover ${name}!`,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          Promise.all([ 
            store.dispatch(act_user.contacts.delete, this.$props.contact.id),
          ]).then(() => {
            Promise.all([
              store.dispatch(act_user.contacts.search),
            ]).then(() => {
              this.notifyVue({m: `Deleted ${name}!`, c: 'success'})
            }).catch(err => {
              this.notifyVue({t: 2500, m: `Failed to Delete ${fullUserName}...`, c: 'warning', v: 'top', h: 'left'})
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
      let data = this.$props.contact
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
  .contact-detail:hover {
    background: #efefef;;
  }
  .contact-detail {
    .strip {
      width: auto;
      color: black;
      float: left;
      font-size: 14px;
      margin: 0px 6px 0px 0px;
      padding: 1px 4px 1px 3px;
      text-align: left;
    }
  }
  // a:hover, a:focus {
  //     color: blue;
  //   }
</style>

