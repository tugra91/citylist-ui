import { useDispatch } from "react-redux";
import { getData } from "../api/client";
import { citiesChanged } from "../reducers/cities_reducer";

function useLoadCitiesList() {
    const dispatch = useDispatch();
    const initCityList = async () => {
        let data = await getData('/api/getAllCities');
        dispatch(citiesChanged(data.cityList));
    }
    initCityList();
}

export default useLoadCitiesList;