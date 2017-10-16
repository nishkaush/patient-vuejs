<template>
<div class="d-flex flex-column col-md-2 col-sm-12 justify-content-center">

  <router-link tag="div" :to="{ path:'/home'}" class="btn btn-success btn-large" active-class="active" exact><i class="fa fa-home fa-lg fa-fw" aria-hidden="true"></i> Back To Home</router-link>

  <router-link tag="div" :to="{ path:'/home/user'}" class="btn btn-success btn-large" active-class="active" exact><i class="fa fa-users fa-lg fa-fw" aria-hidden="true"></i> Manage Patients</router-link>

  <router-link tag="div" :to="{ path:'/home/stock'}" class="btn btn-success btn-large" active-class="active" exact><i class="fa fa-cubes fa-lg fa-fw" aria-hidden="true"></i> Manage Stock</router-link>

  <router-link tag="div" :to="{ path:'/home/reports'}" class="btn btn-success btn-large" active-class="active" exact><i class="fa fa-line-chart fa-fw fa-lg" aria-hidden="true"></i> Create Reports</router-link>

  <router-link tag="div" :to="{ path:'/logout'}" class="btn btn-success btn-large" active-class="active" exact><i class="fa fa-power-off fa-fw fa-lg" aria-hidden="true"></i> Logout</router-link>
</div>
</template>

<script>
export default {}
</script>

<style scoped>
.d-flex {
  background: #323232;
  padding: 0;
}


.btn {
  padding: 6%;
  font-size: 0.9em;
  margin: 3% auto;
  width: 80%;
  cursor: pointer;
  font-family: avenir;
  letter-spacing: 1px;
  color: white;
}

.router-link-exact-active {
  width: 90%;
  padding: 7%;
  font-size: 1em;
  background: #28a745;
  border-bottom: none;
}
</style>
