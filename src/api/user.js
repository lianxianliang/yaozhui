import request from '@/utils/request';
import { stringify } from 'qs';

export function login(data) {
    return request.post(`http://120.79.36.58:80/login`, stringify(data));
}

export function preprocessing(path,data) {
    return request.post(`http://120.79.36.58:80/${path}`, stringify(data));
}