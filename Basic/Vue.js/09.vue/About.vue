<!--<template>
  <div class="card card-body">
    <h2>About</h2>
    <p>요청 경로 : {{ $route.fullPath }}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  created() {
    console.log(this$route)
  },
}
</script>
<style></style> 
-->

<!--
<template>
  <div class="card card-body">
    <h2>About</h2>
    <p>요청 경로 : {{ currentRoute.fullPath }}</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

export default {
  name: 'About',
  setup() {
    const currentRoute = useRoute()

    onMounted(() => {
      console.log(currentRoute)
    })

    return { currentRoute }
  },
}
</script>

<style></style> -->

<template>
  <div class="card card-body">
    <h2>About</h2>
    <p>요청 경로 : {{ currentRoute.fullPath }}</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: 'About',
  setup() {
    const currentRoute = useRoute();
    return { currentRoute };
  },
};
</script>
<style></style>
