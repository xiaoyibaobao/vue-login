<template>
    <div class="main">
        <h2>注册</h2>
        <!--这是公仔的背景图-->
        <div class="fang">
        </div>

        <!--z这是背景的框-->
        <div class="background">
            <form id="formid" method='post' @submit.prevent="login1">
                <div class="one">
                    <i class="i1">
                        <img src="../../static/pbone.png" alt="">
                    </i>
                    <span class="span1">
                        <input type="text" v-model='tel' class="input1" placeholder="手机号码">
                    </span>
                </div>
                <div class="two">
                    <div class="left">
                        <i class="i2">
                            <img src="../../static/key.png" alt="">
                        </i>
                        <span class="span2">
                            <input class="input2" type="text" v-model='getcode' ref='myvalidation' placeholder="验证码"></input>
                        </span>
                    </div>
                    <div :class="['right',sec1?'bac':'']" v-on:click="Svalidation" v-text="yanzhengma">获取验证码</div>
                </div>
            </form>
            <!--这个是提示信息的-->
            <div>
                <p class="str2" v-text="msgStr"></p>
            </div>
            <div class="threee">
                <div class="left">
                    <i class="i3">
                        <img src="../../static/name.png" alt="">
                    </i>
                    <span class="span3">
                        <input type="text" v-model="nickname" class="input3" placeholder="昵称">
                    </span>
                </div>
                <div class="right">
                    <datepicker v-model="state.date" format="yyyy / MMM / dd"language="zh" :minimumView="'day'" :maximumView="'year'" :initialView="'year'"></datepicker>
                </div>
            </div>
            <div class="fourr" v-on:click="getRegistration">
                <h6>注册</h6>
            </div>
            <router-link to='/login'>
                <div class="five">
                    <h6>登录</h6>
                </div>
            </router-link>
            <div class="six">
                <p class="p1">点击注册即表示已阅读并同意</p>
            </div>
            <div class="over">
                <!--<p class="p2">&lt;&lt;45度最终用户许可协议&gt;&gt;</p>-->
                <a href="https://www.45camera.com/eula/" target="_blank">《45度最终用户许可协议》</a>
            </div>
        </div>
    </div>
</template>

<script>
import datepicker from 'vuejs-datepicker';
export default {
    data() {
        return {
            msgStr: "",
            yanzhengma: "获取验证码",
            count: 1,
            sec1: 0,
            tel: '',
            nickname: "",
            getcode: '',
            state: {
                date: ''
            },
            flag: true,
            birthday: '',
            phoneisRight: true
        }
    },
    components: {
        datepicker
    },
    methods: {
        Svalidation() {
            console.log(this.state)
            var timer;
            var self = this;
            var objPhone = /^[1](([3][0-9])|([4][57])|([5][0-9])|([8][0-9]))[0-9]{8}$/;
            if (objPhone.test(this.tel)) {
                $.ajax({
                    type: "post",
                    url: self.url + "sms_verify.php",
                    data: { phone: self.tel },
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        self.phoneisRight = false;
                        self.sec1 = 60 * self.count;
                        self.count++;
                        timer = setInterval(function() {
                            --self.sec1;
                            self.yanzhengma = "还剩下" + self.sec1 + "秒";
                            if (self.sec1 <= 0) {
                                clearInterval(timer);
                                self.sec1 = 0;
                                self.phoneisRight = true;
                                self.yanzhengma = "获取验证码"
                            }
                        }, 1000);
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    error: function() {
                        console.log("失败");
                    }
                })
            } else {
                self.msgStr = "手机格式不对";
            }
        },
        getRegistration() {
            var self = this;
            var text = self.state.date;
            console.log(222222222222222);
            console.log(text);
            $.ajax({
                type: 'post',
                url: self.url + 'signup_check.php',
                data: { phone: self.tel, code: self.getcode, name: self.nickname, birt: self.state.date },
                dataType: 'json',
                success: function(data) {
                    console.log(self.tel);
                    console.log(self.getcode);
                    console.log(self.nickname);
                    console.log(self.state.date);
                    console.log(data);
                    if (data.err == 1) {
                        // $('#updateMessages').text(data.msg);
                        self.msgStr = data.msg;
                    }
                    else if (data.err == 0) {
                        console.log("succ");
                        if (typeof (window.jsBridge) != 'undefined') {
                            window.jsBridge.loginAction(data.msg);
                        }
                    }
                },
                xhrFields: {
                    withCredentials: true
                },
                error: function() {
                    console.log("这里是失败的");
                }
            })
        }
    }
}

</script>

<style lang="scss" scoped>
.main {
    height: 100%;
    position: fixed;
    width: 100%;
    background: url("../../static/background.jpg") no-repeat top center/100% 100% padding-box padding-box #dafdb4;
    h2 {
        color: #ffffff;
        text-align: center;
        letter-spacing: 43px;
        font-size: 118px;
        line-height: 320px;
    }
    .fang {
        position: relative;
        width: 46%;
        height: 25%;
        margin-top: 7%;
        margin-left: 27%;
        z-index: 99999;
        background: url("../../static/fang.png") no-repeat top center/100% 100% padding-box padding-box;
    }
    .background {
        margin-top: -7.2%;
        width: 90%;
        position: fixed;
        height: 60%; // height: 1000px;
        margin-left: 5%;
        box-sizing: border-box;
        background-color: rgba(251, 165, 51, 0.6);
        border-radius: 8%;
        border: 8px solid #eb522a;
        #formid {
            position: relative;
            .one {
                width: 90%;
                height: 180px;
                margin-left: 5%;
                padding-top: 10%;
                box-sizing: border-box;

                .i1 {
                    position: absolute;
                    margin-top: 35px;
                    margin-left: 40px;
                    img {
                        width: 90px;
                        height: 110px;
                    }
                }
                .span1 {
                    .input1 {
                        width: 100%;
                        height: 180px;
                        padding-left: 200px;
                        border-radius: 50px;
                        font-size: 74px;
                        background-color: #fffdd1;
                        border: 10px solid #e96200;
                        box-sizing: border-box;
                    }
                }
            }
            .two {
                width: 90%;
                height: 180px; // background-color: yellowgreen;
                margin-top: 15%;
                margin-left: 5%;
                box-sizing: border-box;
                position: relative;
                .left {
                    box-sizing: border-box;
                    float: left;
                    width: 60%;
                    .i2 {
                        position: absolute;
                        top: 35px;
                        left: 40px;
                        img {
                            width: 90px;
                            height: 110px;
                        }
                    }
                    .span2 {
                        .input2 {
                            width: 100%;
                            height: 180px;
                            padding-left: 200px;
                            border-radius: 50px;
                            font-size: 74px;
                            background-color: #fffdd1;
                            border: 10px solid #e96200;
                            box-sizing: border-box;
                        }
                    }
                }
                .right {
                    float: right;
                    width: 35%;
                    height: 180px;
                    border-radius: 60px;
                    line-height: 180px;
                    text-align: center;
                    font-size: 60px;
                    color: #fed6da;
                    letter-spacing: 5px;
                    background: url("../../static/fication.png") no-repeat top center/100% 100% padding-box padding-box;
                }
                .right.bac {
                    background: red;
                }
            }
        }
        .threee {
            width: 90%;
            margin-left: 5%;
            height: 180px;
            box-sizing: border-box;
            position: relative;
            margin-top: 5%;
            .left {
                box-sizing: border-box;
                float: left;
                width: 50%;
                .i3 {
                    position: absolute;
                    top: 35px;
                    left: 40px;
                    img {
                        width: 90px;
                        height: 110px;
                    }
                }
                .span3 {
                    .input3 {
                        width: 100%;
                        height: 180px;
                        padding-left: 200px;
                        border-radius: 50px;
                        font-size: 74px;
                        background-color: #fffdd1;
                        border: 10px solid #e96200;
                        box-sizing: border-box;
                    }
                }
            }
            .right {
                float: right;
                width: 45%;
            }
        }
        .fourr {
            width: 60%;
            margin-top: 15%;
            margin-left: 20%;
            h6 {
                width: 100%;
                height: 180px;
                border-radius: 110px;
                color: #f2faea;
                text-align: center;
                line-height: 180px;
                font-size: 80px;
                letter-spacing: 30px;
                font-weight: 400;
                background: url("../../static/login_bth.png") no-repeat top center/100% 100% padding-box padding-box;
            }
        }
        .five {
            width: 60%;
            margin-top: 5%;
            margin-left: 20%;
            h6 {
                width: 100%;
                height: 180px;
                border-radius: 110px;
                color: #f2faea;
                text-align: center;
                line-height: 180px;
                font-size: 80px;
                letter-spacing: 10px;
                font-weight: 400;
                background: url("../../static/register_bth.png") no-repeat top center/100% 100% padding-box padding-box;
            }
        }
        .six {
            width: 60%;
            text-align: center; // background-color: skyblue;
            color: #e9532b;
            font-size: 55px;
            margin-top: 5%;
            margin-left: 20%;
        }
        .over {
            width: 60%; // height: 90px;
            text-align: center;
            margin-top: 1%;
            margin-left: 20%;
            font-size: 55px;

            font-weight: 700;
            a {
                color: #ed5f2a;
            }
        }
    }
}

.str2 {
    color: #ffffff;
    position: absolute;
    left: 5%;
    top: 49%;
    font-size: 70px; // transform: translate(-50%,-50%);
}
</style>
