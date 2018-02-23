<template>
<div class="">
  <div class="d-md-none d-sm-12" @click="hideMenu=!hideMenu">
    <i class="fa fa-bars fa-fw fa-2x p-3" aria-hidden="true"></i>
  </div>
  <div class="d-flex d-md-none flex-column justify-content-center" v-if="hideMenu===false">

    <router-link tag="div" :to="{ path:'/home'}" class="btn btn-outline-success btn-md" active-class="active" exact @click="hideMenu=true"><i class="fa fa-home fa-lg fa-fw" aria-hidden="true"></i> Back To Home</router-link>

    <router-link tag="div" :to="{ path:'/home/user'}" class="btn btn-outline-success btn-md" active-class="active" exact @click.native="hideMenu=true"><i class="fa fa-users fa-sm fa-fw" aria-hidden="true"></i> Manage Patients</router-link>

    <router-link tag="div" :to="{ path:'/home/stock'}" class="btn btn-outline-success btn-md" active-class="active" exact @click.native="hideMenu=true"><i class="fa fa-cubes fa-lg fa-fw" aria-hidden="true"></i> Manage Stock</router-link>

    <router-link tag="div" :to="{ path:'/home/reports'}" class="btn btn-outline-success btn-md" active-class="active" exact @click.native="hideMenu=true"><i class="fa fa-line-chart fa-fw fa-lg" aria-hidden="true"></i> Create Reports</router-link>

    <router-link tag="div" :to="{ path:'/logout'}" class="btn btn-outline-success btn-md" active-class="active" exact><i class="fa fa-power-off fa-fw fa-lg" aria-hidden="true"></i> Logout</router-link>
  </div>

  <!-- menu for larger screens -->
  <div class="d-none d-md-flex col-md-12 flex-column justify-content-center p-3">
    <router-link tag="div" :to="{ path:'/home'}" class="btn btn-outline-success btn-md" active-class="active" exact><i class="fa fa-home fa-lg fa-fw" aria-hidden="true"></i> Back To Home</router-link>
    <router-link tag="div" :to="{ path:'/home/user'}" class="btn btn-outline-success btn-md" active-class="active" exact><i class="fa fa-users fa-lg fa-fw" aria-hidden="true"></i> Manage Patients</router-link>
    <router-link tag="div" :to="{ path:'/home/stock'}" class="btn btn-outline-success btn-md" active-class="active" exact><i class="fa fa-cubes fa-lg fa-fw" aria-hidden="true"></i> Manage Stock</router-link>
    <router-link tag="div" :to="{ path:'/home/reports'}" class="btn btn-outline-success btn-md" active-class="active" exact><i class="fa fa-line-chart fa-fw fa-lg" aria-hidden="true"></i> Create Reports</router-link>
    <router-link tag="div" :to="{ path:'/logout'}" class="btn btn-outline-success btn-md" active-class="active" exact><i class="fa fa-power-off fa-fw fa-lg" aria-hidden="true"></i> Logout</router-link>
  </div>


</div>
</template>

<script>
export default {
  data() {
    return {
      hideMenu: true
    }
  }
}
</script>

<style scoped>
.d-flex {
  background: #323232;
  padding: 0;
}

.d-md-flex {
  background: #323232;
  padding: 0;
  height: 100%;
}

.d-md-none {
  background: #323232;
  color: white;
}

.d-md-none i {
  cursor: pointer;
}

.d-md-flex .btn {
  margin: 5% auto;
  width: 100%;
  padding-top: 8%;
  padding-bottom: 8%;
  cursor: pointer;
  font-family: avenir;
  letter-spacing: 1px;
  color: white;
}

.d-flex .btn {
  width: 80%;
  padding-top: 3%;
  padding-bottom: 3%;
  margin: 2% auto;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.router-link-exact-active {
  /*background: #255314;*/
}
</style>
