module.exports = { 
    isEmojiCharacter: function (substring) {
        for ( var i = 0; i < substring.length; i++) {  
            var hs = substring.charCodeAt(i);  
            if (0xd800 <= hs && hs <= 0xdbff) {  
                if (substring.length > 1) {  
                    var ls = substring.charCodeAt(i + 1);  
                    var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
                    if (0x1d000 <= uc && uc <= 0x1f77f) {  
                        return true;  
                    }  
                }  
            } else if (substring.length > 1) {  
                var ls = substring.charCodeAt(i + 1);  
                if (ls == 0x20e3) {  
                    return true;  
                }  
            } else {  
                if (0x2100 <= hs && hs <= 0x27ff) {  
                    return true;  
                } else if (0x2B05 <= hs && hs <= 0x2b07) {  
                    return true;  
                } else if (0x2934 <= hs && hs <= 0x2935) {  
                    return true;  
                } else if (0x3297 <= hs && hs <= 0x3299) {  
                    return true;  
                } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
                        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
                        || hs == 0x2b50) {  
                    return true;  
                }  
            }  
        }  

        return false;
    },
    containsEmoji :function(str) {    
    	   for (var i = 0; i < str.length; i++) {
    	      var codePoint = str[i];
    	        if (this.isEmojiCharacter(codePoint)) {
                    console.log(str+'确认有表情字符')
    	          //do nothing，判断到了这里表明，确认有表情字符
    	          return true;
    	        }
    	     }
    	   return false;
    },
    replaceEmoji :function (str) {
        if(this.containsEmoji(str)){
            console.log('替换');
            str = str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "a");
        }
        console.log('str: ' + str);
        return str;
    },
    filterName: function(b_text) {
        for (var i = 0; i < b_text.length; i++)  
        {  
            if((b_text[i] & 0xF8)== 0xF0){  
                for (var j = 0; j < 4; j++) {                          
                b_text[i+j]=0x30;                     
            }  
            i+=3;  
            }  
        }
        return b_text;
    }
}