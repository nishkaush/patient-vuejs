<template>
<div class="col-md-10 col-sm-12">
  <h3 class="pt-5">Manage Stock</h3>
  <hr class="mt-0 mb-0 pt-0 pb-0">
  <ul class="nav nav-tabs pt-3">
    <li class="nav-item">
      <a @click="showMedicines=true" class="nav-link" :class="{activeTab:showMedicines}" href="#"> Medicines</a>
    </li>
    <li class="nav-item">
      <a @click="showMedicines=false" class="nav-link" :class="{activeTab:!showMedicines}" href="#">Tests</a>
    </li>
  </ul>
  <my-medicines v-show="showMedicines===true"></my-medicines>
  <my-tests v-show="showMedicines===false"></my-tests>
</div>
</template>

<script>
import Medicines from './Medicines.vue'
import Tests from './Tests.vue'
export default {
  data() {
    return {
      showMedicines: true
    }
  },
  components: {
    'myMedicines': Medicines,
    'my-tests': Tests
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
