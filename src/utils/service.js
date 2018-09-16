export const getMyTasks = (type) => {
    return new Promise((res, rej) => {
        try {
            res(getTasksByType(type));
        } catch (e) {
            rej(e);
        }
    })
}

export const getSingleTask = (id, viewType) => {
    return new Promise((res, rej) => {
        try {
            res((getTasksByType(viewType)).filter(j => j.id === id))
        } catch (e) {
            rej(e);
        }
    });
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

export const editTask = (json, viewType) => {
    return new Promise((res, rej) => {
        deleteTask(json.id, viewType).then((r) => {
            addTask(json, viewType).then((rs) => {
                getMyTasks(viewType).then((rr) => res(rr))
            })
        })        
    })

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

export const markAsImportant = (id, actualView)   => markService(id, actualView, 2);

export const markAsComplete = (id, actualView)    => markService(id, actualView, 3);

export const unmarkAsImportant = (id, actualView) => markService(id, actualView, 1);

export const unmarkAsComplete = (id, actualView)  => markService(id, actualView, 1);

/* util */

const markService = (id, actualView, nextView) => {
    return new Promise((res, rej) => {
        getMyTasks(actualView).then((r) => {
            let data = (r.filter(j => j.id === id))[0];
            try {
                getMyTasks(nextView).then((r) => {
                    if(r === null) {
                        setTasks([data], nextView);
                    } else {
                        r.push(data);
                        setTasks(r, nextView);
                    }
                    deleteTask(id, actualView).then((d) => {
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