import axios from 'axios';
let base = 'proxyapi/coms-web';

export const commonurl = `${base}/*.jsonRequest`; //通用的请求地址
export const loginurl = `${base}/logon/login`; //登录地址
export const logout = `${base}/logon/logout`; //退出地址
export const rolesurl = `${base}/logon/myRoles`; //获取角色地址
export const changepwd = `${base}/logon/changepwd`; //修改密码接口地址
export const imguploadurl = `${base}/admin/file/upload1`; //图片上传接口地址
export const imgview = "http://115.236.19.147:15981/bs-coms/upload/"; //图片预览地址
export const filedowned = "http://115.236.19.147:15981/bs-coms/download/"; //文件下载地址
export const area_url = `${base}/coms.dictionary.coms_region.dic/`; //省市联动请求地址
export const filedownload_url = "http://115.236.19.147:15981/coms-web/download/"; //文件下载地址



// 登录提交获取角色列表
export const requestrolelist = params => {
	return axios.post(`${base}/logon/myRoles`, params)
};
// 登录提交保存sessionStorage的accessToken
export const requestLoginon = params => {
	return axios.post(`${base}/logon/login`, params)
};
//获取的accessToken
export const getsessionStorage = () => {
	return sessionStorage.getItem("accessToken")
};

// 通用ajax请求方法
export const commonAjax = (params, ServiceId, ServiceMethod) => {
	var instance = axios.create({
		headers: {
			"X-Access-Token": getsessionStorage(),
			"X-Service-Id": ServiceId,
			"X-Service-Method": ServiceMethod,
			"Content-Type": "application/json"
		}
	})
	return instance.post(`${base}/*.jsonRequest`, params).then(res => res.data);
};
// 用于编辑器的图片上传 
export const imguploadAjax = (params) => {
	var instance = axios.create({
		headers: {
			"X-Access-Token": sessionStorage.getItem("accessToken")
		}
	});
	return instance.post(imguploadurl, params).then(res => res.data)
};

// export const requestLogin = params => {
// 	return axios.post(`${base}/login`, params).then(res => res.data);
// };

// export const getUserList = params => {
// 	return axios.get(`${base}/user/list`, {
// 		params: params
// 	});
// };

// export const getUserListPage = params => {
// 	return axios.get(`${base}/user/listpage`, {
// 		params: params
// 	});
// };

// export const removeUser = params => {
// 	return axios.get(`${base}/user/remove`, {
// 		params: params
// 	});
// };

// export const batchRemoveUser = params => {
// 	return axios.get(`${base}/user/batchremove`, {
// 		params: params
// 	});
// };

// export const editUser = params => {
// 	return axios.get(`${base}/user/edit`, {
// 		params: params
// 	});
// };

// export const addUser = params => {
// 	return axios.get(`${base}/user/add`, {
// 		params: params
// 	});
// };