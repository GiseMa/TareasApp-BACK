import Task from "../models/Task.js";

const getTasks = async(req, res) => {

     try {
        const uid = req.uid;
        const tasks = await Task.find({user: uid})

        res.json({
            ok: true,
            tasks
        })

    } catch (error) {
        console.log('Error al traer tareas: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Error trayendo la tareas - BACK'
        })
    };
};

const getTaskById = async(taskId) => {

    try {
        const task = await Task.findById(taskId);
        return task;

    } catch (error) {
        console.log('Error al encontrar tarea: ', error);
        return null;
    };
};

const createTask = async(req, res) => {

    const task = new Task(req.body);

    try {
        task.user = req.uid;

        const saveTask = await task.save();

        res.json({
            ok: true,
            task: saveTask
        })
    } catch (error) {
        console.log('Error al guardar el evento: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Error creando la tarea - BACK'
        })
    };
};

const updateTask = async(req, res) => {

    const taskId = req.params.id;
    const uid = req.uid;

    try {
       if(getTaskById(taskId) === null) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una tarea con ese ID'
            })
       }
       const newTask = {
            ...req.body,
            user: uid
        }

        const updateTask = await Task.findByIdAndUpdate(taskId, newTask, {new: true});

        res.json({
            ok: true,
            task: updateTask
        })
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error actualizando la tarea - BACK'
        })
    }
};


const deleteTask = async(req, res) => {

    const taskId = req.params.id;

    try {
        if(getTaskById(taskId) === null) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una tarea con ese ID'
            })
       }

        await Task.findByIdAndDelete(taskId);
        return res.json({ok: true})

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error eliminando la tarea - BACK'
        })
    }
};

export {getTasks, createTask, updateTask, deleteTask};