<template>
<div id="accordion" role="tablist" class="col-sm-11 mx-auto mt-4">
  <personalinfo></personalinfo>
  <editmed></editmed>
  <historyinfo></historyinfo>
  <div class="text-center">
    <button class="btn btn-md" @click.prevent="beginNewSearch">Start New Search</button>
    <button class="btn btn-md bg-danger" @click.prevent="deletePatientRecord">Delete Patient</button>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import UserEditPersonal from './UserEditPersonal.vue'
import UserEditMed from './UserEditMed.vue'
import UserHistory from './UserHistory.vue'
export default {
  methods: {
    beginNewSearch() {
      this.$store.commit("userSearchMod/newSearch");
    },
    deletePatientRecord() {
      this.$store.dispatch("userSearchMod/deletePatient", {
        _id: this.myPatient._id
      }).then((res) => {
        if (res === true) {
          swal({
            title: "Success!",
            text: "Patient deleted, click OK to continue",
            icon: "success",
          }).then(() => {
            return this.$store.commit("userSearchMod/newSearch");
          });

        }
        return
      });
    }
  },
  components: {
    personalinfo: UserEditPersonal,
    editmed: UserEditMed,
    historyinfo: UserHistory
  },
  computed: {
    myPatient() {
      return this.$store.state.userSearchMod.patientToEdit;
    }
  },
  mounted() {
    this.$store.commit("userSearchMod/issueDateFormat");
  }
}
</script>

<style scoped>
button {
  background: #0080ff;
  padding-left: 4%;
  padding-right: 4%;
  letter-spacing: 1px;
  font-family: avenir;
  margin: 1% auto 0% auto;
  cursor: pointer;
  color: white;
}
</style>
