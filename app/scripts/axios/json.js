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

// 单独导出
/* export const list = id => {
  return axios({
    url: `/list${id}`,
    method: 'get'
  })
}

export const upload = data => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
} */

/* 首页 */
// 订单列表
var orderList = function orderList(data) {
  return (0, _axios2.default)({
    url: '/mock/orderList.json',
    params: data
  });
};

// 提现信息
var amountdeail = function amountdeail(data) {
  return (0, _axios2.default)({
    url: '/mock/amountdeail.json',
    params: data
  });
};

// 提现明细列表
var list = function list(data) {
  return (0, _axios2.default)({
    url: '/mock/list.json',
    params: data
  });
};

// 确认提现
var save = function save(data) {
  return (0, _axios2.default)({
    url: '/mock/save.json',
    params: data
  });
};

// 修改提现账户
var update = function update(data) {
  return (0, _axios2.default)({
    url: '/mock/update.json',
    params: data
  });
};

// 提现短信验证码
var sendActiveNo = function sendActiveNo(data) {
  return (0, _axios2.default)({
    url: '/mock/sendActiveNo.json',
    params: data
  });
};

// 资金管理
var page = function page(data) {
  return (0, _axios2.default)({
    url: '/mock/page.json',
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