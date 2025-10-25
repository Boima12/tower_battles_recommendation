const express = require('express')
const router = express.Router()

const {
    getRankTowers,
    getDetailTower,
    getMatchNameTowers
} = require('../controllers/towers.js')

router.route('/ranks/:rankValue').get(getRankTowers)

router.route('/detail/:towerId').get(getDetailTower)

router.route('/names').get(getMatchNameTowers);

module.exports = router