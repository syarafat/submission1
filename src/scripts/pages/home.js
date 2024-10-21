import sourceData from '../data/source';
import CONFIG from '../globals/config';

const Home = {
    async render() {
        return `
        <style>
            .red {
                color: red;
            }

            .yellow {
                color: blue;
            }

            .green {
                color: green;
            }

            .rating {
                display: flex;
                align-items: center;
            }

            .rating-star {
                color: #f1c40f; /* Warna kuning */
                font-size: 16px;
                margin-right: 5px;
            }
        </style>
        <section class="content">
            <div class="latest">
                <h1 class="content_heading">Daftar Restoran</h1>
                <div class="list" id="restaurant-list"></div>
            </div>
        </section>
        `;
    },

    async afterRender() {
        const resto = await sourceData.listResto();
        let listData = '';
        resto.restaurants.forEach((data, index) => {
            let ratingColorClass = '';

            if (data.rating >= 0 && data.rating < 3) {
                ratingColorClass = 'red';
            } else if (data.rating >= 3 && data.rating < 4) {
                ratingColorClass = 'yellow';
            } else {
                ratingColorClass = 'green';
            }

            listData += `
            <div class="list_item" id="restaurant-${index}">
                <img class="list_item_thumb" loading="lazy" src="${CONFIG.BASE_IMAGE_URL_SMALL + data.pictureId}" alt="${data.name}" title="${data.name}">
                <div class="city">${data.city}</div>
                <div class="list_item_content">
                    <div class="rating">
                        <span class="rating-star">★</span>
                        <a href="#" class="list_item_rating_value ${ratingColorClass}">${data.rating}</a>
                    </div>
                    <h1 class="list_item_title"><a href="/#/detail/${data.id}">${data.name}</a></h1>
                    <div class="list_item_desc">${data.description.slice(0, 150)}...</div>
                </div>
            </div>
            `;
        });

        document.querySelector('#restaurant-list').innerHTML = listData;
    },
};

export default Home;
