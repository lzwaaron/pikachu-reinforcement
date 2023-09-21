const User = require('../db.js');

const express = require("express");
const db = require('../db.js');
const mdbController = {
    delete: async (req,res,next) => {
        try{
            let email = req.body.email;
            let placeID = req.body.placeID;

            console.log("email : " + email + " placeID : " + placeID)
    
            const result = await User.updateOne({ email: email},
                { $pull: { savedList: { placeID: placeID}}});
            
            res.locals.savedList = result;
            //console.log(res.locals.user)
            //console.log(User.find({email: email}, {savedList: 1}))
            return next();
        }catch(err){
            err = {
                log: 'There was an error in the mdbController.delete middleware' + err,
                status: 500,
                message: { err: 'There was an unknown server error'}
            }
            return next(err);
        }
    },
    
    //from search screen when user presses save
    saveTo: async (req,res,next) => {
        //deconstruct the request body
        let e = req.body.email;
        let p = req.body.placeID;
        let n = req.body.name;
        let a = req.body.address;
        let l = req.body.link

        console.log( "email : " + e +
                    " placeID : " + p +
                    " name : " + n +
                    " address + " + a +
                    " link : " + l 
        )
        
        //make a newSave Location object
        //update object according to email -> if it doesn't exist, create new document with said email
        // console.log("email, location and address are" +  email + address + name + placeID + link);
        // const identifier = { email: e }

        const place = { $push: { savedList: { placeID : p, name: n, address: a, link: l }} }
        const option = {new: true, upsert: true}

        try{
            
            // console.log("User exists? " + place )
            const result = await User.findOneAndUpdate({ "email": e }, place, option);
            console.log("result")
            res.locals.user = result;
            console.log(res.locals.user)
            //console.log(User.find({email: e}, {savedList: 1}))
            return next();
        }catch(err){
            err = {
                log: 'There was an error in the mbdontroller.saveTo middleware ' + err,
                status: 500,
                message: { err: 'There was an unknown server error'}
            }
            return next(err);
        }
    },
    
    getRows: async (req,res,next) =>{
        try{
            let {email} = req.body;
            console.log('in getRows email', email);
            const result = await User.findOne({email: email}, {savedList:1});
            res.locals.savedList = result;
            //console.log(result);
            next();
    
        }catch(err){
            err = {
                log: 'There was an error in the mdbController.getRows middleware' + err,
                status: 500,
                message: { err: 'There was an unknown server error'}
            }
            return next(err);
        }
    }
    
};


module.exports = mdbController;