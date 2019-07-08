import Welcome from "./Welcome";
import { List } from "./Book";

export const routes = [
    {
        component: List,
        path: '/books'
    },
    {
        component: Welcome,
        path: '/'
    },
];
