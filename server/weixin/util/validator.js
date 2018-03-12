module.exports = {
    isValidAccessToken: function (data) {
        if(!data || !data.access_token || !data.expires_in) {
            return false;
        }
        var access_token = data.access_token;
        var expires_in = data.expires_in;
        var now = (new Date().getTime());
        if(now > expires_in) {
          return false
        }
        return true;
    },
    isEmpty: function(obj) {
      for (var key in obj) {
        return false;
      }
      return true;
    }
}