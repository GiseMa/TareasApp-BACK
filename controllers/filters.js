import Filter from "../models/Filter.js";

export const getFilters = async(req, res) => {

    try {
        const types = await Filter.find({filterType: 'type'});
        const state = await Filter.find({filterType: 'state'});
        const order = await Filter.find({filterType: 'order'});

        res.json({
            types, state, order
        });
    } catch (error) {
        console.log('Error obteniendo filtros: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Error obteniendo filtros - BACK'
        })
    }
}