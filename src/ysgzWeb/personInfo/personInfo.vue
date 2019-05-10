<template>
    <div id="personInfo" class="main">
        <comHeader></comHeader>
        <backHome :localPage="pageLinkObj"></backHome>
        <div class="header">
            <div class="header_left">
                <!-- 退出按钮  -->
                <comOut></comOut>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <div class="_block">
                    <div class="item">
                        <div class="title">
                            <i class="box"></i>
                            <label>人员头像</label>
                        </div>
                        <div class="info">
                            <div class="pic">
                                <img src="./assets/images/portrait.png">
                            </div>
                            <div class="_swiper">
                                <a class="button-prev _disabled" @click="goPrev"></a>
                                <div class="swiper-container">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide" v-for="cer in personData.certificateList" :class="'cer_'+cer"></div>
                                    </div>
                                    <div id="next" class="swiper-button-next"></div>
                                    <div id="prev" class="swiper-button-prev"></div>
                                </div>
                                <a :class="[personData.certificateList.length == 4 ? '_disabled':'','button-next']" @click="goNext"></a>
                            </div>

                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            <i class="box"></i>
                            <label>基本信息</label>
                        </div>
                        <table>
                            <tr>
                                <th>姓名:</th>
                                <td>{{personData.baseInfo.name}}</td>
                                <th>性别:</th>
                                <td>{{personData.baseInfo.sex}}</td>
                            </tr>
                            <tr>
                                <th>年龄:</th>
                                <td>{{personData.baseInfo.age}}</td>
                                <th>出生日期:</th>
                                <td>{{personData.baseInfo.birth}}</td>
                            </tr>
                            <tr>
                                <th>手机号:</th>
                                <td>{{personData.baseInfo.phone}}</td>
                                <th>身份证号:</th>
                                <td>{{personData.baseInfo.idcard}}</td>
                            </tr>
                            <tr>
                                <th>专业:</th>
                                <td>{{personData.baseInfo.major}}</td>
                                <th>毕业院校:</th>
                                <td>{{personData.baseInfo.university}}</td>
                            </tr>
                            <tr>
                                <th>学历:</th>
                                <td>{{personData.baseInfo.education}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="_block">
                    <div class="item">
                        <div class="title">
                            <i class="box"></i>
                            <label>干部信息</label>
                        </div>
                        <div class="info">
                            <div class="t_body">
                                <div class="t_row">
                                    <div class="t_l">任干日期：</div>
                                    <div class="t_r">{{personData.cadreInfo.appointmentDate}}</div>
                                </div>
                                <div class="t_row">
                                    <div class="t_l">所属机构：</div>
                                    <div class="t_r">{{personData.cadreInfo.orgName}}</div>
                                </div>
                                <div class="t_row">
                                    <div class="t_l">岗位：</div>
                                    <div class="t_r">{{personData.cadreInfo.post}}</div>
                                </div>
                                <div class="t_row">
                                    <div class="t_l">消防救援衔：</div>
                                    <div class="t_r">{{personData.cadreInfo.fireRescueTitle}}</div>
                                </div>
                                <div class="t_row">
                                    <div class="t_l">办公电话号码：</div>
                                    <div class="t_r">{{personData.cadreInfo.tel}}</div>
                                </div>
                            </div>
                            <div class="t_body">
                                <div class="t_row">
                                    <div class="t_l">进入机构日期：</div>
                                    <div class="t_r">{{personData.cadreInfo.enterOrgDate}}</div>
                                </div>
                                <div class="t_row">
                                    <div class="t_l">从事专业：</div>
                                    <div class="t_r">{{personData.cadreInfo.servingMajor}}</div>
                                </div>
                                <div class="t_row">
                                    <div class="t_l">通讯地址：</div>
                                    <div class="t_r">{{personData.cadreInfo.address}}</div>
                                </div>
                                <div class="t_row">
                                    <div class="t_l">公安网电子邮箱：</div>
                                    <div class="t_r">{{personData.cadreInfo.innerEmail}}</div>
                                </div>
                                <div class="t_row">
                                    <div class="t_l">因特网电子邮箱：</div>
                                    <div class="t_r">{{personData.cadreInfo.internetEmail}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            <i class="box"></i>
                            <label>训练成绩</label>
                        </div>
                        <div class="info">
                            <p>上一年度评分：{{personData.trainReport.lastYearResult}}</p>
                            <p>最近训练：</p>
                            <div class="lasterTrain">
                                <div class="t_item" v-for="index in 6">
                                    <template v-if="index <= personData.trainReport.latestTrainResult.length">
                                        <div class="t_header">{{personData.trainReport.latestTrainResult[index-1].title}}</div>
                                        <div class="t_con">{{personData.trainReport.latestTrainResult[index-1].result}}</div>
                                    </template>
                                    <template v-else>
                                        <div class="t_header"></div>
                                        <div class="t_con"></div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            <i class="box"></i>
                            <label>灭火救援</label>
                        </div>
                        <div class="info">
                            <div v-for="rescue in personData.rescueData" :class="'rescue_item '+ rescue.type">
                                <div>
                                    <div class="rescue_item_title">{{rescue.title}}</div>
                                    <div class="rescue_item_data">{{rescue.num}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            <i class="box"></i>
                            <label>公文数据及邮件数据</label>
                        </div>
                        <div class="info">
                            <div class="doc_email">
                                <div class="doc_email_item_title">公文收/发</div>
                                <div class="doc_email_item_data">{{personData.docAndEmailData.receiveDoc}}/{{personData.docAndEmailData.sendDoc}}<span>封</span></div>
                            </div>
                            <div class="doc_email">
                                <div class="doc_email_item_title">邮件收/发</div>
                                <div class="doc_email_item_data">{{personData.docAndEmailData.receiveDoc}}/{{personData.docAndEmailData.sendDoc}}<span>封</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="right">
                <div class="_block">
                    <div class="item">
                        <div class="title">
                            <i class="box"></i>
                            <label>工作经历</label>
                        </div>
                        <div class="jobExperience">
                            <div class="step_item" v-for="step in personData.jobExperience">
                                <div class="step_time">{{step.time}}</div>
                                <div class="step_con">{{step.content}}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // 引入头部的组件
    import comHeader from "../components/comHeader";
    import comOut from "../components/comOut";
    import backHome from "../components/toHome";

    // // 引入滑动组件
    import vueSeamlessScroll from "vue-seamless-scroll";

    export default {
        name: "searchPerson",
        data() {
            return {
                swiper:null,
                pageLinkObj:[
                    {link:'searchPerson.html',name:'人员搜索'},
                    {link:'personInfo.html',name:'人员画像'},
                ],
                personData:{
                    baseInfo:{
                        name:'施耐庵',
                        sex:'男',
                        age:'40',
                        birth:'1976年6月20号',
                        phone:'18789898787',
                        idcard:'410823197606200923',
                        major:'网络工程',
                        university:'北京大学',
                        education:'大学本科',
                        pic:'./assets/images/portrait.png',
                    },
                    certificateList:[
                        'lever','fireFighting','UAVDrive','trainDog','lever','fireFighting','UAVDrive','trainDog'
                    ],
                    cadreInfo:{
                        appointmentDate:'2017-01-28',
                        enterOrgDate:'2018-09-01',
                        orgName:'应急管理部',
                        servingMajor:'行政专业',
                        post:'科长',
                        address:'贵阳市第一大道15号',
                        fireRescueTitle:'一级指挥员',
                        innerEmail:'gongan@mps.gov.cn',
                        tel:'0851-82340989',
                        internetEmail:'1009823450@163.com'
                    },
                    trainReport:{
                        lastYearResult:'优秀',
                        latestTrainResult:[
                            {title:'单杠卷腹',result:'50个'},
                            {title:'出战控火',result:'优秀'},
                            {title:'枪炮协同灭火',result:'优秀'},
                        ]
                    },
                    rescueData:[
                        {
                            type:'fireFighting',
                            title:'火灾扑救',
                            num:228,
                        },
                        {
                            type:'emergencyRescue',
                            title:'抢险救援',
                            num:172,
                        }
                    ],
                    docAndEmailData:{
                            sendDoc:1,
                            receiveDoc:2,
                            sendEmail:1,
                            receiveEmail:2
                    },
                    jobExperience:[
                        {
                            time:'2017-11-12',
                            content:'进入贵阳省消防支队'
                        },
                        {
                            time:'2018-01-12',
                            content:'就任科长'
                        },
                        {
                            time:'2018-05-12',
                            content:'调入贵阳省消防总队'
                        },
                        {
                            time:'2019-02-12',
                            content:'离开贵阳省消防总队'
                        },
                        {
                            time:'2019-02-12',
                            content:'离开贵阳省消防总队'
                        },
                        {
                            time:'2019-02-12',
                            content:'离开贵阳省消防总队'
                        },
                    ]


                }
            };
        },
        created() {},
        mounted() {
            this.swiper = new Swiper('.swiper-container', {
                slidesPerView: 4,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        },
        methods: {
            goPrev:function(){
                document.querySelector("#prev").click();
                document.querySelector(".button-next").classList.remove("_disabled");
                if(document.querySelector("#prev").classList.contains('swiper-button-disabled')){
                    document.querySelector(".button-prev").classList.add("_disabled")
                }else{
                    document.querySelector(".button-prev").classList.remove("_disabled");
                }

            },
            goNext:function(){
                document.querySelector("#next").click();
                document.querySelector(".button-prev").classList.remove("_disabled");
                if(document.querySelector("#next").classList.contains('swiper-button-disabled')){
                    document.querySelector(".button-next").classList.add("_disabled")
                }else{
                    document.querySelector(".button-next").classList.remove("_disabled");
                }
            },
        },
        watch: {},
        computed: {
        },
        components: {
            comHeader,
            comOut,
            backHome,
            // mySeamlessSwitch,
            vueSeamlessScroll,
        }
    };
</script>

