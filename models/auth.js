const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    }, 
    email: {
        type: String, 
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email'
                ],
        required: [true, 'Email must be filled'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Password must be filled'],
        minlength: 6
    }
})

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createToken = function () {
    return jwt.sign({userId: this._id, name: this.name}, QXlvbWlkZTEwMDkj, {expiresIn: '30d'})
}

userSchema.methods.comparePassword = function (candidatePassword) {
    const isMatch = bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}



module.exports= mongoose.model('User', userSchema);