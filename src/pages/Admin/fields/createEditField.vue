<template>
  <div class="create-edit-field" v-if="openModal">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form ref="cf_form" :class="toggleOutline ? 'new-field' : 'edit-field'"
      @submit.prevent="handleSubmit(submit)">
        <div class="md-layout">
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="label"
              rules="required|min:3"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label>Label:</label>
                <md-input name='label' v-model="data.label" type="text"></md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="as"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
                <multiselect 
                  name="as"
                  v-model="data.as" 
                  placeholder="Select type..."
                  :multiple="false" :taggable="true" 
                  :options="Object.keys(fieldAs)" 
                >
                </multiselect>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="minlen"
              rules="required|digits|between:0,100000"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label>MinLength:</label>
                <md-input name='minlen' v-model="data.minlength" type="number"></md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="maxlen"
              rules="required|digits|between:0, 100000"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label>MinLength:</label>
                <md-input name='maxlen' v-model="data.maxlength" type="number"></md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <br />
          <div class="md-layout">
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50 float-left">
              <md-button type="submit" class="md-success w-100">Create/Edit user</md-button>
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50 float-right">
              <md-button class="md-primary" :disabled="sending" @click="cancel">Cancel</md-button>
            </div>
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
import { extend, Validator } from "vee-validate";
import { required, min, max, digits, between } from "vee-validate/dist/rules";

extend("required", required);
extend("min", min);
extend('max', max);
extend('digits', digits);
extend('between', between);
extend('is_small', {
    validate: (value, {compare}) => {
        return value < compare
    },
    params: ['compare'],
    message: value+'>='+compare
});
extend('is_big', {
    validate: (value, {compare}) => {
        return value > compare
    },
    params: ['compare'],
    message: value+'<='+compare
});


export default {
  name: 'create-edit-field',
  props: {
    openModal: {
      type: Boolean,
      default: false
    },
    filed: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(["adFieldsStates"]),
    wOpenModal: props => props.openModal,
  },
  mounted() {
    
  },
  watch: {
    wOpenModal(newValue, oldValue) {
      if (newValue) {
        this.toggleOutline = this.$props.filed.id === 'new' ? true : false
        this.data = this.$props.filed
        let inx = Object.values(this.fieldAs).indexOf(this.data.as)
        if (inx > -1) this.data.as = Object.keys(this.fieldAs)[inx]
        else delete this.data.as
      }
    },
  },
  data() {
    return {
      toggleOutline: false,
      fieldAs: ADMIN_FIELD_AS,
      data: {},
      saved: false,
      sending: false
    };
  },
  methods: {
    clearForm() {
      this.$refs.cf_form.reset();
      this.data = {}
      this.saved = false
      this.sending = false
    },
    saveUser() {
      var _this = this
      this.sending = true
      // Instead of this timeout, here you can call your API
      window.setTimeout(function() {
        _this.$emit('closeCEFieldModal')
        _this.clearForm()
      }, 1500)
    },
    submit() {
      this.saveUser();
    },
    cancel() {
      this.$emit('closeCEFieldModal')
      this.clearForm()
    }
  }
};
</script>
<style lang="scss">
  .create-edit-field {
    .new-field {
      outline: solid 2px green;
    }
    .edit-field {
      outline: dashed 1px darkgrey
    }
    .md-progress-bar {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
    }
  }
</style>



        
