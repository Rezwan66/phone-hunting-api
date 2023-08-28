const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    // 1. get the container
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before add new cards--- needed when we search new items
    phoneContainer.textContent = '';
    // phoneContainer.innerHTML = ``;

    // display show all button only if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show all', isShowAll);
    // display only the first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);

        // 2. create an element
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3. set inner html
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body text-center">
                <h2 class="text-2xl font-bold">${phone.phone_name}</h2>
                <p class="max-w-xs mx-auto">There are many variations of passages of available, but the majority have suffered</p>
                <h2 class="text-2xl font-bold">$999</h2>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary capitalize text-white">Show Details</button>
                </div>
            </div>
        `
        // 4. append child to container
        phoneContainer.appendChild(phoneCard);
    })

    // hide loading spinner
    toggleLoadingSpinner(false);

    // show search results count
    const countItems = document.getElementById('count-items');
    countItems.innerHTML = `
        <p>Showing ${phones.length} results</p>
    `;
}

// handle show details modal button
const handleShowDetails = async (id) => {
    // console.log('show details btn clicked',id);
    // load single phone modal data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data.data);
    const phoneDetailsObj = data.data;
    showPhoneDetails(phoneDetailsObj)
}

const showPhoneDetails = (phoneDetailsObj) => {
    // show the modal
    console.log(phoneDetailsObj);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <figure><img src="${phoneDetailsObj.image}" class="w-1/3 mx-auto" alt="Shoes" /></figure>
        <h3 class="font-bold text-2xl mt-4">${phoneDetailsObj.name}</h3>
        <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p><span class="font-bold">Storage: </span>${phoneDetailsObj?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display Size: </span>${phoneDetailsObj?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Chipset: </span>${phoneDetailsObj?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">Memory: </span>${phoneDetailsObj?.mainFeatures?.memory}</p>
        <p><span class="font-bold">Slug: </span>${phoneDetailsObj?.slug}</p>
        <p><span class="font-bold">Release date: </span>${phoneDetailsObj?.releaseDate}</p>
        <p><span class="font-bold">Brand: </span>${phoneDetailsObj?.brand}</p>
        <p><span class="font-bold">GPS: </span>${phoneDetailsObj?.others?.GPS || 'No GPS available'}</p>
    `
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    // console.log('searched');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingContainer = document.getElementById('loading-dots-container');
    if (isLoading) {
        loadingContainer.classList.remove('hidden');
    } else {
        loadingContainer.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

// loadPhone();