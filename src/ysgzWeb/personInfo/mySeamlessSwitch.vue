<template>
    <div class="my-seamless-switch">
        <a class="left-arrow"></a>
        <ul class="seamless-item">
            <li v-for="item in option.list" :class="'cer_'+item"></li>
        </ul>
        <a class="right-arrow"></a>
    </div>
</template>

<script>
    export default {
        name: "mySeamlessSwitch",
        props: {
            // options: Object
        },
        data() {
            return {
                option:{
                    list:['lever','fireFighting','UAVDrive','trainDog','lever','fireFighting','UAVDrive','trainDog'],
                    visibleNum:5,
                    direction:2,//0向下，1向上，2向左，3向右
                    switchOffset:20,//左右按钮与左右两侧的距离（px）
                    switchSingleOffset:10,
                    autoPlay:false,
                    switchSingleStep:50,//单步移动的大小（px）
                    switchSingleStepTime:1000,//定时器时间的大小，只有autoPlay为true时生效
                }
            };
        },
        created() {},
        mounted() {},
        methods: {}
    };
</script>
<style scoped lang="scss">
    //滑动组件
    .my-seamless-switch{
        overflow: hidden;
        height: 50px;
        width: 50px * 5;
        margin: 15px auto;
        position: relative;
        .left-arrow, .right-arrow,.seamless-item{
        }
        .left-arrow, .right-arrow {
            position: relative;
            display: inline-block;
            width: 22px;
            height: 22px;
            cursor: pointer;
        }
        .left-arrow{
            position: absolute;
            left:-20px;
            background: url('./assets/images/right-arrow.png') 0 0 no-repeat;
            background-size: 100% 100%;
        }
        .right-arrow{
            background: url('./assets/images/left-arrow.png') 0 0 no-repeat;
            background-size: 100% 100%;
        }
        .disabled .left-arrow{
            background: url('./assets/images/right-arrow.png') 0 0 no-repeat;
            background-size: 100% 100%;
        }
        .disabled .right-arrow{
            background: url('./assets/images/left-arrow.png') 0 0 no-repeat;
            background-size: 100% 100%;
        }
        ul.seamless-item{
            width: 50px * 8;
            li {
                float: left;
                width: 50px;
                height: 50px;
                margin: 10px;
                line-height: 120px;
                background-color: #999;
                color: #fff;
                text-align: center;
                font-size: 30px;
            }
            li.cer_lever{
                background: url(./assets/images/lever.png) 0 0 no-repeat;
                background-size: 100% 100%;
            }
            li.cer_fireFighting{
                background: url(./assets/images/fireFighting.png) 0 0 no-repeat;
                background-size: 100% 100%;
            }
            li.cer_UAVDrive{
                background: url(./assets/images/UAVDrive.png) 0 0 no-repeat;
                background-size: 100% 100%;
            }
            li.cer_trainDog{
                background: url(./assets/images/trainDog.png) 0 0 no-repeat;
                background-size: 100% 100%;
            }
        }
    }
</style>

