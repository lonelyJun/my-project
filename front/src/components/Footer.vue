<template>
    <div id="footer">
        <h1>{{title}}</h1>

    </div>
</template>

<script>
    export default {
        name: "Footer",
        props:["title"]
    }
</script>

<style scoped>
    #footer{
        position: absolute;
        width: 100%;
        height: 200px;
        bottom: 0px;
        background-color: #ddd;
    }
</style>