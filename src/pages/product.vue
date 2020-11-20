<template>
  <div class="product">
    <ProductParams :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </ProductParams>
    <div class="content">
      <div class="item-bg">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href="" id="">全球首款双频 GP</a>
          <span>|</span>
          <a href="" id="">骁龙845</a>
          <span>|</span>
          <a href="" id="">AI 变焦双频</a>
          <span>|</span>
          <a href="" id="">红外人脸识别</a>
        </p>
        <div class="price">
          <span>￥<em>{{product.price}}</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="/imgs/product/gallery-2.png" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-3.png" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-4.png" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-5.jpg" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-6.jpg" alt="" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br />慢慢回味每一瞬间的精彩</h2>
        <p>
          后置960帧电影般超慢动作视频，将眨眼间的美妙展现的淋漓尽致！<br />更能AI
          精准分析视频内容，15个场景智能匹配背景音效
        </p>
        <div class="video-bg" @click="showSlide = true"></div>
        <div class="video-box">
          <div class="overlay" v-if="showSlide"></div>
          <div class="video" :class="{ slide: showSlide }">
            <span class="icon-close" @click="showSlide = false"></span>
            <video
              src="/imgs/product/video.mp4"
              controls
              muted
              autoplay
            ></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParams from "./../components/ProductParams";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "product",
  components: {
    ProductParams,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      product:{}, //商品信息
      swiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        }, //自动播放
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
          //分页器
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      showSlide: false, //控制视频动画效果
    };
  },
  mounted() {
    this.getProductInfo()
  },
  methods: {
    getProductInfo() {
      let id = this.$route.params.id;
      this.axios.get(`/products/${id}`).then((res) => {
        this.product = res
      });
    },
    // 立即购买按钮实现跳转到商品详情页
    buy(){
      let id = this.$route.params.id;
      this.$router.push(`/detail/${id}`)
    }
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/config";
@import "./../assets/scss/mixin";
.product {
  button {
    margin-left: 10px;
  }
  .content {
    .item-bg {
      background: url("/imgs/product/product-bg-1.png") no-repeat 50%;
      height: 718px;
      text-align: center;
      h2 {
        font-size: $fontA;
        padding-top: 55px;
      }
      h3 {
        font-size: $fontE;
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        margin-bottom: 40px;
        a {
          font-size: $fontI;
          color: $colorB;
        }
        span {
          margin: 0 15px;
        }
      }
      .price {
        font-size: 30px;
        color: $colorB;
        em {
          font-size: $fontB;
          font-style: normal;
        }
      }
    }
    .item-bg-2 {
      background: url("/imgs/product/product-bg-2.png") no-repeat 50%;
      height: 480px;
      background-size: 1226px 397px;
    }
    .item-bg-3 {
      background: url("/imgs/product/product-bg-3.png") no-repeat 50%;
      height: 638px;
      background-size: cover;
    }
    .item-swiper {
      margin: 36px auto 52px;
      .desc {
        font-size: $fontH;
        color: $colorB;
        text-align: center;
      }
      img {
        width: 100%;
      }
    }
    .item-video {
      height: 1044px;
      background-color: #070708;
      margin-bottom: 76px;
      color: $colorG;
      text-align: center;
      h2 {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }
      p {
        font-size: $fontE;
        margin-bottom: 58px;
      }
      .video-bg {
        background: url("/imgs/product/gallery-1.png") no-repeat 50%;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        cursor: pointer;
      }
      .video-box {
        .overlay {
          @include position(fixed);
          background-color: $colorB;
          opacity: 0.4;
          z-index: 10;
        }
        .video {
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 1000px;
          height: 536px;
          opacity: 0;
          transition: all 0.6s;
          &.slide {
            top: 50%;
            opacity: 1;
          }
          .icon-close {
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            z-index: 11;
            @include bgImg(20px, 20px, "/imgs/icon-close.png");
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover; //去除video自带阴影样式
            outline: none;
          }
        }
      }
    }
  }
}
</style>