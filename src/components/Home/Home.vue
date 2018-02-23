<template>
<div class="row">
  <div class="col-md-12 d-md-flex" v-if="$route.path!=='/home'">
    <app-header></app-header>
    <router-view></router-view>
  </div>

  <div class="main-links col-md-12 d-flex flex-column justify-content-center align-items-center" v-else>
    <router-link tag="button" :to="{ path:'/home/user'}" exact class="btn btn-success btn-large"><i class="fa fa-users fa-lg fa-fw" aria-hidden="true"></i> Manage Patients</router-link>
    <router-link tag="button" :to="{ path:'/home/stock'}" exact class="btn btn-success btn-large"><i class="fa fa-cubes fa-lg fa-fw" aria-hidden="true"></i> Manage Stock</router-link>
    <router-link tag="button" :to="{ path:'/home/reports'}" exact class="btn btn-success btn-large"><i class="fa fa-line-chart fa-fw fa-lg" aria-hidden="true"></i> Create Reports</router-link>
    <router-link tag="button" :to="{ path:'/logout'}" exact class="btn btn-success btn-large"><i class="fa fa-power-off fa-fw fa-lg" aria-hidden="true"></i> Logout</router-link>
  </div>

</div>
</template>

<script>
import Header from './Header.vue'
export default {
  components: {
    'app-header': Header
  }
}
</script>

<style scoped>
.row {
  height: 100vh;
  background: white;
}

.btn {
  padding: 1%;
  font-size: 1.25em;
  margin: 1% auto;
  width: 50%;
  cursor: pointer;
  font-family: avenir;
  letter-spacing: 1px;
}

@media (max-width:800px) {
  .btn {
    width: 90%;
    padding: 2% 5%;
  }
}
</style>
