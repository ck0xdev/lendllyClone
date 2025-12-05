export const CATEGORIES = [
  "All Categories", "Electronics", "Sports & Outdoor", "Photography", "Gaming", "Music", "Tools", "Fitness", "Books", "Clothing", "Furniture"
];

export const FEATURED_ITEMS = [
  {
    id: 1,
    title: "nothing",
    subtitle: "test1",
    price: "100000",
    category: "Sports & Outdoor",
    image: "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg", // Pixel art placeholder
    location: "Surat, Gujarat"
  },
  {
    id: 2,
    title: "SOüman Demni",
    subtitle: "This is RARE MONALIZA monumental pease",
    price: "1500",
    category: "Photography",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    location: "Mumbai, MH"
  },
  {
    id: 3,
    title: "Non fiction",
    subtitle: "Collection of 2 reading books",
    price: "10",
    category: "Books",
    image: "https://m.media-amazon.com/images/I/71wZ+xVqO+L._AC_UF1000,1000_QL80_.jpg",
    location: "Delhi, DL"
  },
  {
    id: 4,
    title: "Ear buds",
    subtitle: "Hp earbuds",
    price: "50",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61+R+3XyH4L._AC_UF1000,1000_QL80_.jpg", // Generic earbud image
    location: "Bangalore, KA"
  },
  {
    id: 5,
    title: "Ww",
    subtitle: "Www test",
    price: "22",
    category: "Sports & Outdoor",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000", // Shirt image
    location: "Pune, MH"
  }
];

export const POSTS = [
  {
    id: 1,
    type: "request",
    user: "Harshvardhan Gedela",
    time: "19 days ago",
    content: "I need a bike for rent on this Sunday and will return it on Monday.",
    likes: 1,
    comments: 1
  },
  {
    id: 2,
    type: "listing",
    user: "New listing available",
    time: "24 days ago",
    item: FEATURED_ITEMS[0], // Links to the "nothing" item
    likes: 0,
    comments: 0
  },
  {
    id: 3,
    type: "listing",
    user: "New listing available",
    time: "24 days ago",
    item: FEATURED_ITEMS[1], // Links to Mona Lisa
    likes: 0,
    comments: 0
  }
];