import { getData, postData, postDataWithHeader } from "./client";

export const retrieveAllCities = async () => {
    const data = await getData('/api/getAllCities');
    if (data == null || data.cityList == null) {
        return [];
    } else {
        return data.cityList;
    }
}

export const searchAllCities = async (searchTerm) => {
    const request = { searchText: searchTerm };
    const data = await postData('/api/search', request);
    checkDataResult(data);
    return data.resultList;
}

export const editCity = async (cityId, cityName, photoUrl, storedToken) => {
    const request = { cityId: cityId, newCityName: cityName, newPhotoUrl: photoUrl };
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storedToken }
    const data = await postDataWithHeader('/api/user/editCity', headers, request);
    checkDataResult(data);
    return data.newCity;
}

export const registerUser = async (username, password, name) => {
    const request = {
        newUser: {
            username: username,
            password: password,
            name: name
        }
    };
    const data = await postData('/api/registerUser', request);
    checkDataResult(data);
    return data.user;
}

export const signIn = async (username, password) => {
    const request = { username: username, password: password };
    const token = await postData('/api/signIn', request);
    checkDataResult(token);
    return token.accessToken;
}

const checkDataResult = (data) => {
    const errorModel = { code: "", message: "", type: "" };
    if (data === null || data === undefined) {
        errorModel.message = "Unfortunately we are facing some issues. Please try again later.";
        throw errorModel;
    }

    if (data.code !== null && data.code !== undefined) {
        errorModel.code = data.code;
        errorModel.message = data.message;
        errorModel.type = data.exceptionType;
        throw errorModel;
    }

}