<template>
  <svg
    v-if="button"
    xmlns="http://www.w3.org/2000/svg"
    class="lds-camera"
    width="36px"
    height="36px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="translate(50,50)">
      <g transform="scale(0.7)">
        <g transform="translate(-50,-50)">
          <g transform="rotate(270.72 50 50)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              values="360 50 50;0 50 50"
              keyTimes="0;1"
              dur="1s"
              keySplines="0.5 0.5 0.5 0.5"
              calcMode="spline"
            />
            <path
              fill="#f05125"
              d="M54.3,28.1h34.2c-4.5-9.3-12.4-16.7-21.9-20.8L45.7,28.1L54.3,28.1L54.3,28.1z"
            />
            <path
              fill="#fdb813"
              d="M61.7,7.3C51.9,4,41.1,4.2,31.5,8.1v29.5l6.1-6.1L61.7,7.3C61.7,7.3,61.7,7.3,61.7,7.3z"
            />
            <path
              fill="#7fbb42"
              d="M28.1,11.6c-9.3,4.5-16.7,12.4-20.8,21.9l20.8,20.8v-8.6L28.1,11.6C28.1,11.6,28.1,11.6,28.1,11.6z"
            />
            <path
              fill="#32a0da"
              d="M31.5,62.4L7.3,38.3c0,0,0,0,0,0C4,48.1,4.2,58.9,8.1,68.5h29.5L31.5,62.4z"
            />
            <path
              fill="#f05125"
              d="M45.7,71.9H11.5c0,0,0,0,0,0c4.5,9.3,12.4,16.7,21.9,20.8l20.8-20.8H45.7z"
            />
            <path
              fill="#fdb813"
              d="M62.4,68.5L38.3,92.6c0,0,0,0,0,0c9.8,3.4,20.6,3.1,30.2-0.8V62.4L62.4,68.5z"
            />
            <path
              fill="#7fbb42"
              d="M71.9,45.7v8.6v34.2c0,0,0,0,0,0c9.3-4.5,16.7-12.4,20.8-21.9L71.9,45.7z"
            />
            <path
              fill="#32a0da"
              d="M91.9,31.5C91.9,31.5,91.9,31.5,91.9,31.5l-29.5,0l0,0l6.1,6.1l24.1,24.1c0,0,0,0,0,0 C96,51.9,95.8,41.1,91.9,31.5z"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="margin: 0 auto; display: block; shape-rendering: auto"
    :width="`200px`"
    :height="`150px`"
    :style="button ? `marginTop:0px` : ``"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    class="flex"
  >
    <g transform="translate(20 50)">
      <circle cx="0" cy="0" r="6" fill="#e15b64">
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.375s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </g>
    <g transform="translate(40 50)">
      <circle cx="0" cy="0" r="6" fill="#f8b26a">
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.25s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </g>
    <g transform="translate(60 50)">
      <circle cx="0" cy="0" r="6" fill="#abbd81">
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.125s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </g>
    <g transform="translate(80 50)">
      <circle cx="0" cy="0" r="6" fill="#81a3bd">
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="0s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    button: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
