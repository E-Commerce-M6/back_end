import multer, { Multer } from "multer";

const upload: Multer = multer({ storage: multer.diskStorage({
    destination: "upload",
    filename: (request, file, callback) => {
      const filename = `${file.originalname}`
            
      return callback(null, filename)
    }})
  })

export default upload