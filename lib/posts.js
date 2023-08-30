import { remark } from 'remark';
import html from 'remark-html';
import apiInstance from './api';

export async function getSortedPostsData() {
  try {
    const { data: { entries } } = await apiInstance.get(`/v3/content_types/blog/entries?environment=${process.env.ENVIRONMENT}`);
    
    const allPostData = entries.map(({ uid: id, title, date }) => ({
      id,
      title,
      date
    }));

    return allPostData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPostIds() {
  try {
    const { data: { entries } } = await apiInstance.get(`/v3/content_types/blog/entries?environment=${process.env.ENVIRONMENT}`)

    return entries.map(({ uid: id }) => {
      return {
        params: {
          id
        }
      }
    })
  } catch (error) {
    console.error(error);
  }
}

export async function getPostData(postId) {
  try {
    const { data: { entry: { uid: id, title, date, markdown} } } = await apiInstance.get(`/v3/content_types/blog/entries/${postId}?environment=${process.env.ENVIRONMENT}`)
    
    const processedContent = await remark().use(html).process(markdown);
    const contentHtml = processedContent.toString();

    return {
      id,
      title,
      date,
      contentHtml,
    }
  } catch (error) {
    console.error(error);
  }
}