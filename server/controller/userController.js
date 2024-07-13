import { DATAS } from "../constants/constants.js";
import priceHistoryModel from "../models/priceHistoryModel.js";
import searchModel from "../models/searchModel.js";
import userModel from "../models/userModel.js";


const getCrypto = async (req, res) => {

    try {
        const { value } = req.query;
        const response = await fetch('https://x.wazirx.com/wazirx-falcon/api/v2.0/crypto_rates');
        const datas = await response.json();

        res.status(201).json({ prices: datas[value], name: value });
    } catch (error) {
        console.log(error);
    }
}

const handleSearch = async (req, res) => {
    try {
        const datas = DATAS

        const { search } = req.query

        const newSearch = searchModel({
            userId: req.userId,
            content: search
        })

        await newSearch.save()

        const result = datas.filter((data) => {
            return data.includes(search.toLowerCase())
        })

        res.status(200).json({ result })

    } catch (error) {
        console.log(error);
    }
}

const getSearches = async (req, res) => {
    try {
        const searchData = await searchModel.find({ userId: req.userId }).sort({ createdAt: -1 })
        res.status(200).json({ searchData })
    } catch (error) {
        console.log(error);
    }
}

const deleteSearch = async (req, res) => {
    try {
        const { searchId } = req.query;
        await searchModel.findByIdAndDelete(searchId);
        res.status(200).json({ deleted: true });
    } catch (error) {
        console.log(error.message);
    }
}

const getPriceHistory = async (req, res) => {
    try {
        const { value } = req.query
        const response = await fetch('https://x.wazirx.com/wazirx-falcon/api/v2.0/crypto_rates');
        const datas = await response.json();
        
        const priceData = []
        for(let data in datas){
            if(datas[data].usdt) {
                priceData.push({name: data, price: Number(datas[data].usdt)});
            }
        }

        const newPriceHistory = new priceHistoryModel({
            priceData
        })
        await newPriceHistory.save()

        const priceHistory = await priceHistoryModel.aggregate([
            {$unwind: "$priceData"},
            {$match: {"priceData.name": value}},
            {$group: {_id: null, prices: {$push: "$priceData.price"}}},
            {$project: {_id: 0, prices: 1}}
        ])

        res.status(200).json({ priceHistory: priceHistory[0].prices, name: value })

    } catch (error) {
        console.log(error);
    }
}

const handleLogout = async (req, res) =>{
    try {
        await userModel.updateOne({_id: req.userId},{$unset: {accessToken: ""}})
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
    }
}

const userController = {
    getCrypto,
    handleSearch,
    getSearches,
    deleteSearch,
    getPriceHistory,
    handleLogout
}

export default userController