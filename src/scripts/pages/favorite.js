import FavoriteIdb from '../data/database-idb';
import CONFIG from '../globals/config';

const Like = {
    async render() {
        try {
            const resto = await FavoriteIdb.getAllFavorite();
            let dataList = '';

            if (resto.length === 0) {
                dataList = '<p>No favorite restaurants found.</p>';
            } else {
                resto.forEach((data, index) => {
                    dataList += `
                    <div class="list_item" id="favorite-${index}">
                        <img class="list_item_thumb" src="${CONFIG.BASE_IMAGE_URL_SMALL + data.pictureId}" alt="${data.name}" title="${data.name}">
                        <div class="city">${data.city}</div>
                        <div class="list_item_content">
                            <p class="list_item_rating">
                                Rating :
                                <a href="#" class="list_item_rating_value">${data.rating}</a>
                            </p>
                            <h1 class="list_item_title"><a href="/#/detail/${data.id}">${data.name}</a></h1>
                            <div class="list_item_desc">${data.description.slice(0, 150)}...</div>
                        </div>
                    </div>
                    `;
                });
            }

            document.querySelector('#dataRestoran').innerHTML = dataList;
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    },
};

export default Like;
