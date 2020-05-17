<template>
    <div class="alert container alert-danger">
{{msd}}
    </div>
</template>

<script>
export default {
    props:['msd'],
    data(){
        return{

        }
    }
}

</script>

<style scoped>

.alert-danger{
    color: #fff;
    background-color: red;
}
.alert{
    border-radius:0px;
}
</style>