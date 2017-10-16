<template>
<div class="">
  <div class="clearfix heading-div mt-5 bg-warning">
    <span class="h4 float-left pt-3 pb-3 pl-3">Personal Info</span>
    <span class="h4 float-right pt-3 pb-3 pr-3">Step 1 of 4</span>
  </div>

  <transition enter-active-class="animated fadeIn">
    <form class="mt-3 col-sm-12 mx-auto" id="addUserForm">
      <transition enter-active-class="animated shake">
        <p class="h6 failmsg text-center" v-if="pass===false"> * Please fill in the required fields </p>
        <p class="h6 failmsg text-center" v-if="alreadyExists===true"> -- User already exists, please use search option to update --</p>
      </transition>

      <div class="form-row">
        <div class="form-group col-md-6">
          <div class="input-group">
            <span class="input-group-addon">
            <i class="fa fa-user fa-fw" aria-hidden="true"></i>
          </span>
            <input type="text" class="form-control" id="inputName" placeholder="Full Name *" required autofocus v-model="form.name">
          </div>
        </div>
        <div class="form-group col-md-6">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-phone fa-fw" aria-hidden="true"></i></span>
            <input type="number" class="form-control" id="inputPhone" placeholder="Phone Number *" required v-model.number="form.phone" maxlength="10">
          </div>
        </div>
      </div>


      <div class="form-row">
        <div class="form-group col-md-6">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-address-card-o fa-fw" aria-hidden="true"></i></span>
            <input type="text" class="form-control" id="inputAddress" placeholder="Postal Address" v-model="form.address">
          </div>
        </div>
        <div class="form-group col-md-6">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-envelope fa-fw" aria-hidden="true"></i></span>
            <input type="email" class="form-control" id="inputEmail" placeholder="Email Address" v-model="form.email">
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-id-badge fa-fw" aria-hidden="true"></i></span>
            <input id="inputId" type="text" class="form-control" placeholder="Photo ID Details - Drivers License, Medicare, etc" v-model="form.photoId">
          </div>
        </div>
        <div class="form-group col-md-6">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-usd fa-fw" aria-hidden="true"></i></span>
            <input type="number" class="form-control" id="opd" :value="opd" readonly placeholder="OPD Fee Calculated Automatically">
          </div>
        </div>
      </div>

      <div class="form-row d-flex w-100 mx-auto">
        <div class="form-group col-md-3">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-birthday-cake" aria-hidden="true"></i></span>
            <input type="text" class="form-control" id="dob" v-model="form.dob" placeholder="Date of Birth *" required>
          </div>
        </div>
        <div class="form-group col-md-3">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-venus-mars" aria-hidden="true"></i></span>
            <select id="inputGender" class="form-control" required v-model="form.gender">
              <option value="" selected>Choose Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

        </div>
        <div class="form-group col-md-6">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
            <select id="inputType" class="form-control" required v-model="form.patientType">
                <option value="" selected>Choose Patient Type *</option>
                <option value="anc">Ante Natal Care (ANC)</option>
                <option value="pnc">Post Natal Care (PNC)</option>
                <option value="abl">Above Poverty Line (ABL)</option>
                <option value="bpl">Below Poverty Line (BPL)</option>
                <option value="child">Child (Under 12)</option>
                <option value="orcamp">Outreach Camp (ORCamp)</option>
                <option value="sorcamp">Special Outreach Camp (SORCamp)</option>
              </select>
          </div>
        </div>
      </div>


      <div class="form-row">
        <div class="form-group col-md-12">
          <button class="btn btn-sm btn-warning resetbtn float-left" @click.prevent="quitProcess">Reset &nbsp;<i class="fa fa-repeat" aria-hidden="true"></i></button>
          <button class="btn btn-warning btn-sm float-right" @click.prevent="showDiag">Next &nbsp;<i class="fa fa-angle-double-right fa-lg" aria-hidden="true" v-if="addPatientPersonalSpinner===false"></i> <i class="fa fa-spinner fa-lg" aria-hidden="true" v-if="addPatientPersonalSpinner===true"></i></button>
        </div>
      </div>

    </form>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      addPatientPersonalSpinner: false,
      pass: true,
      alreadyExists: false,
      randomProp: "",
      temporaryDob: ""
    }
  },
  methods: {
    quitProcess() {
      this.$store.commit("userMod/setDefaultVuex");
    },
    showDiag() {
      let vm = this;
      let counter = true; //flick this switch to false if any item fails validation
      let inputs = [].slice.call(document.querySelectorAll(".form-control[required='required']"));

      function addErrorClass(element) {
        element.className += " fail";
        counter = false;
      }

      inputs.forEach((e) => {
        if (!e.value) {
          addErrorClass(e);
        }
        return;
      });

      if (counter) {
        vm.addPatientPersonalSpinner = true;
        this.$store.dispatch("userMod/checkExisting", {
          name: this.form.name,
          phone: this.form.phone
        }).then((res) => {
          if (!res.found) {
            vm.addPatientPersonalSpinner = false;
            return this.$store.commit("userMod/showCurrentView", {
              value: "userDiag",
              form: this.form,
              opd: this.opd
            });
          }
          vm.addPatientPersonalSpinner = false;
          return this.alreadyExists = true;
        }).catch((e) => {
          vm.addPatientPersonalSpinner = false;
          console.log(e);
        });
      } else {
        this.pass = false;
      }
    },

  },
  computed: {
    // this shouldn't be done, should have "get" and "set" for computed prop like this
    form() {
      return this.$store.state.userMod.form;
    },
    opd() {
      return this.$store.getters["userMod/opdCalc"];
    }
  },
  mounted() {
    let vm = this;
    $(function() {
      $("#dob").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2017",
        dateFormat: "dd/mm/yy",
        gotoCurrent: true,
        onClose: function() {
          let mydate = document.getElementById("dob").value;
          vm.$store.commit("userMod/setDob", {
            dob: mydate
          });
        }
      });
    });
  }
}
</script>

<style scoped>
form button {
  letter-spacing: 1px;
  font-family: avenir;
  padding: 1% 5%;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
}

.input-group-addon {
  background: #ffc107;
}

.failmsg {
  font-family: avenir;
  color: #e35d6a;
  font-size: 0.9em;
}

.fail {
  outline: 1px solid red;
  font-family: avenir;
  color: #e35d6a;
  font-size: 0.9em;
}

.form-group {
  margin: 2% auto;
}

#dob {
  position: relative;
  z-index: 100;
}

.resetbtn {}
</style>
