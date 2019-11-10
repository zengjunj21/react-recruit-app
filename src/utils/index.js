/*
    工具函数模块

*/

/*
    分析
        -- 用户主界面
           -- 大神  /dashen
           -- 老板  /laoban
        -- 用户信息完善页面路由
           -- 大神  /dashenInfo
           -- 老板  /laobanInfo

        -- 判断是否已经完善信息？看用户header是否有值
        -- 判断用户类型：用户type

*/
//返回对应路由路径
export function getRedirectTo(type,header){
    let path ;
    //type
    if(type == 'laoban'){
        path = "/laoban"
    }else{
        path = "/dashen"
    }

    //header
    if(!header){ //没有值，返回信息完善页面的路径
        path += 'info'
    }

    return path;
}