<template>
  <b-row class="account-search">
    <b-col cols="6" sm="4" md="2" lg="2">
      <select name="level" class="form-control c-square c-theme">
        <option value="">Chọn Level</option>
        <option value="1">Dưới 5x</option>
        <option value="2">Level 5x</option>
        <option value="3">Level 6x</option>
        <option value="4">Level 7x</option>
        <option value="5">Level 8x</option>
        <option value="6">Level 9x</option>
        <option value="7">Level 10x</option>
        <option value="8">Level 11x</option>
        <option value="9">Level 12x</option>
        <option value="10">Level 13x</option>
      </select>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <select name="locgia" class="form-control c-square c-theme">
        <option value="">Giá Tiền</option>
        <option value="1">Giá Từ 0 đến 50k</option>
        <option value="2">Giá Từ 50k đến 100k</option>
        <option value="3">Giá 100k đến 300k</option>
        <option value="4">Giá 300k đến 500k</option>
        <option value="5">Giá 500k đến 1 Triệu</option>
        <option value="6">Giá 1tr đến 3 Triệu</option>
        <option value="7">Giá Trên 3 Triệu</option>
      </select>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <select name="class" class="form-control c-square c-theme">
        <option value="" selected="">Chọn Class</option>
        <option value="0" >Chưa</option>
        <option value="1">Đao</option>
        <option value="2">Kiếm</option>
        <option value="3">Tiêu</option>
        <option value="4">Cung</option>
        <option value="5">Quạt</option>
        <option value="6">Kunai</option>
      </select>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <select name="server" class="form-control c-square c-theme">
        <option value="">Chọn Server</option>
        <option value="1">Sv1 - Bokken</option>
        <option value="2">Sv2+3 - Shuriken + Tessen</option>
        <option value="4">Sv4 - Kunai</option>
        <option value="5">Sv5 - Katana</option>
        <option value="6">Sv6 - Tone</option>
        <option value="7">Sv7 - Sanzu</option>
        <option value="8">Sv8 - Sensha</option>
      </select>
    </b-col>
    <b-col cols="6" sm="4" md="2" lg="2">
      <input
        type="text"
        class="form-control c-square c-theme champ_name"
        placeholder="Nhập ID nick..."
        name="id"
        value=""
      />
    </b-col>
    <b-col cols="3" sm="2" md="1" lg="1">
      <b-button
        type="submit"
        name="timkiem"
        class="btn btn-info btn-search text-white"
      >
        <i class="fa fa-search"></i> Tìm kiếm
      </b-button>
    </b-col>
    <b-col cols="3" sm="2" md="1" lg="1">
      <b-button type="" name="" class="btn btn-success btn-search text-white"
        ><i class="fa fa-list"></i> Tất cả</b-button
      >
    </b-col>
  </b-row>
</template>

<script>
export default {
  components: {},

  created() {},

  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.account-search {
  margin-bottom: 20px;
  margin: -3px -3px 15px -3px;
  border: 1px solid #663019;
  background: #ffefa3;
  border-radius: 5px;
  padding: 3px;
  .col-6,
  .col-3,
  .col-2,
  .col-1 {
    padding: 3px;
    border-radius: 3px;
    width: 100%;
  }
  .form-control {
    height: 30px !important;
    padding: 3px 6px;
    font-size: 15px;
    font-weight: 400;
    /* line-height: 1.5; */
    border: 1px solid #ced4da;
  }
}
.btn-search {
  width: 100%;
  height: 30px;
  padding: 3px !important;
  border-radius: 5px;
}
</style>
