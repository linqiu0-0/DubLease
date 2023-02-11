// CREATE TABLE Persons (
//     PostID int,
//     PropertyName varchar(255),
//     PropertyCategory varchar(255),
//     PropertyAddress varchar(255),
//     PropertyPrice int,
//     RoomSize int,
//     RoomType varchar(255),               xByB
//     GenderLimit int,                     0, 1, 2
//     IsPetFriendly int,                   0, 1
//     SubleasePeriodStart varchar(255),    yyyy-mm-dd
//     SubleasePeriodEnd varchar(255),      yyyy-mm-dd
//     PropertyDescription varchar(255),
//     ParkingAvailable int,                0, 1
//     Deposit int
// );
// INSERT INTO Sublease VALUES (
// 	1,
//     'Hub U District',
//     'Apartment',
//     '5000 University Way NE',
//     1500,
//     1300,
//     '4B4B',
//     0,
// 	0,
//     '2023-01-03',
//     '2023-06-08',
// 	'This is Hub',
//     1,
//     0
// );
const db = require('../data/database');

exports.search_sublease = async function(name, start_date, end_date, min_price, max_price, bed, gender) {
    // neglect empty/unspecified parameters besides dates (will handle later)
    var conditions = [];// basically what's after the WHERE clause (e.g. "name = ? AND MIN_PRICE < ? AND ...")
    var values = [];    // values corresponding to the specified conditions. Orders must match exactly
    if (name) {
        conditions.push("PropertyName like ?");
        values.push("%" + name + "%");
    }
    if (min_price) {
        conditions.push("PropertyPrice >= ?");
        values.push(parseInt(min_price));
    }
    if (max_price) {
        conditions.push("PropertyPrice <= ?");
        values.push(parseInt(max_price));
    }
    // TODO: filter for bedroom number
    // if (bed) {
    //     conditions.push("RoomType = ?");
    //     values.push(parseInt(bed));
    // }
    if (gender && gender != 0) {
        conditions.push("GenderLimit = ?");
        values.push(parseInt(gender));
    }
    
    // initial filtering on conditions besides dates
    const sql_conditions = conditions.length? " WHERE " + conditions.join(" AND ") : conditions.join(" AND ");
    const subleases = await db.filter_sublease(sql_conditions, values);
    // console.log(subleases);
    var result = [];
    for (let id in subleases) {
        var sublease = subleases[id];
        // filter on date period
        if (period_match(sublease.SubleasePeriodStart, sublease.SubleasePeriodEnd, start_date, end_date)) {
            result.push({
                post_id: sublease.PostID,
                coverImg: {
                    src: get_cover_img(sublease.PostID),
                    alt: sublease.PropertyName + " photo"
                },
                name: sublease.PropertyName,
                category: sublease.PropertyCategory,
                address: sublease.PropertyAddress,
                price: sublease.PropertyPrice,
                space: sublease.RoomSize,
                bedNum: sublease.RoomType.split("B")[0],
                bathNum: sublease.RoomType.split("B")[1],
                gender: sublease.GenderLimit,
                petOK: sublease.IsPetFriendly,
                periodStart: sublease.SubleasePeriodStart,
                periodEnd: sublease.SubleasePeriodEnd,
                description: sublease.PropertyDescription,
                parking: sublease.ParkingAvailable,
                deposit: sublease.Deposit
            });
        }
    }
    // if (!result) {
    //     return {code: 400, msg: "No matches"};
    // }
    return {
        code : 200,
        msg : result
    };
};

// returns whether the given sublease period includes the period from start_date to end_date
function period_match(SubleasePeriodStart, SubleasePeriodEnd, start_date, end_date) {
    var result = true;
    if (start_date) {
        sublease_start_year = parseInt(SubleasePeriodStart.split("-")[0]);
        sublease_start_month = parseInt(SubleasePeriodStart.split("-")[1]);
        filter_start_year = parseInt(start_date.split("-")[0]);
        filter_start_month = parseInt(start_date.split("-")[1]);
        result &= sublease_start_year < filter_start_year
                || (sublease_start_year == filter_start_year && sublease_start_month < filter_start_month)
    }
    if (end_date) {
        sublease_end_year = parseInt(SubleasePeriodEnd.split("-")[0]);
        sublease_end_month = parseInt(SubleasePeriodEnd.split("-")[1]);
        filter_end_year = parseInt(end_date.split("-")[0]);
        filter_end_month = parseInt(end_date.split("-")[1]);
        result &= filter_end_year < sublease_end_year
                || (filter_end_year == sublease_end_year && filter_end_month < sublease_end_month);
    }
    return result;
}

// TODO: connect to the file storage service
// returns the corresponding cover image of the post of the given id
function get_cover_img(PostID) {
    return "https://images1.apartments.com/i2/WCQqdTdOx7whsIN4SXA0qt-msh5dw_VGIju9PzqlhX4/111/hub-u-district-seattle-seattle-wa-primary-photo.jpg";
}