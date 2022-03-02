
const spinner = document.getElementById('spinner');
// spinner toggle 
const toggle = (displaySpinner) => {
    spinner.style.display = displaySpinner;
}
toggle('none', 'inline');
// load searching phone 
const loadPhone = async () => {
    toggle('inline');
    const search = document.getElementById('searchText');
    const searchText = search.value;
    search.value = '';
    // search error handle 
    if (searchText == "oppo" || searchText == "huawei" || searchText == "apple") {
        // load result 
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayPhone(data.data)

    }
    // error messege 
    else {
        const container = document.getElementById('error');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="d-flex justify-content-center text-secondary">
        <h5>No result found</h5>
        </div>
        `;
        container.appendChild(div);
        toggle('none');
    }

}
// display searching results 
const displayPhone = phones => {
    toggle('none')
    // clear error messege 
    const error = document.getElementById('error');
    error.textContent = '';
    const container = document.getElementById('displayPhones');
    container.textContent = "";
    // get all results from phones array 
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        // display single result in a card  
        div.innerHTML = `
    <div class="card w-100 p-4 mb-3 w-md-50 shadow border-0 rounded-3 " >
            <div class="px-4 pt-3 rounded">
                  <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            </div>
        <div class="card-body p-4">
          <h5 class="card-title pt-0 mt-0">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <a href="#showDetails" class="text-none">
          <button onclick="loadDetails('${phone.slug}')" class="bg-danger border-0 fw-bold text-white py-1 px-4 rounded ">Details</button>
          </a>
        </div>
      </div>
    `;
        container.appendChild(div)

    })
}
// load details 
const loadDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data)

}
// display phone details 
const displayDetails = details => {
    const handleOthers = () => {
        // handle details error 
        if (!details.others) {
            return "Not available";
        }
        for (const feature in details.others) {
            return (typeof (feature) == 'string' ? details.others : 'Not available');
        }
    }
    // show sensor 
    const getSensors = details.mainFeatures.sensors;
    const [sens1, sens2, sens3, sens4, sens5, sens6] = getSensors;

    const showDetails = document.getElementById('showDetails');
    showDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('d-flex');
    div.classList.add('justify-content-center');
    // show all details 
    div.innerHTML = `
        <div class="card mb-3 d-inline">
            <div class="row g-0 mt-3">
                    <div class="col-md-12 col-xl-12 d-flex flex-column justify-content-center ">
                    <div class="mx-auto">
                        <img src="${details.image}" class="img-fluid rounded-start" alt="...">
                    </div>
                        <div class="card-body ">
                            <h4 class="card-title text-center">${details.name}</h4>
                            <table class="table table-striped table-hover">
                            <tr>
                                <td>Release </td>
                                <td>${details.releaseDate} </td>
                            </tr>
                            <tr>
                                <th>Main Feature</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>Chipset </td>
                                <td>${details.mainFeatures.chipSet ? details.mainFeatures.chipSet : 'Not available'}</td>
                            </tr>
                            <tr>
                                <td>Memory </td>
                                <td>${details.mainFeatures.memory ? details.mainFeatures.memory : 'Not available'}</td>
                            </tr>
                            <tr>
                                <td>Display Size </td>
                                <td>${details.mainFeatures.displaySize ? details.mainFeatures.displaySize : 'Not available'}</td>
                            </tr>
                            
                            <tr>
                                <td>Sensor</td>
                                <td>${sens1}, ${sens2}, ${sens3}, ${sens4}, ${sens5}, ${sens6}, </td>
                            </tr>

                            <tr>
                               <th>Others</th> 
                               <td>${handleOthers() == "Not available" ? handleOthers() : ''}</td> 
                            </tr >
                            <tr>
                                <td>Bluetooth</td>
                                <td>${handleOthers().Bluetooth ? handleOthers().Bluetooth : 'No'}</td>
                            </tr >
                          
                            <tr>
                                <td>GPS</td>
                                <td>${handleOthers().GPS ? handleOthers().GPS : 'No'}</td>
                            </tr >
                          
                            <tr>
                                <td>NFC</td>
                                <td>${handleOthers().NFC ? handleOthers().NFC : 'No'}</td>
                            </tr >
                          
                            <tr>
                                <td>Radio</td>
                                <td>${handleOthers().Radio ? handleOthers().Radio : 'No'}</td>
                            </tr >
                          
                            <tr>
                                <td>USB</td>
                                <td>${handleOthers().USB ? handleOthers().USB : 'No'}</td>
                            </tr >
                          
                            <tr>
                                <td>WLAN</td>
                                <td>${handleOthers().WLAN ? handleOthers().WLAN : 'No'}</td>
                            </tr >
                          
                            
                        
    
                            </table >
                        </div >
                       
                    
                </div >
        </div >
    </div >
    `;
    showDetails.appendChild(div)
}

