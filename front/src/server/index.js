import Vue from 'vue'
let mainUrl = ""
let vue = new Vue();


//user 服务
export const login = (param) => {
  return vue.axios.post(mainUrl + "/api/user/login", param)
}

export const register = (param) => {
  return vue.axios.post(mainUrl + "/api/user/register", param)
}

//song服务
export const getSong = () => {
  return vue.axios.get(mainUrl + "/api/song")
}