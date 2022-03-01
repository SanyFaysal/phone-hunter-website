

const loadPhone = async () => {
    const searchText = document.getElementById('searchText').value;
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data)
}
const displayPhone = phones => {
    // console.log(phones)
    const container = document.getElementById('displayPhones');
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card w-100 p-4 mb-3 w-md-50 shadow border-0">
            <div class="px-4 pt-3 rounded">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
        </div>
        <div class="card-body p-4">
          <h5 class="card-title pt-0 mt-0">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <a href="#showDetails" class="text-none">
          <button onclick="loadDetails('${phone.slug}')" class="bg-primary border-0 text-white py-1 px-4  rounded ">Details</button>
          </a>
        </div>
      </div>
        `
        container.appendChild(div)
    })
}

const loadDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data)

}

const displayDetails = details => {
    const allDetails = details.others;
    console.log(allDetails)
    const detailFunction = (property) => {
        if (!allDetails && allDetails.length == 0) {
            return 'Not available'
        }

        else {
            return allDetails + "." + property;
        }
    }
    console.log(detailFunction())

    const getSensors = details.mainFeatures.sensors;
    const [sens1, sens2, sens3, sens4, sens5, sens6] = getSensors;

    const showDetails = document.getElementById('showDetails');
    showDetails.innerHTML = `
        <div class="card  mb-3 d-inline">
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
                                <td>${details.mainFeatures.chipSet}</td>
                            </tr>
                            <tr>
                                <td>Memory </td>
                                <td>${details.mainFeatures.memory}</td>
                            </tr>
                            <tr>
                                <td>Display Size </td>
                                <td>${details.mainFeatures.displaySize}</td>
                            </tr>
                            
                            <tr>
                                <td>Sensor</td>
                                <td>${sens1}, ${sens2}, ${sens3}, ${sens4}, ${sens5}, ${sens6}, </td>
                            </tr>

                            <tr>
                                <th>Others</th>
                                <td>${detailFunction(Bluetooth)}, ${detailFunction(GPS)}, ${detailFunction(NFC)}, ${detailFunction(Radio)}, ${detailFunction(USB)}, ${detailFunction(WLAN)}</td>
                            </tr >
                            </table >
                        </div >
                       
                    
                </div >
        </div >
    </div >

    `
}

