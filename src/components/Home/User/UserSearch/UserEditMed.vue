<template>
<div class="card">
  <div class="card-header" role="tab" id="headingTwo">
    <h5 class="mb-0">
          <a class="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Add New Prescription - {{myPatient.name.toUpperCase()}}
          </a>
        </h5>
  </div>

  <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">

    <div class="card-body" v-if="showElement==='dia'">
      <form class="col-sm-10 mx-auto">
        <div class="form-row">
          <div class="form-group col-md-12">
            <textarea rows="10" cols="80" class="form-control" placeholder="Enter Patient Diagnosis" v-model="textArea" autofocus></textarea>
          </div>
        </div>
      </form>
      <div class="text-center">
        <button class="btn btn-md text-btn" @click.prevent="showElement='med'">NEXT <i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i></button>
      </div>
    </div>



    <div class="card-body" v-if="showElement==='med'">
      <form class="col-sm-9 mx-auto">
        <div class="form-row">
          <div class="form-group col-sm-7">
            <select class="form-control" v-model="medname">
                <option value="">Choose Medicine</option>
                <option :value="med.name" v-for="med in medicinesListing">{{med.name}} ({{med.currentStock}})</option>
              </select>
          </div>
          <div class="form-group col-sm-2">
            <input type="number" placeholder="qty" class="ml-2 medqty form-control" v-model="medqty">
          </div>
          <div class="form-group col-sm-3">
            <button class="form-control add-med-btn" @click.prevent="addMedicine">Add</button>
          </div>
        </div>
      </form>
      <div class="medicine-box col-sm-9 mx-auto">
        <span :key="i" class="added-med" v-for="(med,i) in medArr" :data-id="i">{{med.name}}-{{med.qty}} <i class="fa fa-times" aria-hidden="true" @click="deleteMed"></i></span>&nbsp;
      </div>
      <div class="text-center">
        <button class="btn btn-md" @click.prevent="showElement='dia'"><i class="fa fa-angle-double-left fa-lg" aria-hidden="true"></i> Back</button>
        <button class="btn btn-md" @click.prevent="showElement='test'">Next <i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i></button>
      </div>
    </div>





    <div class="card-body" v-if="showElement==='test'">
      <form class="col-sm-9 mx-auto">
        <div class="form-row">
          <div class="form-group col-sm-7">
            <select class="form-control" v-model="testname">
                <option value="">Choose Test</option>
                <option :value="test.name" v-for="test in testsListing">{{test.name}}</option>
              </select>
          </div>
          <div class="form-group col-sm-2">
            <input type="number" placeholder="qty" class="testqty form-control" v-model="testqty">
          </div>
          <div class="form-group col-sm-3">
            <button class="btn btn-md form-control add-test-btn" @click.prevent="addTests">Add</button>
          </div>
        </div>
      </form>
      <div class="test-box col-sm-9 mx-auto">
        <span :key="i" class="added-test" v-for="(test,i) in testArr" :data-id="i">{{test.name}} - {{test.qty}} <i class="fa fa-times" aria-hidden="true" @click="deleteTest"></i></span>&nbsp;
      </div>
      <div class="text-center">
        <button class="btn btn-md" @click.prevent="showElement='med'">Back</button>
        <button class="btn btn-md" @click.prevent="addNewPrescription">Finish <i class="fa fa-spinner" aria-hidden="true" v-if="finishPrescriptionSpinner===true"></i></button>
      </div>
    </div>


  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      finishPrescriptionSpinner: false,
      showElement: "dia",
      textArea: "",
      medqty: "",
      medname: "",
      medArr: [],
      testqty: "",
      testname: "",
      testArr: [],
      medicinesListing: [],
      testsListing: []
    }
  },
  methods: {
    addMedicine() {
      if (this.medname && this.medqty) {
        this.medicinesListing.forEach((e) => {
          if (e.name === this.medname) {
            if (e.currentStock >= this.medqty) {
              let medobj = {
                name: this.medname,
                qty: parseInt(this.medqty)
              };
              this.medArr.push(medobj);
              e.currentStock -= parseInt(this.medqty);
              console.log("medicine listing now becomes:", this.medicinesListing);
              this.medname = "";
              this.medqty = "";
            } else {
              return swal({
                title: "Not Enough Stock!",
                text: "Click OK to choose a lower amount within the stock limits",
                icon: "error",
              });
            }
          }
        });

      } else {
        return swal({
          title: "Medicine Not Added",
          text: "Please choose both the medicine and a quantity before adding",
          icon: "error",
        });
      }
    },
    addTests() {
      if (this.testname && this.testqty) {
        let testobj = {
          name: this.testname,
          qty: parseInt(this.testqty)
        };
        this.testArr.push(testobj);
        this.testname = "";
        this.testqty = "";
      } else {
        return swal({
          title: "Test Not Added",
          text: "Please choose both a test and a quantity before adding",
          icon: "error",
        });
      }
    },
    deleteTest(event) {
      this.testArr.splice(event.target.parentElement.dataset.id, 1);
    },
    deleteMed(event) {
      this.medArr.splice(event.target.parentElement.dataset.id, 1);
    },
    addNewPrescription() {
      let vm = this;
      if (this.textArea || this.medArr.length !== 0 || this.testArr.length !== 0) {
        vm.finishPrescriptionSpinner = true;
        this.$store.dispatch("userSearchMod/newPrescription", {
          diagnosis: this.textArea,
          medicine: this.medArr,
          tests: this.testArr,
          _id: this.myPatient._id,
          opdFee: this.myPatient.opd
        }).then((res) => {
          if (res === true) {
            this.textArea = "";
            this.medArr = [];
            this.testArr = [];
            this.showElement = "dia";
            vm.finishPrescriptionSpinner = false;
            return swal({
              title: "New Prescription saved!",
              text: `OPD NUMBER - ${vm.opdNumber}. View other details in Medical History.`,
              icon: "success",
            });
          }
          vm.finishPrescriptionSpinner = false;
          return swal({
            title: "Oops",
            text: "Couldn't save the new prescription, please try again",
            icon: "error",
          });
        }).catch((e) => {
          vm.finishPrescriptionSpinner = false;
          return swal({
            title: "Oops",
            text: "Couldn't save the new prescription, please try again",
            icon: "error",
          });
        });
      } else {
        return swal({
          title: "Info Required",
          text: "Please fill out atleast one of Diagnosis, Medicines or Tests fields",
          icon: "error",
        });
      }
    }

  },
  computed: {
    myPatient() {
      return this.$store.state.userSearchMod.patientToEdit;
    },
    opdNumber() {
      return this.$store.state.userSearchMod.opdNumber;
    }
  },
  mounted() {
    if (this.medicinesListing.length === 0) {
      axios.get(`${this.$store.state.myUrl}/stock/getAllMedicines`).then((res) => {
        if (res.data.status === "success") {
          return this.medicinesListing = res.data.allMedList;
        }
      });
    }

    if (this.testsListing.length === 0) {
      axios.get(`${this.$store.state.myUrl}/stock/getAllTests`).then((res) => {
        if (res.data.status === "success") {
          return this.testsListing = res.data.allTestList;
        }
      });
    }

  }
}
</script>

<style scoped>
#headingTwo {
  background: #e784e7;
}

h5 a {
  color: #191919;
}

.card-body button {
  cursor: pointer;
}

.text-center button {
  padding-left: 5%;
  padding-right: 5%;
  background-color: #e784e7;
}

textarea {
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.medicine-box,
.test-box {
  height: 10em;
  padding: 1%;
  overflow-y: scroll;
}

.added-med {
  padding: 1%;
  border: 2px solid #e784e7;
  border-radius: 30px;
  text-transform: capitalize;
}

.added-test {
  padding: 1%;
  border: 2px solid #e784e7;
  text-transform: capitalize;
  margin: auto 0.5%;
}

.added-med i,
.added-test i {
  cursor: pointer;
}

.add-med-btn,
.add-test-btn {
  border: 1px solid #e784e7;
}

.add-med-btn:hover,
.add-test-btn:hover {
  background: #e784e7;
  color: white;
}
</style>
