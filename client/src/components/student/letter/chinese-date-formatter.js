'use strict';

const ChineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const ChineseNumbersEmptyZero = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const CHINESE_TEN = '十';

function yearFormat (year) {
  return [].map.call(
    year.toString(),
    letter => ChineseNumbers[parseInt(letter, 10)]
  ).join('') + '年';
}

function monthFormat (month) {
  const unitsDigit = month % 10;
  return (month >= 10 ? CHINESE_TEN : '') + ChineseNumbersEmptyZero[unitsDigit] + '月';
}

function dayFormat (day) {
  const tensDigit = Math.floor(day / 10);
  const unitsDigit = day % 10;
  let result = '';

  if (tensDigit > 0) {
    result += (tensDigit > 1 ? ChineseNumbers[tensDigit] : '') + CHINESE_TEN;
  }
  result += ChineseNumbersEmptyZero[unitsDigit];
  result += '日';
  return result;
}

function dayOfWeekFormat (dayOfWeek) {
  return '星期' + ((dayOfWeek === 0) ? '日' : ChineseNumbers[dayOfWeek]);
}

class DateFormatter {
  constructor (date) {
    if (date === undefined) {
      date = new Date();
    } else if (date instanceof Date) {
      // no-op
    } else {
      // convert other input to Date object
      date = new Date(date);
    }

    this.date = date;
  }

  get full () {
    return yearFormat(this.date.getFullYear()) + monthFormat(this.date.getMonth() + 1) + dayFormat(this.date.getDate());
  }

  get simple () {
    return monthFormat(this.date.getMonth() + 1) + dayFormat(this.date.getDate());
  }

  get year () {
    return yearFormat(this.date.getFullYear());
  }

  get month () {
    return monthFormat(this.date.getMonth() + 1);
  }

  get day () {
    return dayFormat(this.date.getDate());
  }

  get dayOfWeek () {
    return dayOfWeekFormat(this.date.getDay());
  }
}

module.exports = DateFormatter;
