<template>
<div class="card">
  <div class="card-header" role="tab" id="headingOne">
    <h5 class="mb-0">
        <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Personal Info - {{myPatient.name.toUpperCase()}}
        </a>
      </h5>
  </div>

  <div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
    <form class="card-body">
      <div class="form-row">

        <div class="form-group col-sm-4">
          <label for="fullnameEdit" class="col-form-label asterick">Full Name</label>
          <input id="fullnameEdit" type="text" placeholder="Full Name" class="form-control personal-info-edit" :value="myPatient.name" required>
        </div>

        <div class="form-group col-sm-2">
          <label for="phoneEdit" class="col-form-label asterick">Phone</label>
          <input id="phoneEdit" type="number" placeholder="Phone" class="form-control personal-info-edit" :value="myPatient.phone" required>
        </div>

        <div class="form-group col-sm-6">
          <label for="addressEdit" class="col-form-label">Address</label>
          <input id="addressEdit" type="text" placeholder="Address" class="form-control personal-info-edit" :value="myPatient.address">
        </div>

        <div class="form-group col-sm-4">
          <label for="emailEdit" class="col-form-label">Email</label>
          <input id="emailEdit" type="email" placeholder="Email" class="form-control personal-info-edit" :value="myPatient.email">
        </div>

        <div class="form-group col-sm-2">
          <label for="dobEdit" class="col-form-label asterick">DOB</label>
          <input id="dobEdit" type="text" placeholder="Date of Birth" class="form-control personal-info-edit" :value="dob" required>
        </div>


        <div class="form-group col-sm-6">
          <label for="photoIdEdit" class="col-form-label">PhotoID Details</label>
          <input id="photoIdEdit" type="text" placeholder="Photo ID" class="form-control personal-info-edit" :value="myPatient.photoId">
        </div>

        <div class="form-group col-sm-4">
          <label for="GenderEdit" class="col-form-label asterick">Gender</label>
          <select id="genderEdit" class="form-control personal-info-edit" required :value="myPatient.gender" required>
            <option value="" selected>Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group col-sm-2">
          <label for="opdEdit" class="col-form-label">OPD (auto calculated)</label>
          <input id="opdEdit" type="text" placeholder="Auto Calculated" class="form-control personal-info-edit" :value="myPatient.opd" readonly>
        </div>

        <div class="form-group col-sm-6">
          <label for="patientTypeEdit" class="col-form-label asterick">Patient Type</label>
          <select id="patientTypeEdit" class="form-control personal-info-edit" required :value="myPatient.patientType">
              <option value="" selected>Choose Patient Type</option>
              <option value="anc">Ante Natal Care (ANC)</option>
              <option value="pnc">Post Natal Care (PNC)</option>
              <option value="abl">Above Poverty Line (ABL)</option>
              <option value="bpl">Below Poverty Line (BPL)</option>
              <option value="child">Child (Under 12)</option>
              <option value="orcamp">Outreach Camp (ORCamp)</option>
              <option value="sorcamp">Special Outreach Camp (SORCamp)</option>
            </select>
        </div>

        <div class="col-sm-12">
          <button class="btn btn-warning btn-sm personal-btn" v-if="editing===false" @click.prevent="startEditing">Edit Details</button>
          <button class="btn btn-warning btn-sm personal-btn" v-if="editing===true" @click.prevent="cancelEditing">Cancel Editing</button>
          <button class="btn btn-warning btn-sm personal-btn" v-if="editing===true" @click.prevent="updateDetails">Update Details <i class="fa fa-spinner" aria-hidden="true" v-if="updatePatientSpinner===true"></i></button>
        </div>


      </div>
    </form>
  </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      updatePatientSpinner: false,
      editing: false,
      flag: true //used for checking validity of the input elements like required, etc
    }
  },
  methods: {
    startEditing() {
      this.editing = true;
      document.querySelectorAll(".personal-info-edit").forEach((e) => {
        e.disabled = false;
      });
    },
    cancelEditing() {
      this.editing = false;
      document.querySelectorAll(".personal-info-edit").forEach((e) => {
        e.disabled = true;
      });
    },

    updateDetails() {
      // first check if all elements have a valid value
      let vm = this;
      this.flag = true;
      document.querySelectorAll(".asterick + .personal-info-edit").forEach((e) => {
        if (!e.checkValidity()) {
          e.className += " fail";
          return this.flag = false;
        }
        return e.classList.remove("fail");
      });

      // if any of them don't have a value, trigger a pop up for error
      if (!this.flag) {
        console.log("found the flag to be false");
        return swal({
          title: "Info Required",
          text: "Please fill all fields marked with *",
          icon: "error",
        });
      }
      // checking what opd value to set
      this.updatePatientSpinner = true;

      function infoAndDispatch(value) {
        let opd = value === "abl" ? 10 : 0;
        let updatedInfo = {
          name: document.getElementById("fullnameEdit").value,
          phone: document.getElementById("phoneEdit").value,
          address: document.getElementById("addressEdit").value,
          email: document.getElementById("emailEdit").value,
          dob: document.getElementById("dobEdit").value,
          photoId: document.getElementById("photoIdEdit").value,
          gender: document.getElementById("genderEdit").value,
          opd: opd,
          patientType: document.getElementById("patientTypeEdit").value,
          _id: vm.myPatient._id
        };

        vm.$store.dispatch("userSearchMod/updatePatient", updatedInfo).then((res) => {
          if (res === true) {
            document.querySelectorAll(".personal-info-edit").forEach((e) => {
              e.disabled = true;
            });
            vm.updatePatientSpinner = false;
            vm.editing = false;
            return swal({
              title: "Done!",
              text: "Patient details updated, click OK to continue",
              icon: "success",
            });
          }
          vm.updatePatientSpinner = false;
          return swal({
            title: "Oops",
            text: "Couldn't update details, please try again",
            icon: "error",
          });
        });
      } //infoAndDispatch function ends here

      let currentPatientType = document.getElementById("patientTypeEdit").value;
      if (currentPatientType !== this.myPatient.patientType) {
        infoAndDispatch(currentPatientType);
      } else {
        infoAndDispatch(this.myPatient.patientType);
      }
    } //update details ends here

  },
  computed: {
    myPatient() {
      return this.$store.state.userSearchMod.patientToEdit;
    },
    dob() {
      return this.$store.state.userSearchMod.patientToEdit.dob;
    },
    opdFee() {
      return this.$store.getters("userSearchMod/currentOpd");
    }
  },
  mounted() {
    let vm = this;
    $(function() {
      $("#dobEdit").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2017",
        dateFormat: "dd/mm/yy",
        gotoCurrent: true,
        onClose: function() {
          let mydate = document.getElementById("dobEdit").value;
          vm.$store.commit("userSearchMod/setDobEdit", {
            dobEdit: mydate
          });
        }
      });
    });
    document.querySelectorAll(".personal-info-edit").forEach((e) => {
      e.disabled = true;
    });
  }
}
</script>

<style scoped>
#headingOne {
  background: #ffd96a;
}

h5 a {
  color: black;
}

#collapseOne span {
  margin-left: 1%;
  margin-right: 1%;
  cursor: pointer;
}

.col-form-label {
  font-size: 0.9em;
}

.personal-btn {
  padding-left: 3%;
  padding-right: 3%;
  cursor: pointer;
}

.asterick:after {
  content: " *";
  color: red;
}

.fail {
  outline: 1px solid red;
  font-family: avenir;
  color: #e35d6a;
  font-size: 0.9em;
}
</style>
