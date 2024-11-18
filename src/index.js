import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path: './env'
})

app.get('/', (req, res) => {
    res.status(200).send('Server up and running')
  })
connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongodb is not able to connect!!!", err);
})