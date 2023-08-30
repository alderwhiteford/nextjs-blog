import { remark } from 'remark';
import html from 'remark-html';
import apiInstance from './api';

export async function getSortedPostsData() {
  try {
    const { data } = await apiInstance.get(`/v3/content_types/blog/entries?environment=${process.env.ENVIRONMENT}`);
    
    const allPostData = data.entries.map((entry) => ({
      id: entry.uid,
      title: entry.title,
      date: entry.date,
      body: entry.markdown,
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
    const { data } = await apiInstance.get(`/v3/content_types/blog/entries?environment=${process.env.ENVIRONMENT}`)

    return data.entries.map((entry) => {
      return {
        params: {
          id: entry.uid
        }
      }
    })
  } catch (error) {
    console.error(error);
  }
}

export async function getPostData(id) {
  try {
    const { data } = await apiInstance.get(`/v3/content_types/blog/entries/${id}?environment=${process.env.ENVIRONMENT}`)
    
    const processedContent = await remark()
      .use(html)
      .process(data.entry.markdown);

    const contentHtml = processedContent.toString();

    return {
      id: data.entry.uid,
      title: data.entry.title,
      date: data.entry.date,
      contentHtml,
    }
  } catch (error) {
    console.error(error);
  }
}