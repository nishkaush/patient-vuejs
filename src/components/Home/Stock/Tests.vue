<template>
<div class="col-sm-8 mx-auto">

  <div class="mt-5">
    <button class="btn btn-outline-info btn-block" @click.prevent="addTestClick" :class="{activebg:showTestAdd}">Add New Test</button>
    <form class="mt-3 mb-3 col-sm-10 mx-auto" v-show="showTestAdd===true">
      <div class="form-row">
        <div class="form-group col-sm-8">
          <input type="text" class="form-control" placeholder="Enter Test Name *" autofocus required v-model="testTitleAdd">
        </div>
        <div class="form-group col-sm-3">
          <button class="btn btn-info form-control" @click.prevent="addNewTest">Add <i class="fa fa-spinner fa-fw fa-lg" aria-hidden="true" v-if="addTestStockSpinner===true"></i></button>
        </div>
      </div>
    </form>
  </div>



  <div class="">
    <button class="btn btn-outline-info btn-block" @click.prevent="searchTestClick" :class="{activebg:showTestSearch}">Search Existing Tests</button>
    <form v-show="showTestSearch===true" class="col-sm-12 mt-4 form-div-with-search">
      <div class="form-row">
        <div class="form-group col-sm-8">
          <input type="text" class="form-control" placeholder="Enter a test name to search" v-model="testSearchTerm">
        </div>
        <div class="form-group col-sm-3">
          <button class="btn btn-info form-control" @click.prevent="lookUpTests">Search <i class="fa fa-spinner fa-fw fa-lg" aria-hidden="true" v-if="searchTestStockSpinner===true"></i></button>
        </div>
      </div>

      <small v-show="testFound===false">No Results Found</small>

      <div class="form-row" v-for="test in testsArr" :key="test._id">
        <div class="form-group col-sm-8">
          <input type="text" class="form-control resultTestName" :value="test.name" readonly :data-id="test._id">
        </div>
        <div class="form-group col-sm-4">
          <i class="fa fa-trash fa-lg pr-2" aria-hidden="true" :data-id="test._id" @click.prevent="deleteTest"></i>&nbsp;
          <i class="fa fa-pencil fa-lg pr-2" aria-hidden="true" :data-id="test._id" @click.prevent="editTest"></i>&nbsp;
          <i class="fa fa-floppy-o fa-lg pr-2" aria-hidden="true" :data-id="test._id" style="display:none;" @click.prevent="updateTest"></i>&nbsp;
        </div>
      </div>
    </form>
  </div>


</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      searchTestStockSpinner: false,
      addTestStockSpinner: false,
      showTestAdd: false,
      showTestSearch: false,
      testTitleAdd: "",
      testSearchTerm: "",
      // testUrl: "http://localhost:3000/stock",
      testFound: true,
      testsArr: [],
      allTestsFromDB: []
    }
  },
  methods: {
    addTestClick() {
      this.showTestAdd = !this.showTestAdd;
      this.showTestSearch = false;
    },
    searchTestClick() {
      this.showTestSearch = !this.showTestSearch;
      this.showTestAdd = false;
    },
    editTest(event) {
      let newArr = Array.from(document.querySelectorAll(".resultTestName"));
      newArr.forEach((e) => {
        if (e.dataset.id === event.target.dataset.id) {
          e.readOnly = false;
          event.target.nextElementSibling.style.display = "inline";
        }
      });
    },
    deleteTest(event) {
      let indexToSplice = "";
      this.testsArr.forEach((e) => {
        if (e._id === event.target.dataset.id) {
          indexToSplice = this.testsArr.indexOf(e);
        }
      });
      axios.post(`${this.$store.state.myUrl}/stock/deleteTest`, {
        id: event.target.dataset.id
      }).then((res) => {
        if (res.data.status = "success") {
          this.testsArr.splice(indexToSplice, 1);
          swal({
            title: "Success!",
            text: "Test Deleted successfully,click OK to continue",
            icon: "success",
          });
        }
      });
    },
    lookUpTests() {
      if (!this.testSearchTerm) {
        return swal({
          title: "Oops!",
          text: "Please provide a search term, click OK to try again",
          icon: "error",
        });
      }
      this.searchTestStockSpinner = true;
      axios.get(`${this.$store.state.myUrl}/stock/searchTests/${this.testSearchTerm}`).then((res) => {
        if (res.data.status === "success") {
          this.testFound = true;
          this.searchTestStockSpinner = false;
          return this.testsArr = res.data.testsArr;
        } else if (res.data.status === "none") {
          this.searchTestStockSpinner = false;
          return this.testFound = false;
        } else {
          this.searchTestStockSpinner = false;
          swal({
            title: "Oops!",
            text: "Couldn't look up that term, please try again",
            icon: "error",
          });
        }
      });
    },
    updateTest(event) {
      let myInput = document.querySelector(`.resultTestName[data-id="${event.target.dataset.id}"]`);
      let indexToSplice = "";
      this.testsArr.forEach((e) => {
        if (e._id === event.target.dataset.id) {
          indexToSplice = this.testsArr.indexOf(e);
        }
      })
      if (!myInput.value) {
        return swal({
          title: "Oops!",
          text: "Please provide a search term, click OK to try again",
          icon: "error",
        });
      }
      axios.post(`${this.$store.state.myUrl}/stock/updateTest`, {
        name: myInput.value,
        id: event.target.dataset.id
      }).then((res) => {
        if (res.data.status === "success") {
          this.testsArr.splice(indexToSplice, 1, res.data.test);
          myInput.readOnly = true;
          event.target.style.display = "none";
          return swal({
            title: "Success!",
            text: "Updated test details,click OK to continue",
            icon: "success",
          });
        }
        return swal({
          title: "Oops",
          text: "Something went wrong while updating test, please try again",
          icon: "error",
        });
      });
    },
    addNewTest() {
      let flag = true;
      this.allTestsFromDB.forEach((e) => {
        if (e.name.toUpperCase() === this.testTitleAdd.toUpperCase()) {
          flag = false;
        }
      });

      if (!flag) {
        return swal({
          title: "Duplicate",
          text: "A test with that name already exists, click OK to try a different name.",
          icon: "error",
        });
      }
      this.addTestStockSpinner = true;
      axios.post(`${this.$store.state.myUrl}/stock/addNewTest`, {
        name: this.testTitleAdd
      }).then((res) => {
        if (res.data.status === "success") {
          this.testTitleAdd = "";
          this.addTestStockSpinner = false;
          swal({
            title: "Success!",
            text: "New test added,click OK to continue",
            icon: "success",
          });
        } else {
          this.addTestStockSpinner = false;
          swal({
            title: "Oops",
            text: "Something went wrong while saving test, please try again",
            icon: "error",
          });
        }
      });

    } //---------------->>>>>>>>>>>>add new test ends here
  },
  mounted() {
    if (this.allTestsFromDB.length === 0) {
      axios.get(`${this.$store.state.myUrl}/stock/getAllTests`).then((res) => {
        if (res.data.status === "success") {
          this.allTestsFromDB = res.data.allTestList;
        }
      });
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

.activebg {
  background: #17a2b8;
  color: white;
}

.btn-info {
  cursor: pointer;
}

.form-div-with-search {
  height: 25em;
  overflow-y: scroll;
}

i:hover {
  color: #1ab6cf;
  cursor: pointer;
}
</style>
