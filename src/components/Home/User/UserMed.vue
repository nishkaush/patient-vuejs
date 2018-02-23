<template>
<div class="">
  <div class="clearfix heading-div mt-5">
    <span class="h4 float-left pt-3 pb-3 pl-3">Medicines</span>
    <span class="h4 float-right pt-3 pb-3 pr-3">Step 3 of 4</span>
  </div>

  <form class="mt-5 col-sm-12 mx-auto">
    <p class="h6 failmsg text-center" v-if="pass===false"> -- Please fill in the required fields --</p>
    <div class="form-row">
      <div class="form-group col-md-5">
        <select id="medicineList" class="form-control myfields" v-model="medName">
          <option value="">Choose Medicine</option>
          <option value="">--------------------</option>
          <option :value="med.name" v-for="med in allMedList" :key="med._id">{{med.name}} &nbsp;({{med.currentStock}})</option>
        </select>
      </div>
      <div class="form-group col-md-3">
        <input type="number" class="form-control myfields" id="qty" placeholder="Quantity" required v-model.number="medQty">
      </div>
      <div class="form-group col-md-4">
        <input class="btn btn-primary btn-md form-control" @click.prevent="addMed" value="Add To List" type="submit">
      </div>
    </div>

    <div class="form-row mt-4 medListBox">
      <!-- <label for="medList">Medicines Added</label> -->
      <div class="form-group col-md-12" id="medList">
        <span v-for="(med,i) in medData" class="med" :data-id="i" :key="i">
          <span>{{med.name}} - {{med.qty}} </span>
        <i class="fa fa-times" aria-hidden="true" @click="removeMed" :data-name="med.name" :data-qty="med.qty"></i>
        </span>
      </div>
    </div>

  </form>


  <div class="buttons-div d-none d-lg-block">
    <button @click.prevent="showDiag" class="btn btn-sm float-left"><i class="fa fa-angle-double-left fa-lg" aria-hidden="true"></i>&nbsp;Back</button>

    <button @click.prevent="showTest" class="btn btn-sm float-right">Next&nbsp;<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i></button>

    <button class="btn btn-sm quitbtn" @click.prevent="quitProcess">Quit Adding This User&nbsp;<i class="fa fa-times fa-lg" aria-hidden="true"></i></button>
  </div>

  <div class="buttons-div-second d-block d-lg-none">
    <button @click.prevent="showDiag" class="btn btn-block"><i class="fa fa-angle-double-left fa-lg" aria-hidden="true"></i>&nbsp;Back</button>
    <button @click.prevent="showTest" class="btn btn-block">Next&nbsp;<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i></button>
    <button class="btn btn-block" @click.prevent="quitProcess">Quit Adding User&nbsp;<i class="fa fa-times fa-lg" aria-hidden="true"></i></button>
  </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      pass: true,
      medName: "",
      medQty: "",
      // allMedList: []
    }
  },
  methods: {
    addMed() {
      let counter = true;

      let inputs = [].slice.call(document.querySelectorAll(".myfields"));
      inputs.forEach((e) => {
        if (!e.value) {
          e.className += " fail";
          counter = false;
          this.pass = false;
        }
      });
      //TRYING TO CHANGE ALLMEDLIST TO MED-DATA, TO SEE WHAT HAPPENS
      if (counter) {
        let itemInArray = this.allMedList.find((e) => {
          return e.name === this.medName;
        });

        if (itemInArray.currentStock < this.medQty) {
          this.medName = "";
          this.medQty = "";
          return swal({
            title: "Not Enough Stock!",
            text: "Please issue within the available amount. click OK to try a lesser quantity.",
            icon: "error",
          });
        } else {
          const entry = {
            name: this.medName,
            qty: parseInt(this.medQty)
          };
          this.medData.push(entry);
          this.$store.commit("userMod/internalUpdateAllMedList", entry);
          this.medName = "";
          this.medQty = "";
          document.querySelector(".medListBox").scrollTop = document.querySelector(".medListBox").scrollHeight;
        }
      }

    },
    removeMed(event) {
      this.medData.splice(event.target.parentElement.dataset.id, 1);
      let entry = {
        name: event.target.dataset.name,
        qty: parseInt(event.target.dataset.qty)
      };
      this.$store.commit("userMod/internalIncreaseAllMedList", entry);
    },
    showDiag() {
      this.$store.commit("userMod/showCurrentView", {
        value: 'userDiag',
        medData: this.medData
      });
    },
    showTest() {
      this.$store.commit("userMod/showCurrentView", {
        value: 'userTest',
        medData: this.medData, //these are the medicines that have been issued to the patient
        allMedListDB: this.allMedList //these are the list of medicines in stock
      });
    },
    quitProcess() {
      this.$store.commit("userMod/setDefaultVuex");
    },
  },
  computed: {
    //these are the medicines that have been issued to the patient
    medData() {
      return this.$store.state.userMod.medData;
    },
    //these are the list of medicines in stock
    allMedList() {
      return this.$store.state.userMod.allMedListDB;
    }
  },
  mounted() {
    if (this.allMedList.length === 0) {
      this.$store.dispatch("userMod/getAllMedicinesFromDB");
    }
  }
}
</script>

<style scoped>
.heading-div {
  background: #20cec5;
}

.btn-md {
  border: 1px solid #20cec5;
  color: black;
  cursor: pointer;
  background: #20cec5;
}

select option {
  color: red;
  text-transform: capitalize;
}

.medListBox {
  border: 1px solid #dedede;
  color: #939393;
  height: 200px;
  overflow: scroll;
}

i {
  cursor: pointer;
}

i:hover {
  color: white;
}

.med {
  display: inline-block;
  background: #20cec5;
  padding: 1%;
  margin: 1% 1% 0% 0% !important;
  color: black;
}

.buttons-div button {
  letter-spacing: 1px;
  font-family: avenir;
  padding: 1% 5%;
  margin-top: 2%;
  font-weight: bold;
  cursor: pointer;
  background: #20cec5;
  text-transform: uppercase;
}

.quitbtn {
  margin-left: 15%;
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

.btn-block {
  background: #20cec5;
  padding: 1.5%;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
