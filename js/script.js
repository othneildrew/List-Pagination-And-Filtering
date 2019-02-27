/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
const pageContainer = document.getElementsByClassName('page')[0];
const studentList = document.getElementsByClassName('student-list')[0];
const students = studentList.getElementsByClassName('student-item');
let studentsArray = Array.prototype.slice.call(students);
let indexes = Array();
let pageLimit = 10;







init();



/***
  * Initializes the program and sets the
  * inital state of the application.
  **/
function init() {
  let page = 1;

  for(let i = 0; i < students.length; i++) {
    indexes.push(i);
  }

  showPage(indexes, page);

  appendPageLinks(indexes, page);

  addSearchInput();
}



/***
  * Creates a search input and appends it to the first
  * instance of the element with a class of 'page-header'.
  **/
function addSearchInput() {
  const pageHeader = document.getElementsByClassName('page-header')[0];

  // Create div element with class of student-search
  let studentSearch = document.createElement('div');
  studentSearch.setAttribute('class', 'student-search');

  // Create text input element
  let searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Start typing to search');
  searchInput.addEventListener('keyup', search);

  // Create button element
  let searchBtn = document.createElement('button');
  searchBtn.textContent = 'Search';
  searchBtn.addEventListener('click', search);

  // Create search results paragraph text
  let resultsText = document.createElement('p');
  resultsText.style.clear = 'both';

  // Append elements and place in DOM
  studentSearch.append(searchInput);
  studentSearch.append(searchBtn);
  pageHeader.append(studentSearch);
  pageHeader.append(resultsText);
}



/***
  * Search and return items that match search criteria
  **/
function search() {
  const pageHeader = document.getElementsByClassName('page-header')[0];
  let searchInput = document.querySelectorAll('.student-search input')[0];
  let resultsText = document.querySelectorAll('.page-header p')[0];

  console.log('search input:::', searchInput.value.length);

  if(searchInput.value.length > 0) {
    indexes = Array();;

    for(let i = 0; i < students.length; i++) {

      let studentName = students[i].querySelectorAll('.student-details h3')[0];
      let studentEmail = students[i].querySelectorAll('.student-details span.email')[0];

      students[i].style.display = 'none';

      // Check if student name or email match search input
      if(studentName.textContent.match(searchInput.value) || studentEmail.textContent.match(searchInput.value)) {
        indexes.push(i);

        students[i].style.display = 'block';

        // Highlight section of text that matches search
          // Adopted: http://talkerscode.com/webtricks/highlight-words-on-search-using-javascript.php
        let highlightedName = studentName.textContent.replace(searchInput.value, '<span class="highlighted">'+ searchInput.value +'</span>');
        let highlightedEmail = studentEmail.textContent.replace(searchInput.value, '<span class="highlighted">'+ searchInput.value +'</span>');

        studentName.innerHTML = highlightedName;
        studentEmail.innerHTML = highlightedEmail;

      } else {
        //students[i].style.display = 'none';
      }
    }

    console.log(students);

    if(indexes.length > 0) {
      resultsText.textContent = 'Showing ' + indexes.length + ' search results';
    } else {
      resultsText.textContent = 'There were no results matching your search';
    }
    pageHeader.append(resultsText);

    let pagination = document.getElementsByClassName('pagination')[0];
    pageContainer.removeChild(pagination);
    appendPageLinks(indexes, 1);

    showPage(indexes, 1, true);
  }

}



/***
  * Take a given 'list' of students and a given page. Loop through
  * each instance of the items in 'list' and show based on its index.
  **/
function showPage(indexArray, page, search = false) {
  /*
    Display start and end calculates the range of items to
    display based on the page limit
  */
  //let displayStart = (page * pageLimit) - pageLimit - 1;
  //let displayEnd = page * pageLimit - 1;
  console.log('search value'+search);


  let rangeStart = (page * pageLimit) - pageLimit - 1;
  let rangeEnd = page * pageLimit - 1;

  console.log(rangeStart, rangeEnd);

  /*for (let i = rangeStart; i < rangeEnd; i++) {

    //console.log(i);

    if(indexArray.includes(i)) {
      students[i].style.display = 'block';
    } else {
      students[i].style.display = 'none';

    }

  }*/
  console.log('this is index array below...');
  console.log(indexArray);


  // Loop and display if within start and end range
  console.log('indexArray Length ==' + indexArray.length);




  /*
  for (let i = 0; i < indexArray.length; i++ ) {
    //console.log(indexes[i]);

    //students[i].style.display = 'none';

    console.log('search value', search);

    if(search) {
      studentsArray.forEach(function(element) {
        if(studentsArray.indexOf(indexes[element]) > rangeStart && studentsArray.indexOf(indexes[element]) <= rangeEnd) {
          students[i].style.display = 'block';
        } else {
          students[i].style.display = 'none';
        }
      });
    } else {
      if(indexArray.indexOf(indexes[i]) > rangeStart && indexArray.indexOf(indexes[i]) <= rangeEnd) {
        students[i].style.display = 'block';
      } else {
        students[i].style.display = 'none';
      }
    }





  }*/


}



/***
  * Takes a give number of items in 'list', creates pagination links,
  * adds it to the DOM based on the specified 'pageLimit'.
  **/
function appendPageLinks(indexArray, page) {
  // Create div element with class of pagination
  let pageLinksContainer = document.createElement('div');
  pageLinksContainer.setAttribute('class', 'pagination');

  // Create ul element and append to div
  let pageLinks = document.createElement('ul');
  pageLinksContainer.append(pageLinks);

  let totalItems = indexes.length;
  let pagesTotal = Math.ceil(totalItems / pageLimit);

  // Dynamically create button links if items exceed page limit
  for(let i = 1; i <= pagesTotal; i++) {
    let listItem = document.createElement('li');
    let button = document.createElement('a');
    button.setAttribute('href', i);
    button.textContent = i;

    // Call showPage function on click event
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // Get all pagination links and remove active class
      let paginationLinks = document.querySelectorAll('.pagination ul li a');
      for(let i = 0; i < pagesTotal; i++) {
        paginationLinks[i].removeAttribute('class', 'active');
      }
      // Set active class on clicked button
      page = e.target.getAttribute('href');
      showPage(indexes, page);
      e.target.setAttribute('class', 'active');
    });

    listItem.append(button);
    pageLinks.append(listItem);

    if(i === page) {
      button.setAttribute('class', 'active');
    }
  }

  // Append pagination links to DOM
  pageContainer.append(pageLinksContainer);
}
