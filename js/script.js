let request = './data.json';
const main = document.getElementById('main');
const button = document.querySelector('button');
const header = document.querySelector('header');
const search = document.getElementById('input');
const form = document.getElementById('form');
const wrapper = document.querySelector('.wrapper');

const getCountries = async (url, searchTerm = '') => {
  try {
    const resp = await fetch(url);
    const responseData = await resp.json();

    // Clear existing countries before adding new ones
    main.innerHTML = '';

    responseData
      .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .forEach((item) => {
        const { name, flag, population, region, capital, subregion, nativeName, topLevelDomain, currencies, languages, borders } = item;
        const CountryEl = document.createElement('div');

        CountryEl.classList.add('countries');

        // Display detailed info of the clicked country
        CountryEl.addEventListener('click', () => {
          form.style.display = 'none'
          // Hide the country list and show the detailed country info
          main.style.display = 'none'; // Hide the main country list
          wrapper.style.display = 'block'; // Show the detailed view

          // Render the country details in the wrapper
          wrapper.innerHTML = `
            

            <button id="back"><i class="fa-solid fa-arrow-left"></i> Back</button>

            <main>
              <div class="detail">
                <img src="${flag}" alt="${flag}">
                <div class="info-p">
                <div>
                <h2>${name}</h2>
                </div>

                  <div class="flex">
                    <div class="info">
                      <p><strong>Native Name: </strong>${nativeName}</p>
                      <p><strong>Population: </strong>${population}</p>
                      <p><strong>Region: </strong>${region}</p>
                      <p><strong>Sub Region: </strong>${subregion}</p>
                      <p><strong>Capital: </strong>${capital}</p>
                    </div>

                    <div class="info">
                      <p><strong>Top Level Domain: </strong>${topLevelDomain.join(', ')}</p>
                      <p><strong>Currencies: </strong>${currencies.map(currency => currency.name).join(', ')}</p>
                      <p><strong>Languages: </strong>${languages.map(language => language.name).join(', ')}</p>
                    </div>
                  </div>

                  <div class="small-detail">
                    <p><strong>Border Countries:</strong></p>
                    ${borders && borders.length > 0 
                      ? borders.slice(0, 3).map(border => `<span>${border}</span>`).join('') 
                      : '<p>No borders</p>'}
                  </div>
                </div>
              </div>
            </main>
          `;

          // "Back" button to return to the list of countries
          const backButton = document.getElementById('back');
          backButton.addEventListener('click', () => {
            form.style.display = 'block'
            wrapper.style.display = 'none'; // Hide the country details
            main.style.display = 'grid'; // Show the country list again
          });
        });

        // Render the country card in the main container
        CountryEl.innerHTML = `
          <div>
          
            <img src="${flag}">
            <div class="countries-info">
              <h2>${name}</h2>
              <p><strong>Population: </strong>${population}</p>
              <p><strong>Region: </strong>${region}</p>
              <p><strong>Capital: </strong>${capital}</p>
            </div>
          </div>
        `;

        main.appendChild(CountryEl);
      });
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

// Call the function to load the countries
getCountries(request);

// Toggle dark mode on button click
button.addEventListener('click', () => {
  // button.innerText = 'Dark Mode'

  const body = document.body;
  body.classList.toggle('active');
  header.classList.toggle('active');
});

// Search functionality
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim(); // Get the search term

  if (searchTerm) {
    getCountries(request, searchTerm); // Pass the search term to the function
  } else {
    getCountries(request); // Fetch all countries if the search is empty
  }

  search.value = ''; // Clear the search input
});



// let request = './data.json';
// const main = document.querySelector('main');
// const button = document.querySelector('button');
// const header = document.querySelector('header');
// const search = document.getElementById('input');
// const form = document.getElementById('form');
// const wrapper = document.querySelector('.wrapper');

// const getCountries = async (url, searchTerm = '') => {
//   const resp = await fetch(url);
//   const responseData = await resp.json();

//   // Clear existing countries before adding new ones
//   main.innerHTML = '';

//   responseData
//     .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     .forEach((item) => {
//       const { name, flag, population, region, capital, subregion, nativeName, topLevelDomain, currencies, languages, borders } = item;
//       const CountryEl = document.createElement('div');

//       CountryEl.classList.add('countries');

//       // Display detailed info of the clicked country
//       CountryEl.addEventListener('click', () => {
//         // Hide the country list and show the detailed country info
//         main.style.display = 'none';
//         wrapper.style.display = 'block';

//         // Render the country details in the wrapper
//         wrapper.innerHTML = `
//           <header>
//             <h2>Where in the world?</h2>
//           </header>

//           <button id="back"><i class="fa-solid fa-arrow-left"></i> Back</button>

//           <main>
//             <div class="detail">
//               <img src="${flag}" alt="${flag}">
//               <div class="info-p">
//                 <h2>${name}</h2>

//                 <div class="flex">
//                   <div class="info">
//                     <p><strong>Native Name: </strong>${nativeName}</p>
//                     <p><strong>Population: </strong>${population}</p>
//                     <p><strong>Region: </strong>${region}</p>
//                     <p><strong>Sub Region: </strong>${subregion}</p>
//                     <p><strong>Capital: </strong>${capital}</p>
//                   </div>

//                   <div class="info">
//                     <p><strong>Top Level Domain: </strong>${topLevelDomain.join(', ')}</p>
//                     <p><strong>Currencies: </strong>${currencies.map(currency => currency.name).join(', ')}</p>
//                     <p><strong>Languages: </strong>${languages.map(language => language.name).join(', ')}</p>
//                   </div>
//                 </div>

//                 <div class="small-detail">
//                   <p><strong>Border Countries:</strong></p>
//                   ${borders && borders.length > 0 
//                     ? borders.slice(0, 3).map(border => `<span>${border}</span>`).join('') 
//                     : '<p>No borders</p>'}
//                 </div>
//               </div>
//             </div>
//           </main>
//         `;

//         // "Back" button to return to the list of countries
//         const backButton = document.getElementById('back');
//         backButton.addEventListener('click', () => {
//           wrapper.innerHTML = ''; // Clear the details
//           wrapper.style.display = 'none'; // Hide the country details
//           main.style.display = 'block'; // Show the country list again
//         });
//       });

//       // Render the country card in the main container
//       CountryEl.innerHTML = `
//         <div>
//           <img src="${flag}">
//           <div class="countries-info">
//             <h2>${name}</h2>
//             <p><strong>Population: </strong>${population}</p>
//             <p><strong>Region: </strong>${region}</p>
//             <p><strong>Capital: </strong>${capital}</p>
//           </div>
//         </div>
//       `;

//       main.appendChild(CountryEl);
//     });
// };

// // Call the function to load the countries
// getCountries(request);

// // Toggle dark mode on button click
// button.addEventListener('click', () => {
//   const body = document.body;
//   body.classList.toggle('active');
//   header.classList.toggle('active');
// });

// // Search functionality
// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const searchTerm = search.value.trim(); // Get the search term

//   if (searchTerm) {
//     getCountries(request, searchTerm); // Pass the search term to the function
//   } else {
//     getCountries(request); // Fetch all countries if the search is empty
//   }

//   search.value = ''; // Clear the search input
// });




// let request = './data.json';
// const main = document.querySelector('main');
// const button = document.querySelector('button');
// const header = document.querySelector('header');
// const search = document.getElementById('input');
// const form = document.getElementById('form');
// const wrapper = document.querySelector('.wrapper');
// const back = document.getElementsByClassName('back');


// const getCountries = async (url, searchTerm = '') => {
//   const resp = await fetch(url);
//   const responseData = await resp.json();

//   // Clear existing countries before adding new ones
//   main.innerHTML = '';

//   responseData
//     .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     .forEach((item) => {
//       const { name, flag, population, region, capital, subregion, nativeName, topLevelDomain, currencies, languages, borders } = item;
//       const CountryEl = document.createElement('div');

//       CountryEl.classList.add('countries');
      
//       // Display detailed info of the clicked country
//       CountryEl.addEventListener('click', () => {


        
//         // Render the country details in the wrapper
//         wrapper.innerHTML = `
//           <div class="wrapper">
//             <header>
//               <h2>Where in the world?</h2>
//             </header>

//             <button id="back"><i class="fa-solid fa-arrow-left"></i>Back</button>

//             <main>
//               <div class="detail">
//                 <img src="${flag}" alt="${flag}">
//                 <div class="info-p">
//                   <h2>${name}</h2>

//                   <div class="flex">
//                     <div class="info">
//                       <p><strong>Native Name: </strong>${nativeName}</p>
//                       <p><strong>Population: </strong>${population}</p>
//                       <p><strong>Region: </strong>${region}</p>
//                       <p><strong>Sub Region: </strong>${subregion}</p>
//                       <p><strong>Capital: </strong>${capital}</p>
//                     </div>

//                     <div class="info">
//                       <p><strong>Top Level Domain: </strong>${topLevelDomain.join(', ')}</p>
//                       <p><strong>Currencies: </strong>${currencies.map(currency => currency.name).join(', ')}</p>
//                       <p><strong>Languages: </strong>${languages.map(language => language.name).join(', ')}</p>
//                     </div>
//                   </div>

//                   <div class="small-detail">
//                   <p><strong>Border Countries:</strong></p>
//                   ${borders && borders.length > 0 
//                     ? borders.slice(0, 3).map(border => `<span>${border}</span>`).join('') 
//                     : '<p>No borders</p>'}
                  
//                   </div>
//                 </div>
//               </div>
//             </main>
//           </div>
//         `;

//         // "Back" button to return to the list of countries
//         const backButton = document.getElementById('back');
//         backButton.addEventListener('click', () => {
//           getCountries(request); // Reload the list of countries
//         });
//       });

//       // Render the country card in the main container
//       CountryEl.innerHTML = `
//       <div>
//         <img src="${flag}">
//         <div class="countries-info">
//           <h2>${name}</h2>
//           <p><strong>Population: </strong>${population}</p>
//           <p><strong>Region: </strong>${region}</p>
//           <p><strong>Capital: </strong>${capital}</p>
//         </div>
//       </div>
//       `;

//       main.appendChild(CountryEl);
//     });
// };

// // Call the function to load the countries
// getCountries(request);

// // Toggle dark mode on button click
// button.addEventListener('click', () => {
//   const body = document.body;
//   body.classList.toggle('active');
//   header.classList.toggle('active');
// });

// // Search functionality
// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const searchTerm = search.value.trim(); // Get the search term

//   if (searchTerm) {
//     getCountries(request, searchTerm); // Pass the search term to the function
//   } else {
//     getCountries(request); // Fetch all countries if the search is empty
//   }

//   search.value = ''; // Clear the search input
// });
