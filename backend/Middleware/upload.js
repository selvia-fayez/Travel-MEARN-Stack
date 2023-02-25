import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    const filename = date + file.originalname;
    cb(null, filename);
  },
});
export default multer({ storage });
