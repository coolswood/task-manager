import api from "../helpers/api";
import { localhost } from '../config.js'

export const getData = (taskName) => {
    return api(`${localhost}/`, {name: taskName})
};

export const updateCommonData = (data) => {
    return api(`${localhost}/newCommonData`, data);
};

export const updateThisData = (data) => {
    return api(`${localhost}/newThisData`, data);
};

export const updateH1 = (data, oldText) => {
    return api(`${localhost}/updateH1`, {newData: data, oldText: oldText})
};

export const changeTask = (text) => {
    api(`${localhost}/`, {name: text})
};