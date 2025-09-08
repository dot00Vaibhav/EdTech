const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
      //!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET,
    })
	} catch (error) {
		console.log(error);
	}
};
