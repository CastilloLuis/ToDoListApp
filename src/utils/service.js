export const getMyTasks = (type) => {
    return new Promise((res, rej) => {
        try {
            res(getTasksByType(type));
        } catch (e) {
            rej(e);
        }
    })
}

export const addTask = (data, type) => {
    return new Promise((res, rej) => {
        try {
            getMyTasks(type).then((r) => {
                if(r === null) {
                    setTasks([data], type);
                } else {
                    r.push(data);
                    setTasks(r, type);
                }
                res(true);
            })
        } catch (e) {
            rej(false);
        }
    });
}

export const editTask = () => {

}

export const deleteTask = (id, type) => {
    return new Promise((res, rej) => {
        try {
            console.log('remove item');
            console.warn(id);
            getMyTasks(type).then((r) => {
                r.map((t) => t.id === id ? r.splice(r.indexOf(t), 1) : console.log('ney'));
                setTasks(r, type);
                res(r);
            })
        } catch (e) {
            console.log('error removing item');
            rej(e);
        }
    })
}

/* MARK AS IMPORTANT OR COMPLETE ITEM "SERVICES" */

export const markAsImportant = (id, type) => {
    return new Promise((res, rej) => {
        getMyTasks(1).then((r) => {
            let data = (r.filter(j => j.id === id))[0];
            try {
                getMyTasks(2).then((r) => {
                    if(r === null) {
                        setTasks([data], 2);
                    } else {
                        r.push(data);
                        setTasks(r, 2);
                    }
                    deleteTask(id, 1).then((d) => {
                        console.log(d);
                        res({
                            status: true,
                            tasks: d
                        });
                    })
                })
            } catch (e) {
                rej(e);
            }
        })
    })
}

export const markAsComplete = (id, type) => {
    return new Promise((res, rej) => {
        getMyTasks(type).then((r) => {
            let data = (r.filter(j => j.id === id))[0];
            try {
                getMyTasks(3).then((r) => {
                    if(r === null) {
                        setTasks([data], 3);
                    } else {
                        r.push(data);
                        setTasks(r, 3);
                    }
                    deleteTask(id, type).then((d) => {
                        console.log(d);
                        res({
                            status: true,
                            tasks: d
                        });
                    });
                })
            } catch (e) {
                rej(e);
            }
        })
    })
}

export const unmarkAsImportant = (id, type) => {
    return new Promise((res, rej) => {
        getMyTasks(2).then((r) => {
            let data = (r.filter(j => j.id === id))[0];
            try {
                getMyTasks(1).then((r) => {
                    if(r === null) {
                        setTasks([data], 1);
                    } else {
                        r.push(data);
                        setTasks(r, 1);
                    }
                    deleteTask(id, 2).then((d) => {
                        console.log(d);
                        res({
                            status: true,
                            tasks: d
                        });
                    })
                })
            } catch (e) {
                rej(e);
            }
        })
    })
}

export const unmarkAsComplete = (id, type) => {

}

/* set task switch && get task by id switch */

const setTasks = (tasks, type) => {
    switch(type) {
        case 1:
            localStorage.setItem('tasks', JSON.stringify(tasks));
            break;
        case 2:
            localStorage.setItem('important', JSON.stringify(tasks));
            break;
        case 3:
            localStorage.setItem('completed', JSON.stringify(tasks));
            break;
    }
}

const getTasksByType = (type) => {
    switch(type) {
        case 1:
            return JSON.parse(localStorage.getItem('tasks'));
        case 2:
            return JSON.parse(localStorage.getItem('important'));
        case 3:
            return JSON.parse(localStorage.getItem('completed'));
    }    
}