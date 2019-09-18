
function add(){
    var divA = document.getElementById("list-info");
    html = '<tr>'+
                    '<td>发布时间</td>'+
                    '<td>发布时间</td>'+
                    '<td>发布时间</td>'+
                    '<td>发布时间</td>'+
                    '<td>发布时间</td>'+
                    '<td>发布时间</td>'+
                    '<td>发布时间</td>'+
            '</tr>';
    divA.innerHTML = divA.innerHTML+html;
};


function update(public_data, form_name, organize, form_user, enroll_num, form_id, user_id, write_state) {
    var d1 = document.getElementById("list-info");


    var write_img;
    var write_alt;
    var write_href;
    if(write_state) {
        write_img = "./images/icons/right.png";
        write_alt = "已填写";
        write_href = "#";
        tip = "已填写";
    } else {
        write_img = "./images/icons/pencil.png";
        write_alt = "填写报名表";
        write_href = "write_form.html?form_id="+form_id;
        tip = "未填写";
    }
    
    html = '<tr>'+
                '<td>'+public_data+'</td>'+
                '<td>'+form_name+'</td>'+
                '<td>'+organize+'</td>'+
                '<td>'+form_user+'</td>'+
                '<td>'+
                '<a href='+write_href+' title='+write_alt+'><img src='+write_img+' alt='+write_alt+' style="width: 18px;height: auto;" /></a>'+
                '</td>'+
                //'<td>'+tip+'</td>'+
                '<td>'+enroll_num+'</td>'+
            '</tr>';
            d1.insertAdjacentHTML("beforeEnd",html);
};

//显示所用的报名表
function load_info() {
    var user_id = getCookieValue("user_id");    //获取用户id
    
    $.ajax({
        type: "post",
        url: "./php/get_forminfo.php",
        data: {request: "true",
              },
        dataType: "json",//回调函数接收数据的数据格式
        success: function(msg){
          var data;
          if(msg!=''){
            data = msg;
          }
          //console.log(data);    //控制台输出
          for (i = 0;i < data.length;i++) {
            update(data[i].entryForm_date, data[i].entryForm_name,
              data[i].entryForm_organization_name, data[i].entryForm_userNickname, 
              20, data[i].entryForm_id, user_id, data[i].write_state);
            
            var form_data = "form_data"+data[i].entryForm_id;    //将报名表的数据存到本地缓存
            window.sessionStorage[form_data] = JSON.stringify(data[i]);
            console.log(window.sessionStorage[form_data]);
          }
          //alert("加载成功");
          //window.location.href='new.html'; //跳转页面
        },
        error:function(msg){
          console.log(msg);//抛出错误
        }
      });
};

//显示我创建的报名表
function update_myForm(public_data, form_name, organize, form_user, enroll_num, form_id, user_id, write_state) {
  var d1 = document.getElementById("list-info");

  var write_img;
  var write_alt;
  var write_href;

  var result_href= "show_result.html?form_id="+form_id;
  var result_alt = "查看报名结果";
  var result_img = "./images/icons/result.png";

  var delete_href= "#";
  var delete_alt = "删除报名表";
  var delete_img = "./images/icons/delete.png"



  if(write_state) {
      write_img = "./images/icons/right.png";
      write_alt = "已填写";
      write_href = "#";
      tip = "已填写";
  } else {
      write_img = "./images/icons/pencil.png";
      write_alt = "填写报名表";
      write_href = "write_form.html?form_id="+form_id;
      tip = "未填写";
  }
  
  html = '<tr>'+
              '<td>'+public_data+'</td>'+
              '<td>'+form_name+'</td>'+
              '<td>'+organize+'</td>'+
              '<td>'+form_user+'</td>'+
              '<td>'+
                  '<a href='+write_href+' title='+write_alt+'><img src='+write_img+' alt='+write_alt+' style="width: 18px;height: auto;" /></a>'+
              '</td>'+
              //'<td>'+tip+'</td>'+
              '<td>'+enroll_num+'</td>'+
              '<td>'+
                  '<a href='+result_href+' title='+result_alt+'><img src='+result_img+' alt='+result_alt+' style="width: 18px;height: auto;" /></a>'+
              '</td>'+
              '<td>'+
                  '<a href='+delete_href+' title='+delete_alt+'><img src='+delete_img+' alt='+delete_alt+' style="width: 18px;height: auto;" /></a>'+
              '</td>'+
          '</tr>';
          d1.insertAdjacentHTML("beforeEnd",html);
};

//显示当前登录的用户的报名表
function load_myForm() {
  var user_id = getCookieValue("user_id");    //获取用户id
    $.ajax({
        type: "post",
        url: "./php/get_myforminfo.php",
        data: {request: "true",
              },
        dataType: "json",//回调函数接收数据的数据格式
        success: function(msg){
          var data;
          if(msg!=''){
            data = msg;
          }
          //console.log(data);    //控制台输出
          for (i = 0;i < data.length;i++) {
            update_myForm(data[i].entryForm_date, data[i].entryForm_name,
              data[i].entryForm_organization_name, data[i].entryForm_userNickname, 
              20, data[i].entryForm_id, user_id, data[i].write_state);
            
              var form_data = "form_data"+data[i].entryForm_id;    //将报名表的数据存到本地缓存
              window.sessionStorage[form_data] = JSON.stringify(data[i]);
              console.log(window.sessionStorage[form_data]);
          }
          //alert("加载成功");
          //window.location.href='new.html'; //跳转页面
        },
        error:function(msg){
          console.log(msg);//抛出错误
        }
      });
};



function getCookieValue(cookieName) {           //获取cookie值
  var strCookie = document.cookie;
  var arrCookie = strCookie.split(";");
  for(var i=0; i<arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");
      if(arr[0] == cookieName)
          return arr[1];
  }
  return "";
}
    
