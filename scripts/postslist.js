// ===== Posts list page only =====
// (openModal / closeModal come from common.js)

var deleteModal = document.getElementById('deleteModal');
var postsContainer = document.getElementById('postsContainer');
var postToDelete = null;

// Trash icon -> remember which post was clicked and show the confirmation
postsContainer.addEventListener('click', function (event) {
  var trash = event.target.closest('.delete-icon');
  if (trash) {
    postToDelete = trash.closest('.post');
    openModal(deleteModal);
  }
});

// Yes -> remove the post (flex layout re-arranges the rest automatically)
document.getElementById('confirmDelete').addEventListener('click', function () {
  if (postToDelete) {
    postToDelete.remove();
    postToDelete = null;
  }
  closeModal(deleteModal);
});

// No -> just close the modal, page stays as it is
document.getElementById('cancelDelete').addEventListener('click', function () {
  postToDelete = null;
  closeModal(deleteModal);
});