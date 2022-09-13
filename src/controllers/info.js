import { infoProcess } from '../../info.js';

export function showProcessInfo(req, res) {
    res.render('info', infoProcess)
}