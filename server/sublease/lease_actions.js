const db = require('../data/database');
const imageHandler = require('../data/file_storage');

exports.get_lease = async function(lease_id) {
    const has_lease = await db.check_lease_exists(lease_id);
    if (!has_lease) {
        return {code: 400, msg: "Provided lease id does not exist"};
    }

    const sublease = await db.get_lease_by_id(lease_id);
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

exports.add_lease = async function(user_id, images, address="", category="", property_name="", area=0, room_type="1B1B", price=0, deposit=0, description="",
                                    start_date="0000-00-00", end_date="0000-00-00", gender=0, pet=0, parking=0, longitude=0.0, latitude=0.0, status=1) {
    const user_exists = await db.check_user_id(user_id);
    if (!user_exists) {
        return {code: 400, msg: "User does not exist"};
    }
    // TODO: add additional credential checks
    
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
    let image_keys = []

    if (images) {
        const{code, msg, data} = await upload_images(images, lease_id);
        if (code != 200) {
            return {code: code, msg: msg};
        }
        image_keys = data;
    }

    return {
        code : 200,
        msg : {
            lease_id: lease_id,
            image_keys: image_keys,
        },
    };
};

exports.archive_lease = async function(lease_id, status=0) {
    const has_lease = await db.check_lease_exists(lease_id);
    if (!has_lease) {
        return {code: 400, msg: "Provided lease id does not exist"};
    }

    const affected_rows = await db.change_lease_status(lease_id, status);
    if (affected_rows != 1) {
        return {
            code: 500, msg: new Error("failed to update")
        };
    }

    const msg = status == 0 ? "Lease archived" : "Lease restored";
    return {code: 200, msg: msg};
};

exports.delete_lease = async function(lease_id) {
    const has_lease = await db.check_lease_exists(lease_id);
    if (!has_lease) {
        return {code: 400, msg: "Provided lease id does not exist"};
    }

    // first, retrieve all images under the leaase
    const image_keys = await db.get_sublease_images(lease_id);

    // next, delete those images from s3
    if (image_keys.length > 0) {
        const results = await imageHandler.batchDeleteObjects(image_keys);
        if (results.Errors.length > 0) {
            return {code: 500, msg: "Failed to delete images"};
        }
    }
    
    // then, delete all image keys from the database
    var _ = await db.delete_image_keys_from_lease(lease_id);

    // finally, delete the lease from the database
    const deleted_rows = await db.delete_lease(lease_id);
    if (deleted_rows != 1) {
        return {code: 500, msg: "An error occured during lease delete"};
    }

    return {code: 200, msg: "Success"};
};

exports.edit_lease = async function(lease_id, user_id, images, images_deleted, address, category, property_name, area, room_type, price, deposit,
                                    description, start_date, end_date, gender, pet, parking, longitude, latitude, status=1) {
    // First, update the lease entry in the database
    const value_map = {}
    if (property_name)  value_map.PropertyName = property_name;
    if (category)       value_map.PropertyCategory = category;
    if (address)        value_map.PropertyAddress = address;
    if (price)          value_map.PropertyPrice = price;
    if (area)           value_map.RoomSize = area;
    if (room_type)      value_map.RoomType = room_type;
    if (gender)         value_map.GenderLimit = gender;
    if (pet)            value_map.IsPetFriendly = pet;
    if (start_date)     value_map.SubleasePeriodStart = start_date;
    if (end_date)       value_map.SubleasePeriodEnd = end_date;
    if (description)    value_map.PropertyDescription = description;
    if (parking)        value_map.ParkingAvailable = parking;
    if (deposit)        value_map.Deposit = deposit;
    if (latitude)       value_map.Latitude = latitude;
    if (longitude)      value_map.Longitude = longitude;
    if (status)         value_map.status = status;
    if (user_id)        value_map.UserID = user_id;

    const affected_rows = await db.lease_update(value_map, lease_id);
    if (affected_rows != 1) {
        return {code: 500, msg: new Error("An error occured during update")};
    }

    // Add the lease id and the image keys to the database and upload the new images to S3
    let image_keys = []
    if (images && images.length > 0) {
        const {code, msg, data} = await upload_images(images, lease_id);
        if (code != 200) {
            return {code: code, msg: msg};
        }
        image_keys = data;
    }

    if (images_deleted && images_deleted.length > 0) {
        // After that, delete the image keys and lease id of the deleted images from the database
        for (let delete_key of images_deleted) {
            const exists = await db.check_lease_id_and_image_key_exists(lease_id, delete_key);
            // only delete if exists
            if (exists) {
                const deleted_rows = await db.delete_one_image_key_from_lease(lease_id, delete_key);
                if (deleted_rows != 1) {
                    return {code: 500, msg: new Error("An error occured when deleting old images")};
                }
            }
        }
        // Finally, delete the deleted images from S3
        const results = await imageHandler.batchDeleteObjects(images_deleted);
        if (results.Errors.length > 0) {
            return {code: 500, msg: "Failed to delete images"};
        }
    }

    return {
        code: 200,
        msg : {
            lease_id: lease_id,
            image_keys: image_keys,
        },
    };
}

async function upload_images(images, lease_id) {
    const image_keys = []
    for (let image of images) {
        const name = image.name;
        const data = image.data;
        const type = image.type;
        const encoding = image.encoding;
        if (!name || !data) {
            return {
                code: 400, 
                msg: "invalid image format; image name & data are required", 
                data: null
            };

        }
        const image_key = lease_id + "-" + name;

        // Upload the image to S3
        const location = await imageHandler.uploadObject(image_key, data, type, encoding);
        if (!location) {
            return {code: 500, msg: "failed to upload the image", data: null};
        }

        // Now the image is uploaded, store the lease & the image key to the database
        const duplicate = await db.check_lease_id_and_image_key_exists(lease_id, image_key);
        // Only add a new database entry if we didn't find a duplicated image key under the same lease.
        // By default, Amazon S3 will override the previous object if a new object with the same key is uploaded.
        if (!duplicate) {
            await db.add_lease_id_and_image_key(lease_id, image_key);
        }

        image_keys.push(image_key);
    }
    return {code: 200, msg: "success", data: image_keys};
}