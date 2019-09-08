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


function update(public_data, form_name, organize, form_user, is_enroll, enroll_num) {
    var d1 = document.getElementById("list-info");
    html = '<tr>'+
                '<td>'+public_data+'</td>'+
                '<td>'+form_name+'</td>'+
                '<td>'+organize+'</td>'+
                '<td>'+form_user+'</td>'+
                '<td>'+
                '<a href="write_form.html" title="填写报名表"><img src="./images/icons/pencil.png" alt="填写报名表" style="width: 18px;height: auto;" /></a>'+
                '</td>'+
                '<td>'+is_enroll+'</td>'+
                '<td>'+enroll_num+'</td>'+
            '</tr>';
            d1.insertAdjacentHTML("beforeEnd",html);
};

function load_info() {
    $.ajax({
        type: "post",
        url: "get_forminfo.php",
        data: {request: "true",
              },
        dataType: "json",//回调函数接收数据的数据格式
        success: function(msg){
          var data;
          if(msg!=''){
            data = msg;
          }
          console.log(data);    //控制台输出
          for (i = 0;i < data.length;i++) {
            update(data[i].entryForm_date, data[i].entryForm_name,
              data[i].entryForum_organizationID, data[i].entryForm_userID, 
              "yes", 20)
          }
          //alert("加载成功");
          //window.location.href='new.html'; //跳转页面
        },
        error:function(msg){
          console.log(msg);//抛出错误
        }
      });
};

    
