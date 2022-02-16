const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
const path = require ('path');

const port = process.env.PORT || 5000;

require('./connect');
const User = require('./signupSchema');


app.use(express.json());


// app.get('/', (req, res) => {
//     res.send("hello this is home");
// })

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ error: "filled the all given data" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }

        const user = new User({ name, email, password });

        const userSave = await user.save();
        if (userSave) {
            res.status(201).json({ message: "user registered successfuly" });
        }
        else {
            res.status(422).json({ error: "failed to register" });
        }


    } catch (error) {
        console.log(error);
    };

})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "filled the all given data" });
        }

        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const passMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires:new Date(Date.now()+3210000000),
                httpOnly:true
            });
           // console.log(token);

            if (!passMatch) {
                res.status(422).json({ error: "failed to login" });
            } else {
                res.status(201).json({ message: "user loged in successfuly" });
            }
        }else{
            res.status(422).json({ error: "failed to login" });
        }

    } catch (error) {
        console.log(error);
    };
})

app.get('/todo', auth,(req,res)=>{
    //console.log("this is home");
    res.send(req.rootUser);
});

app.get('/getdata', auth, (req,res)=>{
    //console.log("this is getdata");
    res.send(req.rootUser);
})

app.post('/contact',auth, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(422).json({ error: "filled the all given data" });
        }
       //console.log(req.userId)
        const userContact = await User.findOne({_id: req.userId})
        if(userContact){
            const userMessage = await userContact.addMessage(name, email,message);

            await userContact.save();
            res.status(201).json({message:"user contact is successful"});
            //console.log("contact succesfull");
        }else{
            console.log("error contact");
        }

    } catch (error) {
        console.log(error);
    };
})

app.get('/logout',(req, res)=>{
    res.clearCookie('jwtoken', {path: '/'});
    res.status(201).send("User logout");
    //console.log("user logout");
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join("client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });

}

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})