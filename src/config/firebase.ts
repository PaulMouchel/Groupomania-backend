const firebaseAdmin = require('firebase-admin');


const serviceAccount = require('../../firebase-config.json')

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export const storageRef = admin.storage().bucket(`gs://groupomania-files.appspot.com`);



// firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(serviceAccount),
//     storageBucket: `gs://groupomania-files.appspot.com`
//   });

// async function uploadFile(path, filename) {

//   // Upload the File
//   const storage = await storageRef.upload(path, {
//       public: true,
//       destination: `/images/${filename}`,
//       metadata: {
//           firebaseStorageDownloadTokens: uuidv4(),
//       }
//   });


//   return storage[0].metadata.mediaLink;
// }

// const bucket = firebaseAdmin.storage().bucket();
// // const options = {
// //     prefix: 'Images/',
// // }

// export default bucket