import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Switch, Route} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import Boss from '@/components/Boss'
import Genius from '@/components/Genius'
import Msg from '@/components/Msg'
import UserCenter from '@/components/UserCenter'
import NavFooter from '@/components/NavFooter'
import {connect} from 'react-redux'

@connect(
    state=>({user:state.user})
)
export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // todo 有一个bug 当User没有及时加载取到值的时候，牛人列表、boss列表都显示出来
        const user = this.props.user?this.props.user:'boss'
        const {pathname} = this.props.location
    
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                exact:false,
                hide:user.type==='genius',
            },
            {
                path:'/genius',
                text:'Boss',
                icon:'job',
                title:'BOSS列表',
                component:Boss,
                exact:false,
                hide:user.type==='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                exact:false,
                component:Msg
            },
            {
                path:'/usercenter',
                text:'我',
                icon:'boss',
                title:'个人中心',
                exact:false,
                component:UserCenter
            }
        ]

        const path = navList.find(v=>v.path===pathname)
        return (
            <div>
                <NavBar className='fixd-header' mode='dard'>{path&&path.title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route 
                                key={v.path} 
                                path={v.path} 
                                component={v.component}
                                exact={v.exact} 
                            />     
                        ))}
                    </Switch>
                </div>
                <NavFooter data={navList} />
            </div>
        )
    }
}
