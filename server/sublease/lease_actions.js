const db = require('../data/database');
const imageHandler = require('../data/file_storage');

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
    } else if(sublease.GenderLimit == 2) {
        gender = "Female Only";
    } else {
        gender = "Other";
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

exports.add_lease = async function(user_id, images, address = "", category = "", property_name = "", area = 0, room_type = "1B1B", price = 0, deposit = 0, description = "",
                                    start_date = "0000-00-00", end_date = "0000-00-00", gender = 0, pet = 0, parking = 0, longitude = 0.0, latitude = 0.0, status = 1) {
    const user_exists = await db.check_user_id(user_id);
    if (!user_exists) {
        return {code: 400, msg: "User does not exist"};
    }
    // TODO: add additional credential checks

    // const statement = "(PropertyName, PropertyCategory, PropertyAddress, PropertyPrice, RoomSize, RoomType, GenderLimit, IsPetFriendly,"
    //                  + " SubleasePeriodStart, SubleasePeriodEnd, PropertyDescription, ParkingAvailable, Deposit, Latitude, Longitude, status, UserID)"
    //                  + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // const values = [property_name, category, address, price, area, room_type, gender, pet, start_date, end_date, description, 
    //                 parking, deposit, latitude, longitude, status, user_id];
    
    const value_map = {
        PropertyName: property_name,
        PropertyCategory: category,
        PropertyAddress: address,
        PropertyPrice: price,
        RoomSize: area,
        RoomType: room_type,
        GenderLimit: gender,
        IsPetFriendly: pet,
        SubleasePeriodStart: start_date,
        SubleasePeriodEnd: end_date,
        PropertyDescription: description,
        ParkingAvailable: parking,
        Deposit: deposit,
        Latitude: latitude,
        Longitude: longitude,
        status: status,
        UserID: user_id
    }

    const lease_id = await db.lease_insert(value_map);
    const image_keys = []

    if (images) {
        // upload images
        for (let image of images) {
            const name = image.name;
            const data = image.data;
            const type = image.type;
            const encoding = image.encoding;
            if (!name || !data) {
                return {
                    code: 400, msg: "invalid image format; image name & data are required"
                };
            }
            const image_key = lease_id + "-" + name;

            // Store the lease & the image to the database
            const duplicate = await db.check_lease_id_and_image_key_exists(lease_id, image_key);
            // Only add a new database entry if we didn't find a duplicated image key under the same lease.
            // By default, Amazon S3 will override the previous object if a new object with the same key is uploaded.
            if (!duplicate) {
                await db.add_lease_id_and_image_key(lease_id, image_key);
            }

            // Upload the image to S3
            location = await imageHandler.uploadObject(image_key, data, type, encoding);
            if (!location) {
                return {
                    code: 500, msg: new Error("failed to upload the image")
                }
            }
            image_keys.push(image_key);
        }
    }

    return {
        code : 200,
        msg : {
            lease_id: lease_id,
            image_keys: image_keys,
        },
    };
};