<template>
  <div class="header">
    <!-- 上部导航栏 -->
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="JavaScript:;">小米商城</a>
          <a href="JavaScript:;">MUI</a>
          <a href="JavaScript:;">云服务</a>
          <a href="JavaScript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <!-- 登录与非登录两种状态下的不同显示 -->
          <a href="JavaScript:;" v-if="username">{{ username }}</a>
          <a href="JavaScript:;" v-if="!username" @click="login()">登录</a>
          <a href="JavaScript:;" v-if="username" @click="logout()">退出</a>
          <a href="JavaScript:;" v-if="username" @click="gotoOrderList()">我的订单</a>
          <a href="JavaScript:;" class="my-cart" @click="goToCart()">
            <span class="icon-cart"></span>
            购物车({{ cartCount }})
          </a>
        </div>
      </div>
    </div>
    <!-- 下部导航栏 -->
    <div class="nav-header">
      <div class="container">
        <!-- logo -->
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <!-- 产品菜单 -->
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <!-- 鼠标经过菜单按钮时，显示产品子项，v-for渲染获取到的数据 -->
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, index) in phoneList"
                  :key="index"
                >
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <!-- <div class="children"></div> -->
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="" />
                    </div>
                    <div class="pro-name">小米壁挂电视 65寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="" />
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="" />
                    </div>
                    <div class="pro-name">小米电视4A 32寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="" />
                    </div>
                    <div class="pro-name">小米电视4A 55寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="" />
                    </div>
                    <div class="pro-name">小米电视4A 65寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="" />
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 搜索 -->
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: [],
    };
  },
  computed: {
    ...mapState(["username", "cartCount"]),
    // username(){
    //   return this.$store.state.username;
    // },
    // cartCount(){
    //   return this.$store.state.cartCount;
    // }
  },
  // 过滤器，将数据经过转换＋‘¥’、‘元’符号
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "¥" + val.toFixed(2) + "元";
    },
  },
  mounted() {
    this.getProductList();
    let params = this.$route.params;
    if (params && params.from == "login") {
      this.getCartCount();
    }
  },
  methods: {
    // 跳转到登录页面
    login() {
      this.$router.push("/login");
    },
    // 获取产品数据
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012",
            pageSize: 6,
          },
        })
        .then((res) => {
          // console.log(res)
          this.phoneList = res.list.slice(0, 6);
        });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        console.log("zzz" + res);
        this.$store.dispatch("saveCartCount", res);
      });
    },
    // 退出登录
    logout() {
      this.axios.post("/user/logout").then(() => {
        this.$message.success("退出成功");
        this.$cookie.set("userId", "", { expires: "-1" });
        this.$store.dispatch("saveUserName", "");
        this.$store.dispatch("saveCartCount", 0);
      });
    },
    // 跳转到购物车页面
    goToCart() {
      this.$router.push("/cart");
    },
    gotoOrderList(){
      this.$router.push("/order/list");
    }
  },
};
</script>

<style lang="scss">
@import "../assets/scss/base";
@import "../assets/scss/mixin";
@import "../assets/scss/config";
.header {
  // 上部导航栏样式
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #fff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
  // 下部导航栏样式
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      // logo图标样式

      // logo右侧菜单样式
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0px;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: height 0.5s;
            background-color: #fff;
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              &:before {
                content: "";
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child:before {
                display: none;
              }
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
            }
          }
        }
      }
      // 搜索框样式
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            border: none;
            box-sizing: border-box;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>