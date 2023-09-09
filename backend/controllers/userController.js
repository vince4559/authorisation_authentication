const userModel = require('../model/User_model');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) return res.status(400).json({"message":'username and password are required'});

    // check for duplicate username in the db
    const duplicate = await userModel.findOne({username}).exec();
    if(duplicate) res.status(409).json({"message":"username already existing"}); //conflict;
    try {
        //encrypt password
        const hashedpwd = await bycrypt.hash(password, 10);
        // create and store the user
        const result = await userModel.create({
            "username":username,
            "password":hashedpwd
        });
        console.log(result);
        res.status(201).json({"message":`new user ${username} created`})
    } catch (err) {
        res.status(500).json({"message":err.message});
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({"message":'username and password are required'});

    const foundUser = await userModel.findOne({username}).exec();
    if(!foundUser) return res.status(401).json({'message':"user not found"});

    // check if password is correct
    const matchpwd = await bycrypt.compare(password, foundUser.password);

    if(matchpwd) {
        const roles = Object.values(foundUser.roles);

        // create jwt
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "username":foundUser.username,
                    'roles':roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET, {expiresIn:'30s'}
        );

        const refreshToken = jwt.sign(
            {"username":foundUser.username}, 
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        // saving refreshtoken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        // console.log(result);
        
        res.cookie("jwt", refreshToken, {httpOnly:true, sameSite:'none',secure:true, maxAge:24 *60*60*100}); //secure:true
        res.json({accessToken})
    }else{
        res.status(401).json({"message":'incorrect password'})
    }
};


exports.refresh_Token = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401); //unauthorised

    const refreshToken = cookies.jwt;
    const foundUser = await userModel.findOne({refreshToken}).exec() 
    if(!foundUser) return res.sendStatus(403); // forbiden

    // evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err || foundUser.username !== decoded.username) return res.sendStatus(403); //

        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "username":decoded.username,
                    "roles":roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET, {expiresIn:'30s'}
        );
        res.json({accessToken})
    })
};

exports.logOut = async (req, res) => {
    // on client also dlete the access token
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //no content
    
    const refreshToken = cookies.jwt;
    // is refreshToken in the db
    const foundUser = await userModel.findOne({refreshToken}).exec();

    if(!foundUser){
        res.clearCookie('jwt', {httpOnly:true, sameSite:'none', secure:true});
        res.sendStatus(204);
    }
    // delete reshtoken in the db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('jwt',{httpOnly:true, sameSite:'none'}); //secure:true
    res.sendStatus(204);
}