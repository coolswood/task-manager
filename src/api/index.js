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
    return api(`${localhost}/`, {name: text})
};

export const deleteTask = (text) => {
    return api(`${localhost}/deleteTask`, {name: text})
};

export const deleteItemTask = (text, type, thisTask) => {
    return api(`${localhost}/deleteItemTask`, {name: text, type: type, h1: thisTask.h1})
};