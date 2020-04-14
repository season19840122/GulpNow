import axios from './axios';

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

/* 首页 */
// 订单列表
const orderList = data => {
  return axios({
    method: 'post',
    url: '/order/list',
    params: data
  });
};

// 提现信息
const amountdeail = data => {
  return axios({
    method: 'post',
    url: '/withdrawal/amountdeail',
    params: data
  });
};

// 提现明细列表
const list = data => {
  return axios({
    method: 'post',
    url: '/withdrawal/list',
    params: data
  });
};

// 确认提现
const save = data => {
  return axios({
    method: 'post',
    url: '/withdrawal/save',
    params: data
  });
};

// 修改提现账户
const update = data => {
  return axios({
    method: 'post',
    url: '/withdrawal/update',
    params: data
  });
};

// 修改提现账户
const sendActiveNo = data => {
  return axios({
    method: 'post',
    url: '/withdrawal/sendActiveNo',
    params: data
  });
};

// 资金管理
const page = data => {
  return axios({
    method: 'post',
    url: '/moneylog/page',
    params: data
  });
};

// 默认全部导出
export default {
  orderList,
  amountdeail,
  list,
  save,
  update,
  sendActiveNo,
  page
};
