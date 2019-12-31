<template>
    <div class="wrap">
      <modalBox :title="title" :boole="hint"></modalBox>
      <header>
        <span @click="Goback"><i class="el-icon-arrow-left"></i></span>
        <img src="../assets/logoLoginpng.png" alt="">
      </header>
      <div class="login">
          <h1>老用户登录</h1>
          <div class="account">
            <form action="">
              <p><input type="text" placeholder="请输入手机号" id="num"/></p>
              <p><input type="password" placeholder="请输入登录密码" id="password"/><a href="#" class="forget">忘记密码</a></p>
              <p><a href="#" class="shortcut"><span>手机号快捷登录<i class="el-icon-arrow-right"></i></span></a></p>
            </form>
          </div>
          <div class="btn">
            <button @click="login">登录</button>
            <router-link to="/register"><button>注册</button></router-link>
          </div>
      </div>
    </div>
</template>

<script>
  import modalBox from "../subassembly/modalBox";
    export default {
        name: "login",
        data(){
          return{
              hint:false,
              title:""
          }
        },
        methods:{
          login(){
            let user = document.getElementById('num').value;
            let password = document.getElementById('password').value;
            if(user.length==""){
              this.hint = true;
              this.title = "请先输入手机号";
              return false;
            }else if(!(/^1[3456789]\d{9}$/.test(user))){
              this.hint = true;
              this.title = "请输入正确的手机号";
              return false;
            }else if (password.length==""){
              this.hint = true;
              this.title = "请输入密码";
              return false;
            }else if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(password)){
              this.hint = true;
              this.title = "请设置有效密码，6-20位\n" + "包含数字，字母或符号\n";
              return false;
            }else {

              let message= {
                "user":user,
                "password":password
              };
              alert('登录成功');
              this.$router.push({path:'/my'});
              localStorage.setItem('furniture',message);
            }

          },
          Goback(){
            this.$router.go(-1);
          }
        },
        updated() {
          if(this.hint==true){
            this.auto = setTimeout(()=>{
              this.hint = false
            },1000)
          }
        },
        beforeDestroy() {
          clearTimeout(this.auto);
        },
        components:{
          modalBox
      }
    }
</script>

<style scoped lang="less">
  @size:37.5;
  .wrap{
    position: absolute;
    top: 0;
    bottom: 0;
    background: url("../assets/login-big-bg.jpg")no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
  .wrap header{
    width: 100%;
    height: 120rem/@size;
    background: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrap header span{
    width: 28rem/@size;
    height: 28rem/@size;
    border: 1px solid #3aad36;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 4.2%;
    transform: translateY(-50%);
  }
  .wrap header span i{
    font-size: 30rem/@size;
    color: #3aad36;
  }
  .wrap header img{
    width: 120rem/@size;
    height: 61.5rem/@size;
    margin-top: 10rem/@size;
  }
  .login h1{
    line-height: 72rem/@size;
    color: #037049;
    font-size: 20rem/@size;
    font-weight: normal;
    margin-bottom: 12rem/@size;
  }
  .account{
    padding: 0 18.7rem/@size;
  }
  .account p input{
    width: 100%;
    height: 50rem/@size;
    border: none;
    padding: 0;
    background: transparent;
    font-size: 16rem/@size;
    border-bottom: 1px solid #dbdbdb;
    outline: none;
  }
  .account p {
    position: relative;
  }
  .forget {
    width: 96rem/@size;
    height: 31rem/@size;
    line-height: 31rem/@size;
    border: 1rem/@size solid #3aad36;
    font-size: 16rem/@size;
    color: #3aad36;
    border-radius: 4rem/@size;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .shortcut{
    height: 50rem/@size;
    font-size: 15rem/@size;
    color: #3aad36;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .btn{
    width: 100%;
    padding: 0 37.5rem/@size;
  }
 .btn button:first-child{
   width: 100%;
   height: 36rem/@size;
   background-color: #3aad36;
   border: 1px solid #3aad36;
   outline: none;
   border-radius: 5rem/@size;
   color: white;
   font-size: 18rem/@size;
   letter-spacing:20rem/@size;
   text-indent: 20rem/@size;
   margin-bottom: 15rem/@size;
 }
  .btn button:last-child{
    width: 100%;
    height: 36rem/@size;
    background-color: rgba(138,138,138);
    border: 1px solid rgba(138,138,138);
    outline: none;
    border-radius: 5rem/@size;
    color: white;
    font-size: 18rem/@size;
    letter-spacing:20rem/@size;
    text-indent: 20rem/@size;
  }
</style>
