<template>
    <div class="alert container alert-success">
{{msg}}
    </div>
</template>

<script>
export default {
    props:['msg'],
    data(){
        return{

        }
    }
}

</script>

<style scoped>

.alert-success{
    color: #fff;
    background-color: green;
}
.alert{
    border-radius:0px;
}
</style>