export const getMyTasks = () => {
    return JSON.parse(localStorage.getItem('tasks'));
}

export const addTask = (data) => {
    return new Promise((res, rej) => {
        try {
            localStorage.setItem('data', data);
            res(true);
        } catch (e) {
            rej(false);
        }
    });
}

export const deleteTask = (id) => {
    return new Promise((res, rej) => {
        try {
            console.log('remove item');
        } catch (e) {
            console.log('error removing item');
        }
    })
}