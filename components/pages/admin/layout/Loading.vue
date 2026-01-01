<template>
  <div class="with_loading">
    <div class="fancybox-loading">
      <div class="loader">
        <div class="loading_inner one"></div>
        <div class="loading_inner two"></div>
        <div class="loading_inner three"></div>
      </div>
      <div class="loding_Text">Loading...</div>
    </div>
  </div>
</template>
<style lang=scss scoped>
.with_loading {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-justify-content: center;
  z-index: 10;
}

.loader {
  margin: 30px auto;
  border-radius: 50%;
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
  perspective: 1200px;
  -ms-perspective: 1200px;
  -moz-perspective: 1200px;
  -webkit-perspective: 1200px;
  text-align: center;
  width: 50px;
  height: 50px;
}

.loading_inner.one {
  border-bottom: 4px solid #fff;
}

.loading_inner.two {
  border-right: 4px solid #fff;
}

.loading_inner.three {
  border-top: 4px solid #fff;
}

.loading_inner {
  position: absolute;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border-radius: 50%;
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
  width: 100%;
  height: 100%;
}

.loading_inner.one {
  left: 0%;
  top: 0%;
  -webkit-animation: cssload-rotate-one 1.15s linear infinite;
  animation: cssload-rotate-one 1.15s linear infinite;
}

.loading_inner.two {
  right: 0%;
  top: 0%;
  -webkit-animation: cssload-rotate-two 1.15s linear infinite;
  animation: cssload-rotate-two 1.15s linear infinite;
}

.loading_inner.three {
  right: 0%;
  bottom: 0%;
  -webkit-animation: cssload-rotate-three 1.15s linear infinite;
  animation: cssload-rotate-three 1.15s linear infinite;
}

.fancybox-loading .loding_Text {
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
}

.fancybox-loading {
  height: unset !important;
  height: 100%;
}

@-webkit-keyframes cssload-rotate-one {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }

  100% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes cssload-rotate-one {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }

  100% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@-webkit-keyframes cssload-rotate-two {
  0% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }

  100% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes cssload-rotate-two {
  0% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }

  100% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@-webkit-keyframes cssload-rotate-three {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }

  100% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}

@keyframes cssload-rotate-three {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }

  100% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>