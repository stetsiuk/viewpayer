export interface ViewVideoData {
  userId: string;
  videoUrl: string;
}

export interface ViewVideoCreate extends ViewVideoData {
  balanceHistoryId: string;
}
