<template>
  <div class="main">
 <h2>登录</h2>
    <!--这是公仔的背景图-->
      <div class="fang">
    </div>

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
        <p class="str1" v-text="msgStr"></p>
      </div>
      <!--登录框-->
      
      <div v-on:click="mylogin"class="three">
        <h6>登录</h6>
      </div>
      <router-link to="/registrationVue">
      <div class="four">
          <h6>没有账户?注册一个</h6>
        </div>
        </router-link>
    </div>
    <!--<datepicker></datepicker>-->
  </div>
</template>

<script>
import datepicker from 'vuejs-datepicker';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msgStr: "",
      yanzhengma: "获取验证码",
      count: 1,
      sec1: 0,
      tel: '',
      getcode: '',
      flag: true,
      phoneisRight: true
    }
  },
  methods:{
    mylogin(){
       var self = this;
      $.ajax({
        type: "post",
        url: self.url+"login_check.php",
        data: { phone: self.tel, code: self.getcode },
        dataType: 'json',
        success: function(data) {
          console.log(data);
          console.log(self.tel);
          console.log(self.getcode);
          if (data.err == 1) {
            console.log(11111)
            self.msgStr = data.msg;
          }
          else if (data.err == 0) {
            console.log("succ");
            self.msgStr = data.msg;
            if (typeof (window.jsBridge) != 'undefined') {
              window.jsBridge.loginAction(data.msg);
            }
          }
        },
        xhrFields: {
          withCredentials: true
        },
        error: function() { 
          console.log("失败了")
        }
      })
    },
    Svalidation(){
       var timer;
      var self = this;
      var objPhone = /^[1](([3][0-9])|([4][57])|([5][0-9])|([8][0-9]))[0-9]{8}$/;
      if (this.phoneisRight && this.count <= 3) {
        if (objPhone.test(this.tel)) {
          $.ajax({
            type: "post",
            url: self.url+"sms_verify.php ",
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
              console.log("获取失败")
            }
          })
        } else {
          this.msgStr = "手机格式不对"
        }
      }
    }
  },
  components: {
        datepicker
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    z-index: 999999;
    background: url("../../static/fang.png") no-repeat top center/100% 100% padding-box padding-box;
  }
  .background {
    margin-top: -7.2%;
    width: 90%;
    position: fixed;
    height: 60%; // height: 1000px;
    margin-left: 5%;
    box-sizing: border-box;
    background-color:rgba(251, 165, 51, 0.6);
    border-radius: 8%;
    border: 8px solid #eb522a;
    // background: url("../../static/bg1.png") no-repeat top center/100% 100% padding-box padding-box;
    #formid {
      position: relative;
      .one {
        width: 90%;
        height: 180px;
        margin-left: 5%;
        padding-top: 10%;
        box-sizing: border-box;
          // position: relative;
        .i1 {
          position: absolute;
          // top: 35px;
          // left: 90px;
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
        margin-top: 20%;
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
    .three{
      width: 60%;
      height: 180px;
      margin-top: 20%;
      margin-left: 20%;
      h6{
        width: 100%;
        height: 180px;
        border-radius: 110px; // background-color: yellow;
        text-align: center;
        line-height: 180px;
        font-size: 100px;
        color: #f2faea;
        letter-spacing: 10px;
        font-weight: 400;
        background: url("../../static/login_bth.png") no-repeat top center/100% 100% padding-box padding-box;
      }
    }
    .four{
      width: 60%;
      margin-top: 10%;
      margin-left: 20%;
      h6{
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
  }
}

.str1 {
  color: #ffffff;
  position: absolute;
  left: 8%;
  top: 43%;
  font-size: 70px; // transform: translate(-50%,-50%);
}
</style>

