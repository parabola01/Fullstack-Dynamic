const {verify} = require("jsonwebtoken");


const validateToken = (req,res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({error: "Uzytkownik niezalogowany!"})

    try{
        const validToken = verify(accessToken, "randomLetters");
        req.user = validToken;
        if(validToken) {
            return next();
        }
    }catch (err){
       return res.json({error: e});
    }
}

module.exports = {validateToken};