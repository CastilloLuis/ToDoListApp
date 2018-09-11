export const getMyTasks = () => {
    return new Promise((res, rej) => {
        try {
            res(JSON.parse(localStorage.getItem('tasks')));
        } catch (e) {
            rej(e);
        }
    })
}

export const addTask = (data) => {
    return new Promise((res, rej) => {
        try {
            getMyTasks().then((r) => {
                if(r === null) {
                    localStorage.setItem('tasks', JSON.stringify([data]));
                } else {
                    /*console.log(r);
                    console.log(data);
                    console.log(r);*/
                    r.push(data);
                    localStorage.setItem('tasks', JSON.stringify(r));
                }
                res(true);
            })
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