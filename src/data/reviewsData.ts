export interface ReviewItem {
  id: string;
  author: string;
  role?: string;
  reviewsCount?: string;
  photosCount?: string;
  timeAgo: string;
  timestampOrder: number; // For sorting newest first
  relevanceScore: number; // For sorting most relevant first
  rating: number; // 5
  category: 'newborn' | 'maternity' | 'family' | 'cake-smash' | 'gentle';
  categoryLabel: string;
  text: string;
  ownerReply?: {
    timeAgo: string;
    text: string;
  };
}

export interface GooglePlaceProfile {
  name: string;
  address: string;
  rating: number;
  totalReviews: number;
  topics: { id: string; label: string; count?: number }[];
}

export const GOOGLE_PROFILE: GooglePlaceProfile = {
  name: "falguni's photography",
  address: "26 South Pkwy, Northfield SA 5085, Australia",
  rating: 5.0,
  totalReviews: 60,
  topics: [
    { id: "all", label: "All Reviews", count: 60 },
    { id: "newborn", label: "Newborn Photoshoot", count: 13 },
    { id: "maternity", label: "Maternity Photography", count: 2 },
    { id: "family", label: "Family Photoshoot", count: 3 },
    { id: "gentle", label: "Gentle Photographers", count: 2 },
    { id: "cake-smash", label: "Cake Smash & First Birthday", count: 3 },
  ],
};

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: "patel-divyang",
    author: "Patel Divyang",
    role: "Verified Client",
    reviewsCount: "1 review",
    photosCount: "4 photos",
    timeAgo: "2 days ago",
    timestampOrder: 1,
    relevanceScore: 98,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn Photoshoot",
    text: "We had such a wonderful experience with Falguni Photography for our newborn photoshoot. Falguni was incredibly patient, gentle, and professional throughout the session, making sure our little one was comfortable and settled.",
    ownerReply: {
      timeAgo: "2 days ago",
      text: "Thank you for the awesome review! We hope to see you back soon."
    }
  },
  {
    id: "priyanka-doshi",
    author: "Priyanka Doshi",
    role: "Verified Client",
    reviewsCount: "8 reviews",
    photosCount: "5 photos",
    timeAgo: "2 months ago",
    timestampOrder: 5,
    relevanceScore: 99,
    rating: 5,
    category: "family",
    categoryLabel: "Family Photoshoot",
    text: "We had an amazing family photoshoot experience with Falguni's Photography. Falguni was patient, friendly, and made everyone feel comfortable throughout the session. The photos turned out beautiful, capturing genuine smiles and precious memories.",
    ownerReply: {
      timeAgo: "2 months ago",
      text: "Thank you so much for your 5-star review. We truly appreciate your support and feedback."
    }
  },
  {
    id: "prabhjot-gill",
    author: "Prabhjot Gill",
    role: "Verified Client",
    reviewsCount: "2 reviews",
    timeAgo: "5 months ago",
    timestampOrder: 8,
    relevanceScore: 97,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn Photoshoot",
    text: "I am happy with experience of getting my 5 weeks baby photoshoot done by Falguni. She is excellent, amazing and wonderful. Falguni was professional, patient and captured every moment perfectly. Highly recommended.",
    ownerReply: {
      timeAgo: "5 months ago",
      text: "Thank you Prabh for choosing Falguni Photography and for the wonderful review. Your baby is super cute, God bless her."
    }
  },
  {
    id: "ashika-dharmesh-patel",
    author: "Ashika Dharmesh Patel",
    role: "Verified Client",
    reviewsCount: "4 reviews",
    timeAgo: "a year ago",
    timestampOrder: 15,
    relevanceScore: 96,
    rating: 5,
    category: "gentle",
    categoryLabel: "Gentle Photographers",
    text: "We had a wonderful experience with Falguni! They were incredibly patient and gentle with our newborn, taking the time to make sure everything was perfect without ever making us feel rushed. Their calm and caring nature made a big difference during the session. The photos turned out absolutely beautiful. Highly recommend!",
    ownerReply: {
      timeAgo: "a year ago",
      text: "Thank you for the fantastic 5-star review. We are so glad to hear that you were satisfied with our service and had a great experience with us. Your feedback is a great encouragement to us. We look forward to meeting you again."
    }
  },
  {
    id: "kuljeet-singh",
    author: "Kuljeet Singh",
    role: "Verified Client",
    reviewsCount: "15 reviews",
    photosCount: "3 photos",
    timeAgo: "a year ago",
    timestampOrder: 16,
    relevanceScore: 95,
    rating: 5,
    category: "family",
    categoryLabel: "Family Photoshoot",
    text: "We are so grateful to Falguni photography for capturing such beautiful memories during our family photoshoot. The way she worked with our kids was simply amazing: patient, kind, and creative, bringing out their genuine smiles.",
    ownerReply: {
      timeAgo: "a year ago",
      text: "Seeing that you had a 5-star experience is the best thing we could hope for! Thank you for acknowledging all of the time and effort I put into working on your photoshoot. I am happy to hear this positive feedback as it means a lot to me."
    }
  },
  {
    id: "gaurangi-anand",
    author: "Gaurangi Anand",
    role: "Local Guide",
    reviewsCount: "26 reviews",
    photosCount: "40 photos",
    timeAgo: "a year ago",
    timestampOrder: 17,
    relevanceScore: 94,
    rating: 5,
    category: "gentle",
    categoryLabel: "Gentle Photographers",
    text: "I am happy with the experience of getting my newborn's photoshoot done by Falguni. She is absolutely amazing! The way she gently handled my baby and took utmost care throughout the photoshoot is incredible. She is passionate about her work.",
    ownerReply: {
      timeAgo: "a year ago",
      text: "Thank you for your detailed feedback. We truly appreciate the time you took to share your thoughts and the insights you have provided."
    }
  },
  {
    id: "kiranjot-kaur",
    author: "Kiranjot Kaur",
    role: "Verified Client",
    reviewsCount: "2 reviews",
    timeAgo: "11 months ago",
    timestampOrder: 10,
    relevanceScore: 92,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn Photoshoot",
    text: "I had a great experience with this photo shoot! Falguni is incredibly friendly and helpful, making the whole process smooth and enjoyable. It was also very convenient to get everything done on time. Highly recommend them for anyone looking for quality service with a personal touch!",
    ownerReply: {
      timeAgo: "11 months ago",
      text: "Thank you for taking the time to share your positive experience. Your feedback inspires our team to keep delivering excellent service."
    }
  },
  {
    id: "catherene-jos",
    author: "Catherene Jos",
    role: "Verified Client",
    reviewsCount: "1 review",
    timeAgo: "3 years ago",
    timestampOrder: 35,
    relevanceScore: 91,
    rating: 5,
    category: "cake-smash",
    categoryLabel: "Cake Smash Photography",
    text: "I did my baby's cake smash photography with Falguni and I must say it was a wonderful experience. Falguni made us very comfortable throughout the photoshoot and my baby enjoyed it too. I definitely recommend her.",
    ownerReply: {
      timeAgo: "3 years ago",
      text: "Thank you for your lovely feedback."
    }
  },
  {
    id: "veerpal-kaur-sidhu",
    author: "Veerpal Kaur Sidhu",
    role: "Verified Client",
    reviewsCount: "6 reviews",
    timeAgo: "2 years ago",
    timestampOrder: 28,
    relevanceScore: 93,
    rating: 5,
    category: "maternity",
    categoryLabel: "Maternity Photography",
    text: "Thanks Falguni for beautiful pictures. It was wonderful experience. You are so nice and sweet. You did really good job. I really enjoyed my maternity shoot. I highly recommend your photography to everyone. Thanks again for lovely pictures.",
    ownerReply: {
      timeAgo: "2 years ago",
      text: "We are incredibly grateful that you took the time out to leave us a 5-star review and share your experience with us and the community."
    }
  },
  {
    id: "arsh-munjal",
    author: "Arsh Munjal",
    role: "Verified Client",
    reviewsCount: "8 reviews",
    timeAgo: "2 years ago",
    timestampOrder: 29,
    relevanceScore: 92,
    rating: 5,
    category: "maternity",
    categoryLabel: "Maternity Photography",
    text: "Thanks Falguni for amazing pictures, you did really good job. We must say it was a wonderful experience, you are so nice and sweet. We really enjoyed my wife's maternity shoot. We highly recommend your photography to everyone. Thanks for beautiful pictures.",
    ownerReply: {
      timeAgo: "2 years ago",
      text: "Thank you for your kind words, it means a lot to me! We are extremely happy that you had a positive experience, and we are grateful for your wonderful feedback."
    }
  },
  {
    id: "krima-patel",
    author: "Krima Patel",
    role: "Verified Client",
    reviewsCount: "2 reviews",
    timeAgo: "2 years ago",
    timestampOrder: 26,
    relevanceScore: 90,
    rating: 5,
    category: "cake-smash",
    categoryLabel: "First Birthday & Cake Smash",
    text: "Falguni was amazing during our shoot with my 1 year old boy. She made him feel super comfortable. She even managed to capture some smiles from my little one. Would 100% recommend!",
    ownerReply: {
      timeAgo: "2 years ago",
      text: "Thank you for taking the time to leave us a review. We are thrilled to hear that you loved your experience with us. Your kind words mean a lot to our team!"
    }
  },
  {
    id: "sanobiya-vohra",
    author: "Sanobiya Vohra",
    role: "Verified Client",
    reviewsCount: "8 reviews",
    timeAgo: "2 years ago",
    timestampOrder: 30,
    relevanceScore: 89,
    rating: 5,
    category: "cake-smash",
    categoryLabel: "First Birthday",
    text: "Excellent service, I did my little one's first birthday photographs through her, she did amazing work. I will surely recommend her. Thank you.",
    ownerReply: {
      timeAgo: "2 years ago",
      text: "Thank you for your lovely feedback."
    }
  },
  {
    id: "gurpreet-singh",
    author: "Gurpreet Singh",
    role: "Local Guide",
    reviewsCount: "36 reviews",
    photosCount: "46 photos",
    timeAgo: "3 years ago",
    timestampOrder: 36,
    relevanceScore: 93,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn Photoshoot",
    text: "Very professional and very calm, especially needed this kind of patience when it is newborns or month old baby's photoshoot. Falguni was really patient with everything, from wrapping baby to clicking photos.",
    ownerReply: {
      timeAgo: "3 years ago",
      text: "Thank you so much Gurpreet Singh for your lovely words and positive feedback."
    }
  },
  {
    id: "ashok-juda",
    author: "Ashok Juda",
    role: "Verified Client",
    reviewsCount: "9 reviews",
    photosCount: "4 photos",
    timeAgo: "4 weeks ago",
    timestampOrder: 2,
    relevanceScore: 88,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn Photoshoot",
    text: "Reasonable price. She is too good at baby photography.",
    ownerReply: {
      timeAgo: "4 weeks ago",
      text: "Thank you for your 5-star review and positive feedback."
    }
  },
  {
    id: "dixit-patel",
    author: "Dixit Patel",
    role: "Verified Client",
    reviewsCount: "5 reviews",
    timeAgo: "a month ago",
    timestampOrder: 3,
    relevanceScore: 87,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn Photoshoot",
    text: "Excellent photography and outstanding service. The photos exceeded my expectations. Highly recommend Falguni's Photography!",
    ownerReply: {
      timeAgo: "a month ago",
      text: "Thank you for taking the time to share your experience. It means a lot to us. We hope to see you again soon."
    }
  },
  {
    id: "christella-manuvel",
    author: "Christella Manuvel",
    role: "Verified Client",
    reviewsCount: "14 reviews",
    timeAgo: "2 months ago",
    timestampOrder: 4,
    relevanceScore: 86,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn Photoshoot",
    text: "She is very professional and took my baby's pictures extremely well.",
    ownerReply: {
      timeAgo: "2 months ago",
      text: "Thank you for your fantastic review, it is much appreciated. It is always such a pleasure seeing you."
    }
  },
  {
    id: "kuldeep-kular",
    author: "Kuldeep Kular",
    role: "Verified Client",
    reviewsCount: "3 reviews",
    photosCount: "4 photos",
    timeAgo: "a month ago",
    timestampOrder: 6,
    relevanceScore: 85,
    rating: 5,
    category: "family",
    categoryLabel: "Family Photoshoot",
    text: "Thank you for your amazing service. All photos are so beautiful. Highly appreciated.",
    ownerReply: {
      timeAgo: "a month ago",
      text: "Thank you so much for the fantastic review. We are so glad you had a great experience and truly appreciate your support."
    }
  },
  {
    id: "kamaljit-kaur",
    author: "Kamaljit Kaur",
    role: "Verified Client",
    reviewsCount: "6 reviews",
    timeAgo: "a year ago",
    timestampOrder: 18,
    relevanceScore: 87,
    rating: 5,
    category: "family",
    categoryLabel: "Family Photoshoot",
    text: "I had the absolute pleasure of working with Falguni photography, and I am very happy with the results! Their attention to detail, creativity, and ability to capture the perfect moments were truly impressive. Every shot was beautifully captured.",
    ownerReply: {
      timeAgo: "a year ago",
      text: "Thank you for your detailed feedback. We truly appreciate the time you took to share your thoughts and the insights you have provided. Looking forward to having you back for the next session."
    }
  },
  {
    id: "sahil-sethi",
    author: "Sahil Sethi",
    role: "Local Guide",
    reviewsCount: "18 reviews",
    photosCount: "3 photos",
    timeAgo: "a year ago",
    timestampOrder: 19,
    relevanceScore: 88,
    rating: 5,
    category: "newborn",
    categoryLabel: "Baby Photoshoot",
    text: "We had a baby shoot done with Falguni Photography, and it was absolutely fabulous! The attention to detail, patience, and creativity made the entire experience unforgettable. Falguni captured every precious moment so beautifully.",
    ownerReply: {
      timeAgo: "a year ago",
      text: "Thank you again for your 5-star rating and for being an amazing part of our journey. Your continued support means everything to us."
    }
  },
  {
    id: "anwar",
    author: "Anwar",
    role: "Local Guide",
    reviewsCount: "29 reviews",
    timeAgo: "11 months ago",
    timestampOrder: 11,
    relevanceScore: 86,
    rating: 5,
    category: "family",
    categoryLabel: "Family Photoshoot",
    text: "We used Falguni's photography for our family photos, very happy with quality and the service! Definitely recommend her to anyone.",
    ownerReply: {
      timeAgo: "11 months ago",
      text: "Thank you for the 5-star review and your feedback."
    }
  },
  {
    id: "belinda-reuben",
    author: "Belinda Reuben",
    role: "Verified Client",
    reviewsCount: "16 reviews",
    photosCount: "1 photo",
    timeAgo: "2 years ago",
    timestampOrder: 27,
    relevanceScore: 92,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn & Family Photoshoot",
    text: "She did a phenomenal job of the newborn photoshoot so I booked her for the family shoot as well. I absolutely loved her work. She was very thorough and took the time and care to make everything perfect during the photoshoot. I highly recommend her services.",
    ownerReply: {
      timeAgo: "2 years ago",
      text: "Thanks so much for taking the time to let me know you feel this way!"
    }
  },
  {
    id: "nisha-modh",
    author: "Nisha Modh",
    role: "Verified Client",
    reviewsCount: "9 reviews",
    photosCount: "1 photo",
    timeAgo: "10 months ago",
    timestampOrder: 12,
    relevanceScore: 90,
    rating: 5,
    category: "gentle",
    categoryLabel: "Studio Atmosphere",
    text: "This photography studio is run by a couple and they are extremely passionate about their work. Very good people and very serious about what they do. I would absolutely recommend this place.",
    ownerReply: {
      timeAgo: "10 months ago",
      text: "Thank you so much for your 5-star review! We truly appreciate your support and are glad you had a great experience with us."
    }
  },
  {
    id: "harmandeep-kaur",
    author: "Harmandeep Kaur",
    role: "Verified Client",
    reviewsCount: "1 review",
    timeAgo: "2 years ago",
    timestampOrder: 31,
    relevanceScore: 89,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn Studio Session",
    text: "She is really very nice. Very cooperative and warm welcoming behaviour of her and family. Really recommend.",
    ownerReply: {
      timeAgo: "2 years ago",
      text: "Thank you for your kind words, much appreciated!"
    }
  },
  {
    id: "israa-shatat",
    author: "Israa Shatat",
    role: "Verified Client",
    reviewsCount: "3 reviews",
    timeAgo: "2 years ago",
    timestampOrder: 32,
    relevanceScore: 84,
    rating: 5,
    category: "newborn",
    categoryLabel: "Newborn & Baby Studio",
    text: "Falguni is very professional photographer. She is very patient with kids and babies, and she has variety of accessories you can choose from. I highly recommend her.",
    ownerReply: {
      timeAgo: "2 years ago",
      text: "Thank you for sharing your feedback with me. It means a lot to hear your support for my efforts."
    }
  },
  {
    id: "charmi-patalia",
    author: "Charmi Patalia",
    role: "Verified Client",
    reviewsCount: "3 reviews",
    timeAgo: "a year ago",
    timestampOrder: 22,
    relevanceScore: 87,
    rating: 5,
    category: "gentle",
    categoryLabel: "Gentle Care",
    text: "I loved how gently she prepared my baby for the shoot, and the photos turned out amazing!",
    ownerReply: {
      timeAgo: "a year ago",
      text: "I really put a lot of thought into this, thank you for noticing."
    }
  },
  {
    id: "dhaval-patel",
    author: "Dhaval Patel",
    role: "Verified Client",
    reviewsCount: "9 reviews",
    timeAgo: "2 years ago",
    timestampOrder: 33,
    relevanceScore: 83,
    rating: 5,
    category: "newborn",
    categoryLabel: "Baby Photoshoot",
    text: "Baby photoshoot was a suggestion from a friend. It was awesome experience with them. Very polite and friendly service from Falguni. Definitely worth it.",
    ownerReply: {
      timeAgo: "2 years ago",
      text: "Thank you so much for your incredibly kind words and for awarding us a five-star rating! We are thrilled to hear about your fantastic experience with us."
    }
  }
];
