var form_id = GetRequest().form_id;

function get_userResult() {
    $.ajax({
        type: "post",
        url: "./php/get_userResult.php",
        data: {form_id: form_id,
              },
        dataType: "json",//回调函数接收数据的数据格式
        success: function(msg){
          var data;
          if(msg!=''){
            data = msg;
          }
          console.log(data);    //控制台输出
          show_ques_list(form_id, data);
          /*for (i = 0;i < data.length;i++) {
            update_myForm(data[i].entryForm_date, data[i].entryForm_name,
              data[i].entryForm_organization_name, data[i].entryForm_userNickname, 
              20, data[i].entryForm_id, user_id, data[i].write_state);
            
              var form_data = "form_data"+data[i].entryForm_id;    //将报名表的数据存到本地缓存
              window.sessionStorage[form_data] = JSON.stringify(data[i]);
              console.log(window.sessionStorage[form_data]);
          }*/
          //alert("加载成功");
          //window.location.href='new.html'; //跳转页面
        },
        error:function(msg){
          console.log(msg);//抛出错误
        }
      });
}

function show_ques_list(form_id, answer_data) {
    var i = 0;
    var form_data = "form_data"+form_id;                                //获取对应报名表的缓存数据属性名
    
    var form_storage = JSON.parse(window.sessionStorage[form_data]);
    console.log(form_storage);

    var data_json = form_storage.entryForm_json;
    var question = JSON.parse(data_json);
    insert_question(question);                                      //插入问题列表

    for(i = 0;i < answer_data.length;i++) {
      insert_answer(answer_data[i]);                           //插入答案信息
    }
}

function insert_question(ques_data) {
    var i = 0;
    var obj = document.getElementById("list-item");
    var html = '<tr>';
    for(i = 0;i < 3;i++) {
        html = html+'<td>'+ques_data[i][2]+'</td>';
    }
        html = html + '<td>详情</td>';
        html = html+'</tr>';
        obj.insertAdjacentHTML("beforeEnd",html);
}

function insert_answer(answ_data) {
    var i = 0;
    var obj = document.getElementById("list-info");
    var html = '<tr>';
    var result_href = "result_allInfo.html?form_id="+form_id+"&answ_id="+answ_data['answer_id'];
    var result_alt = "查看详细信息";
    var result_img = "./images/icons/details.png";
  
    for(i = 1;i <= 3;i++) {
        var answ_item = "question"+i;
        var answ = answ_data[answ_item];
        answ = answ.replace('[','');
        answ = answ.replace(']','');
        answ = answ.replace('"','');
        answ = answ.replace('"','');

        html = html+'<td>'+answ+'</td>';
    }
        html = html+
                '<td>'+
                  '<a href='+result_href+' title='+result_alt+'><img src='+result_img+' alt='+result_alt+' style="width: 21px;height: auto;" /></a>'+
                '</td>';     
        html = html+'</tr>';
        obj.insertAdjacentHTML("beforeEnd",html);
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}