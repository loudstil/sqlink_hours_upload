 function collect_data() {
 console.log('Starting');
  trs = $('#mainTableFrame').contents().find('#centerTable').contents().eq(1).contents();
  var dates = {
  };
  console.log(trs.length);
  for (var i = 1; i < trs.length; i++) {
    //console.log(i);
    var curObj = trs.eq(i);
    try {
      if (curObj.attr('id').match('TR20')) {
        // get curObj Content
        var curContent = curObj.contents();
        var date = curContent.eq(2).contents().eq(0).text();
        var inTime = curContent.eq(3).contents().eq(0).val(); //get(0).value;
        var outTime = curContent.eq(4).contents().eq(0).val(); //get(0).value;
        var extraTime = curContent.eq(8).contents().eq(0).val();
        if (extraTime != '') {
          outTime = getNewOutTime(outTime, extraTime)
          console.log(date + ' ==> ' + outTime);
        }
        dates[date] = {
                      "in" :  inTime,
                      "out" : outTime
                      };
        }
    } catch (err) {
        console.log(err);
    }
  }
  localStorage.setItem('isofit',dates);
  }
  
  function getNewOutTime(outTime, extraTime) {
  var outTimeArr = outTime.split(':');
  var outTimeHr = Number(outTimeArr[0]);
  var outTimeMin = Number(outTimeArr[1]);
  var extraTimeArr = extraTime.split(':');
  var extraTimeHr = Number(extraTimeArr[0]);
  var extraTimeMin = Number(extraTimeArr[1]);
  var newOutMin = (extraTimeMin + outTimeMin) % 60;
  var newOutHourAdd = extraTimeHr + parseInt((extraTimeMin + outTimeMin) / 60);
  outTimeHr += newOutHourAdd;
  if (outTimeHr >= 24) {
    outTimeHr -= 24;
  }
  if (outTimeHr < 10) {
    outTimeHr = '0' + outTimeHr;
  }
  if (newOutMin < 10) {
    newOutMin = '0' + newOutMin;
  }
  return outTimeHr + ':' + newOutMin;
}
  
