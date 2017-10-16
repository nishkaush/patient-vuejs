<template>
<div class="col-md-10 col-sm-12">
  <h3 class="pt-5">Manage Patients</h3>
  <hr class="mt-0 mb-0 pt-0 pb-0">
  <ul class="nav nav-tabs pt-3">
    <li class="nav-item">
      <a @click="isVisible=false" class="nav-link" :class="{activeTab:!isVisible}" href="#"><i class="fa fa-search fa-md fa-fw" aria-hidden="true"></i> Search Patients</a>
    </li>
    <li class="nav-item">
      <a @click="isVisible=true" class="nav-link" href="#" :class="{activeTab:isVisible}"><i class="fa fa-plus fa-md fa-fw" aria-hidden="true" active-class="active"></i> Add New</a>
    </li>
  </ul>
  <transition-group enter-active-class="animated fadeIn">
    <usersearch v-show="isVisible===false" key="1"></usersearch>
    <useradd v-show="isVisible" key="2"></useradd>
  </transition-group>
</div>
</template>

<script>
import UserSearch from './UserSearch/UserSearch.vue'
import UserAdd from './UserAdd.vue'
export default {
  data() {
    return {
      isVisible: false
    }
  },
  components: {
    usersearch: UserSearch,
    useradd: UserAdd
  }
}
</script>

<style scoped>
.col-md-10 {
  padding-left: 2%;
}

.nav-link {
  color: black;
  font-family: avenir;
  padding: auto 2%;
  border: 1px solid #dedede;
  opacity: 0.7;
}

.activeTab {
  background: green;
  transition: background 0.3s;
  color: white;
  opacity: 1;
}
</style>
