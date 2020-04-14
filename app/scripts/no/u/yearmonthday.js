// export function setDate(year, month, day){
function setDate(year, month, day){
  //! 年月日
  $('.sel_year').select({
    name: 'year_in',
    value : year,
    showDefault : false,
    data: yearObj(),
    onChange: function(){
      getDay(day);
    }
  });

  $('.sel_month').select({
    name: 'month_in',
    value : month,
    showDefault : false,
    data: monthObj(),
    onChange: function(){
      getDay(day);
    }
  });

  getDay(day);

  function getDay(val) {
    $('.sel_day').select({
      name: 'day_in',
      value: val,
      showDefault: false,
      data: dayObj()
    });
  }
}

function yearObj(){
  var yearNow = new Date().getFullYear();
  // var yearSel = $('.sel_year').attr('rel');
  var yearObj = [];
  for (var i = yearNow; i >= 1900; i--) {
      // var sed = yearSel==i? 'selected': '';
      yearObj.push({text:i, value:i});
      // var yearStr = '<option value="' + i + '" ' + sed+'>' + i + '</option>';
      // $YearSelector.append(yearStr);
  }
  return yearObj;
}

function monthObj(){
  // var monthSel = $('.sel_month').attr('rel');
  var monthObj = [];
  for (var i = 1; i <= 12; i++) {
      // var sed = monthSel==i?'selected':'';
      monthObj.push({text:i, value:i});
  }
  return monthObj;
}

function dayObj(){
  var year = parseInt($('[name="year_in"]').val());
  var month = parseInt($('[name="month_in"]').val());
  var dayCount = 0;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      dayCount = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      dayCount = 30;
      break;
    case 2:
      dayCount = 28;
      if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
          dayCount = 29;
      }
      break;
    default:
      break;
  }

  // var daySel = $('.sel_day').attr('rel');
  var dayObj = [];
  for (var i = 1; i <= dayCount; i++) {
      // var sed = daySel==i?'selected':'';
      dayObj.push({text:i, value:i});
  }
  // console.log(dayObj);
  return dayObj;
}