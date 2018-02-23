<template>
<div class="col-md-10 outer-div ml-5">
  <form class="mt-5">
    <div class="form-row col-sm-10 mx-auto">
      <div class="form-group col-md-6">
        <input type="number" class="form-control" placeholder="Medicines with this qty or less" v-model="minQty">
      </div>
      <div class="form-group col-md-3">
        <button class="form-control btn btn-primary" @click.prevent="getLowStock">Get Low Stock Report</button>
      </div>
    </div>
  </form>
  <hr>
  <div class="medicine-low-stock col-sm-8 clearfix" v-for="med in reportArr" :key="med._id">
    <div class="col-sm-5 float-left">{{med.name}}</div>
    <span class="float-right">{{med.currentStock}}</span>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      minQty: "",
      // reportUrl: "http://localhost:3000/report",
      reportArr: []
    }
  },
  methods: {
    getLowStock() {
      if (!this.minQty) {
        return swal({
          title: "Info Required",
          text: "Specify the maximum amount a medicine can have. Click OK to try again.",
          icon: "error",
        });
      }
      axios.get(`${this.$store.state.myUrl}/report/lowStock/${this.minQty}`).then((res) => {
        if (res.data.status === "success") {
          return this.reportArr = res.data.reportArr;
        }
        return swal({
          title: "Oops",
          text: "Couldn't get low stock, click OK to try again",
          icon: "error",
        });
      });

    }
  }
}
</script>

<style scoped>
form {}

.btn {
  cursor: pointer;
}

.outer-div {
  height: 40em;
  overflow-y: scroll;
}

.medicine-low-stock {
  border-bottom: 1px solid #dedede;
  padding-top: 3%;
}
</style>
