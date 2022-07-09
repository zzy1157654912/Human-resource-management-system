export function getToken(){
    //会在localStorage里面存放Token ,服务器会给我们一个类似令牌，也会保存下来
    return localStorage.getItem('token')
}
//
export function setToken(token){
    localStorage.setItem('token',token) //把这里传过来的token给保存下来
}


export function isLogin() {
    if(localStorage.getItem('token')){//做一个判断token是否存在
        return true;// 存在返回true
    }
    return false;
}