import { DATAS } from "../constants/constants.js";
import searchModel from "../models/searchModel.js";


const getCrypto = async (req, res) => {
    
    try {
        const { value } = req.query;
        const response = await fetch('https://x.wazirx.com/wazirx-falcon/api/v2.0/crypto_rates');
        const datas = await response.json();

        res.status(201).json({prices: datas[value] , name: value});
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

        const result = datas.filter((data)=>{
            return data.includes(search.toLowerCase())
        })

        res.status(200).json({result})

    } catch (error) {
        console.log(error);
    }
}

const getSearches = async (req, res) =>{
    try {
        const searchData = await searchModel.find({userId: req.userId}).sort({createdAt: -1})
        res.status(200).json({searchData})
    } catch (error) {
        console.log(error);
    }
}

const deleteSearch = async (req, res) =>{
    try {
        const { searchId } = req.query;
        await searchModel.findByIdAndDelete(searchId);
        res.status(200).json({deleted: true});
    } catch (error) {
        console.log(error.message);
    }
}

const getPriceHistory = async (req, res) =>{
    try {
        const response = await fetch('https://x.wazirx.com/wazirx-falcon/api/v2.0/crypto_rates');
        const datas = await response.json();
        
    } catch (error) {
        console.log(error);
    }
}

const userController = {
    getCrypto,
    handleSearch,
    getSearches,
    deleteSearch
}

export default userController