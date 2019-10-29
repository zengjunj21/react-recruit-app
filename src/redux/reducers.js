/* 包含多个用于生成state的reduces函数的模块，根据老的state 和指定的action返回一个新的state*/
    import {combineReducers} from 'redux'

    function a(state=0,action){
	  return state;
	}

	function b(state=0,action){
	  return state;
	}

	export default combineReducers({
	  a,
	  b

	})

	/*
	
	    redux的 combineReducers方法 用于Reducer的拆分，只要定义各个子Reducer函数，然后用这个方法将他合成一个大的reducer
	*/