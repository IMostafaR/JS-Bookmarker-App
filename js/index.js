var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");

var bookmarksList = [];

if (localStorage.getItem("bookmarksList") != null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmark(bookmarksList);
}

function addSite() {
  if (validateName(this.value) == true && validateUrl(this.value) == true) {
    var bookmark = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    bookmarksList.push(bookmark);
    console.log(bookmarksList);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
    displayBookmark(bookmarksList);
    clearInputs();
  }
}

function displayBookmark(arr) {
  var bookmarkView = "";
  for (var i = 0; i < arr.length; i++) {
    bookmarkView += `  <div class="mb-3">
    <span class="me-4 text-info-emphasis">${arr[i].siteName}</span>
    <a  href="https://${arr[i].siteUrl}" target="_blank" class="visit-icon me-4">
      <i class="fa-solid fa-up-right-from-square text-info"></i></a>
      <span class="delete-icon" onclick="deleteSite(${i})">
        <i class="fa-solid fa-trash-can text-danger"></i>
      </span>
     </div>
      `;
  }
  document.getElementById("bookmarks").innerHTML = bookmarkView;
}

function deleteSite(trashIndex) {
  bookmarksList.splice(trashIndex, 1);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
  displayBookmark(bookmarksList);
}

function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function validateName() {
  var regex = /^.{1,10}$/;
  if (regex.test(siteNameInput.value)) {
    document.getElementById("vName").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("vName").classList.replace("d-none", "d-block");
  }
  return regex.test(siteNameInput.value);
}

function validateUrl() {
  var regex = /^(www\.)[A-Za-z0-9]{1,}((\-)[a-zA-Z0-9]{1,})?(\.[a-zA-Z]{2,3})$/;
  if (regex.test(siteUrlInput.value)) {
    document.getElementById("vUrl").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("vUrl").classList.replace("d-none", "d-block");
  }
  return regex.test(siteUrlInput.value);
}
