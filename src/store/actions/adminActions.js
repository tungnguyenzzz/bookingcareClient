import actionTypes from './actionTypes';
import { saveDetailDoctor, getTopDoctorHomeService, getAllCodeService, createNewUserService, editUserService, getAllUsers, deleteUserService, getAllDoctors } from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {

                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetch error', error)
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {

                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetch error', error)
        }
    }

}
export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {

                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetch error', error)
        }
    }

}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewUserService(data);

            if (res && res.errCode === 0) {
                toast.success('Thanh cong');
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', error)
        }
    }
}
export const saveUserFailed = () => ({
    type: 'CREATE_USER_SUCCESS'
})
export const saveUserSuccess = () => ({
    type: 'CREATE_USER_FAILED'
})
export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {

                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', error)
        }
    }

}
export const fetchAllUsersSuccess = (users) => ({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: users
})
export const fetchAllUsersFailed = () => ({
    type: 'FETCH_ALL_USERS_FAILED',

})

export const deleteNewUser = (userId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUserService(userId);
            console.log('check user redux', res)
            if (res && res.errCode === 0) {
                toast.success('Delete Thanh cong');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Delete That bai');
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            toast.error('Delete That bai');
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await editUserService(data);

            if (res && res.errCode === 0) {
                toast.success('edit Thanh cong');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('edit That bai');
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error('edit That bai');
            dispatch(editUserFailed());
            console.log('editUserFailed error', error)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(10)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_USERS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_USERS_FAILED,

                })
            }

        } catch (error) {

            console.log('FETCH_TOP_DOCTORS_USERS_FAILED error', error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_USERS_FAILED,

            })
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,

                })
            }

        } catch (error) {

            console.log('FETCH_ALL_DOCTORS_FAILED error', error)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,

            })
        }
    }
}

export const saveDetailDoctorzzz = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data)
            if (res && res.errCode === 0) {
                toast.success('save success')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

                })
            } else {
                toast.error('save failed')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,

                })
            }

        } catch (error) {
            toast.error('save failed')
            console.log('SAVE_DETAIL_DOCTOR_FAILED error', error)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,

            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,

                })
            }

        } catch (error) {

            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED error', error)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,

            })
        }
    }
}