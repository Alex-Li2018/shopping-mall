
//操作localstorage的工具库

//添加localstorage的方法
export function addlocalStorage (searchContent) {  
    //判断搜索框里的内容是否为空,如果为空不添加到localstorage不继续下面的操作
    if(!searchContent) {
        return false;
    }

    //获取浏览器localstorage中键名为searchHistory中的数据
    var historyData = localStorage.getItem('searchHistory'); 
    if(!historyData) { 
        //因为一开始就没有这个searchHistory键名所以获取到为空,此时将historyData赋值为空数组
        historyData = [];
    }else {
        //不为空,那么键名存在,数据也存在并且是字符串,现在转化为数组
        historyData = JSON.parse(historyData);
    }	

    //判断搜索的内容是否重复
    if(historyData.indexOf(searchContent) != -1) {
        //如果有删除原来的内容,再作为第一个元素添加在数组前
        historyData.splice(historyData.indexOf(searchContent),1); //删除
        historyData.unshift(searchContent); //添加
    }else {
        //如果没有,直接作为第一个元素添加在数组前
        historyData.unshift(searchContent);
    }
    //将数据添加到键名为searchHistory中localstorage中的数据,不过又要把数组转成字符串
    localStorage.setItem('searchHistory',JSON.stringify(historyData));
}

//查询localstorage中的数据
export function queryLocalStorage (name){
    return localStorage.getItem(name)
}

//清空localstorage中的数据
export function clearHistory (name) {
    localStorage.removeItem(name);
}