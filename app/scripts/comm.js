var cookie = {
    set: function(key, value) {
        $.cookie(key, value || '');
    },
    get: function(key) {
        return $.cookie(key);
    }
};

var base64 = {
    encode: function(val) {
        return $.base64.btoa(val, true)
    },
    decode: function(val) {
        return $.base64.atob(val, true)
    }
}

function logoErr(e) {
    e.src = './images/logo.png';
}