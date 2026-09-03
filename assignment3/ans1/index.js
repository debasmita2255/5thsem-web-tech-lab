const facultyData = [
  {
    name: "Ashish Kumar Layek",
    photo: "./assets/akl.png",
    email: "ashish@cs.iiests.ac.in",
    highestQualification:
      "M.E. in Computer Science and Technology, Bengal Engineering College (DU), 2001",
    subjectsTaught: ["Data Structures", "Object Oriented Programming"],
    researchAreas: [
      "Wireless Telecommunication and Networking",
      "Pattern Recognition, Computer Vision and Digital Image Processing",
    ],
  },
  {
    name: "Asit Kumar Das",
    photo: "./assets/akd.png",
    email: "akdas@cs.iiests.ac.in",
    highestQualification:
      "Ph.D.(Engineering) from Department of Computer Science and Technology, Bengal Engineering and Science University , 2011",
    subjectsTaught: ["Machine Learning", "Deep Learning"],
    researchAreas: [
      "Machine Learning",
      "Big Data Analytics ",
      "Data Mining and Pattern Recognition",
    ],
  },
  {
    name: "Tamal Pal",
    photo: "./assets/tp.png",
    email: "tamal@cs.iiests.ac.in",
    highestQualification:
      "Ph.D (Engineering), Computer Science and Technology, IIEST",
    subjectsTaught: ["Web Technology", "Discrete Structures"],
    researchAreas: [
      "Computer Vision: Multimedia (Image, Video, etc.) processing",
      "Games programming",
    ],
  },
  {
    name: "Nirnay Ghosh",
    photo: "./assets/ng.png",
    email: " nirnay@cs.iiests.ac.in",
    highestQualification: "Doctor of Philosophy (PhD), IIT Kharagpur, 2016",
    subjectsTaught: ["Graph algorithms"],
    researchAreas: ["IoT security"],
  },
  {
    name: "Sipra Das Bit",
    photo: "./assets/sdb.png",
    email: " sb@cs.iiests.ac.in",
    highestQualification:
      "Ph.D(Engg) from Dept. of Computer Sc. & Engg.from Jadavpur University, Kolkata, 1997",
    subjectsTaught: ["Data Base Management Systems"],
    researchAreas: ["Wireless Sensor Network", "Delay Tolerant Network"],
  },
];

const searchInput = document.getElementById("searchInput"),
  searchButton = document.getElementById("searchButton"),
  toggleThemeDark = document.getElementById("toggle-theme-dark"),
  toggleThemeLight = document.getElementById("toggle-theme-light"),
  facultyContainer = document.getElementById("faculty-data");

searchButton.addEventListener("click", () => {
  const searchName = searchInput.value.trim().toLowerCase();

  if (searchName === "") {
    facultyContainer.innerHTML = "<p>Please enter a name to search.</p>";
    return;
  }

  const filteredFaculty = facultyData.find((faculty) =>
    faculty.name.toLowerCase().includes(searchName),
  );

  if (filteredFaculty) {
    facultyContainer.innerHTML = `
      <div class="profile-card">
        <img class="profile-img" src="${filteredFaculty.photo}" alt="${filteredFaculty.name}">
        <div class="profile-info">
          <h2>${filteredFaculty.name}</h2>
          <p><strong>Email:</strong> ${filteredFaculty.email}</p>
          <p><strong>Highest Qualification:</strong> ${filteredFaculty.highestQualification}</p>
          <p><strong>Subjects Taught:</strong> ${filteredFaculty.subjectsTaught.join(", ")}</p>
          <p><strong>Research Areas:</strong> ${filteredFaculty.researchAreas.join(", ")}</p>
        </div>
      </div>
    `;
  } else {
    facultyContainer.innerHTML =
      "<p>No faculty member found with that name.</p>";
  }
});

toggleThemeDark.addEventListener("click", () => {
  document.body.classList.add("dark-theme");
});

toggleThemeLight.addEventListener("change", () => {
  document.body.classList.remove("dark-theme");
});
