/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
const pageContainer = document.getElementsByClassName('page')[0];
const studentList = document.getElementsByClassName('student-list')[0];

let pageLimit = 10;







init();



/***
  * Initializes the program and sets the
  * inital state of the application.
  **/
function init() {
  let page = 1;

  showPage(studentList, page);

  appendPageLinks(studentList, page);

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
  //studentSearch.append(searchBtn);
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
  let students = studentList.getElementsByClassName('student-item');
  let num = 0;

  for(let i = 0; i < students.length; i++) {

    let studentName = students[i].querySelectorAll('.student-details h3')[0].textContent;
    let studentEmail = students[i].querySelectorAll('.student-details span.email')[0].textContent;

    // Check if student name or email match search input
    if(studentName.match(searchInput.value) || studentEmail.match(searchInput.value)) {
      students[i].style.display = 'block';
      num++;
    } else {
      students[i].style.display = 'none';
    }



  }

  resultsText.textContent = 'Showing ' + num + ' search results';
  //resultsText.style.
  pageHeader.append(resultsText);




}



/***
  * Take a given 'list' of students and a given page. Loop through
  * each instance of the items in 'list' and show based on its index.
  **/
function showPage(list, page) {
  let students = list.getElementsByClassName('student-item');
  /*
    Display start and end calculates the range of items to
    display based on the page limit
  */
  let displayStart = (page * pageLimit) - pageLimit - 1;
  let displayEnd = page * pageLimit - 1;
  let num = 0;

  // Loop and display if within display start and end range
  for (let i = 0; i < students.length; i++ ) {
    if(num > displayStart && num <= displayEnd) {
      students[i].style.display = 'block';
    } else {
      students[i].style.display = 'none';
    }
    num++;
  }
}



/***
  * Takes a give number of items in 'list', creates pagination links,
  * adds it to the DOM based on the specified 'pageLimit'.
  **/
function appendPageLinks(list, page) {
  const totalItems = list.childElementCount;
  const pagesTotal = Math.ceil(totalItems / pageLimit);

  // Create div element with class of pagination
  let pageLinksContainer = document.createElement('div');
  pageLinksContainer.setAttribute('class', 'pagination');

  // Create ul element and append to div
  let pageLinks = document.createElement('ul');
  pageLinksContainer.append(pageLinks);

  // Dynamically create buttons based on items in a given 'list'
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
      showPage(studentList, page);
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
