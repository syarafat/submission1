/* eslint-disable no-shadow */
import UrlParser from '../routes/url-parser';
import sourceData from '../data/source';
import CONFIG from '../globals/config';
import LikeButtonInitiator from '../utils/like-button-initiator';

const Detail = {
    async render() {
        return `
        <section class="content">
            <div class="latest">
                <h1 id="restoName"></h1>
                <div class="detail-content" id="detail"></div>
                <div id="likeButtonContainer"></div>
            </div>
        </section>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const dataDetail = document.querySelector('#detail');

        try {
            const data = await sourceData.detailResto(url.id);

            const listCategory = data.restaurant.categories.map((category) => `
                <div class="tag">${category.name}</div>
            `).join('');

            const listMakanan = data.restaurant.menus.foods.map((food) => `
                ${food.name},
            `).join('');

            const listMinuman = data.restaurant.menus.drinks.map((drink) => `
                ${drink.name},
            `).join('');

            const listReview = data.restaurant.customerReviews.map((review) => `
                <div class="review-card">
                    <p><b>${review.name}</b> - ${review.date}</p>
                    <p>${review.review}</p>
                </div>
            `).join('');

            const detailHTML = `
                <div class="list_item">
                    <img class="list_item_img" src="${CONFIG.BASE_IMAGE_URL_MEDIUM + data.restaurant.pictureId}" alt="${data.restaurant.name}" title="${data.restaurant.name}">
                    <div class="city">${data.restaurant.city}</div>
                    <div class="list_item_content" style="text-align:left;">
                        <p class="list_item_rating">
                            Rating : 
                            <a href="#" class="list_item_rating_value">${data.restaurant.rating}</a>
                        </p>
                        <h2>${data.restaurant.name}</h2>
                        <p class="alamat">${data.restaurant.address}</p>
                        <div class="list_item_desc_detail">${data.restaurant.description}</div>
                        <br>
                        <h2>Menu</h2>
                        <div style="margin-top:10px;margin-bottom:20px">${listCategory}</div>
                        <h3>Makanan</h3>
                        <div style="margin-top:10px;margin-bottom:20px">${listMakanan}</div>
                        <h3>Minuman</h3>
                        <div style="margin-top:10px;margin-bottom:20px">${listMinuman}</div>
                        <h2>Review</h2>
                        <p>Apa kata mereka yang sudah pernah berkunjung ke sini?</p>
                        <div style="margin-top:-15px;margin-bottom:20px; padding-top:20px;padding-bottom:20px">${listReview}</div>
                    </div>
                </div>
            `;

            dataDetail.innerHTML = detailHTML;

            const likeButtonContainer = document.querySelector('#likeButtonContainer');
            likeButtonContainer.innerHTML = `
            <button aria-label="Like this restaurant" id="likeButton" class="like">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            </button>
        
            `;

            LikeButtonInitiator.init({
                likeButtonContainer,
                data: {
                    id: data.restaurant.id,
                    name: data.restaurant.name,
                    description: data.restaurant.description,
                    rating: data.restaurant.rating,
                    pictureId: data.restaurant.pictureId,
                    city: data.restaurant.city,
                },
            });
        } catch (error) {
            dataDetail.innerHTML = 'Restaurant not found';
        }
    },
};

export default Detail;
