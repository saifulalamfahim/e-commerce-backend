import express  from "express";
import cors from "cors";
import data from "./data.js";
import mongoose from "mongoose";
import config from "./config.js";
import userRouter from "./routers/userRouter.js";

// for mongodb conection
mongoose
.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    // useCreateIndex: true,
})
.then(() => {
    console.log('Connected to mongodb.');
})
.catch((error) => {
    console.log(error.reason);
});


// for expresss
const app = express();
app.use(cors());

// for admin router
app.use('/api/users', userRouter);

// for product
app.get("/api/products", (req, res) =>{
    res.send(data.products);
});


// for sending data to api.js(frontend)
app.get("/api/products/:id", (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found'});
    }
   
});

app.listen(5000, () => {
    console.log('server at http://localhost:5000');
})
