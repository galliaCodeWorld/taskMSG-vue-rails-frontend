<template>
  <div v-if="false">
  <md-button @click='test'>test</md-button>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form ref="cf_form" @submit.prevent="handleSubmit(submit)">
        <div class="md-layout create-field mt-3">
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="label"
              rules="required|min:3"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label>Label *</label>
                <md-input v-model="label" type="text"> </md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="fieldtype"
              rules="required|min: 3"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label>Field Type *</label>
                <md-input v-model="fieldtype" type="text"> </md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <md-button type="submit" class="md-success w-100">Create/Edit user</md-button>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <md-button class="md-danger" :disabled="sending">Cancel</md-button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {ADMIN_FIELD_AS, AF_FORM_HIDDEN} from '@/common/config.js'
import store from "@/store";
import { mapState, mapGetters} from "vuex"
import { act_admin } from "@/store/types/actions.type";
import { extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";

extend("required", required);
extend("min", min);

export default {
  name: 'create-field',
  props: {
    gid: {
      type: String,
      default: null
    },
    fid: {
      type: String,
      default: null
    }
  },
  computed: mapState({
    ...mapGetters(["adFieldsStates"]),
    ceFieldData: state => state.adminFields
  }),
  watch: {
    ceFieldData(newValue, oldValue) {
      console.log(newValue, oldValue)
      // let seed = store.getters.adFieldsStates.ceFieldData
      // let gid = Object.keys(seed).find(k => String(k) === String(this.$props.group.id))
      // if (gid) newKey = Object.keys(seed[gid]).find(k => k === 'new')
      // let gid = Object.keys(newValue).find(gid => String(gid) === this.$props.gid)
      // gid ? this.toggle = true : this.toggle = false
    }
  },
  data() {
    return {
      toggle: false,
      label: null,
      fieldtype: null,
      saved: false,
      sending: false
    };
  },
  methods: {
    test() {
      let find = Object.keys(store.getters.adFieldsStates.ceFieldData).find(k => String(k) === this.$props.gid)
      return find ? true : false
    },
    clearForm() {
      this.$refs.cf_form.reset();
      this.label = null
      this.fieldtype = null
      this.saved = false
    },
    saveUser() {
      var _this = this
      this.sending = true
      // Instead of this timeout, here you can call your API
      window.setTimeout(function() {
        _this.saved = true
        _this.sending = false
        _this.clearForm()
      }, 1500)
    },
    submit() {
      this.saveUser();
    }
  }
};
</script>
<style lang="scss">
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>



        
