import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export type NewsItem = {
  id: string;
  title?: string;
  excerpt?: string;
  content?: string;
  img?: string;
  altText?: string;
  category?: string;
  date?: string;
  views?: number;
  createdAt?: any;
  updatedAt?: any;
};

export async function getLatestNews(maxItems = 10): Promise<NewsItem[]> {
  const newsQuery = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(maxItems));
  const snapshot = await getDocs(newsQuery);
  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const newsRef = doc(db, 'news', id);
  const newsSnap = await getDoc(newsRef);
  if (!newsSnap.exists()) return null;
  return { id: newsSnap.id, ...newsSnap.data() };
}

export async function getNewsStaticParams(maxItems = 50): Promise<Array<{ id: string }>> {
  const newsQuery = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(maxItems));
  const snapshot = await getDocs(newsQuery);
  return snapshot.docs
    .map((docItem) => ({ rawId: docItem.id, encodedId: encodeURIComponent(docItem.id) }))
    .filter((item) => item.encodedId.length <= 160)
    .map((item) => ({ id: item.encodedId }));
}
