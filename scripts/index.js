// ===== Home page only =====

var createPostModal = document.getElementById('createPostModal');

// All Posts -> go to the blog list page
document.getElementById('allPostsBtn').addEventListener('click', function () {
  window.location.href = 'html/postslist.html';
});

// Create Post -> open modal
document.getElementById('createPostBtn').addEventListener('click', function () {
  openModal(createPostModal);
});

// Cross icon -> close modal
document.getElementById('closeCreatePost').addEventListener('click', function () {
  closeModal(createPostModal);
});

// "Create" button does nothing for now (API call will be added later)
document.getElementById('createBtn').addEventListener('click', function () {});