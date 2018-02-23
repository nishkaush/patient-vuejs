<template>
<div class="row mt-5">
  <div class="col-sm-8 mx-auto pt-5 pb-5" v-if="patientNumber===''">
    <h1 class="text-center">Processing <i class="fa fa-spinner fa-fw fa-2x" aria-hidden="true"></i></h1>
  </div>
  <div class="col-sm-8 mx-auto pt-5 pb-5" v-if="patientNumber && patientNumber!=='notfound'">
    <h3>{{patientName}} was saved.</h3>
    <hr>
    <h5>Patient Number - [{{patientNumber}}]</h5>
    <h5>OPD Number - {{opdNumber}}</h5>
  </div>
  <div class="col-sm-8 mx-auto pt-5 pb-5" v-if="patientNumber==='notfound'">
    <h3>Oops something went wrong while saving patient. Please try again.</h3>
  </div>
  <button class="btn btn-success btn-lg btn-block" @click.prevent="quitProcess" v-if="patientNumber && patientNumber!=='notfound'">Add Another Patient</button>
  <button class="btn btn-danger btn-lg btn-block" @click.prevent="quitProcess" v-if="patientNumber==='notfound'">Try Again</button>
</div>
</template>

<script>
import swal from 'sweetalert'
export default {
  methods: {
    quitProcess() {
      this.$store.commit("userMod/setDefaultVuex");
    }
  },
  computed: {
    patientNumber() {
      return this.$store.state.userMod.patientNumber;
    },
    patientName() {
      return this.$store.state.userMod.form.name.toUpperCase();
    },
    opdNumber() {
      return this.$store.state.userMod.opdNumber;
    }
  },
  watch: {
    patientNumber() {
      if (this.patientNumber && this.patientNumber !== 'notfound') {
        swal({
          title: "Excellent!",
          text: "Patient saved successfully, click OK to see additional info",
          icon: "success",
        });
      } else if (this.patientNumber === "notfound") {
        swal({
          title: "Oops",
          text: "Something went wrong while adding patient, please try again",
          icon: "error",
        });
      }
    }
  }
}
</script>

<style>
button {
  cursor: pointer;
}
</style>
