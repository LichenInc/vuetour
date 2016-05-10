<script>
import snabbt from 'snabbt.js'
export default {
  name: 'Touri',
  methods: {
    zoomToBlueBox() {
      const box = this.$els.bluebox
      this.zoomTo(box)
    },
    zoomToRedBox() {
      const box = this.$els.redbox
      this.zoomTo(box)
    },
    zoomTo(el) {
      const padding = 0
      const bounds = el.getBoundingClientRect()

      const x = bounds.left - padding
      const y = bounds.top - padding
      const width = bounds.width + (padding * 2)
      const height = bounds.height + (padding * 2)

      this.magnify({ x, y, width, height }, 2)
    },
    magnify({ x, y, width, height }, scale) {
      // Center the rect within the zoomed viewport
      const viewport = this.$els.viewport
      const viewport_h = viewport.getBoundingClientRect().height
      const viewport_w = viewport.getBoundingClientRect().width
      const viewport_x = viewport.getBoundingClientRect().left
      const viewport_y = viewport.getBoundingClientRect().top

      const relative_x = (x - viewport_x) * scale
      const relative_y = (y - viewport_y) * scale

      const offset_x = relative_x - (viewport_w - (width * scale)) / 2
      const offset_y = relative_y - (viewport_h - (height * scale)) / 2

      const transform = `translate(${-offset_x}px, ${-offset_y}px) scale(${scale})`

      const container = this.$els.container
      const origin = '0px 0px 0px'
      // const origin = `${viewport_x}px ${viewport_y}px`
      container.style.transformOrigin = origin
			container.style.OTransformOrigin = origin
			container.style.msTransformOrigin = origin
			container.style.MozTransformOrigin = origin
			container.style.WebkitTransformOrigin = origin

      // container.style.transform = transform
      // container.style.OTransform = transform
      // container.style.msTransform = transform
      // container.style.MozTransform = transform
      // container.style.WebkitTransform = transform
      snabbt(element, {
        position: [-offset_x, -offset_y, 0],
        scale: [scale, scale, 0],
        easing: 'ease',
      })
    },
  },
}

</script>

<template lang="jade">

.app
  | Tour
  .viewport(v-el:viewport)
    .container(v-el:container)
      .blue-box(v-el:bluebox, v-on:click="zoomToBlueBox")
      .red-box(v-el:redbox, v-on:click="zoomToRedBox")
    .fakecontainer()
      .blue-box
      .red-box

</template>

<style lang="scss">
  .app {


  position: absolute;
  width: 100%;
  height: 100%;
  .viewport {
    position: absolute;
    top: 20%;
    left: 20%;
    right: 20%;
    bottom: 20%;
    width: 60%;
    height: 60%;
    overflow:hidden;
    border: 2px solid black;

    .container {
      // position: absolute;
      // top: 0;
      // left: 0;


      height: 100%;
      width: 100%;
      position: relative;
      // right: 0;
      // bottom: 0;
    }
    .fakecontainer {
      // height: 100%;
      // width: 100%;
      transform: scale(2);
      opacity: .3;
      position: absolute;
      top: 0;
      left: 0;
    }

    .blue-box {
      width: 200px;
      height:100px;
      background-color: blue;
      position: absolute;
      top: 90px;
      left: 89px;
    }
    .red-box {
      width: 200px;
      height:300px;
      background-color: red;
      position: absolute;
      bottom: 90px;
      right: 89px;
    }
  }
}
</style>
