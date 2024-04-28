const PostService = require("../service/PostService");
const AuthenticationService = require("../service/AuthenticationService");
const AddressService = require("../service/AddressService");
const { escapeHtml } = require("../utils/htmlEscape");
/**
 * Register a new post
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const createPost = async (req, res) => {
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

  // sanitize input
  const fieldsToSanitize = ["description", "name", "distinctive_signs"];

  fieldsToSanitize.forEach((fieldName) => {
    req.body[fieldName] = escapeHtml(req.body[fieldName].trim());
  });

  try {
    // get current user information
    // const currentUserId = req.user.id;
    // const currentUser = await UserService.getById(currentUserId);
    // // req.body.UserId = currentUserId;
    // // req.body.AddressId = currentUser.AddressId;
    // req.body.UserId = currentUserId;
    // req.body.AddressId = currentUser.AddressId;

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
      picture: req.file?.path,
      is_active,
      UserId,
      TypeId,
      PetCategoryId,
    });

    const address = await AddressService.addAddress({
      street: street,
      postalCode: postalCode,
      city: city,
    });

    await post.setAddress(address);

    res.status(201).json({
      postId: post.id,
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
    const post = await PostService.getAll();

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
 * Find user's post
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findByUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const post = await PostService.getAllByUser(userId);
    if (post.length === 0) {
      return res.status(400).json({ error: `User doesn't have post` });
    }
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
    const post = await PostService.countPostsByUser(currentUserId);
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
 * Find post by address
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findByAddress = async (req, res) => {
  const postalCode = req.params.postalCode;

  try {
    const post = await PostService.getByAddress(postalCode);
    if (post.length === 0) {
      return res.status(400).json({ error: `Address doesn't have post` });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching post, ${error}`,
    });
  }
};

/**
 * Find post by type
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findByType = async (req, res) => {
  const type = req.params.id;

  try {
    const post = await PostService.getByType(type);
    if (post.length === 0) {
      return res.status(400).json({ error: `Type doesn't have post` });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching post, ${error}`,
    });
  }
};

/**
 * Find post by pet category
 * @param {object} req
 * @param {object} res
 * @throws {object} error
 */
const findByPetCategory = async (req, res) => {
  const petCategory = req.params.id;

  try {
    const post = await PostService.getByType(petCategory);
    if (post.length === 0) {
      return res.status(400).json({ error: `Pet category doesn't have post` });
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
    AddressId,
    TypeId,
    PetCategoryId,
  } = req.body;

  const idPost = parseInt(req.params.id, 10);
  const currentUserId = req.userId;
  const postToEdit = await PostService.getById(idPost);

  const isUserAllowed = AuthenticationService.checkUserPermission(
    postToEdit.UserId,
    currentUserId
  );

  // sanitize input
  const fieldsToSanitize = ["description", "name", "distinctive_signs"];

  fieldsToSanitize.forEach((fieldName) => {
    req.body[fieldName] = escapeHtml(req.body[fieldName].trim());
  });

  if (isUserAllowed) {
    try {
      const post = await PostService.editPost(idPost, {
        gender,
        alert_date,
        description,
        name,
        tattoo,
        microchip,
        collar,
        distinctive_signs,
        picture: req.file?.path,
        is_active,
        UserId,
        TypeId,
        PetCategoryId,
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
  const currentUserId = req.userId;

  const postToDelete = await PostService.getById(idPost);

  const isUserAllowed = AuthenticationService.checkUserPermission(
    postToDelete?.UserId,
    currentUserId
  );

  if (isUserAllowed) {
    try {
      const post = await PostService.deletePost(idPost);
      if (post.length === 0) {
        return res.status(400).json({ error: `Post ${id} doesn't exist` });
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
  findByUser,
  numberPostsByUser,
  findByAddress,
  findByType,
  findByPetCategory,
  updatePost,
  removePost,
};
