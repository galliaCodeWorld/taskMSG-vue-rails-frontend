<template>
  <md-toolbar
    md-elevation="4"
    class="md-dense md-fixed-top mb-2"
    style="hright: 20px;"
  >
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <fixed-plugin
          :color.sync="sidebarBackground"
          :colorBg.sync="sidebarBackgroundColor"
          :sidebarMini.sync="sidebarMini"
          :sidebarImg.sync="sidebarImg"
          :image.sync="sidebarBackgroundImage"
        >
        </fixed-plugin>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <div v-for="(item, n) in navItems" :key="'item-'+n">
            <md-list-item :href="item.href">
              <i :class="item.icon.class">{{item.icon.name}}</i>
              <p :class="item.title.class">{{item.title.name}}</p>
            </md-list-item>
          </div>
          <drop-down direction="down">
            <md-button
              slot="title"
              class="md-button md-simple"
              data-toggle="dropdown"
            >
              <div class="photo" style="padding: 0;">
                <img :src="avatar" alt="avatar" style="width: 40px;" />
              </div>
            </md-button>
            <ul class="dropdown-menu dropdown-menu-right">
              <li><a href="#" class="md-black" style="font-size: 12px; font-weight: 600;">Admin/User</a></li>
              <li><a href="#/pages/user" class="md-black" style="font-size: 12px; font-weight: 600;">Profile</a></li>
              <li><a href="#" class="md-black" style="font-size: 12px; font-weight: 600;">logout</a></li>
            </ul>
          </drop-down>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import FixedPlugin from "../../FixedPlugin.vue";
import { items } from "./TopBarItems";
import {THEME_SETTING} from '@/common/config.js'

function getThemeSetting() {
  let cur = window.localStorage.getItem('theme_setting')
  cur = cur ? JSON.parse(cur) : THEME_SETTING
  return cur
}
export default {
  props: {
    avatar: {
      type: String,
      default: "./img/faces/avatar.jpg"
    },
    account: {
      type: Object,
      default: () => {
        return {admin: 1}
      },
    },
  },
  computed: {
    ...mapGetters(["settingState"]),
  },
  components: {
    FixedPlugin,
  },
  beforeMount() {
    // this.navItems = this.$props.account.admin ? items.admin : items.user
    this.navItems = this.$props.account.admin ? items.user : items.admin
  },
  beforeUpdate() {
    // this.navItems = this.$props.account.admin ? items.admin : items.user
    this.navItems = this.$props.account.admin ? items.user : items.admin
  },
  data() {
    return {
      navItems: [],
      sidebarBackgroundColor: "black",
      sidebarBackground: "green",
      sidebarBackgroundImage: "./img/sidebar-2.jpg",
      sidebarMini: true,
      sidebarImg: true
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  }
};
</script>
<style lang='scss'>
  .md-button:not(.md-just-icon):not(.md-btn-fab):not(.md-icon-button):not(.md-toolbar-toggle) .md-ripple {
    padding: 0px 20px;
  }
  .md-toolbar.md-dense {
    min-height: 40px;
    max-height: 40px;
  }
</style>
