var cookieUtil = {
    getCookie: function (name) {
        var arrCookie = document.cookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var cookieItem = arrCookie[i].split('=');
            if (cookieItem[0] == name) {
                return cookieItem[1];
            }
        }
        return undefined;
    },
    setCookie: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" +
            encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    removeCookie: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
}