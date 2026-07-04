const express=require("express");

const router=express.Router();

const {
analyzeProfile,
getProfiles,
getSingleProfile
}=require("../controllers/githubController");

router.post("/analyze/:username",analyzeProfile);

router.get("/profiles",getProfiles);

router.get("/profiles/:username",getSingleProfile);

module.exports=router;