<template>
    <div>
        {{title}}
        <Footer :title="subTitle"></Footer>
    </div>
</template>

<script>
    import Footer from "./Footer";
    export default {
        name: "HelloJohn",
        data(){
            return {title:"Hello John Yu",
            subTitle:"This is Footer......."
            }
        },
        components:{Footer}
    }
</script>

<style scoped>

</style>