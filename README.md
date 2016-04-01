# vue-clap

vue-clap is a simple vue.js directive for unified click and tap events handling.
This works well for a case when all you need is just a tap event, and don't want
to load hammer.js into your bundle.

If you need more advanced touch screen support, then use [vue-touch](https://github.com/vuejs/vue-touch)

# usage

``` vue
<template>
<div>
  <!-- you can use v-clap instead of v-on:click -->
  <a href='#' v-clap='handleClickOrTap'>Click me<a>

  <!-- you can also use .prevent modifier to call event.preventDefault() -->
  <a href='#' v-clap.prevent='handleClickOrTap'>Click me and prvent default<a>
</div>
</template

<script>
import Vue from 'vue'
import vueClap from 'vue-clap'

Vue.use(vueClap)

export default {
  methods: {
    handleClickOrTap(e) {
      console.log('Clicked or taped!', e)
    }
  }
}
</script>
```

# install

Grab it from npm:

```
npm install vue-clap
```

# license

MIT
