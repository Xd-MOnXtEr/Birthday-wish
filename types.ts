
export interface Photo {
  id: string;
  url: string;
  caption: string;
}

export interface WishData {
  poem: string;
  reasons: string[];
  message: string;
}

export type AppState = 'LOCKED' | 'CELEBRATION' | 'GALLERY' | 'CAKE';
