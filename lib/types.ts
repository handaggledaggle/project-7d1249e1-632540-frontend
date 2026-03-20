export type ArtworkSaleStatus = "for_sale" | "sold_out" | "reserved";
export type ArtworkType = "original" | "print";

export type ArtworkCardDTO = {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  priceLabel: string;
  saleStatus?: ArtworkSaleStatus;
  type?: ArtworkType;
  imageUrl: string;
};

export type ArtistProfileDTO = {
  id: string;
  displayName: string;
  bio: string;
  location: string;
  tags: string;
  avatarUrl: string;
  followersLabel: string;
  worksCountLabel: string;
  subscribersLabel: string;
  socials: { label: string; href: string }[];
  exhibitions: string[];
};

export type SubscriptionSummaryDTO = {
  id: string;
  artistName: string;
  message: string;
};

export type OrderStatusLabel = "배송중" | "배송완료" | "결제대기" | "준비중";

export type OrderListItemDTO = {
  id: string;
  createdAtLabel: string;
  paymentLabel: string;
  statusLabel: OrderStatusLabel;
  artworkTitle: string;
  artworkOptionLabel: string;
  priceLabel: string;
  thumbUrl: string;
};
