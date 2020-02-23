const { multerUploads, dataUri } = require( "../utils/multer" );
const { cloudinaryConfig, uploader, url } = require(
  "../../config/cloudinaryConfig" );

const router = require( "express" ).Router();

router.post( "/upload", multerUploads, ( req, res, next ) => {
  
  if( req.file ){
    const file = dataUri( req ).content;
    return uploader.upload( file ).then( ( result ) => {
      let fileName = result.public_id + "." + result.format;
      let picture = url( fileName, {
        width: 265, height: 265, crop: "fill"
      } );
      return res.status( 200 ).json( {
        image: picture
      } );
      
    } ).catch( ( err ) => {
      res.status( 400 ).json( {
        messge: "someting went wrong while processing your request", data: {
          err
        }
      } );
    } );
  }
} );
module.exports = router;