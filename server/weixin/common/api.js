const prefix='https://api.weixin.qq.com';
const api={
    accessToken:prefix+'/cgi-bin/token?grant_type=client_credential',
    temporary:{
        upload:prefix+'/cgi-bin/media/upload',
        fetch:prefix+'/cgi-bin/media/media/get'
    },
    permanent:{
        upload:prefix+'/cgi-bin/material/add_material?access_token=',//其它信息
        uploadNews:prefix+'/cgi-bin/material/add_news?access_token=',//图文信息
        uploadNewsPic: prefix+'/cgi-bin/media/uploadimg?access_token=',//图片信息
        fetch:prefix+'/cgi-bin/material/get_material?access_token=',
        update:prefix+'cgi-bin/material/update_news?access_token=',
        delete:prefix+'/cgi-bin/material/del_material?access_token=',
        add: prefix+'/cgi-bin/material/add_material?access_token='
    },
   material:{
        fetchMaterialList:prefix+'/cgi-bin/material/batchget_material?access_token=',
        count:prefix+'/cgi-bin/material/get_materialcount?access_token='
    },
    menu:{ //菜单链接
      create:prefix +'/cgi-bin/menu/create?access_token=',
      get:prefix +'/cgi-bin/menu/get?access_token=',
      delete:prefix +'/cgi-bin/menu/delete?access_token=',
      current:prefix +'/cgi-bin/menu/addconditional',        
    },
    user:{
      total:prefix + '/cgi-bin/user/get?access_token=', 
      userlist:prefix + '/cgi-bin/user/get?access_token=',  
      userDetail:prefix + '/cgi-bin/user/info?access_token='  
    }
}
module.exports=api;