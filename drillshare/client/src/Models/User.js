const UserSchema = {
  id: '',
  username: '',
  email: '',
  accessToken: false,
  profile: {
    _id: '',
    userId: '',
    nameFirst: '',
    nameLast: '',
    email: '',
    phone: '',
    driversLicence: '',
    address: '',
    dob: '',
  },
  profileValid: false,
};

export default UserSchema;
