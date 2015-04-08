exports.generate_confirmation_code = function (req, res, next) {
    // The mask contains all of the valid characters for the code. A regex for
    // this code would be `^[a-zA-Z0-9]*$`. It would be a good idea to get a
    // better regex so a bit more validation could happen on the Crowdflower end.
    var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // The result variable will hold the code. One character will be used at a time.
    var result = '';
    for (var length = 16; length > 0; --length)
        result += mask[Math.round(Math.random() * (mask.length - 1))];

    req.confirmation_code = result;
    next();
};
