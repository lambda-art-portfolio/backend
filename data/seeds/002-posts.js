exports.seed = function(knex) {
  return knex("posts").insert([
    {
      id: 1,
      user_id: 1,
      picture: "https://i.imgur.com/bVwW62Z.jpg",
      description: "My description 1",
      upvotes: 345
    },
    {
      id: 2,
      user_id: 1,
      picture: "https://i.imgur.com/VMYLx0H.jpg",
      description: "My description 2",
      upvotes: 234
    },
    {
      id: 3,
      user_id: 1,
      picture: "https://i.imgur.com/IDcLa6n.jpg",
      description: "My description 3",
      upvotes: 789
    },
    {
      id: 4,
      user_id: 1,
      picture: "https://i.imgur.com/ceBfnVw.jpg",
      description: "My description 4",
      upvotes: 111
    },
    {
      id: 5,
      user_id: 1,
      picture: "https://i.imgur.com/3MRzvL5.jpg",
      description: "My description 5",
      upvotes: 57
    },
    {
      id: 6,
      user_id: 1,
      picture: "https://i.imgur.com/7Wb3IYF.jpg",
      description: "My description 6",
      upvotes: 1905
    },
    {
      id: 7,
      user_id: 1,
      picture: "https://i.imgur.com/VBwR3CW.jpg",
      description: "My description 7",
      upvotes: 15
    },
    {
      id: 8,
      user_id: 1,
      picture: "https://i.imgur.com/KsDFccO.jpg",
      description: "My description 8",
      upvotes: 163
    },
    {
      id: 9,
      user_id: 1,
      picture: "https://i.imgur.com/3jzTrYg.jpg",
      description: "My description 9",
      upvotes: 192
    }
  ]);
};
