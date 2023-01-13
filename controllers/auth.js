const User = require('../models/auth');

const register = async (req, res) => {
    const user = await User.create({...req.body});
    const token = await user.createToken();

    res.status(201).json({name: user.name, token});   
}

const login = async ( req, res) => {
    const { email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({msg: 'Please provide all neccessary details'});
    }

    const user = await User.findOne({email});
    
    if(!user) {
        return res.status(400).json({msg: 'Invalid credentials! X'});
    }

    const isCorrect = await user.comparePassword(password);

    if(!isCorrect) {
        return res.status(400).json({msg: 'Invalid credentials! X'});
    }

    const token = user.createToken();

    res.status(201).json({ name: user.name, token});
}



module.exports = { register, login}
