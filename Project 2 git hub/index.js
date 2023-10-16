console.log("Hello JavaScript");

const url = "https://api.github.com/users/";
const searchInputEl = document.getElementById("getUsername");
const searchButtonEl = document.getElementById("searchBtn");
const profile = document.getElementById("profileSet");
const whenError = document.getElementById("whenError");

const avatar = document.getElementById("imgAvatar");
const userName = document.getElementById("userName");
const nameUser = document.getElementById("nameUser");
const profileLink = document.getElementById("profileLink");
const gettingAbout = document.getElementById("gettingAbout");
const followers = document
  .getElementById("followers")
  .getElementsByTagName("p")[0];
const followings = document
  .getElementById("followings")
  .getElementsByTagName("p")[0];
const repos = document.getElementById("repos").getElementsByTagName("p")[0];
const animation = document.getElementById("animation");
const main = document.getElementById("main");
const main2 = document.getElementById("main2");

main.style.height = "100vh";

let username = searchInputEl.value;
const fetchingGithub = async () => {
  profile.classList.add("hide");
  whenError.classList.add("hide");
  animation.classList.remove("hide");
  main2.classList.remove("hide");
  main.style.height = "40vh";

  try {
    localStorage.setItem("search", username);
    const response = await fetch(`${url}${username}`);
    const data = await response.json();
    animation.classList.add("hide");

    if (data.message !== "Not Found") {
      whenError.classList.add("hide");
      profile.classList.remove("hide");
      avatar.src = data.avatar_url;
      userName.innerHTML = `${"@"}${data.login}`;
      nameUser.innerHTML = data.name;
      profileLink.href = `${"https://github.com/"}${searchInputEl.value}`;
      gettingAbout.innerHTML = data.bio;
      followers.innerHTML = data.followers;
      followings.innerHTML = data.following;
      repos.innerHTML = data.public_repos;
    } else {
      whenError.classList.remove("hide");
      profile.classList.add("hide");
    }
  } catch (error) {
    console.log(error);
  }
};

const clearFetchingGithub = () => {
  localStorage.clear();
  username = searchInputEl.value;
  localStorage.setItem("search", username);
  fetchingGithub();
};

const preSearch = () => {
  const item = localStorage.getItem("search");
  if (item) {
    username = item;
    fetchingGithub();
  }
};

searchButtonEl.addEventListener("click", clearFetchingGithub);
preSearch();
