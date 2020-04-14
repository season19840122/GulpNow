'use strict';

var _json = require('../axios/json');

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 本地
// import axios from '@scripts/lib/axios/interface'; // 线上

window.$ = $;
window.axios = _json2.default;
window.common = common;