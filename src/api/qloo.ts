// Qloo Taste API integration
const QLOO_API_URL ='https://hackathon.api.qloo.com/v2/insights' ;

interface QlooRecommendation {
  name: string;
  score: number;
  metadata?: any;
}


export async function getQlooRecommendations(query: string, category: string): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_QLOO_API_KEY;
    console.log("Qloo API Key:", apiKey);

    if (!apiKey || apiKey === 'your_qloo_api_key_here') {
      return generateMockRecommendations(query, category);
    }

    const qlooTypeMap: Record<string, string> = {
      movies: 'movie',
      restaurants: 'restaurant',
      books: 'book',
      music: 'song',
      tv: 'tv_show',
      fashion: 'fashion_brand'
    };
    const qlooType = qlooTypeMap[category] || category;

    // Can also Use filter.name for title-based queries
    const params = new URLSearchParams({
      'query': query,
      'filter.name':query,
      'filter.type': `urn:entity:${qlooType}`,
      'filter.release_year.min':'2000',
      
    });

    const response = await fetch(`${QLOO_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Qloo API error: ${response.status}`);
      return generateMockRecommendations(query, category);
    }

    const data = await response.json();
    // Qloo insights returns list under data.results or similar—adjust if needed
    return formatQlooResponse(data.results, category, query);
  } catch (error) {
    console.error('Qloo API error:', error);
    return generateMockRecommendations(query, category);
  }
}


function formatQlooResponse(results: QlooRecommendation[], category: string, query: string): string {
  const categoryEmojis: Record<string, string> = {
    movies: '🎬',
    restaurants: '🍽️',
    books: '📚',
    music: '🎵',
    tv: '📺',
    fashion: '👗'
  };

  const intro = `Based on your taste profile and interest in "${query}", here are personalized ${category} recommendations:`;
  const list = results.map((item, index) => 
    `${index + 1}. ${item.name} ${item.score ? `(${Math.round(item.score * 100)}% match)` : ''}`
  ).join('\n');
  const outro = `\n${categoryEmojis[category]} These recommendations are powered by Qloo's AI taste intelligence.`;

  return `${intro}\n\n${list}${outro}`;
}

function generateMockRecommendations(query: string, category: string): string {
  const mockData: Record<string, string[]> = {
    movies: [
      'The Shawshank Redemption (1994)',//mock examples
      'Inception (2010)',
      'The Dark Knight (2008)',
      'Pulp Fiction (1994)',
      'The Matrix (1999)'
    ],
    restaurants: [
      'Artisanal Italian Bistro - Authentic pasta & wine',
      'Modern Fusion Kitchen - Creative Asian-European dishes',
      'Classic French Brasserie - Traditional French cuisine',
      'Farm-to-Table Restaurant - Fresh, local ingredients',
      'Authentic Sushi Bar - Premium sashimi & rolls'
    ],
    books: [
      '1984 by George Orwell - Dystopian classic',
      'To Kill a Mockingbird by Harper Lee - American literature',
      'The Great Gatsby by F. Scott Fitzgerald - Jazz Age novel',
      'Pride and Prejudice by Jane Austen - Romantic classic',
      'The Catcher in the Rye by J.D. Salinger - Coming-of-age story'
    ],
    music: [
      'Bohemian Rhapsody - Queen (Rock Opera)',
      'Hotel California - Eagles (Classic Rock)',
      'Imagine - John Lennon (Folk Rock)',
      'Like a Rolling Stone - Bob Dylan (Folk Rock)',
      'Billie Jean - Michael Jackson (Pop/R&B)'
    ],
    tv: [
      'Breaking Bad - Crime Drama (2008-2013)',
      'Game of Thrones - Fantasy Drama (2011-2019)',
      'The Office - Comedy Mockumentary (2005-2013)',
      'Stranger Things - Sci-Fi Horror (2016-present)',
      'The Crown - Historical Drama (2016-present)'
    ],
    fashion: [
      'Classic Leather Jacket - Timeless rebel style',
      'Vintage Denim Collection - Authentic worn-in look',
      'Minimalist White Sneakers - Clean, versatile design',
      'Tailored Blazer - Professional sophistication',
      'Statement Accessories - Bold, eye-catching pieces'
    ]
  };

  const recommendations = mockData[category] || ['Great recommendation coming soon!'];
  const categoryEmojis: Record<string, string> = {
    movies: '🎬',
    restaurants: '🍽️',
    books: '📚',
    music: '🎵',
    tv: '📺',
    fashion: '👗'
  };

  const intro = `Based on your interest in "${query}", here are some ${category} recommendations:`;
  const list = recommendations.map((item, index) => `${index + 1}. ${item}`).join('\n');
  const outro = `\n${categoryEmojis[category]} These are curated recommendations. The Qloo API will provide personalized taste-based suggestions!`;

  return `${intro}\n\n${list}${outro}`;
}