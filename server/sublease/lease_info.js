const db = require('../data/database');

exports.get_lease = async function(lease_id) {
    const has_lease = db.check_lease_exists(lease_id);
    if (!has_lease) {
        return {code: 400, msg: "Provided lease id does not exist"};
    }

    const sublease = await db.get_lease_by_id(lease_id);
    // console.log(sublease);
    const image_keys = await db.get_sublease_images(lease_id);
    const user_id = sublease.UserID;
    const user = await db.get_user_by_id(user_id);
    const status = sublease.status == 1 ? 'Available' : 'Unavailable';
    let gender = "";
    if (sublease.GenderLimit == 0) {
        gender = "Any";
    } else if (sublease.GenderLimit == 1) {
        gender = "Male Only";
    } else {
        gender = "Female Only";
    }
    const petOK = sublease.IsPetFriendly == 1 ? "Yes" : "No";
    const parking = sublease.ParkingAvailable == 1 ? "Yes" : "No";
    const deposit = sublease.Deposit == 1 ? "Required" : "Not required";
    const result = {
        post_id: sublease.PostID,
        image_keys: image_keys,
        name: sublease.PropertyName,
        description: sublease.PropertyDescription,
        address: sublease.PropertyAddress,
        longitude: sublease["Longitude"],
        latitude: sublease["Latitude"],
        username: user.username,
        user_email: user.email,
        user_phone: user.phone,
        rental_features: [
            {
                label: "Status",
                text: status,
            },
            {
                label: "Price",
                text: sublease.PropertyPrice + "$/month",
            },
            {
                label: "Start Date",
                text: sublease.SubleasePeriodStart,
            },
            {
                label: "End Date",
                text: sublease.SubleasePeriodEnd,
            },
            {
                label: "Category",
                text: sublease.PropertyCategory,
            },
            {
                label: "Room Type",
                text: sublease.RoomType,
            },
            {
                label: "Room Size",
                text: sublease.RoomSize + "sqft",
            },
            {
                label: "Deposit",
                text: deposit,
            },
            {
                label: "Gender Constraint",
                text: gender,
            },
            {
                label: "Pet Friendly",
                text: petOK,
            },
            {
                label: "Parking Available",
                text: parking,
            }
        ],
    };

    return {
        code : 200,
        msg : result,
    };
}