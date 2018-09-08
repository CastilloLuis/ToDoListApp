import moment from 'moment';

export const EMPTY_VAL = /^\s*$/;

export const getDate = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}
