import React,{Component} from 'react'
import qe from './qe.jpg'
import './logo.less'
export default class Logo extends Component{
	render(){
		return(
			    <div className = "logo-container">
	                <img className = "logo-img" src = {qe}/>
	            </div>
			)
	}
}