import express from "express";

const viewRouter = express.Router();

viewRouter.get ("/", (req, res)=>{
    res.render ('home')
})

export default viewRouter;