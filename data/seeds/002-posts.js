exports.seed = function(knex) {
  return knex("posts").insert([
    {
      id: 1,
      user_id: 1,
      picture: "https://i.imgur.com/bVwW62Z.jpg",
      description: "My description 1"
    },
    {
      id: 2,
      user_id: 1,
      picture: "https://i.imgur.com/VMYLx0H.jpg",
      description: "My description 2"
    },
    {
      id: 3,
      user_id: 1,
      picture: "https://i.imgur.com/IDcLa6n.jpg",
      description: "My description 3"
    },
    {
      id: 4,
      user_id: 1,
      picture: "https://i.imgur.com/ceBfnVw.jpg",
      description: "My description 4"
    },
    {
      id: 5,
      user_id: 1,
      picture: "https://i.imgur.com/3MRzvL5.jpg",
      description: "My description 5"
    },
    {
      id: 6,
      user_id: 1,
      picture: "https://i.imgur.com/7Wb3IYF.jpg",
      description: "My description 6"
    },
    {
      id: 7,
      user_id: 2,
      picture: "https://i.imgur.com/VBwR3CW.jpg",
      description: "My description 7"
    },
    {
      id: 8,
      user_id: 2,
      picture: "https://i.imgur.com/KsDFccO.jpg",
      description: "My description 8"
    },
    {
      id: 9,
      user_id: 2,
      picture: "https://i.imgur.com/3jzTrYg.jpg",
      description: "My description 9"
    }
  ]);
};
