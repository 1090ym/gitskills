
        var data=[];
        var questionNum = 0;
        

        function addText(obj){
            var question=[];
            var d1 = document.getElementById("choose_container");
            var Num = questionNum;
            
            html = '<div class="list">'+
                  '<label class="element" for="name">'+
                obj.value+'</label>'+
                '<div class="a"  id="ipInput">'+
                '<input class="form-control" type="text">'+
                '</div>'+
                
                '<button class="delete" type="button" value="'+Num+'" data-toggle="tooltip" title="删除"  onclick="delCenterIpGrp(this)"></button>'+
                
                '</div>' ;
            
            d1.insertAdjacentHTML("beforeBegin",html);
            
            questionNum++;
            question[0] = questionNum;   //题号
            question[1] = 1;             //题目类型
            question[2] = obj.value;
            data.push(question);
        };

        function addTextarea(obj) {
            var d1 = document.getElementById("choose_container");
            var question = [];
            var Num = questionNum;

            html = '<div class = "textarea">'+
            '<div class="element">'+
                    obj.value+
            '</div>'+
            '<div  id="ipInput" class="a" >'+
                '<textarea class="form-control" style="height: 160px;"></textarea>'+
            '</div>'+
            '<button class="delete" type="button" value="'+Num+'" data-toggle="tooltip" title="删除"  onclick="delCenterIpGrp(this)"></button>'+
                '</div>' ;
            
            d1.insertAdjacentHTML("beforeBegin",html);

            questionNum++;
            question[0] = questionNum;   //题号
            question[1] = 2;             //题目类型
            question[2] = obj.value;
            data.push(question);
        }

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

        function addCheckbox(addInfo, option1,option2, option3, option4, option5, option6) {
            var name;
            var option=[];   //存放选项
            var count = 0;  //存放选项个数
            var question = [];
            var Num = questionNum;
            for(i = 1;i <=6;i++) {
                name = "option"+i;
                option[i-1] = window[name].value;
                if(option[i-1]) {
                    count++;
                }
            }

            if (count < 2) {
                window.alert("请至少输入两个选项！");
                return 0;
            }

            var d1 = document.getElementById("choose_container");
            html =  '<div class="list">'+
                        '<label class="element">'+addInfo.value+'</label>'+
                        '<div class="a">'+
                            '<div class="input-group" data-toggle="buttons">';

            var j = 0;
            while(j < 6) {

                if(option[j]){
                    html = html + '<label  class="input-group-addon" id="man_user">'+
                                        '<input  type="checkbox" name="options"/>'+option[j]+
                                    '</label>' ;
                }
                j++;
            }                        

            html = html + '</div>'+
                        '</div>'+
                    '<button class="delete" type="button" value="'+Num+'" data-toggle="tooltip" title="删除"  onclick="delCenterIpGrp(this)"></button>'+
                '</div>';
            
            d1.insertAdjacentHTML("beforeBegin",html);

            questionNum++;
            question[0] = questionNum;   //题号
            question[1] = 4;             //题目类型
            question[2] = addInfo.value;
            question[3] = option;
            data.push(question);
        }


        function addRadio(addInfo, option1,option2, option3, option4, option5, option6) {
            var name;
            var option=[];
            var count = 0;
            var question = [];
            var Num = questionNum;
            for(i = 1;i <=6;i++) {
                name = "option"+i;
                option[i-1] = window[name].value;
                if(option[i-1]) {
                    count++;
                }
            }

            if (count < 2) {
                window.alert("请至少输入两个选项！");
                return 0;
            }

            var d1 = document.getElementById("choose_container");
            html =  '<div class="list">'+
                        '<label class="element">'+addInfo.value+'</label>'+
                        '<div class="a">'+
                            '<div class="input-group" data-toggle="buttons">';

            var j = 0;
            while(j < 6) {

                if(option[j]){
                    html = html + '<label  class="input-group-addon" id="man_user">'+
                                        '<input  type="radio" name="options"/>'+option[j]+
                                    '</label>' ;
                }
                j++;
            }                        

            html = html + '</div>'+
                        '</div>'+
                    '<button class="delete" type="button" value="'+Num+'" data-toggle="tooltip" title="删除"  onclick="delCenterIpGrp(this)"></button>'+
                '</div>';
            
            d1.insertAdjacentHTML("beforeBegin",html);

            questionNum++;
            question[0] = questionNum;   //题号
            question[1] = 3;             //题目类型
            question[2] = addInfo.value;
            question[3] = option;
            data.push(question);
        }



        function addSex(obj){
            var option=[];
            var question = [];
            option[0] = "男";
            option[1] = "女";
            option[2] = "";
            option[3] = "";
            option[4] = "";
            option[5] = "";

            var Num = questionNum;

            var d1 = document.getElementById("choose_container");
            html =  '<div class="list">'+
                        '<label class="element">'+'性别'+'</label>'+
                        '<div class="a">'+
                            '<div class="input-group" data-toggle="buttons">'+
                                    '<label  class="input-group-addon" id="man_user">'+
                                        '<input  type="radio" name="options"/>'+'男'+
                                    '</label>'+

                                    '<label  class="input-group-addon" id="man_user">'+
                                        '<input  type="radio" name="options"/>'+'女'+
                                    '</label>'+
                                '</div>'+
                            '</div>'+
                        '<button class="delete" type="button" value="'+Num+'" data-toggle="tooltip" title="删除"  onclick="delCenterIpGrp(this)"></button>'+
                    '</div>';
            d1.insertAdjacentHTML("beforeBegin",html);
            
            questionNum++;
            question[0] = questionNum;   //题号
            question[1] = 3;             //题目类型
            question[2] = obj.value;
            question[3] = option;
            data.push(question);
        };
        
        function delCenterIpGrp(obj){
            obj.parentNode.parentNode.removeChild(obj.parentNode);
            data[obj.value] = 0;
            questionNum--;
        };


        function submit() {
            var num = 0;
            var m=0;         //题号
            questionData = [];
            for(;num < data.length;num++) {
                if(data[num] != 0) {
                    m++;
                    data[num][0] = m;
                    questionData.push(data[num]);
                }
            }
            console.log(questionData);
            
            var name = document.getElementById("form_name").value;
            var info = document.getElementById("form_info").value;

            $.ajax({
              type: "post",
              url: "./php/demo.php",
              data: {question: questionData,
                     form_name: name,
                     form_info: info,
                     user_id: 1,
                     organizationID: 1
                    },
              dataType: "json",//回调函数接收数据的数据格式
              success: function(msg){
                var data='';
                if(msg!=''){
                  data = eval("("+msg+")");    //将返回的json数据进行解析，并赋给data
                }
                console.log(data);    //控制台输出
                alert("发布成功");
                //window.location.href='new.html';
              },
              error:function(msg){
                console.log(msg);
              }
            });
    };

    function change_bg(obj)
                {
                    var a=document.getElementById("Menu").getElementsByTagName("a");
                    for(var i=0;i<a.length;i++)
                    {
                        a[i].className="";
                    }
                    obj.className="current";
                };


        $(function(){
            //隐藏div
            $("#options").hide();
            //给div添加change事件
            $("#questionType").change(function(){
            if($(this).val()==1||$(this).val()==2){
                $("#options").hide();
            }else {
                $("#options").show();
            }   
            })
        })
