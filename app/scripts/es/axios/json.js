import axios from './axios';

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
const orderList = data => {
  return axios({
    url: '/mock/orderList.json',
    params: data
  });
};

// 提现信息
const amountdeail = data => {
  return axios({
    url: '/mock/amountdeail.json',
    params: data
  });
};

// 提现明细列表
const list = data => {
  return axios({
    url: '/mock/list.json',
    params: data
  });
};

// 确认提现
const save = data => {
  return axios({
    url: '/mock/save.json',
    params: data
  });
};

// 修改提现账户
const update = data => {
  return axios({
    url: '/mock/update.json',
    params: data
  });
};

// 提现短信验证码
const sendActiveNo = data => {
  return axios({
    url: '/mock/sendActiveNo.json',
    params: data
  });
};

// 资金管理
const page = data => {
  return axios({
    url: '/mock/page.json',
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
