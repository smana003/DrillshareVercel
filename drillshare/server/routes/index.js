// import express from "express";
// import { Router } from "express";
// import { getListings, createListing, searchListing, deleteListingById, updateListing, getOwnedListings, getRentedListings} from "../controllers/ListingController.js";
// import { createTool, getToolCategoryById } from "../controllers/ToolController.js";
// import { createUser, getUserById } from "../controllers/UserController.js";
// import { getProfile, createProfile, updateProfile } from "../controllers/ProfileController.js";
// import {getPayment, updatePayment} from "../controllers/PaymentController";
// import { createReview, deleteReviewById, getReviewsById } from "../controllers/ReviewController.js";
// const router = Router();
// const PATH = "/api";

// router.use(express.urlencoded({extended:true}))
// router.use(express.json())

// const multer = require('multer');
// const path = require('path');

// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../public/img'));
//   },
//   filename: (req, file, cb) => {
//     console.log('multer: ', file)
//     console.log('multer req: ', req.body);
//     cb(null, Date.now() + file.originalname)
//   }
// });

// const upload = multer({ storage: imageStorage});

// /* GET home page. */
// router.get('/api/', getListings)
// router.post('/api/createListing', upload.array('image'), createListing)
// router.get('/api/searchListing', searchListing, (req, res, next) => {
//   res.redirect('/api/search');
// })
// router.get('/api/getRentedListings', getRentedListings);
// router.get('/api/getOwnedListings', getOwnedListings);

// router.get('/api/getToolCategoryById', getToolCategoryById);
// router.post('/api/createTool', createTool)
// // router.post('/api/createUser', createUser)
// router.get('/api/getUserById', getUserById)
// router.post('/api/deleteListingById', deleteListingById)
// router.post('/api/updateListing', updateListing)

// router.get('/api/getProfile', getProfile)
// // router.post('/api/createProfile', createProfile)
// router.post('/api/updateProfile', updateProfile)

// router.get('/api/getPayment', getPayment);
// router.post('/api/updatePayment', updatePayment);

// router.get('/api/getReviewsById', getReviewsById);
// router.post('/api/createReview', createReview);
// router.post('/api/deleteReviewById', deleteReviewById);

// export default router;
