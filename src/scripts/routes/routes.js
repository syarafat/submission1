import Home from '../pages/home';
import Detail from '../pages/detail';
import Like from '../pages/likes';

const routes = {
    '/': Home,
    '/detail/:id': Detail,
    '/favorite': Like,
};

export default routes;
