export const Card = (data: any, test: any) => {
    return `
        <div class="card" >
            <img height="150" width="150" src="${data.name.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.name.data}</h5>
                <p class="card-text">${data.name.data}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
}