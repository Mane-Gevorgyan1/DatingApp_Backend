module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: {
                type: String,
                default: null,
            },
            surname: {
                type: String,
                default: null,
            },
            email: {
                type: String,
                default: null,
            },
            phone: {
                type: String,
                default: null,
            },
            verificationCode: {
                type: Number,
                default: null
            },
            phoneIsVerified: {
                type: Boolean,
                default: false
            },
            age: {
                type: Number,
                default: null,
            },
            about: {
                type: String,
                default: null,
            },
            country: {
                type: String,
                default: null,
            },
            nationality: {
                type: String,
                default: null,
            },
            sex: {
                type: String,
                default: null,
            },
            birthday: {
                type: Date,
                default: null
            },
            password: {
                type: String,
                default: null,
            },
            avatar: {
                type: String,
                default: null,
            },
            location: {
                type: String,
                default: null,
            },
            distance: {
                type: Number,
                default: null,
            },
            preferedStartAge: {
                type: Number,
                default: null,
            },
            preferedEndAge: {
                type: Number,
                default: null,
            },
            token: {
                type: String,
                default: null
            },
            profession: [String],
            spokenLanguages: [String],
            interests: [String],
            gallery: [String],
        },
        { timestamps: true },
    );

    const Users = mongoose.model("users", schema);
    return Users;
};

// ov a indz likel
// ov indz chi likel
// um em es likel
// um es chem likel
// ov a indz supper like
// um em es super like
// matches
// blacklist
// um em es blockel
// ov a indz blockel
// lastOnline 
// users active a te che lastOnline-ov
// es premium em te che 
// es superLike unem te che
// premiumi astijanner ka
// users online a te che
// namakner
// top yngnel
