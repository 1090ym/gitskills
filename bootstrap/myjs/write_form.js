
//全局变量，用来存储题目和答案的json数据
/*var answer_data = [                                     
    [1,1,"姓名"],
    [2,1,"年级"],
    [3,3,"性别",["男", "女", "", "", "", ""],[]],
    [4,4,"爱好",["篮球", "网球", "乒乓球", "羽毛球", "", ""],[]],
    [5,2,"其他"]
];*/

var answer_data;

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
  

//从后台获取题目的json数据并显示
function writeForm(){
    
    var form_id = GetRequest().form_id;
    console.log(form_id);     
    $.ajax({
        type: "post",
        url: "./php/show_entryform.php",
        data: {entryform_id: form_id
              },
        dataType: "json",//回调函数接收数据的数据格式
        success: function(msg){
          var data;
          if(msg!=''){
            data = msg;
          }
            console.log(data);    //控制台输出
            show_question(data);
          
          //alert("加载成功");
          //window.location.href='new.html'; //跳转页面
        },
        error:function(msg){
          console.log(msg);//抛出错误
        }
      });

};

function writeForm_session(){
    
    var form_id = GetRequest().form_id;
    console.log(form_id);
    
    var form_data = "form_data"+form_id;                                //获取对应报名表的缓存数据属性名
    
    var form_storage = JSON.parse(window.sessionStorage[form_data]);
    console.log(form_storage);

    var form_name = document.getElementById("form_name");               //显示报名表名称
    form_name.value = form_storage.entryForm_name;

    var form_info = document.getElementById("form_info");               //显示报名表名称
    form_info.value = form_storage.entryForm_info;

    var organization_name = document.getElementById("organization_name");               //显示报名表名称
    organization_name.value = form_storage.entryForm_organization_name;

    
    var data_json = form_storage.entryForm_json;
    var question = JSON.parse(data_json);
    console.log(question);
    show_question(question); 
};

//显示题目信息
function show_question(write_data) {
    answer_data = write_data;                          

    var count = write_data.length;
    
    var item = {value: ""};
    var type = {value: ""};
    var name;
    var m;
    var option1, option2, option3, option4, option5, option6;
    for(i = 1;i <=6;i++) {
        name = "option"+i;
        window[name] = {value: ""};
    }

    for(m = 0;m < count;m++) {
        item.value = write_data[m][2];
        item.number = write_data[m][0];
        type.value = write_data[m][1];

        for(j = 1;j <=6;j++) {
            name = "option"+j;
            if(write_data[m][1] == 3 || write_data[m][1] == 4) {
                window[name].value = write_data[m][3][j-1];
            } else {
                window[name].value = "";
            }  
        }
        
        addQuestion(item, type, option1, option2, option3, option4, option5, option6);

    }

};


//显示填空题
function addText(obj){                              
    var d1 = document.getElementById("choose_container");    //获取插入位置ID
    var Name = "user_answer"+obj.number;                             //生成变量名作为input的name属性值
    
    html = '<div class="list">'+
          '<label class="element" for="name">'+
        obj.value+'</label>'+
        '<div class="a"  id="ipInput">'+
        '<input class="form-control" type="text" name="'+Name+'" value="">'+
        '</div>'+
        
        '</div>' ;
    
    d1.insertAdjacentHTML("beforeBegin",html);
};

 //显示简答题
function addTextarea(obj) {                        
    var d1 = document.getElementById("choose_container");    //获取插入位置ID
    var Name = "user_answer"+obj.number; 

    html = '<div class = "textarea">'+
    '<div class="element">'+
            obj.value+
    '</div>'+
    '<div  id="ipInput" class="a" >'+
        '<textarea class="form-control" style="height: 160px;" name="'+Name+'" value=""></textarea>'+
    '</div>'+
        '</div>' ;
    
    d1.insertAdjacentHTML("beforeBegin",html);
}

//封装显示所有题目
function addQuestion(addInfo, addType, option1, option2, option3, option4, option5, option6) {      
    if(!addInfo.value) {
        window.alert("请输入报名信息");
    }

    if(addType.value == 1) {
        addText(addInfo);
       
    }

    if(addType.value == 2) {
        addTextarea(addInfo);
    }

    if(addType.value == 3) {
        addRadio(addInfo, option1, option2, option3, option4, option5, option6);
    }

    if(addType.value == 4) {
        addCheckbox(addInfo, option1, option2, option3, option4, option5, option6);
    }

}

//显示多选题
function addCheckbox(addInfo, option1,option2, option3, option4, option5, option6) {                
    var d1 = document.getElementById("choose_container");    //获取插入位置ID
    var Name = "user_answer"+addInfo.number;

    var name;
    var option=[];   //存放选项
    
    for(i = 1;i <=6;i++) {
        name = "option"+i;
        option[i-1] = window[name].value;
    }

    html =  '<div class="list">'+
                '<label class="element">'+addInfo.value+'</label>'+
                '<div class="a">'+
                    '<div class="input-group" data-toggle="buttons">';

    var j = 0;
    while(j < 6) {

        if(option[j]){
            html = html + '<label  class="input-group-addon" id="man_user">'+
                                '<input  type="checkbox" name="'+Name+'" value="'+option[j]+'"/>'+option[j]+
                            '</label>' ;
        }
        j++;
    }                        

    html = html + '</div>'+
                '</div>'+
        '</div>';
    
    d1.insertAdjacentHTML("beforeBegin",html);
}

//显示单选题
function addRadio(addInfo, option1,option2, option3, option4, option5, option6) {                   
    var d1 = document.getElementById("choose_container");    //获取插入位置ID
    var Name = "user_answer"+addInfo.number;

    var name;
    var option=[];   //存放选项

    for(i = 1;i <=6;i++) {
        name = "option"+i;
        option[i-1] = window[name].value;
    }

    html =  '<div class="list">'+
                '<label class="element">'+addInfo.value+'</label>'+
                '<div class="a">'+
                    '<div class="input-group" data-toggle="buttons">';

    var j = 0;
    while(j < 6) {

        if(option[j]){
            html = html + '<label  class="input-group-addon" id="man_user">'+
                                '<input  type="radio" name="'+Name+'" value="'+option[j]+'"/>'+option[j]+
                            '</label>' ;
        }
        j++;
    }                        

    html = html + '</div>'+
                '</div>'+
        '</div>';
    
    d1.insertAdjacentHTML("beforeBegin",html);

};





function submit_answer(answer_data,form_id,user_id) {
                                                                  //将数据提交到后台
    $.ajax({
      type: "post",
      url: "./php/submit_answer.php",
      data: {
                answer_data: answer_data,
                form_id: form_id,
                user_id: user_id
            },
      dataType: "json",//回调函数接收数据的数据格式
      success: function(msg){
        var data;
        if(msg!=''){
            data = msg;
        }
        console.log(data);    //控制台输出
        alert("提交成功");
        window.location.href="indexForm.html";
      },
      error:function(msg){
        console.log(msg);
      }
    });
};

function submit(obj) {                                                             //将用户填写的答案整合到题目的json数据中

    /*var ans_name = obj.name;
    var ans_num; 
    ans_num = Number(ans_name.replace(/[^0-9]/ig, ''));
    if(answer_data[ans_num-1][1] == 1 || answer_data[ans_num-1][1] == 2) {          //为填空和简答题
        answer_data[ans_num-1].push(obj.value);
    } else {                                                                        //为多选和单选题
        if(obj.checked){
            answer_data[ans_num-1][4].push(obj.value);
        }
        
    }*/
    //console.log(answer_data);
}

function sub() {
    var form_id = GetRequest().form_id;  //获取报名表id
    
    var user_id = getCookieValue("user_id");    //获取用户id
    
    var i = 1;
    var j = 0;
    var Name;
    var ans;
    var option = [];
    for(i = 1;i <= answer_data.length;i++){
        Name = "user_answer"+i;                             //input的属性name值
        ans = document.getElementsByName(Name);             //获取对应name的节点

        if(answer_data[i-1][1] == 1 || answer_data[i-1][1] == 2) {          //如果为填空和简答题
            answer_data[i-1].push(ans[0].value);
        } else {
            for(j = 0;j < ans.length;j++) {
                if(ans[j].checked) {
                    option.push(ans[j].value);
                }
            }
            answer_data[i-1].push(option);
            option = [];
        }
        
    }
    console.log(answer_data);
    submit_answer(answer_data,form_id,user_id);
    
}

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






