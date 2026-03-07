import mongoose,{ Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = Schema(
    {
        username:{
            type:String,
            required: true,
            unique:true,
            index:true,
            trim:true

        },
        email:{
            type:String,
            required: true,
            trim:true
            
        },
        password:{
            type:String,
            required: [true,"Password is required"],
        },
        fullname:{
            type:String,
            required: true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            required: false,
            trim:true
        },
        coverImage:{
            type:String,
            required: false,
            trim:true
        },
        watchHistoy:[
            {
                type:Schema.Types.ObjectId,
                ref:"Videos"
            }
        ]

    },{timestamps:true}

)


userSchema.pre("save",async function (next) {
    if(! this.isModified("password") ) return next()
    this.password = await bcrypt.hash(this.password,10)   
    next()
})

userSchema.methods.isPasswordCorrect() = async function(password){
    return await bcrypt.compare(password,this.password)
    
}

userSchema.methods.generateAccessToken() = async function (params) {
    return await jwt.sign({
        _id:this._id,
        name:this.username,
        fullname:this.fullname,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET ,
    {
        expiresIn:process.env.ACCESS_TOKEN_DURATION
    }
)
    
}
userSchema.methods.generateRefreshToken() = async function (params) {
    return await jwt.sign({
        _id:this._id,

    },
    process.env.REFRESH_TOKEN_SECRET ,
    {
        expiresIn:process.env.REFRESH_TOKEN_DURATION
    }
)
    
}



export const User = mongoose.model("User",userSchema)