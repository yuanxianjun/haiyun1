<template>
    <div id="app">
        <el-container>
            <el-aside width="260px">
                <a href="/" id="resourceSituationManagementLogo"></a>
                <el-menu :default-active="defaultActive" :router="true">
                    <el-menu-item index="/onDuty">
                        <i class="onDuty"></i>
                        <span slot="title">备勤值班</span>
                    </el-menu-item>
                    <el-menu-item index="/dutyImportant">
                        <i class="dutyImp"></i>
                        <span slot="title">值班要情</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div class="view-wrap">
                    <router-view/>   
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {}
        },
        computed: {
            // 路由跳转
            defaultActive() {
               let path = this.$route.path
               if(path == '/')path = '/onDuty'
                return path;
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    html, body {
        height: 100%;
    }

    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    i {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 24px;
        &.onDuty {
            background-image: url('./assets/onDuty.png');
            background-repeat: no-repeat;
            background-size: contain;
        }
        &.dutyImp {
            background-image: url('./assets/dutyImp.png');
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
    .view-wrap {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: #ffffff;
        box-shadow: 5px 5px 10px #d9effc;
    }
    #resourceSituationManagementLogo {
        display: block;
        height: 110px;
        cursor: pointer;
        background: #21324f url(./assets/zbzslog.png) no-repeat center;
    }
</style>
