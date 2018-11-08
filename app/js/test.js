jQuery(document).ready(function($) {
  // Test
  var TestStep = 0;     // Порядковый номер теста
  var TestMass = [];    // Многомерный массив 
  TestMass[0] = [];     // Здесь храним ID записи
  TestMass[1] = [];   // Правильный ответ
  TestMass[2] = [];   // Правильный ли ответ 
  TestMass[3] = [];   // Ответ пользователя
  var MaxTestQuestions = 7; //Максимальное количество вопросов в тесте

  var pid = "";
  var title = "";
  var sub_title = "";
  var right = "";
  var isRightReply = "";
  var otvet = '';
  strTest ='';
  var myPlotVal = 0;

  s2 = null;
  s2 = new Array();
  s2[0]= new Array();
  s2[0]=[0,0];
    if ( $('#test-chart').length > 0) {
    
  // var pid = get_pid();
  get_text_area();
  setMass();
  TestStep++;
    
  plot1 = $.jqplot("test-chart", [new Array(1)], {
//  plot1 = $.jqplot("jqplot", s2, {
        // Turns on animatino for all series in this plot.
        animate: true,
        // Will animate plot on calls to plot1.replot({resetAxes:true})
        animateReplot: false,
        seriesColors: ['#ffab00'],

        grid: {
      drawGridlines: true,
          borderColor: 'transparent',
          shadow: false,
          drawBorder: false,
          shadowColor: 'transparent',
          background: '#ffffff',
          gridLineColor:'#eaeaea'
  },

        cursor: {
            show: false,
            zoom: false,
            looseZoom: false,
            showTooltip: false
        },
        seriesDefaults: {
      rendererOptions: {
          smooth: true
            }
        },
        series:[
            {
                rendererOptions: {
                    animation: {
                        speed: 2000
                    }
                }
            }
        ],
        axesDefaults: {
            pad: 0,
            min: 0,
        },
        axes: {
            // These options will set up the x axis like a category axis.
            xaxis: {
//          renderer: $.jqplot.DateAxisRenderer,
    renderer: $.jqplot.LinearAxisRenderer,
                tickInterval: 1,
                drawMajorGridlines: true,
                drawMinorGridlines: false,
                drawMajorTickMarks: false,
                forceTickAt0: true,
          pad:0,
                rendererOptions: {
                  tickInset: 0,
                  minorTicks: 1,
                  forceTickAt0: true
          },
          min:0,
          max:7,
          showTicks: false
            },
            yaxis: {
          tickInterval: 1,
                pad:0,
                rendererOptions: {
                    minorTicks: 0.5,
                    tickInsets: 1
                },
                min:-7,
                max:7,
    tickOptions: {
        textColor: '#222222',
        fontSize: '11pt'
    }
            }
        },
        highlighter: {
            show: false, 
            showLabel: false, 
            tooltipAxes: 'n',
            sizeAdjust: 1 , 
            tooltipLocation : 'ne'
        }
    });
  

  s1 = null;
  s1 = new Array();

  $( "div.jqplot-yaxis-tick:contains('2')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
  $( "div.jqplot-yaxis-tick:contains('4')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
  $( "div.jqplot-yaxis-tick:contains('6')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });

  }
  
  
  $('.test__submit').click(function () {
    var per1 = 0;
    var per2 = 0;
    checked = false;
    $('.form__radio').each(function(i,elem) {
      if ($(this).prop("checked")){
        checked = true;
        otvet = $('input[type=radio]:checked').val();
        TestMass[3][TestStep] = otvet;
      }
    });

    if (!checked){
      alert('Выберите вариант ответа');
      return;
    }
    
    $('.test-line1-left_bisy').css('display','block');
    pid = get_pid();
    get_text_area();
    setMass();
    // $('input, select').styler();
    /* var iter = 1;
    $.each($('input#otvet1'), function () {
        $(this).attr("id","otvet"+iter);
        //$(this).attr("name","otvet"+iter);
        console.log($(this).attr("id"));
        iter++;
    });
    iter = 1;
    $.each($('label'), function () {
        $(this).attr("for","otvet"+iter);
        console.log($(this).attr("for"));
        iter++;
    }); */



    

    $('.test-breadcrumb__item').each(function(i,elem) {

      if ($(this).hasClass("active")) {
        $(this).removeClass("active");  
      } 
      if (TestStep == (i)) {
        $(this).addClass("active");
        var step = 0;
        if (TestStep == 0) {
          step = 0;
        }else{
          step = 1;
        }
      }
    });
    //alert(TestMass[3][TestStep-1]);
    TestMass[3][TestStep-1] = otvet;
    //alert(TestMass[3][TestStep-1]);
    //alert(TestMass[1][TestStep-1]);
    if (TestMass[3][TestStep-1] == TestMass[1][TestStep-1]){
      isRightReply = true;
    }else{
      isRightReply = false;

    }
    TestMass[2][TestStep-1] = isRightReply;

    TestStep++;
    
    if (TestStep > MaxTestQuestions) {
      TestMass[3][TestStep-1] = otvet;
//      console.log(TestMass[3][TestStep-1]);
//      console.log(TestMass[1][TestStep-1]);

//      if (TestMass[3][TestStep-1] == TestMass[1][TestStep-1]){
//        isRightReply = true;
//      }else{
//        isRightReply = false;
//      }
//      TestMass[2][TestStep-1] = isRightReply;
      $('.test-end').css('display','block');
//      console.log(TestMass[0]);
//      console.log(TestMass[1]);
//      console.log(TestMass[2]);
//      console.log(TestMass[3]);
      
//      console.log('right='+right);
//      console.log('user_reply='+user_reply);
//      console.log('isRightReply='+isRightReply);
//      console.log('TestStep='+TestStep);

      if (isRightReply) {myPlotVal++;} else {myPlotVal--;};
    
      s2[TestStep-1] = new Array();
      s2[TestStep-1] = [TestStep-1,myPlotVal];

      plot1.series[0].data = s2;
      plot1.axes.xaxis.min = 0;
      plot1.axes.xaxis.max = 7;
//      plot1.axes.xaxes.pad = 0;
      plot1.replot();
      if (myPlotVal < 0) { $('.test-line1-right p').css({"display":"block"}); } else { $('.test-line1-right p').css({"display":"none"}); };
//      console.log(myPlotVal);
      var totalAnswers = 0;
      TestMass[2].forEach(function(entry) {
      if (entry == true) {totalAnswers++;};
      });
      $("#right_answers").text(totalAnswers);
//      console.log( 7-(7-Math.abs(myPlotVal)) );
      alert('Тест завершен!');
      $( "div.jqplot-yaxis-tick:contains('2')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
      $( "div.jqplot-yaxis-tick:contains('4')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
      $( "div.jqplot-yaxis-tick:contains('6')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
      
      
      fancyboxForm = '<div class="popup-wrap"><div class="b1-form"><form><div class="form-title"><span>Спасибо!</span><br /> Сообщение будет отправлено Вам в течении 30 секунд!</div></form></div></div>';
      $.fancybox('<div class="popup-wrap"><div class="b2-form"><form id="contact2" method="post" action="/sendmessage.php" ><div class="form-title"><span>Спасибо, что прошли тест!</span></div><br />'+
      '<b>Введите ваш e-mail и мы отправим подходящую <br> вам программу обучения в течении 30 секунд</b><br><br><br>' +
      '<input type="text" name="answers" style="display:none;" value="'+totalAnswers+'">' +
      '<input type="text" name="email" class="email" placeholder="Введите ваш е-mail:"><br>'+
      '<input type="text" name="order_text" value="<p><strong>Отправлено с формы: </strong>Пройти тест | Форма 2 - пройти тест</p> <br>' +
      'Количество правильных ответов: '+ totalAnswers + '" style="display:none;">' +
      '<button type="submit" class="send1">Получить программу</button>'+
      '</div></form></div></div>');
      $("#contact2").submit(function() { 
          send1_event($(this));
          $('a.fancybox-item.fancybox-close').click();
          return false; 
      });
      return;

    }
//    console.log(TestMass[0]);
//    console.log(TestMass[1]);
//    console.log(TestMass[2]);
//    console.log(TestMass[3]);
    
//    console.log('right='+right);
//    console.log('user_reply='+user_reply);
//    console.log('isRightReply='+isRightReply);
//    console.log('TestStep='+TestStep);
    
    if (isRightReply) {myPlotVal++;} else {myPlotVal--;};
    s2[TestStep-1] = new Array();
    s2[TestStep-1] = [TestStep-1,myPlotVal];
    plot1.series[0].data = s2;
    plot1.axes.xaxis.min = 0;
    plot1.axes.xaxis.max = 7;
//    plot1.axes.xaxes.pad = 0;
//    plot1.axes.xaxes.rendererOptions.forceTickAt0 = true;
    plot1.replot();
//    console.log(myPlotVal);
    if (myPlotVal < 0) { $('.test-line1-right p').css({"display":"block"}); } else { $('.test-line1-right p').css({"display":"none"}); };
    $( "div.jqplot-yaxis-tick:contains('2')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
    $( "div.jqplot-yaxis-tick:contains('4')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
    $( "div.jqplot-yaxis-tick:contains('6')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
//    console.log(s2);
    return false;
    
  }); 

  function get_pid(){
    var tmp_pid = "";
    tmp_pid = get_test_data('array', 134);
//    console.log('tmp_pid='+tmp_pid);
    var bol = true;
    while (bol === true){
      if (in_array(tmp_pid, TestMass[0])) {
        tmp_pid = (get_test_data('array', 134));
//        console.log('renew tmp_pid='+tmp_pid);
      }else{
        bol = false;
        pid = tmp_pid;
//        console.log('pid='+pid);
        return pid;
      }
    }
  }

  function isValidEmailAddress(emailAddress) {
//      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//      return /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(email) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(email);
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
  }


  function in_array(value, array) 
  {
      for(var k = 0; k < array.length; k++) 
      {
          if(array[k] == value) return true;
      }
      return false;
  }

  function get_text_area(){
    title       = get_test_data('title', pid);
    sub_title   = get_test_data('sub-title', pid);
    reply       = get_test_data('reply', pid);
    right       = get_test_data('right', pid);
    picture     = get_test_data('picture',pid);
    str_arrea = '<form>'+
      '<div id="title" class="test-vopros">'+title+'</div>'+
      '<p id="sub-title">'+sub_title+'</p>'+ reply+
      
    '</form>';

    // if (picture.length > 0) { $('.test-line1 .test-line1-left').css({"background-image": "url('/wp-content/uploads/2015/10/question_background.png')", "background-position": "right", "background-repeat": "no-repeat"}); };
    // if (picture.length <= 0) {$('.test-line1 .test-line1-left').css({"background-image":""}); };
    $("#text-content").html(str_arrea);
    $('.test-line1-left_bisy').css('display','none');

  }

  function get_test_data(what, pid){
    str="";
    $.ajax({
      type: "POST",
      url: "http://www.mymandarin.ru/get_mytest.php",
      async: false,
      data: {'what': what, 'pid': pid },
      success: function(html){
        str = jqXHR.responseText;
      },
      error: function (jqXHR, exception) {
          str = jqXHR.responseText;
          
        },
    });
    return str;
  }

  function setMass(){
    
    TestMass[0][TestStep] = pid;
    TestMass[1][TestStep] = right;
    TestMass[2][TestStep] = "пока пустой";
    TestMass[3][TestStep] = "пока пустой тоже";
    //TestMass[2][TestStep] = isRightReply;
    //TestMass[3][TestStep] = otvet;
  }
});