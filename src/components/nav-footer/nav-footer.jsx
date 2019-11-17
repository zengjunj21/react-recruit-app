/*
   底部导航组件
*/

import React,{Component} from 'react';
//希望在非路由组件中使用路由库的api?
//withRoute()
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
//ui
import {TabBar} from 'antd-mobile';
const Item = TabBar.Item;


class NavFooter extends Component{
    static propTypes = {
        navList:PropTypes.array.isRequired
    }
	render(){
        let {navList} = this.props;
        //过滤掉hide为true的nav
        navList = navList.filter((nav) => !nav.hide)
        const path = this.props.location.pathname;//请求的path
        //console.log(this.props.location)
		return(
            <TabBar>
            {
                navList.map((nav,index)=>(
                       <Item key={index}
                             title={nav.text}
                             icon = {{uri:require(`./images/${nav.icon}.png`)}}
                             selectedIcon = {{uri:require(`./images/${nav.icon}-select.png`)}}
                             selected = {path == nav.path}
                             onPress = {()=>this.props.history.replace(nav.path)}
                       />
                    ))
            }
            </TabBar>


			)
	}


}
//向外暴露withRouter()包装产生的组件
//内部会向组件中传入一些路由组件特有的属性：history，location，math
export default withRouter(NavFooter); 