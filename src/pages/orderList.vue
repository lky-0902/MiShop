<template>
  <div class="order-list">
    <OrderHeader title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </OrderHeader>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ order.createTime }}
                <span>|</span>
                {{ order.receiverName }}
                <span>|</span>
                订单号：{{ order.orderNo }}
                <span>|</span>
                {{ order.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ order.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(item, i) in order.orderItemVoList"
                  :key="i"
                >
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ item.productName }}</div>
                    <div class="p-money">
                      {{ item.currentUnitPrice }} × {{ item.quantity }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <a href="javascript:;">{{ order.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="gotoPay(order.orderNo)">{{
                  order.statusDesc
                }}</a>
              </div>
            </div>
          </div>
          <!-- 一. 分页器进行分页 -->
          <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
          >
          </el-pagination>
          <!-- 二. 按钮加载更多分页方式-->
          <!-- <el-button type="primary" :loading="loading" @click="loadMore"
            >加载更多</el-button
          > -->
          <!-- 三. 使用插件滚动加载，略微描述一下，无代码实现。
            1.安装：npm install vue-infinite-scroll --save
            2.引入：import infiniteScroll from 'vue-infinite-scroll'
            3.和name、data同级配置：driectives:{infiniteScroll}
            4.使用：<div class="scroll-more"
          v-infinite-scroll="scrollMore" infinite-scroll-disabled="busy"
          infinite-scroll-distance="410">
            <img src="/imgs/loading-svg/loading-spinning-bubbles.png" alt="" v-show="loading">
          </div>
            5.在data中定义busy:true
            6.getOrderList3(){
              this.loading = true
              this.axios.get('/orders',{
                params:{
                  pageSize:this.pageSize,
                  pageNum:this.pageNum
                }
              }).then(res => {
                this.list = this.list.concat(res.list)
                this.loading = false
                if(res.hasNextPage){
                  this.busy = false
                }else{
                  this.busy = true
                }
              })
            }
            7.定义方法scrollMore
              scrollMore(){
                this.busy = true
                setTimeout(() => {
                  this.pageNum++
                  this.getOrderList3()
                },500)
              }
           -->
          <NoData v-if="!loading && list.length == 0"></NoData>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader";
import Loading from "./../components/Loading";
import NoData from "./../components/NoData";
import { Pagination, Button } from "element-ui";
export default {
  name: "list",
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]: Pagination,
    [Button.name]: Button,
  },
  data() {
    return {
      loading: true,
      list: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.axios
        .get("/orders", {
          params: {
            pageSize:this.pageSize,
            pageNum: this.pageNum,
          },
        })
        .then((res) => {
          this.loading = false;
          this.list = res.list;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 加载更多分页方式使用
    // getOrderList() {
    //   this.loading = true;
    //   this.axios
    //     .get("/orders", {
    //       params: {
    //         pageSize: this.pageSize,
    //         pageNum: this.pageNum,
    //       },
    //     })
    //     .then((res) => {
    //       this.loading = false;
    //       this.list = this.list.concat(res.list);
    //       this.total = res.total;
    //     })
    //     .catch(() => {
    //       this.loading = false;
    //     });
    // },
    gotoPay(orderNo) {
      // this.$router.push({
      //   name:'order-pay',
      //   query:{
      //     orderNo
      //   }
      // })
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo,
        },
      });
    },
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    // 加载更多方式分页
    // loadMore() {
    //   this.PageNum++;
    //   this.getOrderList();
    // },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        border: 1px solid $colorH;
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          height: 74px;
          line-height: 74px;
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            height: 145px;
            line-height: 145px;
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: center;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: $colorA;
      }
      .el-button--primary {
        background-color: $colorA;
        border-color: $colorA;
      }
    }
  }
}
</style>