import express from "express";
import cors from "cors";

export const applyMiddleware = (app) => {
  app.use(express.json({limit:"10mb"}));
  app.use(express.urlencoded({extended:true}));


app.use(cors({
    origin:["http://localhost:3000",process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials:true,
}))
};
