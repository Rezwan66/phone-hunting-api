const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    // console.log(phones);
    // 1. get the container
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before add new cards--- needed when we search new items
    phoneContainer.textContent = '';
    // phoneContainer.innerHTML = ``;

    // display show all button only if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }

    // display only the first 12 phones
    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        // console.log(phone);

        // 2. create an element
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3. set inner html
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button class="btn btn-primary capitalize text-white">Show Details</button>
                </div>
            </div>
        `
        // 4. append child to container
        phoneContainer.appendChild(phoneCard);
    })

    // show search results count
    const countItems = document.getElementById('count-items');
    countItems.innerHTML = `
        <p>Showing ${phones.length} results</p>
    `;
}

// handle search button
const handleSearch = () => {
    // console.log('searched');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);
}

// loadPhone();