function get_personInfo() {
                                                                 
    $.ajax({
      type: "post",
      url: "get_personInfo.php",
      data: {
            },
      dataType: "json",//回调函数接收数据的数据格式
      success: function(msg){
        var data;
        if(msg!=''){
            data = msg;
        }
        console.log(data);    //控制台输出
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