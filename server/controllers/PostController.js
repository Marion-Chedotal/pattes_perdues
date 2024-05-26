const postService = require("../service/postService");
const userService = require("../service/userService");
const authenticationService = require("../service/authenticationService");
const { escapeHtml } = require("../utils/htmlEscape");
const errors = require("../utils/errors.json");
const Joi = require("joi");
const fs = require("fs");

/**
 * Validate post input using a Joi schema.
 * @param {object} data - The data to be validated.
 * @param {string} data.email - email
 * @param {string} data.password - password.
 * @param {string} data.login - login.
 * @param {number} data.postalCode - postal code .
 * @param {string} data.city - city.
 * @returns {Joi.ValidationResult<object>} - The result of the validation.
 */
const validateInput = (data) => {
  const schema = Joi.object({
    gender: Joi.string(),
    alert_date: Joi.date(),
    description: Joi.string(),
    name: Joi.string(),
    tattoo: Joi.string(),
    microchip: Joi.string(),
    collar: Joi.string(),
    distinctive_signs: Joi.string().allow(""),
    picture: Joi.string().dataUri().allow(""),
    is_active: Joi.boolean(),
    street: Joi.string(),
    postalCode: Joi.number().integer(),
    city: Joi.string(),
    UserId: Joi.number().integer(),
    TypeId: Joi.number().integer(),
    PetCategoryId: Joi.number().integer(),
  });

  return schema.validate(data);
};

/**
 * Register a new post
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const createPost = async (req, res) => {
  // Check input format
  const { error } = validateInput(req.body);
  if (error) {
    return res.status(400).json({
      errorCode: "fieldsToFill",
      errorMessage: errors.global.fieldsToFill,
    });
  }

  // sanitize input
  const fieldsToSanitize = [
    "gender",
    "alert_date",
    "description",
    "name",
    "tattoo",
    "microchip",
    "collar",
    "distinctive_signs",
    "picture",
    "is_active",
    "street",
    "postalCode",
    "city",
    "UserId",
    "TypeId",
    "PetCategoryId",
  ];

  fieldsToSanitize.forEach((fieldName) => {
    if (req.body[fieldName]) {
      req.body[fieldName] = escapeHtml(req.body[fieldName].trim());
    }
  });

  let {
    gender,
    alert_date,
    description,
    name,
    tattoo,
    microchip,
    collar,
    distinctive_signs,
    picture,
    is_active,
    street,
    postalCode,
    city,
    UserId,
    TypeId,
    PetCategoryId,
  } = req.body;

  try {
    let picturePath;
    if (req.files && req.files.picture && req.files.picture.length > 0) {
      picturePath = req.files.picture[0].path;
    }

    // create a new post
    const post = await postService.addPost({
      gender,
      alert_date,
      description,
      name,
      tattoo,
      microchip,
      collar,
      distinctive_signs,
      picture: picturePath,
      is_active,
      street,
      postalCode,
      city,
      UserId,
      TypeId,
      PetCategoryId,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Error when register post, ${error}`,
    });
  }
};

/**
 * Find post by his id
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const post = await postService.getById(id);

    if (!post) {
      return res.status(400).json({ error: `Post ${id} doesn't exist` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching post, ${error}`,
    });
  }
};

/**
 * Find all the post
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findAll = async (req, res) => {
  try {
    const post = await postService.getAll();

    if (post.length === 0) {
      return res.status(400).json({ error: `There is no posts` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching post, ${error}`,
    });
  }
};

/**
 * Find the last 3 posts
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findLastThreePosts = async (req, res) => {
  try {
    const post = await postService.getThreeLatestPosts();

    if (post.length === 0) {
      return res.status(400).json({ error: `There is no posts` });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching the last 3 post, ${error}`,
    });
  }
};

/**
 * Find the last 3 archives posts
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findLastThreeArchivesPosts = async (req, res) => {
  try {
    const post = await postService.getThreeLatestArchivesPosts();

    if (post.length === 0) {
      return res.status(400).json({ error: `There is no posts` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching the last 3 archives post, ${error}`,
    });
  }
};

/**
 * Find all archives posts
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findAllArchivesPosts = async (req, res) => {
  try {
    const post = await postService.getAllArchivesPosts();

    if (post.length === 0) {
      return res.status(400).json({ error: `There is no posts` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching the archives post, ${error}`,
    });
  }
};

/**
 * Find user's post
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findByUser = async (req, res) => {
  const login = req.params.login;
  const user = await userService.getByLogin(login);
  const userId = user.id;

  try {
    const post = await postService.getAllByUser(userId);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching post, ${error}`,
    });
  }
};

/**
 * Find the number of posts publish by a user
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const numberPostsByUser = async (req, res) => {
  const currentUserId = req.userId;

  try {
    const post = await postService.countPostsByUser(currentUserId);
    if (post.length === 0) {
      return res.status(400).json({ error: `User doesn't have post yet.` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching post, ${error}`,
    });
  }
};

/**
 * Update a post
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const updatePost = async (req, res) => {
  const idPost = parseInt(req.params.id, 10);
  const currentUserId = req.userId;
  const postToEdit = await postService.getById(idPost);

  const isUserAllowed = authenticationService.checkUserPermission(
    postToEdit?.UserId,
    currentUserId
  );

  // Check input format
  const { error } = validateInput(req.body);
  if (error) {
    return res.status(400).json({
      errorCode: "fieldsToFill",
      errorMessage: errors.global.fieldsToFill,
    });
  }

  // sanitize input
  const fieldsToSanitize = [
    "gender",
    "alert_date",
    "description",
    "name",
    "tattoo",
    "microchip",
    "collar",
    "distinctive_signs",
    "picture",
    "is_active",
    "street",
    "postalCode",
    "city",
    "UserId",
    "TypeId",
    "PetCategoryId",
  ];

  fieldsToSanitize.forEach((fieldName) => {
    if (req.body[fieldName]) {
      req.body[fieldName] = escapeHtml(req.body[fieldName].trim());
    }
  });

  let {
    gender,
    alert_date,
    description,
    name,
    tattoo,
    microchip,
    collar,
    distinctive_signs,
    picture,
    is_active,
    UserId,
    street,
    postalCode,
    city,
    TypeId,
    PetCategoryId,
  } = req.body;

  if (postalCode !== postToEdit.postalCode && !city) {
    return res.status(400).json({
      errorCode: "noCity",
      errorMessage: errors.global.noCity,
    });
  }

  if (!isUserAllowed) {
    return res.status(403).json({
      error: `You don't have the rights`,
    });
  }

  try {
    let picturePath;
    if (req.files && req.files.picture && req.files.picture.length > 0) {
      picturePath = req.files.picture[0].path;

      // Delete old picture from server
      if (postToEdit.picture) {
        fs.unlinkSync(postToEdit.picture);
      }
    }

    const post = await postService.editPost(idPost, {
      gender,
      alert_date,
      description,
      name,
      tattoo,
      microchip,
      collar,
      distinctive_signs,
      picture: picturePath,
      is_active,
      street,
      postalCode,
      city,
      UserId,
      TypeId,
      PetCategoryId,
    });

    if (!post) {
      return res.status(400).json({ error: `Post doesn't exist` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when updating post, ${error}`,
    });
  }
};

/**
 * Delete a post
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const removePost = async (req, res) => {
  const idPost = parseInt(req.params.id, 10);
  const currentUserId = req.userId;

  const postToDelete = await postService.getById(idPost);

  const isUserAllowed = authenticationService.checkUserPermission(
    postToDelete?.UserId,
    currentUserId
  );

  if (!isUserAllowed) {
    return res.status(403).json({
      error: `You don't have the rights`,
    });
  }

  try {
    // get the picture to delete it with the post
    const picture = postToDelete.picture;
    const post = await postService.deletePost(idPost);

    if (!post) {
      return res.status(400).json({ error: `Post ${id} doesn't exist` });
    }

    if (picture) {
      fs.unlinkSync(picture);
    }

    res.status(200).json(`Post ${idPost} has been successfully deleted`);
  } catch (error) {
    res.status(500).json({
      error: `Error when deleting post , ${error}`,
    });
  }
};

module.exports = {
  createPost,
  findById,
  findAll,
  findLastThreePosts,
  findLastThreeArchivesPosts,
  findAllArchivesPosts,
  findByUser,
  numberPostsByUser,
  updatePost,
  removePost,
};
