// all post Category start
const allPostsCategory = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await res.json();

  const discussContainer = document.getElementById("discuss-container");

  //   clear phone container cards before adding new cards
  discussContainer.innerHTML = "";
  data.posts.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("single-post");
    if (item.isActive) {
      item.isActive = "badge-accent";
    } else {
      item.isActive = "badge-error";
    }
    div.innerHTML = `
    <div class="bg-[#f3f3f5] hover:bg-[#f1f2ff] hover:border-2 border-2 border-transparent shadow-xl hover:border-[#797dfc] col-span-4 p-10 rounded-xl mb-8">
    <div class="grid grid-cols-1 md:grid-cols-12  lg:grid-cols-12 ">
      <div
        class="col-span-2 author-img  relative"
      >
      <img class="w-[100px] h-[100px] rounded-xl avatar online relative mb-5" src="${item.image}"/>
      <div><span class="w-[15px] h-[15px] absolute top-[-4px] left-[91px] lg:right-[52px] rounded-full border-2 border-white ${item.isActive}" id="activeStatus"></span></div>
      </div>
      <div class="right-side col-span-10 md:ml-5 lg:ml-0">
        <div class="flex mb-2">
          <p class="mr-8 text-base font-medium inter-fonts"># ${item.category}</p>
          <p class="text-base font-medium inter-fonts">
            Author:  ${item.author.name}
          </p>
        </div>
        <h3 class="mulish-fonts font-bold text-lg mb-4">
          ${item.title}
        </h3>
        <p
          class="text-base font-normal inter-fonts text-[#12132D99] pb-4 border-b-2 border-dashed border-[#12132D99]"
        >
          ${item.description}
        </p>
        <div class="content-view flex justify-between mt-5">
          <div class="content-left flex">
            <div class="content-msg mr-10 text-[#12132D99]">
              <i class="fa-regular fa-message mr-2"></i>
              <span>${item.comment_count}</span>
            </div>
            <div class="content-eye mr-10 text-[#12132D99]">
              <i class="fa-regular fa-eye mr-2"></i>
              <span>${item.view_count}</span>
            </div>
            <div class="content-time text-[#12132D99]">
              <i class="fa-regular fa-clock mr-2"></i>
              <span>${item.posted_time}</span>
            </div>
          </div>
          <div class="content-right">
            <button onclick="handleShowDetail('${item.id}')" class="bg-[#10b981] mark-as-read-btn tooltip tooltip-primary rounded-full w-[30px] h-[30px]" data-tip="Please Click Me & Mark As Read">
              <i class="fa-solid fa-envelope-open text-white"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    discussContainer.appendChild(div);
  });
  toggleLoadingSpinner(false);
};

// all post Category end
const handleShowDetail = async (id) => {
  const e = id;
  // console.log(e);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?id=${id}`
  );
  const data = await res.json();
  data.posts.forEach((item) => {
    //console.log(item.id);
    if (item.id == e) {
      // console.log(item.title, item.view_count);
      // show here
      const cartCount = getMarkValue("mark-as-read");
      document.getElementById("mark-as-read").innerText = cartCount + 1;

      const selectedContainer = document.getElementById("selected-content");

      const div = document.createElement("div");
      div.classList.add("title-content-left");

      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      p1.classList.add("p1-style");
      div.classList.add("shadow-xl");
      p1.innerHTML = `
      <p>${item.title}</p>`;
      p2.innerHTML = `
      <p><i class="fa-regular fa-eye mr-3 pt-1"></i>${item.view_count}</p>`;
      div.appendChild(p1);
      div.appendChild(p2);
      selectedContainer.appendChild(div);
    }
  });
};

// latests post category

const allLatestPost = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  const latestPostContainer = document.getElementById("latest-post");

  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("latest-posts-card");
    div.innerHTML = `
    <div class="card bg-white border-[1px] border-gray-300 shadow-xl p-5">
    <figure>
      <img class="rounded-xl w-full"
        src="${item.cover_image}"
      />
    </figure>
    <div class="">
      <h2 class="card-title text-base text-[#12132D99] py-5">
        <i class="fa-regular fa-calendar-check"></i>${
          item?.author?.posted_date || "No publish date"
        }
      </h2>
      <h1 class="mulish-fonts font-extrabold text-xl">
        ${item.title}
      </h1>
      <p class="py-3 text-[#12132D99]">
        ${item.description.slice(0, 100)}
      </p>
      <div class="card-actions py-5">
        <div
          class="card-author-img mr-5"
        ><img class="w-[60px] h-[60px] rounded-full"
        src="${item.profile_image}"
      /></div>
        <div class="card-author-details">
          <h2 class="mulish-fonts font-extrabold text-lg">
            ${item.author.name}
          </h2>
          <p class="mulish-fonts text-[#12132D99] text-base">
          ${item?.author?.designation || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  </div>
    `;
    latestPostContainer.appendChild(div);
  });
};

// search
const handleSearch = () => {
  toggleLoadingSpinner(true);
  const searchBox = document.getElementById("search-box");
  const searchText = searchBox.value;
  // console.log(searchText);
  allPostsCategory(searchText);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// mark as read area
const markAsReadCart = document.getElementById("mark-as-read");
function getMarkValue(id) {
  const markAsRead = document.getElementById(id).innerText;
  const convertMarkAsRead = parseInt(markAsRead);
  return convertMarkAsRead;
}

const resultMarkAsRead = getMarkValue("mark-as-read");
// console.log(resultMarkAsRead);

allPostsCategory("");

allLatestPost();
