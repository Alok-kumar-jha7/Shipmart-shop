import express from "express";
import cors from "cors";


export const applyMiddleware = (app) => {
  app.use(express.urlencoded({extended:true}));


app.use(cors({
    origin:["http://localhost:5000",process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials:true,
}))
};
