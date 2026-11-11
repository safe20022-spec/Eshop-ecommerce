import { http, HttpResponse, delay } from 'msw';
import { RECENT_NEWS_DATA } from '../data/blogsData.ts';


export const blogsHandlers = [
    http.get('*/api/blogs', async () => {
        await delay(2500);
        return HttpResponse.json(RECENT_NEWS_DATA, { status: 200 });
    },),
]