const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('firstname')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a first name.'),
    check('lastname')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a last name.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.')
        .matches(/\d/)
        .withMessage('Password must contain at least one number.')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must contain at least one special character (!@#$%^&*).'),

handleValidationErrors
];
// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { firstname, lastname, email, password, username } = req.body;
        const user = await User.signup({ firstname, lastname, email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    })
);


module.exports = router;
