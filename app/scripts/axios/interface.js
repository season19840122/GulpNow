'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('./axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

/* 首页 */
// 订单列表
var orderList = function orderList(data) {
  return (0, _axios2.default)({
    method: 'post',
    url: '/order/list',
    params: data
  });
};

// 提现信息
var amountdeail = function amountdeail(data) {
  return (0, _axios2.default)({
    method: 'post',
    url: '/withdrawal/amountdeail',
    params: data
  });
};

// 提现明细列表
var list = function list(data) {
  return (0, _axios2.default)({
    method: 'post',
    url: '/withdrawal/list',
    params: data
  });
};

// 确认提现
var save = function save(data) {
  return (0, _axios2.default)({
    method: 'post',
    url: '/withdrawal/save',
    params: data
  });
};

// 修改提现账户
var update = function update(data) {
  return (0, _axios2.default)({
    method: 'post',
    url: '/withdrawal/update',
    params: data
  });
};

// 修改提现账户
var sendActiveNo = function sendActiveNo(data) {
  return (0, _axios2.default)({
    method: 'post',
    url: '/withdrawal/sendActiveNo',
    params: data
  });
};

// 资金管理
var page = function page(data) {
  return (0, _axios2.default)({
    method: 'post',
    url: '/moneylog/page',
    params: data
  });
};

// 默认全部导出
exports.default = {
  orderList: orderList,
  amountdeail: amountdeail,
  list: list,
  save: save,
  update: update,
  sendActiveNo: sendActiveNo,
  page: page
};