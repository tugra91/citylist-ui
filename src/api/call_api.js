import encodeUtf8 from "encode-utf8";
import { useSelector } from "react-redux";
import { getData, getDataWithHeader, postData, postDataWithHeader, postFormDataWithHeader } from "./client";
const base64 = require('base-64');

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
    if (data == null || data.resultList == null)
        return [];
    return data.resultList;
}

export const editCity = async (cityId, cityName, photoUrl, storedToken) => {
    const request = { cityId: cityId, newCityName: cityName, newPhotoUrl: photoUrl };
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storedToken }
    const data = await postDataWithHeader('/api/user/editCity', headers, request);
    if (data == null || data.newCity == null)
        return null;
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

    if (data == null || data.user == null)
        return null;
    return data.user;
}

export const signIn = async (username, password) => {
    const request = { username: username, password: password };
    const token = await postData('/api/signIn', request);
    if (token == null || token.accessToken == null) {
        return null;
    }
    return token.accessToken;
}