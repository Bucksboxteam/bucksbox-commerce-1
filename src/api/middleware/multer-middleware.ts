import path from "path";
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from "@aws-sdk/client-s3";




require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.SPACE_ACCESS_KEY_ID, // store it in .env file to keep it safe
        secretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY,
        
    },
    endpoint: process.env.SPACE_ENDPOINT,
    
    region: process.env.SPACE_REGION, // this is the region that you select in AWS account

    
    
})


  
  const s3Storage = multerS3({
    s3: s3, // s3 instance
    bucket: 'bucksbox-images' , // change it as per your project requirement
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
     // storage access type
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
        const fileName = `commerce/${Date.now()}_${file.fieldname}_${file.originalname}`
        cb(null, fileName);
    },
    
    
  });

function sanitizeFile(file, cb) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

    
    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}

// our middleware
const uploadImage = multer({
    storage: s3Storage ,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 20 // 2mb file size
    }
})

export default uploadImage