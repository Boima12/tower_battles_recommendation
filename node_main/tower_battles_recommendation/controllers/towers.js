const { NotFoundError, BadRequestError } = require('../errors/index.js')
const { StatusCodes } = require('http-status-codes')

const Tower = require('../models/Tower.js');

// get rank towers
const getRankTowers = async (req, res) => {
    const { rankValue } = req.params;

    const rankTowersData = await Tower.find({
        rank: rankValue,
    });

    if (!rankTowersData || rankTowersData.length === 0) {
        console.log(`No towers found for rank: ${rankValue}`);
        throw new NotFoundError(`No towers found for rank: ${rankValue}`);
    }

    res.status(StatusCodes.OK).json({ rankTowersData });
}


// get detail tower
const getDetailTower = async (req, res) => {
    const { towerId } = req.params;

    const detailTowerData = await Tower.findOne({
        _id: towerId,
    });

    if (!detailTowerData) {
        console.log(`No tower found with ID: ${towerId}`);
        throw new NotFoundError(`No tower found with ID: ${towerId}`);
    }

    res.status(StatusCodes.OK).json({ detailTowerData });
}


// get towers match with multiple names
const getMatchNameTowers = async (req, res) => {
    try {
        // Expecting comma-separated names in query string
        // Example: /api/v1/towers/names?list=DJ,Commander,Mortar
        const { list } = req.query;
        if (!list) {
            throw new BadRequestError("Provide list of names")
        }

        const names = list.split(","); // ["DJ", "Commander", "Mortar"]

        const towersMatchName = await Tower.find({
            name: { $in: names }
        });

        if (!towersMatchName || towersMatchName.length === 0) {
            throw new NotFoundError(`No towers found for names: ${names.join(", ")}`);
        }

        res.status(StatusCodes.OK).json({ towersMatchName });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
    }
};



module.exports = {
    getRankTowers,
    getDetailTower,
    getMatchNameTowers
}