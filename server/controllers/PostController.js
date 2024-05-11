const PostService = require("../service/PostService");
const UserService = require("../service/UserService");
const AuthenticationService = require("../service/AuthenticationService");
const AddressService = require("../service/AddressService");
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
    id_user: Joi.number().integer(),
    id_type: Joi.number().integer(),
    id_pet_category: Joi.number().integer(),
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
    "id_user",
    "id_type",
    "id_pet_category",
  ];

  fieldsToSanitize.forEach((fieldName) => {
    if (req.body[fieldName]) {
      req.body[fieldName] = escapeHtml(req.body[fieldName].trim());
    }
  });

  // Check input format
  const { error } = validateInput(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({
      errorCode: "fieldsToFill",
      errorMessage: errors.global.fieldsToFill,
    });
  }

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
    id_user,
    id_type,
    id_pet_category,
  } = req.body;

  try {
    let picturePath;
    if (req.files && req.files.picture && req.files.picture.length > 0) {
      picturePath = req.files.picture[0].path;
    }

    // create a new post
    const post = await PostService.addPost({
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
      id_user,
      id_type,
      id_pet_category,
    });

    const address = await AddressService.addAddress({
      street: street,
      postalCode: postalCode,
      city: city,
    });

    await post.setAddress(address);

    res.status(201).json({
      id_post,
      message: "Post has been successfully registered",
    });
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
    const post = await PostService.getById(id);

    if (post.length === 0) {
      return res.status(400).json({ error: `Post ${id} doesn't exist` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching post by id, ${error}`,
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
    const post = await PostService.getAll();

    if (post.length === 0) {
      return res.status(400).json({ error: `There is no posts` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching posts, ${error}`,
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
    const post = await PostService.getThreeLatestPosts();

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
    const post = await PostService.getThreeLatestArchivesPosts();

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
    const post = await PostService.getAllArchivesPosts();

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
  const user = await UserService.getByLogin(login);

  const currentUserId = user.id_user;

  try {
    const post = await PostService.getAllByUser(currentUserId);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching post by user, ${error}`,
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
  const currentUserId = req.id_user;

  try {
    const post = await PostService.countPostsByUser(currentUserId);

    if (post.length === 0) {
      return res.status(400).json({ error: `User doesn't have post yet.` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching the number of post by user, ${error}`,
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
  const currentUserId = req.id_user;
  const postToEdit = await PostService.getById(idPost);

  const isUserAllowed = AuthenticationService.checkUserPermission(
    postToEdit.id_user,
    currentUserId
  );

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
    "id_user",
    "id_type",
    "id_pet_category",
  ];

  fieldsToSanitize.forEach((fieldName) => {
    if (req.body[fieldName]) {
      req.body[fieldName] = escapeHtml(req.body[fieldName].trim());
    }
  });
  // Check input format
  const { error } = validateInput(req.body);
  if (error) {
    return res.status(400).json({
      errorCode: "fieldsToFill",
      errorMessage: errors.global.fieldsToFill,
    });
  }

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
    id_user,
    street,
    postalCode,
    city,
    id_type,
    id_pet_category,
  } = req.body;

  if (postalCode !== postToEdit.Address.postalCode && !city) {
    return res.status(400).json({
      errorCode: "noCity",
      errorMessage: errors.global.noCity,
    });
  }

  if (isUserAllowed) {
    try {
      let picturePath;
      if (req.files && req.files.picture && req.files.picture.length > 0) {
        picturePath = req.files.picture[0].path;

        // Delete old picture from server
        if (postToEdit.picture) {
          fs.unlinkSync(postToEdit.picture);
        }
      }

      const post = await PostService.editPost(idPost, {
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
        id_user,
        id_type,
        id_pet_category,
      });

      await AddressService.editAddress(postToEdit.id_address, {
        street: street,
        postalCode: postalCode,
        city: city,
      });

      if (post.length === 0) {
        return res.status(400).json({ error: `Post doesn't exist` });
      }
      res.status(200).json("Post has been updated!");
    } catch (error) {
      res.status(500).json({
        error: `Error when updating post, ${error}`,
      });
    }
  } else {
    res.status(403).json({
      error: `You don't have the rights`,
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
  const currentUserId = req.id_user;

  const postToDelete = await PostService.getById(idPost);

  const isUserAllowed = AuthenticationService.checkUserPermission(
    postToDelete?.id_user,
    currentUserId
  );

  if (isUserAllowed) {
    try {
      // get the picture to delete it with the post
      const picture = postToDelete.picture;
      const post = await PostService.deletePost(idPost);

      if (post.length === 0) {
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
  } else {
    res.status(403).json({
      error: `You don't have the rights`,
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
