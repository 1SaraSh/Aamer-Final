const Expert = require('../models/Expert')
const Seeker = require('../models/Seeker')


exports.index = async (req, res) => {
    const seekers = await Seeker.find()
    const experts = await Expert.find()
     
    res.render('adminView', { seekers, experts })
}

exports.deleteSeeker = async (req, res) => {
    await Seeker.findByIdAndDelete(req.params.id)
    res.redirect('/admin/')
}
exports.deleteExpert = async (req, res) => {
    await Expert.findByIdAndDelete(req.params.id)
    res.redirect('/admin/')
}

exports.updateExpert = async (req, res) => {
    const expert = await Expert.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/admin')
}