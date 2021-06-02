FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform
  );
  
  let pond = FilePond.create(
      document.querySelector('.filepond'),
      {
          labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
          imagePreviewHeight: 170,
          imageCropAspectRatio: '1:1',
          imageResizeTargetWidth: 200,
          imageResizeTargetHeight: 200,
          stylePanelLayout: 'compact circle',
          styleLoadIndicatorPosition: 'center bottom',
          styleProgressIndicatorPosition: 'right bottom',
          styleButtonRemoveItemPosition: 'left bottom',
          styleButtonProcessItemPosition: 'right bottom'
      }
  )
  
  function changePicture() {
      const log = document.getElementById('log');
      const picture = pond.getFile(0).getFileEncodeBase64String();
      let user = auth.currentUser;
      if (user) {
          firebase.firestore().collection("users").doc(user.uid)
              .set({
                  profilePicture: picture
              }, {merge: true})
              .catch(error => {log.innerHTML = error.message})
      }
  }