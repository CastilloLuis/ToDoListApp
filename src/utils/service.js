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
                    setTasks([data]);
                } else {
                    /*console.log(r);
                    console.log(data);
                    console.log(r);*/
                    r.push(data);
                    setTasks(r);
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
            console.warn(id);
            getMyTasks().then((r) => {
                r.map((t) => t.id === id ? r.splice(r.indexOf(t), 1) : console.log('ney'));
                setTasks(r);
                res(r);
            })
        } catch (e) {
            console.log('error removing item');
            rej(e);
        }
    })
}

const setTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));