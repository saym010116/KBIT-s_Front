<template>
<div class="card card-body">
    <h2>404 Not Found</h2>
    <p>존재하지않는요청경로: {{$route.fullPath}}</p>
</div>
</template>

<script>
export default {
    name:"NotFound",
    created() {
        console.log(this.$route.params)
    }
}
</script>