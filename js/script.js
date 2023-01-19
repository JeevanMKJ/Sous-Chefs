// $(document).ready(function () {
//   var apiKey = "AIzaSyAdqjkqaabw133bQZUQLk1_Il8dClhtS-g";

//   var video = "";

//   $("#form").submit(function (event) {
//     event.preventDefault();

//     var recipes = "recipes";

//     var search = $("#search").val() + recipes;
//     $("#search").val("");

//     videoSearch(apiKey, search, 10);
//   });

//   function videoSearch(key, search, maxResults) {
//     $("#videos").empty();

//     $.get(
//       "https://youtube.googleapis.com/youtube/v3/search?key=" +
//       key +
//       "&type=video&part=snippet&maxResults=" +
//       maxResults +
//       "&q=" +
//       search,
//       function (data) {
//         console.log(data);

//         data.items.forEach((item) => {
//           video = `

//           <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>

//           `;

//           $("#videos").append(video);
//         });

//         // Save search id to local storage
//         localStorage.setItem("searchId", search);

//         // Retrieve search id from local storage and append it to ul list
//         var searchId = localStorage.getItem("searchId");
//         $("#search-history").append("<li>" + searchId + "</li>");
//       }
//     );
//   }
//   $("#search-history").on("click", "li", function () {
//     var searchId = $(this).text();
//     $("#search").val(searchId);
//   });
// });

$(document).ready(function () {
  var apiKey = "AIzaSyAdqjkqaabw133bQZUQLk1_Il8dClhtS-g";

  var video = "";

  // Check for search history in local storage and display it
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistory.forEach(function (searchId) {
    $("#search-history").append("<li>" + searchId + "</li>");
  });

  $("#form").submit(function (event) {
    event.preventDefault();

    var recipes = "recipes";

    var search = $("#search").val() + recipes;
    $("#search").val("");

    videoSearch(apiKey, search, 10);
  });

  function videoSearch(key, search, maxResults) {
    $("#videos").empty();

    $.get(
      "https://youtube.googleapis.com/youtube/v3/search?key=" +
        key +
        "&type=video&part=snippet&maxResults=" +
        maxResults +
        "&q=" +
        search,
      function (data) {
        console.log(data);

        data.items.forEach((item) => {
          video = `
          
          <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
          
          `;

          $("#videos").append(video);
        });

        // Save search to local storage
        searchHistory.push(search);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        // Append search to search history list
        $("#search-history").append("<li>" + search + "</li>");
      }
    );
  }
  $("#search-history").on("click", "li", function () {
    var searchId = $(this).text();
    $("#search").val(searchId);
  });
});
