//
// Utils file for different functions, helpers, etc.
//
export function fixUp(name, avatarUrl) {
    if (name === 'backbone.marionette') {
        name = 'marionette';
    }

    if (name === 'backbone') {
        avatarUrl = 'https://humancoders-formations.s3.amazonaws.com/uploads/course/logo/64/thumb_bigger_formation-backbone-js.png';
    }

    if (name === 'underscore') {
        avatarUrl = 'https://images-platform.99static.com/WG4uXLVV_iftAlJttXgvXgU6th0=/500x500/top/smart/99designs-contests-attachments/12/12583/attachment_12583422';
    }

    if (name === 'react') {
        avatarUrl = 'https://cdn-images-1.medium.com/max/1600/1*6kK9j74vyOmXYm1gN6ARhQ.png';
    }

    if (name === 'react-native') {
        avatarUrl = 'https://www.secret-source.eu/wp-content/uploads/2017/11/react-native-logo.jpg';
    }

    if (name === 'handlebars.js') {
        name = 'handlebars';
        avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxH7fJHOirzp24iUFvIUToQvP3fZzzqa61QGNLpGNbaTnOwo9';
    }

    if (name === 'less.js') {
        name = 'less';
    }

    if (name === 'phantomjs') {
        avatarUrl = 'https://pbs.twimg.com/profile_images/1884362265/phantomjs_400x400.png';
    }

    if (name === 'jest') {
        avatarUrl = 'https://camo.githubusercontent.com/f6414ee20933d5fb8b06dc32ed38c8aa175da559/687474703a2f2f64702e68616e6c6f6e2e696f2f3331337933753244307033382f6a6573742e706e67';
    }

    if (name === 'materialize') {
        avatarUrl = 'http://res.cloudinary.com/colinstodd-com/image/upload/c_fit/n9qdpfw4kwsjqox0lymi.png';
    }

    if (name === 'express') {
        avatarUrl = 'https://banner2.kisspng.com/20180711/yfe/kisspng-express-js-node-js-javascript-mongodb-node-js-5b461d28173fc6.1251392115313216400952.jpg';
    }

    return {
        name,
        avatarUrl
    };
}

export function sortByName(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
}