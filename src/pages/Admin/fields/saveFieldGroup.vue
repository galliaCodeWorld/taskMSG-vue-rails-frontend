<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form ref="sfg_form" @submit.prevent="handleSubmit(submit)">
      <div class="md-layout create-field-group mt-3">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
          <ValidationProvider
            name="label"
            rules="required|min:3"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label>label *</label>
              <md-input v-model="label" type="text"> </md-input>
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
          <ValidationProvider
            name="restrictbytag"
            rules="required|min:3"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label>Restrict by Tag</label>
              <md-input v-model="restrictbytag" type="text"> </md-input>
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
</template>

<script>
import { extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";

extend("required", required);
extend("min", min);

export default {
  name: 'create-field-group',
  data() {
    return {
      label: null,
      restrictbytag: null,
      saved: false,
      sending: false
    };
  },
  methods: {
    clearForm() {
      this.$refs.sfg_form.reset();
      this.label = null
      this.restrictbytag = null
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



        
