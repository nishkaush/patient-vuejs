<template>
<div class="">
  <form class="pt-5 text-center">
    <p class="h6 failmsg" v-if="pass===false"> Please enter a name before searching</p>
    <div class="form-row">
      <div class="form-group col-sm-12">
        <input autofocus class="searchBar" type="text" placeholder="Type patient's name" v-model="term">
        <button class="btn btn-info btn-md" @click.prevent="fetchPatients">Search <i class="fa fa-spinner" aria-hidden="true" v-if="patientSearchSpinner===true"></i></button>
      </div>
    </div>
  </form>


  <div class="resultsDiv col-sm-7 mx-auto mt-4" v-if="showResults===true">
    <h6>List of Patients Found</h6>
    <div v-for="patient in patientsArr" :key="patient.patientNumber" class="pt-2 pb-2 results clearfix">
      <span class="float-left">{{patient.name}}</span>
      <span class="float-left" v-if="searchResultDetails===true"> &nbsp;[{{patient.patientNumber}}]</span>
      <button class="float-right btn btn-light btn-md" v-if="searchResultDetails===true" :data-patient="patient.patientNumber" @click="showUserEdit">Show Details</button>
    </div>
    </ul>

  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      patientSearchSpinner: "",
      term: "",
      showResults: false,
      patientsArr: [],
      pass: true,
      searchResultDetails: false
    }
  },
  methods: {
    fetchPatients() {
      if (this.term) {
        this.patientSearchSpinner = true;
        this.$store.dispatch("userSearchMod/getPatients", {
          searchTerm: this.term
        }).then((res) => {
          if (res.found) {
            this.showResults = true;
            this.searchResultDetails = true;
            this.patientSearchSpinner = false;
            return this.patientsArr = res.arr;
          }
          this.showResults = true;
          this.searchResultDetails = false;
          this.patientSearchSpinner = false;
          return this.patientsArr = res.arr;
        });
      } else {
        document.querySelector(".searchBar").className += " fail";
        this.pass = false;
      }
    },
    showUserEdit(e) {
      let selectedPatient = "";
      this.patientsArr.forEach((patient) => {
        if (patient.patientNumber === parseInt(e.target.dataset.patient)) {
          return selectedPatient = patient;
        }
      });
      this.$store.commit("userSearchMod/changeCurrentView", {
        value: 'useredit',
        patientToEdit: selectedPatient
      });
    },

  }
}
</script>

<style scoped>
input {
  width: 50%;
  font-size: 1.1em;
  padding: 0.5%;
  border-radius: 5px;
  box-shadow: 10px 10px 10px 10px 10px #666666 inset;
}

.btn-info {
  padding-left: 4%;
  padding-right: 4%;
  cursor: pointer;
}

.resultsDiv {
  height: 25em;
  overflow-y: scroll;
  padding-left: 0;
  padding-right: 0;
  padding-top: 1%;
}

.results {
  border-top: 1px solid #dedede;
  font-family: avenir;
}

.float-left {
  /*padding-left: 2%;*/
}

.float-right {
  /*padding-left: 2%;*/
  /*padding-right: 2%;*/
  cursor: pointer;
  /*background: transparent;*/
}

.fail {
  outline: 1px solid red;
  font-family: avenir;
  color: #e35d6a;
  font-size: 0.9em;
}

.failmsg {
  font-family: avenir;
  color: #e35d6a;
  font-size: 0.9em;
}
</style>
