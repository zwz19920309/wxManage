
const menuService =  require('../weixin/service/menu-service');
const userService =  require('../weixin/service/user-service');
const validator  = require('../util/validator');
const util  = require('../util/util');
const wxuserService =  require('../wx/service/user-service');
const sqlMenuService =  require('../wx/service/menu-service');
module.exports = {
    async menuList(ctx){ // 获取已抽奖记录
        let params =  ctx.request.body || {};
        let res = { code: 0,  status:'success', message:'',body:[]}
        // let menu ={
        //     "button":[
        //     {	
        //          "type":"click",
        //          "name":"今日歌曲",
        //          "key":"V1001_TODAY_MUSIC"
        //      }]
        // }
        // let menus = {
        //         "button":[
        //         {	
        //              "type":"click",
        //              "name":"今日歌曲",
        //              "key":"V1001_TODAY_MUSIC"
        //          },
        //          {
        //               "name":"菜单",
        //               "sub_button":[
        //               {	
        //                   "type":"view",
        //                   "name":"搜索",
        //                   "url":"http://www.soso.com/"
        //                },
        //                {
        //                     "type":"view",
        //                     "name":"wxa",
        //                     "url":"http://mp.weixin.qq.com"
        //                 },
        //                {
        //                   "type":"view",
        //                   "name":"赞一下我们",
        //                   "url":"http://www.soso.com/"
        //                }]
        //           }]
        //     }
        //let createMenu = await menuService.createMenu(menus);
        // let getMenu = await menuService.getMenu();
        // let deleteMenu = await menuService.deleteMenu();
        // console.log('@createMenu:---- ')
        // console.dir(createMenu);
        // console.log('@getMenu:---- ')
        // console.dir(getMenu);
        // console.log('@deleteMenu:---- ')
        // console.dir(deleteMenu);
         //let userTotal = await userService.userTotal();
        //  let userList = await userService.userList();
        //  let openid = userList.data.openid[0];
        //  let userDetail = await userService.userDetail(openid);
        //  //console.log('@userTotal: ' + userTotal);
        // //let fOpenId =  await 
        // let rs = await wxuserService.updateUserList();

        // let menus = {
        //     "button":[
        //     {	
        //          "type":"click",
        //          "name":"今日歌曲",
        //          "key":"V1001_TODAY_MUSIC"
        //      },
        //      {
        //           "name":"菜单",
        //           "sub_button":[
        //           {	
        //               "type":"view",
        //               "name":"搜索",
        //               "url":"http://www.soso.com/"
        //            },
        //            {
        //                 "type":"miniprogram",
        //                 "name":"wxa",
        //                 "url":"http://mp.weixin.qq.com",
        //                 "appid":"wx286b93c14bbf93aa",
        //                 "pagepath":"pages/lunar/index"
        //             },
        //            {
        //               "type":"click",
        //               "name":"赞一下我们",
        //               "key":"V1001_GOOD"
        //            }]
        //       }]
        // }
        // let createMenu = await menuService.createMenu(menus);
       //  let wxmenuList = await menuService.getMenu(); 


       //  let data = {menuid:'666', menus: JSON.stringify(wxmenuList.menu)};

       //  let s =  await sqlMenuService.saveMenu(data);
         
        // console.log('@wxmenuList: ');
        // console.dir(wxmenuList);
        // let sqlMenuList = await sqlMenuService.menuList();
        let cons ={keys:'*',cons:'menuid',value:'123456'};
        let menus = await sqlMenuService.findMenu(cons);
        let menu;
        if(menus){
            menu = {menu: menus[0]};
        }
        // let  r= await wxuserService.userList(params);
        // let  total  = await wxuserService.userTotal(params);
        // r.total = total;
        // let resultBody = {list:r,total:total};
		ctx.response.body = util.RResult(menu,'获取数据成功','0');
    },
    async findMenu(ctx){ // 获取我的奖品

    },
    /**
     * 
     * @param {} ctx 
     */
    async saveMenus(ctx){ 
      let result = {};
      let menus = ctx.request.body;
      console.log('@saveMenu: ')
      console.dir(menus)
      if(validator.isEmpty(menus)) {
        result = util.EResult({},'请求参数不合法');
      } else {
          
         let params = {"button": menus};
    

        // let params = {
        //     "button":[ 
        //       {"key": "V1001_TODAY_MUSIC", "name": "今日歌曲", "type": "click", "sub_button": []},
        //       {"name": "菜单", "sub_button": 
        //       [{"url": "http://www.soso.com/", "name": "搜索", "type": "view", "sub_button": []},
        //       {"url": "http://mp.weixin.qq.com", "name": "wxa", "type": "view", "sub_button": []}, 
        //       {"url": "http://www.soso.com/", "name": "赞一下我们", "type": "view", "sub_button": []}]
        //     }]
        // }

        let res =await menuService.createMenu(params);

        result = util.RResult(res,'操作成功');
      }
      

      ctx.response.body = result;

    }
    
}