import axios from "../axios"
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}
const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const deleteUserService = (id) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: id
        }
    })
}

const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData)
}

const getAllCodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-info-doctor`, data)
}
const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}
export { getDetailInforDoctor, saveDetailDoctor, getAllDoctors, handleLoginApi, getTopDoctorHomeService, getAllUsers, getAllCodeService, createNewUserService, deleteUserService, editUserService }