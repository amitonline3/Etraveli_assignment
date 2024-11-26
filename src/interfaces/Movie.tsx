export interface Movie {
  title: string;
  episode_id: number;
  release_date: string;
  director: string;
  producer: string;
  opening_crawl: string;
  poster: string;
  ratings?: { Source: string; Value: string }[];
  calcRating?: number;
}

export interface Rating {
  Source: string;
  Value: string;
}
