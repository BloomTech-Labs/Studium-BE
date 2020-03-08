const { multerUploads, dataUri } = require( "../utils/multer" );
const { cloudinaryConfig, uploader, url } = require(
  "../../config/cloudinaryConfig" );
const createError = require( "../utils/createError" );
const photos = require( "./photo-model" );
const moduleName = "PHOTO";

const router = require( "express" ).Router();

/**
 * @api {post} /api/photos/upload     Upload a new photo.
 * @apiVersion 1.0.0
 * @apiName UploadPhoto
 * @apiGroup Photos
 
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiExample Request example:
 * const request = axios.create({
      baseURL:
       'https://production-lambda-synaps-be.herokuapp.com/api/',
      timeout: 1000,
      headers: {'auth': '321sdf516156s'}
});
 
 * const formData = new FormData()
 * formData.append('file', file)
 *
 * request.post('/photos/upload', formData, {
 *    onUploadProgress: (ProgressEvent) => {
 *        console.log(ProgressEvent);
 *    })
 *    .then( res => {
 *        console.log(res);
 *    })
 *    .catch(err => {
 *        console.log(err);
 *    })
 *
 * @apiUse Error
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 * { photo: {public_id: "sjryhie73634" url: "http...."} }
 *
 */
router.post( "/upload", multerUploads, ( req, res, next ) => {
  
  if( req.file ){
    res.logger.info( "We have located the file in memory.", moduleName );
    const file = dataUri( req ).content;
    return uploader.upload( file ).then( ( result ) => {
      res.logger.info( "File uploaded to cloudinary.", moduleName );
      
      const public_id = result.public_id + "." + result.format;
      const photo_url = url( public_id, {
        width: 265, height: 265, crop: "fill"
      } );
      const photo = { public_id, photo_url };
      res.logger.info( photo );
      let saved = photos.add( photo );
      if( saved ){
        res.logger.info( "Photo saved in the db.", moduleName );
        res.status( 201 ).json( { photo } );
      }else{
        res.logger.errorMessage( "Photo did not save in the db.", moduleName );
        next( createError( 500,
          "/api/photos/uploads",
          "Failed to located" + " the image."
        ) );
      }
    } ).catch( ( err ) => {
      res.logger.errorMessage( "Photo upload to cloudinary failed.",
        moduleName
      );
      next( createError( err.status || 500,
        "/api/photos/uploads",
        err.message,
        err
      ) );
    } );
  }else{
    res.logger.errorMessage( "We did not receive a file to be uploaded.",
      moduleName
    );
    next( createError( 400, "/api/photos/uploads", "No file uploaded" ) );
  }
  
} );

/**
 * @api {delete} /api/photos/:public_id    Delete a image from the db.
 * @apiVersion 1.0.0
 * @apiName DeletePhotos
 * @apiGroup Photos
 *
 * @apiParam {String} public_id The public name of the image.
 
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiExample Request example:
 * const request = axios.create({
      baseURL:
       'https://production-lambda-synaps-be.herokuapp.com/api/',
      timeout: 1000,
      headers: {'auth': '321sdf516156s'}
});
 *
 * request.delete('/photos/:public_url')
 *    .then( res => {
 *        console.log(res);
 *    })
 *    .catch(err => {
 *        console.log(err);
 *    })
 *
 * @apiUse Error
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 * { photo: {public_id: "sjryhie73634" url: "http...."} }
 *
 */
router.delete( "/upload/:public_url", ( req, res, next ) => {
  
  const { public_id } = req.params;
  res.logger.info( moduleName,
    `Delteing image ${ public_id } from the bucket.`
  );
  
} );

module.exports = router;