import moment from 'moment';

export const EMPTY_VAL = /^\s*$/;

export const getDate = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

export const generateID = () => {
    return Math.floor(Math.random() * (1597538246 - 1 + 1)) + 1;
}
