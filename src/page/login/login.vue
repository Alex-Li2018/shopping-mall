
<template>
    <div>
        <!-- head -->
        <header-top :headTitle="headTitle" :goBack="true">
        </header-top>

        <!-- main -->
        <main class="login">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="userName"></mt-field>
            <div class="pass-word">
                <mt-field label="密码" placeholder="请输入密码" :type="type" v-model="passWord"></mt-field>
                <mt-switch v-model="isHidePassWord"></mt-switch>
            </div>
            <div class="code">
                <mt-field label="验证码" placeholder="请输入验证码" v-model="code"></mt-field>
                <div class="code-img">
                    <img :src="codeSrc" class="code-img"/>
                    <div class="next-code" @click="showNextCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </div>
            <mt-button type="primary" @click="loginOrRegisterUser">{{ "提交" }}</mt-button>
        </main>  
    </div>  
</template>


<script>
import { accountLogin,getCaptchas } from "@/api/api"
import { mapMutations } from "vuex"
import headerTop from "@component/headerTop.vue";
import { MessageBox } from 'mint-ui';

export default {
    name: 'login',
    components: {
        headerTop
    },
    data() {
        return {
            headTitle: "登录注册", 
            isHidePassWord: true, //是否隐藏password
            userName: '', //用户名
            passWord: '', //密码
            code: '', //验证码
            type: "password", //文本框的类型
            codeSrc: '', //二维码的路径
        }
    },
    created() {
        this.getCaptchasCode()
    },
    watch: {
      isHidePassWord: {
          handler(newVal) {
              this.type = newVal ? 'password' : 'text';
          }
      }  
    },
    methods: {
        ...mapMutations([
            'RECORD_USERINFO'
        ]),
        async loginOrRegisterUser() {
            //校验数据
            if(!this.checkData()) {
                return
            } 
            
            let params = {
                captcha_code: this.code,
                password: this.passWord,
                username: this.userName
            }
            let res = await accountLogin(params)
            
            
            if(res == 'ok') {
                this.RECORD_USERINFO(res)
                //从哪里来就退回到哪里
                this.$router.go(-1);
            }else {
                let { status,message } = res
                this.ToastMessage(message)
            } 
        },
        //获取验证码
        getCaptchasCode() {
            getCaptchas().then(res => {
                let { code,status } = res
                if(status == 1) {
                    this.codeSrc = code
                }
            })
        },
        // 是否展示铭文密码
        showNextCode() {
            this.getCaptchasCode()
        },
        //校验数据
        checkData() {
            let flag = true;
            // let codeTrue = this.code == this.codeSrc;
            
            let rules = [
                { valid: this.userName, err: '用户名不能为空' },
                { valid: this.passWord, err: '密码不能为空' },
                { valid: this.code, err: '验证码不能为空' },
                // { valid: codeTrue, err: '验证码不正确,重新输入' },
            ]

            for(let key of rules) {
                if(!key.valid) {
                   this.ToastMessage(key.err)
                   flag = false
                   break 
                }
            }   

            return flag
        },
        //弹框
        ToastMessage(message) {
            MessageBox.alert(message, '提示')
        }    
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';

.login {
    margin-top: px2rem(55px);
}
.pass-word {
    width: 100%;
    display: flex;
    background-color: #fff;
}
.mint-switch {
    width: px2rem(55px);
}
.mint-field {
    flex: 1;
}
.mint-button--normal {
    width: 92%;
    margin: px2rem(20px) px2rem(20px);
    position: absolute;
}

.code {
    display: flex;
    .code-img {
        width: px2rem(150px);
        display: flex;
        background-color: #fff;
        .code-img {
            width: px2rem(90px);
        }
        .next-code {
            flex: 1;
            > p {
                font-size: px2rem(14px);
                line-height: px2rem(24px);
                text-align: center;
                &:nth-of-type(2) {
                    color: #3b95e9;
                }
            }
        }
    }
}
.mint-button {
    font-size: px2rem(18px);
}
</style>
