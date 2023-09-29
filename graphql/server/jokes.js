const jokes = [
  {
    id: 1,
    content:
      "Why don't scientists trust atoms? Because they make up everything!",
  },
  {
    id: 2,
    content:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
  },
  {
    id: 3,
    content: "I'm reading a book on anti-gravity. It's impossible to put down!",
  },
  {
    id: 4,
    content:
      "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
  },
  {
    id: 5,
    content:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
  },
  {
    id: 6,
    content:
      "I'm friends with all electricians. We have great current connections.",
  },
  { id: 7, content: "What's orange and sounds like a parrot? A carrot!" },
  {
    id: 8,
    content: "Why did the bicycle fall over? Because it was two-tired!",
  },
  { id: 9, content: "I used to play piano by ear, but now I use my hands." },
  {
    id: 10,
    content:
      "Why couldn't the leopard play hide and seek? Because he was always spotted!",
  },
  {
    id: 11,
    content: "I'm reading a book on anti-gravity. It's impossible to put down!",
  },
  {
    id: 12,
    content: "Why don't skeletons fight each other? They don't have the guts!",
  },
  { id: 13, content: "How do you organize a space party? You planet!" },
  {
    id: 14,
    content: "Why did the tomato turn red? Because it saw the salad dressing!",
  },
  {
    id: 15,
    content: "I used to be a baker, but I couldn't make enough dough.",
  },
  {
    id: 16,
    content:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
  },
  {
    id: 17,
    content: "I used to be a baker, but I couldn't make enough dough.",
  },
  {
    id: 18,
    content: "How do you catch a squirrel? Climb a tree and act like a nut!",
  },
  { id: 19, content: "I'm on a seafood diet. I see food, and I eat it!" },
  { id: 20, content: "What do you call a fish with no eyes? Fsh!" },
  {
    id: 21,
    content:
      "I'm friends with all electricians. We have great current connections.",
  },
  {
    id: 22,
    content:
      "Why don't scientists trust atoms? Because they make up everything!",
  },
  {
    id: 23,
    content:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
  },
  {
    id: 24,
    content: "I'm reading a book on anti-gravity. It's impossible to put down!",
  },
  {
    id: 25,
    content:
      "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
  },
  {
    id: 26,
    content:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
  },
  {
    id: 27,
    content:
      "I'm friends with all electricians. We have great current connections.",
  },
  { id: 28, content: "What's orange and sounds like a parrot? A carrot!" },
  {
    id: 29,
    content: "Why did the bicycle fall over? Because it was two-tired!",
  },
  { id: 30, content: "I used to play piano by ear, but now I use my hands." },
  {
    id: 31,
    content:
      "Why couldn't the leopard play hide and seek? Because he was always spotted!",
  },
  {
    id: 32,
    content: "I'm reading a book on anti-gravity. It's impossible to put down!",
  },
  {
    id: 33,
    content: "Why don't skeletons fight each other? They don't have the guts!",
  },
  { id: 34, content: "How do you organize a space party? You planet!" },
  {
    id: 35,
    content: "Why did the tomato turn red? Because it saw the salad dressing!",
  },
  {
    id: 36,
    content: "I used to be a baker, but I couldn't make enough dough.",
  },
  {
    id: 37,
    content:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
  },
  {
    id: 38,
    content: "I used to be a baker, but I couldn't make enough dough.",
  },
  {
    id: 39,
    content: "How do you catch a squirrel? Climb a tree and act like a nut!",
  },
  { id: 40, content: "I'm on a seafood diet. I see food, and I eat it!" },
  { id: 41, content: "What do you call a fish with no eyes? Fsh!" },
  {
    id: 42,
    content:
      "I'm friends with all electricians. We have great current connections.",
  },
  {
    id: 43,
    content:
      "Why don't scientists trust atoms? Because they make up everything!",
  },
  {
    id: 44,
    content:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
  },
  {
    id: 45,
    content: "I'm reading a book on anti-gravity. It's impossible to put down!",
  },
  {
    id: 46,
    content:
      "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
  },
  {
    id: 47,
    content:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
  },
  {
    id: 48,
    content:
      "I'm friends with all electricians. We have great current connections.",
  },
  { id: 49, content: "What's orange and sounds like a parrot? A carrot!" },
  {
    id: 50,
    content: "Why did the bicycle fall over? Because it was two-tired!",
  },
  { id: 51, content: "I used to play piano by ear, but now I use my hands." },
  {
    id: 52,
    content:
      "Why couldn't the leopard play hide and seek? Because he was always spotted!",
  },
  {
    id: 53,
    content: "I'm reading a book on anti-gravity. It's impossible to put down!",
  },
  {
    id: 54,
    content: "Why don't skeletons fight each other? They don't have the guts!",
  },
  { id: 55, content: "How do you organize a space party? You planet!" },
  {
    id: 56,
    content: "Why did the tomato turn red? Because it saw the salad dressing!",
  },
  {
    id: 57,
    content: "I used to be a baker, but I couldn't make enough dough.",
  },
  {
    id: 58,
    content:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
  },
  {
    id: 59,
    content: "I used to be a baker, but I couldn't make enough dough.",
  },
  {
    id: 60,
    content: "How do you catch a squirrel? Climb a tree and act like a nut!",
  },
];

export default jokes;
