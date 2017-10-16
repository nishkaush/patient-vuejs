<template>
<div class="col-sm-12 mt-3">
  <!--  Add New Medicine Div Starts Here-->
  <div class="add-medicine-div text-center mb-2 col-sm-10 mx-auto">
    <button id="main1" class="btn btn-md btn-block btn-outline-info" @click.prevent="addBtnClick" :class="{activebg:showAdd}">Add New Medicine</button>
    <transition enter-active-class="animated fadeIn">
      <form class="mt-3 mb-3" v-show="showAdd===true">
        <div class="form-row">
          <div class="form-group col-sm-5">
            <input id="medTitle" type="text" class="form-control mytarget" placeholder="Enter Medicine Name *" autofocus v-model="titleAddValue" required>
          </div>
          <div class="form-group col-sm-3">
            <select id="medCategory" class="form-control mytarget" v-model="categoryAddValue" required>
            <option value="" selected>Choose Type *</option>
            <option value="Tablet">Tablet</option>
            <option value="Ointment">Ointment</option>
            <option value="Liquid">Liquid</option>
          </select>
          </div>
          <div class="form-group col-sm-2">
            <input id="medQuantity" type="number" class="form-control mytarget" placeholder="Qty*" v-model="qtyAddValue">
          </div>
          <div class="form-group col-sm-2">
            <button class="btn btn-info form-control" @click.prevent="addNewMedStock">Add <i class="fa fa-spinner fa-fw fa-lg" aria-hidden="true" v-if="addMedStockSpinner===true"></i></button>
          </div>
        </div>
      </form>
    </transition>
  </div>


  <!-- Search For Medicines Start here -->
  <div class="search-medicine-div text-center mt-2 col-sm-10 mx-auto">
    <button id="main2" class="btn btn-md btn-block btn-outline-info" @click="searchBtnClick" :class="{activebg:showSearch}">Search Existing Medicine</button>

    <transition enter-active-class="animated fadeIn">
      <form v-show="showSearch===true" class="col-sm-12 mx-auto">
        <div class="form-row mt-3">
          <div class="form-group col-sm-9">
            <input type="text" class="form-control" required placeholder="Search By Name" v-model="searchTerm">
          </div>
          <div class="form-group col-sm-3">
            <button class="form-control btn-info" @click.prevent="searchMedicines">Search &nbsp;<i class="fa fa-search fa-md" aria-hidden="true" v-if="searchMedStockSpinner===false"></i> <i class="fa fa-spinner fa-fw fa-lg" aria-hidden="true" v-if="searchMedStockSpinner===true"></i></button>
          </div>
        </div>
        <div class="medicine-results-list">
          <small v-show="noResults===true">No Results Found</small>

          <form v-for="med in searchResultsArr" class="col-sm-12 mt-2 mx-auto" :key="med._id">
            <div class="form-row align-items-end">
              <div class="form-group col-sm-4">
                <label for="SearchedMedName">Medicine Name</label>
                <!-- Need to check value for this  before updating -->
                <input type="text" :value="med.name" class="form-control" disabled :data-id="med._id" required>
              </div>
              <div class="form-group col-sm-2">
                <label for="SearchedMedType">Type</label>
                <!-- Need to check value for this  before updating -->
                <select class="form-control" :value="med.type" disabled :data-id="med._id" required>
                  <option value="">Choose</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Ointment">Ointment</option>
                  <option value="Liquid">Liquid</option>
                </select>
              </div>
              <div class="form-group col-sm-2">
                <label for="SearchedQty">Current Stock</label>
                <input :value="med.currentStock" class="form-control" readonly>
              </div>
              <div class="form-group col-sm-2">
                <label for="AdjustQty">Add Stock</label>
                <!-- Need to check value for this  before updating -->
                <input type="number" class="form-control" disabled :data-id="med._id" required>
              </div>
              <div class="form-group col-sm-2">
                <div class="input-group">
                  <i class="fa fa-trash fa-lg pr-2" aria-hidden="true" :data-id="med._id" @click="deleteMedStock"></i>&nbsp;
                  <i class="fa fa-pencil fa-lg pr-2" aria-hidden="true" @click="editMedStock" :data-id="med._id"></i>&nbsp;
                  <i class="fa fa-floppy-o fa-lg pr-2 hidden-icons" aria-hidden="true" style="display:none;" @click="updateMedStock" :data-id="med._id"></i>&nbsp;
                  <i class="fa fa-times-circle fa-lg hidden-icons" aria-hidden="true" style="display:none;" @click="cancelMedEdit" :data-id="med._id"></i>&nbsp;
                </div>
              </div>
            </div>
          </form>

        </div>
      </form>
    </transition>

  </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      searchMedStockSpinner: false,
      addMedStockSpinner: false,
      stockQtyAdd: "",
      showAdd: false,
      showSearch: false,
      titleAddValue: "",
      categoryAddValue: "",
      qtyAddValue: "",
      searchTerm: "",
      searchResultsArr: [],
      stockUrl: "https://intense-castle-52320.herokuapp.com/stock",
      noResults: false,
      lastTwoIcons: false
    }
  },
  methods: {
    addBtnClick() {
      this.showAdd = !this.showAdd;
      this.showSearch = false;
    },
    searchBtnClick() {
      this.showSearch = !this.showSearch;
      this.showAdd = false;
    },
    editMedStock(event) {
      let iconArr = Array.from(event.target.parentNode.children);
      iconArr.forEach((e) => {
        if (iconArr.indexOf(e) === 2 || iconArr.indexOf(e) === 3) {
          e.style.display = "inline";
        }
      });
      document.querySelectorAll(`.form-control[data-id="${event.target.dataset.id}"]`).forEach((e) => {
        e.disabled = false;
      });
    },
    cancelMedEdit(event) {
      let myArr = Array.from(event.target.parentNode.children);
      myArr.forEach((e) => {
        if (myArr.indexOf(e) === 2 || myArr.indexOf(e) === 3) {
          e.style.display = "none";
        }
      });
      document.querySelectorAll(`.form-control[data-id="${event.target.dataset.id}"]`).forEach((e) => {
        e.disabled = true;
      });
    },
    searchMedicines() {
      if (!this.searchTerm) {
        return swal({
          title: "Info Required",
          text: "Please provide a name to search, click OK to try again",
          icon: "error",
        });
      }
      this.searchMedStockSpinner = true;
      axios.get(`${this.stockUrl}/search/${this.searchTerm}`).then((res) => {
        if (res.data.status === "success" && res.data.medArr.length !== 0) {
          this.noResults = false;
          this.searchMedStockSpinner = false;
          return this.searchResultsArr = res.data.medArr;
        } else if (res.data.status === "success" && res.data.medArr.length === 0) {
          this.searchMedStockSpinner = false;
          return this.noResults = true;
        }
        this.searchMedStockSpinner = false;
        return swal({
          title: "Oops",
          text: "Something went wrong while searching, please try again",
          icon: "error",
        });
      });
    },
    deleteMedStock(event) {
      axios.post(`${this.stockUrl}/deleteMedicine`, {
        id: event.target.dataset.id
      }).then((res) => {
        if (res.data.status === "success") {
          this.searchResultsArr = this.searchResultsArr.filter((e) => {
            return e._id !== event.target.dataset.id;
          });
          swal({
            title: "Done!",
            text: "Medicine deleted, click OK to continue",
            icon: "success",
          });
        } else {
          swal({
            title: "Oops",
            text: "Something went wrong while deleting, please try again",
            icon: "error",
          });
        }
      });
    },
    updateMedStock(event) {
      let myArr = Array.from(document.querySelectorAll(`.form-control[data-id="${event.target.dataset.id}"]`));
      let payload = {};
      payload.name = myArr[0].value;
      payload.type = myArr[1].value;
      if (!myArr[2].value) {
        myArr[2].value = 0;
      }
      payload.qtyToAdd = parseInt(myArr[2].value);
      payload.id = event.target.dataset.id;
      if (!myArr[0].value || !myArr[1].value) {
        myArr.forEach((e) => {
          if (!e.value) {
            e.className += " fail";
          }
        });
        swal({
          title: "More Info Required",
          text: "Please fill out all required fields marked with asterick *",
          icon: "error",
        });
      } else {
        axios.post(`${this.stockUrl}/updateMedStock`, payload).then((res) => {
          if (res.data.status === "success") {
            let indexToSplice = "";
            this.searchResultsArr.forEach((e) => {
              if (e._id === res.data.med._id) {
                indexToSplice = this.searchResultsArr.indexOf(e);
              }
            });
            this.searchResultsArr.splice(indexToSplice, 1, res.data.med);
            document.querySelectorAll(`.form-control[data-id="${event.target.dataset.id}"]`).forEach((e) => {
              e.disabled = true;
              if (e.type === "number") {
                e.value = "";
              }
            });
            document.querySelectorAll(`.hidden-icons[data-id="${event.target.dataset.id}"]`).forEach((e) => {
              e.style.display = "none";
            });
            return swal({
              title: "Successful!",
              text: "Medicine updated, click OK to see updated details",
              icon: "success",
            });
          }
        }).catch((err) => {
          console.log(err);
          return swal({
            title: "Oops!",
            text: "Something went wrong while trying to update, please try again",
            icon: "error",
          });
        });
      }

    },
    addNewMedStock() {
      let vm = this;
      //defining what will happen as a generic process
      function actualProcess() {
        let newMedInfo = {
          title: vm.titleAddValue.charAt(0).toUpperCase() + vm.titleAddValue.slice(1),
          type: vm.categoryAddValue,
          qty: vm.qtyAddValue
        };
        vm.$store.dispatch("stockMod/addNewMedStock", newMedInfo).then((res) => {
          if (res === true) {
            vm.titleAddValue = "";
            vm.categoryAddValue = "";
            vm.qtyAddValue = "";
            vm.addMedStockSpinner = false;
            return swal({
              title: "Excellent!",
              text: "Medicine saved successfully, click OK to continue",
              icon: "success",
            });
          } else {
            vm.addMedStockSpinner = false;
            return swal({
              title: "Oops",
              text: "Something went wrong while adding medicine, please try again",
              icon: "error",
            });
          }
        });
      }

      // now lets handle individual responses from the server

      let flag = true;
      if (vm.titleAddValue && this.categoryAddValue && this.qtyAddValue) {
        vm.addMedStockSpinner = true;
        axios.get(`${this.stockUrl}/getAllMedicines`).then((res) => {
          if (res.data.status === "success") {
            res.data.allMedList.forEach((e) => {
              if (vm.titleAddValue.toUpperCase() === e.name.toUpperCase()) {
                flag = false;
              }
            });
            if (!flag) {
              vm.addMedStockSpinner = false;
              return swal({
                title: "Duplicate Name",
                text: "A medicine with that name already exists, please use a different name",
                icon: "error",
              });
            }
            return actualProcess();
          } else if (res.data.status === "noneFound") {
            return actualProcess();
          } else {
            vm.addMedStockSpinner = false;
            return swal({
              title: "Oops!",
              text: "Our server didn't like that request, please try again later.",
              icon: "error",
            });
          }
        }).catch((err) => {
          vm.addMedStockSpinner = false;
          return console.log("error in Axios request", err);
        });
      }
      //this is the else part of the "if-statement" when one of the input fields are missing a value
      else {
        document.querySelectorAll(".mytarget").forEach((e) => {
          if (!e.value) {
            return e.className += " fail";
          }
        });
        return swal({
          title: "Info Required",
          text: "Please fill out all fields marked with asterick *",
          icon: "error",
        });
      }
    }

  }
}
</script>

<style scoped>
.btn-block {
  font-family: avenir;
  letter-spacing: 1px;
  cursor: pointer;
}

.btn-info {
  cursor: pointer;
}

.activebg {
  background: #17a2b8;
  color: white;
}

.fail {
  outline: 1px solid red;
  font-family: avenir;
  color: #e35d6a;
  font-size: 0.9em;
}

.medicine-results-list {
  height: 22em;
  overflow-y: scroll;
}

label {
  font-size: 0.8em;
  text-align: left !important;
}

i:hover {
  cursor: pointer;
  color: #1ab6cf;
}

.fail {
  outline: 1px solid red;
  font-family: avenir;
  color: #e35d6a;
}
</style>
