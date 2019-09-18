

function setCookie(user_id,nickname)        //设置cookie值
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    //document.cookie = "user_id="+user_id+";nickname="+nickname+";expires=" + exp.toGMTString(); 
    document.cookie = "user_id="+user_id+";"
    document.cookie = "nickname="+nickname+";"
}; 


function get_personInfo() {
                                                                 
    $.ajax({
      type: "post",
      url: "./php/get_personInfo.php",
      data: {
            },
      dataType: "json",//回调函数接收数据的数据格式
      success: function(msg){
        var data;
        if(msg!=''){
            data = msg;
        }
        console.log(data);    //控制台输出
        setCookie(data['user_id'], data['nickname']);
        show_personInfo(data['nickname'],data['username'],data['img']);
        
      },
      error:function(msg){
        console.log(msg);
      }
    });
};

function show_personInfo(nickname,username,img) {
    obj = document.getElementById("username");
    obj.value = username;

    if(nickname) {
        obj = document.getElementById("img-nickname");
        obj.value = nickname;

        obj = document.getElementById("nickname");
        obj.value = nickname;
    }
    
    if(img) {
        obj = document.getElementById("user_img");
        obj.src = img;
    }
};