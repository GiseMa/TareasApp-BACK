import Task from "../models/Task.js";

const getTasks = async(req, res ) => {

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

const updateTask = async(req, res = response) => {

    const taskId = req.params.id;
    const uid = req.uid;

    try {
        const task = await Task.findById(taskId);

        if(!task) {
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

const completeTask = async(req, res) => {

    const taskId = req.params.id;

    try {

        const task = await Task.findById(taskId);

        if(!task) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una tarea con ese ID'
            })
        }
        task.completed = true;
        const updateTask = await task.save();

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
        const task = await Task.findById(taskId);
        
        if(!task) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una tarea con ese ID'
            })
        }

        if(!task.completed) {
            await Task.findByIdAndDelete(taskId);
            return res.json({ok: true})
        } else {
            task.eliminated = true;
            await task.save();
            return res.json({ ok: true, task });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error eliminando la tarea - BACK'
        })
    }
};

export {getTasks, createTask, updateTask, deleteTask, completeTask};