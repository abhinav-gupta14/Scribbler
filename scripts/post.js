// ===== Single post page only =====

var postTitle = document.getElementById('postTitle');
var postText = document.getElementById('postText');
var editSaveBtn = document.getElementById('editSaveBtn');
var editSaveLabel = document.getElementById('editSaveLabel');
var editSaveIcon = document.getElementById('editSaveIcon');
var isEditing = false;

// ---------- Edit / Save ----------
function setEditable(on) {
  postTitle.contentEditable = on;
  postText.contentEditable = on;
  postTitle.classList.toggle('editable', on);
  postText.classList.toggle('editable', on);
}

editSaveBtn.addEventListener('click', function () {
  if (!isEditing) {
    // Edit -> Save
    isEditing = true;
    setEditable(true);
    editSaveLabel.textContent = 'Save';
    editSaveIcon.className = 'fa fa-save';
    postText.focus();
  } else {
    // Save -> Edit (the edited text simply stays on the page)
    isEditing = false;
    setEditable(false);
    editSaveLabel.textContent = 'Edit';
    editSaveIcon.className = 'fa fa-edit';
  }
});

// ---------- Like ----------
var likeCount = 0;
var likeLabel = document.getElementById('likeLabel');
var likeMessage = document.getElementById('likeMessage');

document.getElementById('likeBtn').addEventListener('click', function () {
  likeCount++;
  likeLabel.textContent = 'Liked!';
  likeMessage.textContent =
    likeCount === 1 ? '1 person likes this!' : likeCount + ' people like this!';
});

// ---------- Comments ----------
var commentInput = document.getElementById('commentInput');
var commentsBox = document.getElementById('commentsBox');

document.getElementById('commentBtn').addEventListener('click', function () {
  var value = commentInput.value.trim();
  if (value === '') {
    return; // ignore empty comments
  }

  var comment = document.createElement('div');
  comment.className = 'comment';
  comment.textContent = value;          // textContent keeps user input safe

  // newest comment goes to the TOP
  commentsBox.insertBefore(comment, commentsBox.firstChild);

  commentInput.value = '';
});